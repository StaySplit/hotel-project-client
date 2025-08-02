pipeline {
    agent any

    tools {
        nodejs "Node 18"
    }

    environment {
        REACT_APP_API_URL = "https://api.example.com"
    }

    stages {
        stage('Checkout') {
            steps {
                git url: 'https://github.com/your-org/your-react-project.git', branch: 'main'
            }
        }

        stage('Install Dependencies') {
            steps {
                bat 'npm ci'
            }
        }

        stage('Run Lint') {
            steps {
                bat 'npm run lint'
            }
        }

        stage('Build') {
            steps {
                bat 'npm run build'
            }
        }

        stage('Archive Build') {
            steps {
                archiveArtifacts artifacts: 'dist/**', fingerprint: true
            }
        }
    }
}
