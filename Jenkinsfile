pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                // Checkout the code from your Git repository
                git 'https://github.com/omprakashcode/test.deploy.git'
            }
        }
        
        stage('Build') {
            steps {
                // You can add build steps here if necessary
                // For a simple HTML, CSS, and JS project, you might not need this stage
            }
        }
        
        stage('Deploy') {
            steps {
                // Assuming you want to deploy to a web server
                // Copy files to the web server location
                sh 'cp -r index.html /var/www/html/'
                sh 'cp -r css /var/www/html/'
                sh 'cp -r js /var/www/html/'
                
                // Alternatively, you can use rsync or any other deployment method
            }
        }
    }
    
    post {
        always {
            // Cleanup steps, if needed
        }
    }
}
