pipeline {
    agent any
    environment {
        DOCKER_IMAGE = 'smart-expense-tracker'
        DOCKER_TAG = "${BUILD_NUMBER}"
        CONTAINER_NAME = 'expense-tracker-container'
        APP_PORT = '5000'
    }
    stages {
        stage('Checkout') { steps { checkout scm } }
        stage('Build') { steps { sh 'python3 -m pip install --user -r requirements.txt' } }
        stage('Test') { steps { sh 'python3 -c "import flask; print(\"Flask imported successfully\")"' } }
        stage('Docker Build') {
            steps {
                sh '''
                    docker build -t ${DOCKER_IMAGE}:${DOCKER_TAG} .
                    docker tag ${DOCKER_IMAGE}:${DOCKER_TAG} ${DOCKER_IMAGE}:latest
                '''
            }
        }
        stage('Stop Old Container') {
            steps {
                sh '''
                    docker stop ${CONTAINER_NAME} || true
                    docker rm ${CONTAINER_NAME} || true
                '''
            }
        }
        stage('Deploy') {
            steps {
                sh '''
                    docker run -d --name ${CONTAINER_NAME} -p ${APP_PORT}:5000 ${DOCKER_IMAGE}:latest
                '''
            }
        }
        stage('Verify Deployment') {
            steps {
                sh '''
                    sleep 5
                    curl -f http://localhost:${APP_PORT}/health || exit 1
                '''
            }
        }
    }
}