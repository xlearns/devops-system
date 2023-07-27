import { MenuProps } from "antd";
export const JENKINSPROJECTURL = "http://192.168.3.105:17173/project/";
export const environments = [
  {
    label: "java",
    value: "java",
  },
  {
    label: "node",
    value: "node",
  },
  {
    label: "python",
    value: "python",
  },
  {
    label: "golang",
    value: "golang",
  },
];

export const cicdList = [
  {
    label: "jenkins",
    value: "jenkins",
  },
  {
    label: "gitlab",
    value: "gitlab",
    disabled: true,
  },
];

export const columns = [
  {
    title: "项目名称",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "项目描述",
    dataIndex: "update",
    key: "update",
  },
];
export const modeItems: MenuProps["items"] = [
  {
    type: "group",
    label: "View",
    children: [
      {
        key: "card",
        label: "Cards",
      },
      {
        key: "table",
        label: "Table",
      },
    ],
  },
];

export const PipelineTemplates = (defaultCode: string) => [
  {
    name: "默认",
    template: defaultCode,
  },
  {
    name: "CICD部署",
    template: `pipeline {
        agent any
        stages {
            stage('Build') {
                steps {
                sh 'mvn clean package'
                }
            }
            stage('Deploy') {
                steps {
                  sh 'docker build -t your_image_name .'
                  sh 'docker push your_image_name'
                  sh 'ssh user@your_server "docker pull your_image_name && docker run -d --name your_container_name -p 8080:8080 your_image_name"'
                }
            }
        }
    }
      `,
  },
];
