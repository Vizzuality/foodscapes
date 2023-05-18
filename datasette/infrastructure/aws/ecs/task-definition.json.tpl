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
                "awslogs-region": "${AWS_REGION}",
                "awslogs-group": "datasette",
                "awslogs-stream-prefix": "datasette",
                "awslogs-create-group": "true"
                }
            },
            "portMappings": [
                {
                    "containerPort": 3000,
                    "hostPort": 3000,
                    "protocol": "tcp"
                }
            ]
        }
    ],
    "networkMode": "awsvpc",
    "memory": "2 GB",
    "cpu": "1 vCPU",
    "executionRoleArn": "${AWS_ECS_EXECUTION_ROLE_ARN}"
}
