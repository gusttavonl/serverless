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
