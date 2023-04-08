import { FC, useState } from "react";
import { Button, Divider, Layout, MenuProps } from "antd";
import { Menu } from "antd";
import { useNavigate } from "react-router-dom";
import Sider from "antd/es/layout/Sider";
import { observer } from "mobx-react-lite";
import { LogoutOutlined } from "@ant-design/icons";
import { Content } from "antd/es/layout/layout";
import { Objects } from "../components/Objects";
import { ObjectRequestPopup } from "../components/ObjectRequestPopup";

const menuItems: MenuProps["items"] = [
  {
    label: "Повестки",
    key: "1",
  },
  {
    label: "Реестр объектов",
    key: "2",
  },
  {
    label: "Решения",
    key: "3",
  },
  {
    label: "Запросы ОН",
    key: "4",
  },
];

export const Home: FC = observer(() => {
  // const navigate = useNavigate();
  const [activeTabKey, setActiveTabKey] = useState("1");
  const [isObjectRequestPopupOpen, setIsObjectRequestPopupOpen] =
    useState(false);

  // useEffect(() => {
  //   if (!localStorage.getItem("userData")) {
  //     navigate("/auth");
  //   }
  // }, [navigate]);

  return (
    <Layout style={{ height: "100vh" }}>
      <Sider theme="light" style={{ padding: "0 20px" }} width={300}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
            alignItems: "center",
            gap: 30,
          }}
        >
          <h4>Пользователь</h4>

          <Button danger>
            <LogoutOutlined />
          </Button>
        </div>

        <Divider />

        <Menu
          mode="inline"
          items={menuItems}
          defaultSelectedKeys={["1"]}
          onClick={(e) => {
            setActiveTabKey(e.key);
          }}
        />

        <Divider />

        <Button
          type="primary"
          size="large"
          style={{ width: "100%" }}
          onClick={() => setIsObjectRequestPopupOpen(true)}
        >
          Сформировать заявку
        </Button>

        <ObjectRequestPopup
          isOpen={isObjectRequestPopupOpen}
          setIsOpen={setIsObjectRequestPopupOpen}
        />
      </Sider>
      <Content>{activeTabKey === "2" && <Objects />}</Content>
    </Layout>
  );
});
