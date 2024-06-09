import * as fs from 'fs';
import * as path from 'path';
import { Duration, aws_logs as logs } from 'aws-cdk-lib';
import { PolicyStatement } from 'aws-cdk-lib/aws-iam';
import { Runtime } from 'aws-cdk-lib/aws-lambda';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import { Construct } from 'constructs';

export interface Creative {
  readonly duration: number;
  readonly url: string;
  readonly delivery: string;
  readonly mimeType: string;
  readonly width: number;
  readonly height: number;
}

export interface LambdaProps {
  readonly creatives: Creative[];
  readonly clearanceRule: 'LONGEST_FIRST' | 'SEQUENCIAL';
}

export class Lambda extends Construct {
  public readonly func: NodejsFunction;

  constructor(scope: Construct, id: string, props: LambdaProps) {
    super(scope, id);

    const {
      creatives,
      clearanceRule,
    } = props;

    const TS_ENTRY = path.resolve(__dirname, 'code', 'index.ts');
    const JS_ENTRY = path.resolve(__dirname, 'code', 'index.js');

    this.func = new NodejsFunction(scope, 'ScheduleSCTE', {
      runtime: Runtime.NODEJS_18_X,
      entry: fs.existsSync(TS_ENTRY) ? TS_ENTRY : JS_ENTRY,
      handler: 'handler',
      timeout: Duration.seconds(30),
      environment: {
        NODE_ENV: process.env.NODE_ENV as string,
        CREATIVES: JSON.stringify(creatives),
        CLEARANCE_RULE: clearanceRule,
      },
      logRetention: logs.RetentionDays.TWO_WEEKS,
    });
    // Add a statement to call MediaLive schedule API
    this.func.addToRolePolicy(
      PolicyStatement.fromJson({
        Effect: 'Allow',
        Action: 'medialive:*',
        Resource: '*',
      }),
    );
  }
}