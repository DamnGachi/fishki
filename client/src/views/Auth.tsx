import React, { useEffect } from "react";
import { Button, Form, Input, message } from "antd";
import { useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";
import axios from "axios";
import appState from "../store/appState";

interface IFormValues {
  email: string;
  password: string;
}

interface IAuthResponse {
  id: number;
  role: {
    id: number;
  };
}

export const Auth: React.FC = observer(() => {
  const navigate = useNavigate();

  const onFinish = async (values: IFormValues) => {
    try {
      const authRequest = await axios.post<IAuthResponse>(
        "http://127.0.0.1:8090/api/service/auth/",
        {
          ...values,
        }
      );

      if (authRequest.status === 200) {
        localStorage.setItem("userId", `${authRequest.data.id}`);
        localStorage.setItem("userRoleId", `${authRequest.data.role.id}`);
        appState.setUserId(authRequest.data.id);
        appState.setUserRoleId(authRequest.data.role.id);
        navigate("/");
      } else {
        message.error("Данные некорректны");
      }
    } catch {
      message.error("Ошибка авторизации");
    }
  };

  useEffect(() => {
    if (localStorage.getItem("userId")) {
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
          name="email"
          rules={[{ required: true, message: "Поле обязательно" }]}
          label={"Email"}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Поле обязательно" }]}
          label={"Пароль"}
        >
          <Input.Password />
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
