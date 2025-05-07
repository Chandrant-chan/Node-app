pipeline {
    agent any
    environment {
        // Define environment variables
        NODE_VERSION = '18'
        DOCKER_REGISTRY = 'your-docker-registry'
        DOCKER_IMAGE = "${DOCKER_REGISTRY}/node-app:${env.BUILD_NUMBER}"
        DEPLOY_SERVER = 'your-deploy-server'
        DEPLOY_USER = 'deploy-user'
        DEPLOY_PATH = '/path/to/deployment'
    }
    stages {
        stage('Checkout') {
            steps {
                // Checkout code from SCM
                checkout scm
            }
        }
        stage('Setup Node.js') {
            steps {
                // Install specified Node.js version
                sh "curl -fsSL https://deb.nodesource.com/setup_${NODE_VERSION}.x | bash -"
                sh 'apt-get install -y nodejs'
                sh 'node --version'
                sh 'npm --version'
            }
        }
        stage('Install Dependencies') {
            steps {
                // Install npm dependencies
                sh 'npm ci'
            }
        }
        stage('Run Tests') {
            steps {
                // Run unit tests
                sh 'npm test'
            }
        }
        stage('Build') {
            steps {
                // Build the application
                sh 'npm run build'
            }
        }
        stage('Build Docker Image') {
            steps {
                // Build and tag Docker image
                sh "docker build -t ${DOCKER_IMAGE} ."
            }
        }
        stage('Push Docker Image') {
            steps {
                // Login to Docker registry and push image
                withCredentials([usernamePassword(credentialsId: 'docker-registry-credentials', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                    sh "echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin ${DOCKER_REGISTRY}"
                    sh "docker push ${DOCKER_IMAGE}"
                }
            }
        }
        stage('Deploy') {
            steps {
                // Deploy to remote server using SSH
                withCredentials([sshUserPrivateKey(credentialsId: 'deploy-server-ssh', keyFileVariable: 'SSH_KEY', usernameVariable: 'DEPLOY_USER')]) {
                    sh """
                        ssh -i $SSH_KEY -o StrictHostKeyChecking=no ${DEPLOY_USER}@${DEPLOY_SERVER} << 'EOF'
                            docker pull ${DOCKER_IMAGE}
                            docker stop node-app || true
                            docker rm node-app || true
                            docker run -d --name node-app -p 80:3000 ${DOCKER_IMAGE}
                        EOF
                    """
                }
            }
        }
    }
    post {
        always {
            // Clean up workspace
            cleanWs()
        }
        success {
            // Notify on successful build
            echo 'Build and deployment successful!'
        }
        failure {
            // Notify on failed build
            echo 'Build or deployment failed!'
        }
    }
}
