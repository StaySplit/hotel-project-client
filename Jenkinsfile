pipeline {
    agent any

    tools {
        nodejs "Node 18"
    }

    environment {
       REACT_APP_API_URL = "${env.REACT_APP_API_URL}"
        CI = "true"
        NODE_ENV = "production"
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                echo 'Installing dependencies...'
                bat '''
                    node --version
                    npm --version
                    npm ci --prefer-offline --no-audit
                '''
            }
        }

        stage('Run Lint') {
            steps {
                echo 'Running ESLint...'
                script {
                    try {
                        bat 'npm run lint'
                    } catch (Exception e) {
                        echo 'Lint failed, but continuing build...'
                        currentBuild.result = 'UNSTABLE'
                    }
                }
            }
        }

        stage('Build') {
            steps {
                echo 'Building React/Vite project...'
                bat 'npm run build'
                bat '''
                    if exist "dist" (
                        echo Build successful - dist directory created
                        dir dist
                    ) else (
                        echo Build failed - dist directory not found
                        exit 1
                    )
                '''
            }
        }

        stage('Archive Build') {
            steps {
                echo 'Archiving build artifacts...'
                archiveArtifacts artifacts: 'dist/**', fingerprint: true
                script {
                    bat '''
                        for /f %%i in ('powershell -command "(Get-ChildItem -Recurse dist | Measure-Object -Property Length -Sum).Sum / 1MB"') do echo Build size: %%i MB
                    '''
                }
            }
        }
    }
    post {
        always {
            echo 'Pipeline completed'
            // 워크스페이스 정리
            script {
                bat '''
                    if exist "node_modules" rmdir /s /q node_modules
                    if exist ".npm" rmdir /s /q .npm
                '''
            }
        }
        success {
            echo 'Build succeeded!'
            script {
                try {
                    githubNotify(
                        context: 'continuous-integration/jenkins/pr-merge',
                        description: 'Build succeeded',
                        status: 'SUCCESS',
                        targetUrl: "${env.BUILD_URL}"
                    )
                } catch (Exception e) {
                    echo "GitHub notification failed: ${e.message}"
                }
            }
        }
        failure {
            echo 'Build failed!'
            script {
                try {
                    githubNotify(
                        context: 'continuous-integration/jenkins/pr-merge',
                        description: 'Build failed',
                        status: 'FAILURE',
                        targetUrl: "${env.BUILD_URL}"
                    )
                } catch (Exception e) {
                    echo "GitHub notification failed: ${e.message}"
                }
            }
        }
        unstable {
            echo 'Build is unstable (tests or lint failed)'
        }
    }
}
