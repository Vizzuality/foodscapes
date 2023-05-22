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
                "awslogs-region": "${AWS_REGION}",
                "awslogs-group": "tiler",
                "awslogs-stream-prefix": "tiler",
                "awslogs-create-group": "true"
                }
            },
            "portMappings": [
                {
                    "containerPort": 3000,
                    "hostPort": 3000,
                    "protocol": "tcp"
                }
            ],
            "environment": [
                {
                    "name": "TILER_ROOT_PATH",
                    "value": "/tiler"
                }
            ]
        }
    ],
    "networkMode": "awsvpc",
    "memory": "2 GB",
    "cpu": "1 vCPU",
    "executionRoleArn": "${AWS_ECS_EXECUTION_ROLE_ARN}"
}
