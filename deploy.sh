# usage:
# ./deploy.sh 123.123.123.123 user ~/.ssh/somekey.pem

# HOST=your.remote.host.address
# USER=your.user.name.in.the.remote.host
# SSHKEY=your.ssh-key.path.in.your.localhost
#       ~/.ssh/somekey.pem

HOST=${1}
USER=${2}
SSHKEY=${3}

scp -r -i ${SSHKEY} ./src ${USER}@${HOST}:/home/${USER}/work/zktube-homepage/
scp -r -i ${SSHKEY} ./public ${USER}@${HOST}:/home/${USER}/work/zktube-fe/

