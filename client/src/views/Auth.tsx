import React, { useEffect } from "react";
import { Button, Form, Input, message } from "antd";
import { useNavigate } from "react-router-dom";
import appState from "../store/appState";
import { observer } from "mobx-react-lite";
import axios from "axios";

interface IFormValues {
  login: string;
}

interface IAuthResponse {
  success: true;
  role: string;
}

export const Auth: React.FC = observer(() => {
  const navigate = useNavigate();

  const onFinish = async (values: IFormValues) => {
    // appState.setUserRole(values.role);

    // if (values.id) {
    //   appState.setUserId(values.id);
    // }

    // localStorage.setItem("userData", JSON.stringify(values));
    // navigate("/");

    try {
      const authRequest = await axios.post<IAuthResponse>("asdfasdf", {
        login: values.login,
      });

      if (authRequest.data.success) {
        navigate("/");
      } else {
        message.error("Данные некорректны");
      }
    } catch {
      message.error("Ошибка авторизации");
    }
  };

  useEffect(() => {
    if (localStorage.getItem("userData")) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
      }}
    >
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ width: 500 }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          name="login"
          rules={[{ required: true, message: "Поле обязательно" }]}
          label={"Логин"}
        >
          <Input />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Подтвердить
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
});
