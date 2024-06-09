# awscdk-construct-ad-decision-server
[![View on Construct Hub](https://constructs.dev/badge?package=awscdk-construct-ad-decision-server)](https://constructs.dev/packages/awscdk-construct-ad-decision-server)

CDK Construct for setting up a simple Ad Decision Server (ADS)
* Specify a list of ad creative files
* AdDecisionServer creates an API Gateway endpoint backed by a Lambda function that returns a VAST file based on the duration of the ad break
* The ad break's duration (in sec) needs to be specified as a query string (e.g. "?duration=30")
* The Lambda function generates a VAST file using the creatives that fills the ad break
* If `clearanceRule: 'SEQUENCIAL'` is set, the Lambda function tries to fill the ad break with the ad creatives from the beginning and gives up when there's no more space in the ad break.
* If `clearanceRule: 'LONGEST_FIRST'` (default) is set, the Lambda function tries to fill the ad break using the longest ad creative and, when the remaining break does not fit the longest ad, it moves to the 2nd longest ad creative.


## Install
[![NPM](https://nodei.co/npm/awscdk-construct-ad-decision-server.png?mini=true)](https://nodei.co/npm/awscdk-construct-ad-decision-server/)

## Usage
```ts
import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { AdDecisionServer } from 'awscdk-construct-ad-decision-server';

export class ExampleStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Build an Ad Decision Server (ADS) that returns 3x creatives
    const ads = new AdDecisionServer(this, 'AdDecisionServer', {
      creatives: [
        {
          duration: 30,
          url: `${AD_CREATIVE_URL}/30sec.mp4`,
          delivery: 'progressive',
          mimeType: 'video/mp4',
          width: 1280,
          height: 720,
        },
        {
          duration: 15,
          url: `${AD_CREATIVE_URL}/15sec.mp4`,
          delivery: 'progressive',
          mimeType: 'video/mp4',
          width: 1280,
          height: 720,
        },
        {
          duration: 60,
          url: `${AD_CREATIVE_URL}/60sec.mp4`,
          delivery: 'progressive',
          mimeType: 'video/mp4',
          width: 1280,
          height: 720,
        },
      ],
      clearanceRule: 'SEQUENCIAL', // Specify how ADS clear inventory: LONGEST_FIRST (defalut) or SEQUENCIAL
    });

    // You can use the ADS with MediaTailor
    const {emt, cf} = new MediaTailorWithCloudFront(this, 'MediaTailorWithCloudFront', {
      videoContentSourceUrl: ORIGIN_URL,
      adDecisionServerUrl: `${ads.url}?duration=[session.avail_duration_secs]`,
      slateAdUrl: SLATE_URL,
    });
  }
}
```
