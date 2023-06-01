export const PipelineConfigXml = (sanitizedJenkinsfile:string)=>{
  return `<flow-definition plugin="workflow-job@1292.v27d8cc3e2602">
  <script type="module" src="chrome-extension://iladajdkobpmadjfpeginhngnneaoefi/document.js"/>
  <actions>
  <org.jenkinsci.plugins.pipeline.modeldefinition.actions.DeclarativeJobAction plugin="pipeline-model-definition@2.2131.vb_9788088fdb_5"/>
  <org.jenkinsci.plugins.pipeline.modeldefinition.actions.DeclarativeJobPropertyTrackerAction plugin="pipeline-model-definition@2.2131.vb_9788088fdb_5">
  <jobProperties/>
  <triggers/>
  <parameters/>
  <options/>
  </org.jenkinsci.plugins.pipeline.modeldefinition.actions.DeclarativeJobPropertyTrackerAction>
  </actions>
  <description/>
  <keepDependencies>false</keepDependencies>
  <properties>
  <com.dabsquared.gitlabjenkins.connection.GitLabConnectionProperty plugin="gitlab-plugin@1.7.12">
  <gitLabConnection/>
  <jobCredentialId/>
  <useAlternativeCredential>false</useAlternativeCredential>
  </com.dabsquared.gitlabjenkins.connection.GitLabConnectionProperty>
  <org.jenkinsci.plugins.workflow.job.properties.PipelineTriggersJobProperty>
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
  <triggerOpenMergeRequestOnPush>source</triggerOpenMergeRequestOnPush>
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
  <secretToken>{AQAAABAAAAAQDjxbDRr9VBir0WQTiRnmxZKNje1/ahXGOVOct0TctEM=}</secretToken>
  <pendingBuildName/>
  <cancelPendingBuildsOnUpdate>false</cancelPendingBuildsOnUpdate>
  </com.dabsquared.gitlabjenkins.GitLabPushTrigger>
  </triggers>
  </org.jenkinsci.plugins.workflow.job.properties.PipelineTriggersJobProperty>
  </properties>
  <definition class="org.jenkinsci.plugins.workflow.cps.CpsFlowDefinition" plugin="workflow-cps@3659.v582dc37621d8">
  <script>${sanitizedJenkinsfile}</script>
  <sandbox>true</sandbox>
  </definition>
  <triggers/>
  <disabled>false</disabled>
  </flow-definition>`
}

