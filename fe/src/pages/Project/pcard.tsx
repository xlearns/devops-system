import { CheckCard } from "@ant-design/pro-components";
import { useModel } from "@umijs/max";
import { Drawer, Row } from "antd";
import { useEffect, useState } from "react";
import type { CheckGroupValueType } from "@ant-design/pro-card/es/components/CheckCard/Group";
import { IProject } from "@/models/global";
import Define from "./define";

interface IPcard {
  list: JSX.Element | JSX.Element[];
}

function useActive() {
  const { project, setProject } = useModel("global");
  const [activeIndex, setActiveIndex] = useState<CheckGroupValueType>();
  const [active, setActive] = useState<IProject>();

  useEffect(() => {
    if (typeof activeIndex == "number") {
      setActive(project[activeIndex]);
    } else {
      setActive(() => ({}));
    }
  }, [activeIndex]);

  return {
    active,
    activeIndex,
    setActiveIndex,
  };
}

const Pcard: React.FC<IPcard> = ({ list }) => {
  const [open, setOpen] = useState(false);
  const { active, activeIndex, setActiveIndex } = useActive();

  const onClose = () => {
    setOpen(false);
    setActiveIndex(undefined);
  };

  const changeStatusDrawer = (state: boolean) => {
    setOpen(state);
  };

  return (
    <>
      <Drawer
        title={active ? active.name : ""}
        width={736}
        closable={false}
        onClose={onClose}
        open={open}
      >
        {active && <Define content={active} />}
      </Drawer>
      <CheckCard.Group
        value={activeIndex}
        onChange={(value) => {
          changeStatusDrawer(typeof value == "number");
          setActiveIndex(value);
        }}
      >
        <Row gutter={[20, 20]}>{list}</Row>
      </CheckCard.Group>
    </>
  );
};

export default Pcard;
