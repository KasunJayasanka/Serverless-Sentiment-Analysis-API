# Sentiment Analysis API

## Endpoint

- **Method**: POST
- **Path**: /sentiment-analysis

## Input

### Request Body

- Content-Type: application/json

```json
{
  "text": "The text you want to analyze for sentiment."
}
```

## Output

### Response Body

- Content-Type: application/json

```json
{
  "sentiment": "POSITIVE",
  "sentimentScore": {
    "Positive": 0.95,
    "Neutral": 0.04,
    "Negative": 0.01
  }
}
```

### Error Response

- Status Code: 500 Internal Server Error

```json
{
  "message": "Error message describing the issue."
}
```

### Description

This API analyzes the sentiment of the provided text using AWS Comprehend. The input is a JSON object with a "text" field, and the output includes the detected sentiment and sentiment scores.

- Positive Sentiment: Indicates a positive sentiment.
- Neutral Sentiment: Indicates a neutral sentiment.
- Negative Sentiment: Indicates a negative sentiment.
  
The sentiment scores represent the likelihood of each sentiment category. The higher the score, the more confident the model is in the detected sentiment.

### Usage

Send a POST request to the /sentiment-analysis endpoint with the text you want to analyze. The API will respond with the detected sentiment and sentiment scores.

#### Example using cURL:

```bash
curl -X POST -H "Content-Type: application/json" -d '{"text": "I love using this product! It\'s amazing."}' https://your-api-gateway-url/sentiment-analysis
```

#### Example Response:

```json
{
  "sentiment": "POSITIVE",
  "sentimentScore": {
    "Positive": 0.95,
    "Neutral": 0.04,
    "Negative": 0.01
  }
}
```

### Error Handling

If there is an error during the sentiment analysis, the API will respond with a 500 Internal Server Error and include an error message in the response body.

#### Example Error Response:

```json
{
  "message": "Error analyzing sentiment."
}
```




