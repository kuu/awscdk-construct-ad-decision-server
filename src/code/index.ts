import { Handler } from 'aws-lambda';

interface Creative {
  readonly duration: number;
  readonly url: string;
  readonly delivery: string;
  readonly mimeType: string;
  readonly width: number;
  readonly height: number;
}

const CREATIVES = getCreatives(process.env.CREATIVES as string);
const CLEARANCE_RULE = process.env.CLEARANCE_RULE as string;

function getCreatives(str: string): Creative[] {
  let creatives: Creative[] = [];
  try {
    creatives = JSON.parse(str);
  } catch (error) {
    console.error('Error parsing JSON:', error);
  }
  return creatives;
}

export const handler: Handler = async ({ duration }) => {
  const d = Number(duration) || 0;
  console.log(`Avail duration: ${d}`);
  const body = getVASTData(d, CREATIVES).replace(/[\s]+(?![^><]*>)/g, '');
  return { body };
};

function getVASTData(duration: number, creatives: Creative[]): string {
  let vastData = '<?xml version="1.0" encoding="UTF-8"?><VAST version="3.0">';
  if (CLEARANCE_RULE === 'SEQUENCIAL') {
    for (let i = 0; i < creatives.length; i++) {
      const creative = creatives[i];
      if (duration >= creative.duration) {
        vastData += getAdTag(i + 1, creative);
        duration -= creative.duration;
      } else {
        break;
      }
    }
  } else {
    creatives = creatives.sort((a, b) => b.duration - a.duration);
    const shortestDuration = creatives[creatives.length - 1].duration;
    for (let i = 0, j = 1; i < creatives.length && duration >= shortestDuration;) {
      const creative = creatives[i];
      if (duration >= creative.duration) {
        vastData += getAdTag(j++, creative);
        duration -= creative.duration;
      } else {
        i++;
      }
    }
  }
  return vastData + '</VAST>';
}

function getAdTag(index: number, creative: Creative): string {
  const { duration, url, delivery, mimeType, width, height } = creative;
  return `
<Ad sequence="${index}">
  <InLine>
    <AdSystem>2.0</AdSystem>
    <AdTitle>ad-${index}</AdTitle>
    <Impression/>
    <Creatives>
      <Creative>
        <Linear>
          <Duration>00:00:${duration}</Duration>
          <MediaFiles>
            <MediaFile delivery="${delivery}" type="${mimeType}" width="${width}" height="${height}">
              <![CDATA[${url}]]>
            </MediaFile>
          </MediaFiles>
        </Linear>
      </Creative>
    </Creatives>
  </InLine>
</Ad>`;
}
