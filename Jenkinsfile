pipeline {
    agent any

    environment {
        DOCKER_IMAGE = "devops-app"
        DOCKER_CONTAINER = "my-app-container"
    }

    stages {
        stage('Checkout') {
            steps {
                echo "Checking out the code..."
                checkout scm
            }
        }

        stage('Build') {
            steps {
                echo "Installing dependencies and building app..."
                sh 'npm install'
                sh 'npm run build'
            }
        }

        stage('Dockerize') {
            steps {
                echo "Building Docker image..."
                sh "docker build -t ${DOCKER_IMAGE} ."
            }
        }

        stage('Run Docker Container') {
            steps {
                echo "Running Docker container..."
                sh "docker rm -f ${DOCKER_CONTAINER} || true"
                sh "docker run -d -p 3000:8000 --name ${DOCKER_CONTAINER} ${DOCKER_IMAGE}"
            }
        }

        stage('Test') {
            steps {
                echo "Running tests..."
                sh "npm test"
            }
        }
    }

    post {
        success {
            echo '✅ Pipeline completed successfully!'
        }
        failure {
            echo '❌ Pipeline failed!'
        }
    }
}
