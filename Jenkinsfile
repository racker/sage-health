// -*- mode: groovy -*-
// vi: set ft=groovy :

node('docker') {
    stage 'checkout'
    checkout scm

    // Get the SHA from Git.
    sh 'git rev-parse HEAD > GIT_COMMIT'
    git_sha = readFile('GIT_COMMIT')
    short_sha = git_sha.substring(0, 7)

    sh 'git clean -fdx'

    def image = 'rackspace_mmi/sage-health'
    def tag   = "jenkins-${short_sha}-${env.BUILD_NUMBER}"

    stage 'build'
    def logstash = docker.build("${image}:${tag}")

    logstash.inside('-u root:root') {
        stage 'test'
        wrap([$class: 'AnsiColorBuildWrapper']) {
            sh 'jshint .'
        }
    }

    // If this is a build of master, tag and push the image to Quay.
    if (env.BRANCH_NAME == 'master') {
        stage 'push'
        docker.withRegistry('https://quay.io/', 'quay-io-push') {
            // Tag the image with the SHA and 'latest' in Quay.
            logstash.push(short_sha)
            logstash.push('latest')
        }
    }
}
