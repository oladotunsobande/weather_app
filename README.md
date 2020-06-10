# Weather App

A serverless app for weather updates for cities across the world.

## Prerequisites

To setup the app, you need the following:

- `Node.js`: minimum version v12.x
- `MongoDB`
- `Serverless CLI`
- `AWS Lambda`

## Installation

You can setup `Node.js`, `MongoDB` and `AWS Lambda` by following the steps highlighted in their respective official websites below:

- `Node.js`: `https://nodejs.org/en/download/`
- `MongoDB`: `https://www.mongodb.com/try/download/community`
- `AWS Lambda`: `https://docs.aws.amazon.com/lambda/latest/dg/getting-started.html`

Now you need to install the Serverless CLI globally on your computer using `npm` by running the following command:

```
$ npm install -g serverless
```

Configure Serverless CLI with your AWS credentials:

```
$ serverless config credentials --provider aws --key <ACCESS_KEY> --secret <SECRET_KEY>
```

Clone the git repository:

```
$ git clone https://github.com/oladotunsobande/weather_app.git
```

Add your environment variables file `.env` and add the following variables:

```
MONGO_URL=
WEATHERSTACK_BASE_URL=
WEATHERSTACK_API_KEY=
CURRENT_WEATHER_PATH=
```

Install all dependencies:

```
$ npm install
```

Deploy your app to AWS using Serverless CLI:

```
$ serverless deploy
```

### Master branch build status: 
![](https://travis-ci.org/oladotunsobande/weather_app.svg?branch=master)