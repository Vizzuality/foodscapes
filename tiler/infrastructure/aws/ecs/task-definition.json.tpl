{
    "requiresCompatibilities": [
        "FARGATE"
    ],
    "family": "tiler",
    "containerDefinitions": [
        {
            "name": "${CONTAINER_NAME}",
            "image": "",
            "essential": true,
            "logConfiguration": {
                "logDriver": "awslogs",
                "options": {
                "awslogs-region": "${AWS_REGION}",
                "awslogs-group": "${CONTAINER_NAME}",
                "awslogs-stream-prefix": "tiler"
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
