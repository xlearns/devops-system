import { MoreOutlined } from "@ant-design/icons";
import { Button, Dropdown, MenuProps } from "antd";
import { useState } from "react";
import { modeItems } from "./content";

export function useListType() {
  const [type, setType] = useState("card");
  const changeListType: MenuProps["onClick"] = (e) => {
    const { key } = e;
    setType(key);
  };
  return {
    changeListType,
    type,
  };
}

const Mode: React.FC<Omit<ReturnType<typeof useListType>, "type">> = ({
  changeListType,
}) => {
  return (
    <Dropdown
      trigger={["click"]}
      menu={{
        items: modeItems,
        onClick: changeListType,
        selectable: true,
        defaultSelectedKeys: ["card"],
      }}
      placement="bottomLeft"
      arrow
    >
      <Button type="primary" icon={<MoreOutlined />} />
    </Dropdown>
  );
};

export default Mode;
