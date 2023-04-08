import { FC, useEffect, useState } from "react";
import { Button, Divider, Layout, MenuProps } from "antd";
import { Menu } from "antd";
import { useNavigate } from "react-router-dom";
import Sider from "antd/es/layout/Sider";
import { observer } from "mobx-react-lite";
import { LogoutOutlined } from "@ant-design/icons";
import { Content } from "antd/es/layout/layout";
import { Registry } from "../components/Registry";
import { ObjectRequestPopup } from "../components/ObjectRequestPopup";
import appState from "../store/appState";

const adminMenuItems: MenuProps["items"] = [
  {
    label: "Реестр объектов",
    key: "registry",
  },
  {
    label: "Повестки",
    key: "2",
  },
  {
    label: "Рабочие группы",
    key: "3",
  },
  {
    label: "Запросы ОН",
    key: "4",
  },
];

const userMenuItems: MenuProps["items"] = [
  {
    label: "Реестр объектов",
    key: "registry",
  },
  {
    label: "Запросы ОН",
    key: "2",
  },
];

export const Home: FC = observer(() => {
  const navigate = useNavigate();
  const [activeTabKey, setActiveTabKey] = useState("registry");
  const [isObjectRequestPopupOpen, setIsObjectRequestPopupOpen] =
    useState(false);

  useEffect(() => {
    if (!localStorage.getItem("userId")) {
      navigate("/auth/");
    }
  }, [navigate]);

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
          <h4>{appState.checkIsAdmin() ? "Администратор" : "Пользователь"}</h4>

          <Button
            danger
            onClick={() => {
              localStorage.removeItem("userId");
              localStorage.removeItem("userRoleId");
              appState.clearUser();
              navigate("/auth/");
            }}
          >
            <LogoutOutlined />
          </Button>
        </div>

        <Divider />

        <Menu
          mode="inline"
          items={appState.checkIsAdmin() ? adminMenuItems : userMenuItems}
          onClick={(e) => {
            setActiveTabKey(e.key);
          }}
          defaultSelectedKeys={["registry"]}
        />

        <Divider />

        {!appState.checkIsAdmin() && (
          <>
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
          </>
        )}
      </Sider>
      <Content>{activeTabKey === "registry" && <Registry />}</Content>
    </Layout>
  );
});
