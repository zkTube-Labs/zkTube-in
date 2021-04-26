HOST=43.128.35.243
SSHKEY=~/.ssh/ZkPayTube2021.frontend.server.pem
scp -r -i ${SSHKEY} ./src ubuntu@${HOST}:/home/ubuntu/work/zktube-fe/
