import { RemovalPolicy, Stack } from 'aws-cdk-lib';
import {
  RestApi,
  LambdaIntegration,
  LogGroupLogDestination,
  AccessLogFormat,
  MethodLoggingLevel,
} from 'aws-cdk-lib/aws-apigateway';
import * as iam from 'aws-cdk-lib/aws-iam';
import { LogGroup } from 'aws-cdk-lib/aws-logs';
import { Construct } from 'constructs';
import { Lambda, Creative } from './Lambda';
export { Creative } from './Lambda';

export interface AdDecisionServerProps {
  readonly creatives: Creative[]; // A list of ad creatives.
  readonly clearanceRule?: 'LONGEST_FIRST' | 'SEQUENCIAL'; // Optional clearance policy (default = LONGEST_FIRST.)
}

export class AdDecisionServer extends Construct {

  public readonly url: string;

  constructor(scope: Construct, id: string, {
    creatives,
    clearanceRule = 'LONGEST_FIRST',
  }: AdDecisionServerProps) {

    super(scope, id);

    // Create IAM role for API Gateway
    const executeRole = new iam.Role(this, 'role', {
      assumedBy: new iam.ServicePrincipal('apigateway.amazonaws.com'),
      managedPolicies: [
        iam.ManagedPolicy.fromAwsManagedPolicyName('CloudWatchLogsFullAccess'),
      ],
    });

    // Create a CloudWatch log group
    const logGroup = new LogGroup(this, 'ApiGatewayLogGroup', {
      logGroupName: `/aws/apigateway/ads-logs-${Stack.of(this)}`,
      removalPolicy: RemovalPolicy.DESTROY,
    });
    logGroup.grantWrite(executeRole);

    // Set up vast endpoint
    const vastEndpoint = new RestApi(this, 'VAST-Endpoint', {
      binaryMediaTypes: ['application/xml'],
      deployOptions: {
        loggingLevel: MethodLoggingLevel.INFO,
        dataTraceEnabled: true,
        accessLogDestination: new LogGroupLogDestination(logGroup),
        accessLogFormat: AccessLogFormat.jsonWithStandardFields(),
      },
      cloudWatchRole: true,
      cloudWatchRoleRemovalPolicy: RemovalPolicy.DESTROY,
    });
    const lambda = new Lambda(this, 'GetVAST', {
      creatives,
      clearanceRule,
    });
    vastEndpoint.root.addResource('vast').addMethod('GET',
      new LambdaIntegration(lambda.func, {
        proxy: false,
        requestTemplates: {
          'application/json': '{"duration": "$input.params(\'duration\')"}',
        },
        integrationResponses: [
          {
            statusCode: '200',
            responseParameters: {
              'method.response.header.Content-Type': "\'application/xml\'",
            },
            responseTemplates: {
              'application/xml': '#set($inputRoot = $input.path(\'$\'))$inputRoot.body',
            },
          },
        ],
      }),
      {
        requestParameters: {
          'method.request.querystring.duration': true,
        },
        methodResponses: [
          {
            statusCode: '200',
            responseParameters: {
              'method.response.header.Content-Type': true,
            },
          },
        ],
      },
    );
    this.url = `${vastEndpoint.url}vast`;
  }
}