{
    "requiresCompatibilities": [
        "FARGATE"
    ],
    "family": "tiler",
    "containerDefinitions": [
        {
            "name": "tiler",
            "image": "",
            "essential": true,
            "logConfiguration": {
                "logDriver": "awslogs",
                "options": {
                "awslogs-region": "eu-west-3",
                "awslogs-group": "tiler",
                "awslogs-stream-prefix": "tiler",
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
