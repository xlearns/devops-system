export const PipelineConfigXml = ({ code, branch, gitlab }) => {
  return `<project>
  <script type="text/javascript" src="chrome-extension://iladajdkobpmadjfpeginhngnneaoefi/document.js"/>
  <actions/>
  <description/>
  <keepDependencies>false</keepDependencies>
  <properties>
  <com.dabsquared.gitlabjenkins.connection.GitLabConnectionProperty plugin="gitlab-plugin@1.7.12">
  <gitLabConnection/>
  <jobCredentialId/>
  <useAlternativeCredential>false</useAlternativeCredential>
  </com.dabsquared.gitlabjenkins.connection.GitLabConnectionProperty>
  </properties>
  <scm class="hudson.plugins.git.GitSCM" plugin="git@5.0.1">
  <configVersion>2</configVersion>
  <userRemoteConfigs>
  <hudson.plugins.git.UserRemoteConfig>
  <url>${gitlab.url}</url>
  <credentialsId>jenkins-token</credentialsId>
  </hudson.plugins.git.UserRemoteConfig>
  </userRemoteConfigs>
  <branches>
  <hudson.plugins.git.BranchSpec>
  <name>*/${branch || 'master'}</name>
  </hudson.plugins.git.BranchSpec>
  </branches>
  <doGenerateSubmoduleConfigurations>false</doGenerateSubmoduleConfigurations>
  <submoduleCfg class="empty-list"/>
  <extensions/>
  </scm>
  <canRoam>true</canRoam>
  <disabled>false</disabled>
  <blockBuildWhenDownstreamBuilding>false</blockBuildWhenDownstreamBuilding>
  <blockBuildWhenUpstreamBuilding>false</blockBuildWhenUpstreamBuilding>
  <triggers>
  <com.dabsquared.gitlabjenkins.GitLabPushTrigger plugin="gitlab-plugin@1.7.12">
  <spec/>
  <triggerOnPush>true</triggerOnPush>
  <triggerToBranchDeleteRequest>false</triggerToBranchDeleteRequest>
  <triggerOnMergeRequest>true</triggerOnMergeRequest>
  <triggerOnlyIfNewCommitsPushed>false</triggerOnlyIfNewCommitsPushed>
  <triggerOnPipelineEvent>false</triggerOnPipelineEvent>
  <triggerOnAcceptedMergeRequest>false</triggerOnAcceptedMergeRequest>
  <triggerOnClosedMergeRequest>false</triggerOnClosedMergeRequest>
  <triggerOnApprovedMergeRequest>true</triggerOnApprovedMergeRequest>
  <triggerOpenMergeRequestOnPush>never</triggerOpenMergeRequestOnPush>
  <triggerOnNoteRequest>true</triggerOnNoteRequest>
  <noteRegex>Jenkins please retry a build</noteRegex>
  <ciSkip>true</ciSkip>
  <skipWorkInProgressMergeRequest>true</skipWorkInProgressMergeRequest>
  <labelsThatForcesBuildIfAdded/>
  <setBuildDescription>true</setBuildDescription>
  <branchFilterType>All</branchFilterType>
  <includeBranchesSpec/>
  <excludeBranchesSpec/>
  <sourceBranchRegex/>
  <targetBranchRegex/>
  <secretToken>{AQAAABAAAAAQ959j6uWHCg8omc/Eg92JHdV1YGU0424Ud6fTR8qQOyA=}</secretToken>
  <pendingBuildName/>
  <cancelPendingBuildsOnUpdate>false</cancelPendingBuildsOnUpdate>
  </com.dabsquared.gitlabjenkins.GitLabPushTrigger>
  </triggers>
  <concurrentBuild>false</concurrentBuild>
  <builders>
  <hudson.tasks.Shell>
  <command>${code}</command>
  <configuredLocalRules/>
  </hudson.tasks.Shell>
  </builders>
  <publishers>
  <org.jenkinsci.plugins.qywechat.QyWechatNotification plugin="qy-wechat-notification@1.1.3">
  <webhookUrl></webhookUrl>
  <mentionedId/>
  <mentionedMobile/>
  <moreInfo/>
  <failNotify>false</failNotify>
  <onlyFailSendQyWechatNotify>false</onlyFailSendQyWechatNotify>
  </org.jenkinsci.plugins.qywechat.QyWechatNotification>
  </publishers>
  <buildWrappers/>
  </project>`;
};
