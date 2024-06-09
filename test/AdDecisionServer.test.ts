import { App, Stack } from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import { AdDecisionServer } from '../src';

test('Create MediaLive', () => {
  const app = new App();
  const stack = new Stack(app, 'SmokeStack');

  new AdDecisionServer(stack, 'AdDecisionServer', {
    creatives: [
      {
        duration: 30,
        url: 'https://example.com/30sec.mp4',
        delivery: 'progressive',
        mimeType: 'video/mp4',
        width: 1280,
        height: 720,
      },
    ],
  });

  const template = Template.fromStack(stack);

  template.hasResource('AWS::ApiGateway::Method', 1);
  template.hasResource('AWS::Lambda::Function', 1);
});
