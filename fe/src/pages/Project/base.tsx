import { ProFormSelect, ProFormText } from "@ant-design/pro-components";
import { IPort } from "./interface";
import { environments, cicdList } from "./content";
const Base: React.FC<IPort> = (props) => {
  const { serveList, gitLabList, branchList } = props;
  return (
    <>
      <ProFormText
        name="name"
        label="名称"
        placeholder="Please select"
        rules={[{ required: true }]}
      />
      <ProFormText
        name="description"
        label="描述"
        placeholder="Please select"
        rules={[{ required: true }]}
      />
      <ProFormSelect
        name="host"
        label="选择服务器"
        options={serveList.map(({ host }) => {
          return {
            label: host,
            value: host,
          };
        })}
        placeholder="Please select"
        rules={[{ required: true }]}
      />

      <ProFormSelect.SearchSelect
        mode="single"
        name="gitlab"
        label="选择gitlab仓库"
        options={gitLabList.map(({ id, name, url }) => {
          return {
            label: name,
            value: id,
            url,
          };
        })}
        fieldProps={{
          optionItemRender(item: { label: string; url: string }) {
            return (
              <div title={item.url}>
                <span style={{ color: "red" }}>{item.label}</span> - {item.url}
              </div>
            );
          },
        }}
        placeholder="Please select"
        rules={[{ required: true }]}
      />
      <ProFormSelect
        name="branch"
        label="选择分支"
        options={branchList.map(({ name, id }) => {
          return {
            label: name,
            value: id,
          };
        })}
        placeholder="Please select"
        rules={[{ required: true }]}
      />

      <ProFormSelect
        name="cicd"
        label="CI/CD"
        options={cicdList.map(({ label, value, disabled }) => {
          return {
            label,
            value,
            disabled,
          };
        })}
        placeholder="Please select"
        rules={[{ required: true }]}
      />

      {/* <ProFormSelect
        name="env"
        label="环境"
        options={environments}
        placeholder="Please select"
        rules={[{ required: true }]}
      /> */}
    </>
  );
};

export default Base;
