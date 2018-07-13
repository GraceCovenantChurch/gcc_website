source /home/ec2-user/.bash_profile
cd /home/ec2-user/gcc_website

# https://github.com/aws/aws-codedeploy-agent/issues/118
npm run serve >stdout.log 2>stderr.log &
