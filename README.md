# serverless

🛰️ REST API and CRUD endpoints (AWS Lambda, API Gateway), Data persistence (AWS DynamoDB), Message Queues for cross-service communication (AWS SQS), Scheduled event triggers (AWS EventBridge), Cloud stack management (AWS CloudFormation), Object storage on the cloud (AWS S3), Email notifications (AWS SES), Middleware, Authentication and Authorization (Lambda Authorizer), Data validation and error handling.

# How use serverless

```
npm install -g serverless
```

# How Create Project Serverless

```
sls create --name YOUR_PROJECT_NAME --template-url https://github.com/GustavoNoronha0/serverlessbase

cd YOUR_PROJECT_NAME`

npm install
```

# How Create Project Deploy

```
sls deploy -v
```

# How view process events

```
sls logs -f processName
```

#### With time between logs

```
sls logs -f processName --startTime 1m
```

## Getting started Auth

### 1. Clone the repository (or generate a serverless project)

```sh
sls create --name auth-service --template-url https://github.com/GustavoNoronha0/serverless-auth
cd auth-service
```

### Install dependencies

```sh
npm install
```

### Deploy

```sh
sls deploy -v
```

### 5. Final test

To make sure everything works, send a POST request (using curl, Postman etc.) to your private endpoint.

You can grab a test token from Auth0. Make sure to provide your token in the headers like so:

```
"Authorization": "Bearer YOUR_TOKEN"
```
