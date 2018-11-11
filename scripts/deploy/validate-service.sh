### https://github.com/aws/aws-codedeploy-agent/issues/32 ###
# schedule codedeploy-agent to restart in 2 minutes
echo "service codedeploy-agent restart" | at -M now + 2 minute;

# verify task is scheduled
atq;
