{
    "requiresCompatibilities": [
        "FARGATE"
    ],
    "family": "datasette",
    "containerDefinitions": [
        {
            "name": "datasette",
            "image": "",
            "essential": true,
            "logConfiguration": {
                "logDriver": "awslogs",
                "options": {
                "awslogs-region": "eu-west-3",
                "awslogs-group": "datasette",
                "awslogs-stream-prefix": "datasette",
                "awslogs-create-group": "true"
                }
            }
        }
    ],
    "networkMode": "awsvpc",
    "memory": "2 GB",
    "cpu": "1 vCPU",
    "executionRoleArn": "$AWS_ECS_EXECUTION_ROLE_ARN"
}
