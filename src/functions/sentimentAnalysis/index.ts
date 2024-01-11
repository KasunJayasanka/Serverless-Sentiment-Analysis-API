import { APIGatewayProxyEvent } from 'aws-lambda';
import { formatJSONResponse } from '@libs/api-gateway';
import {
    ComprehendClient,
    DetectSentimentCommand,
    DetectSentimentCommandInput,
    DetectSentimentCommandOutput,
   } from '@aws-sdk/client-comprehend';

const comprehendClient = new ComprehendClient({});

export const handler = async (event: APIGatewayProxyEvent) => {
  try {
    
    const body = JSON.parse(event.body || '{}');

    const { text } = body;

    if (!text){
    throw Error('You need to pass up a field of "text" to analyse')
    }

    const res = await analyseSentiment({ text });

    return formatJSONResponse(res);

  } catch (error) {
  console.error(error);
  return {
   statusCode: 500,
   body: JSON.stringify({ message: error.message})
  }
 }
};

const analyseSentiment = async ({ text }: { text: string }) => {

    try {
        const input: DetectSentimentCommandInput = {
            Text: text,
            LanguageCode: 'en',
        };

        const command = new DetectSentimentCommand(input);
        const response: DetectSentimentCommandOutput = await comprehendClient.send(command);

        const sentiment = response.Sentiment || 'UNKNOWN';
        const sentimentScore = response.SentimentScore || {};

        const result = {
            sentiment,
            sentimentScore,
        };

        return result;
    } catch (error) {
        console.error('Error in analyseSentiment:', error);
        throw new Error('Error analyzing sentiment.');
    }
};

