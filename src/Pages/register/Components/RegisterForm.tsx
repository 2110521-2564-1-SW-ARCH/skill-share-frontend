import "../index.css";
import { Form, Input, Button, message } from "antd";
import { UserOutlined, LockOutlined, MailOutlined } from "@ant-design/icons";
import { FaRegIdCard } from "react-icons/fa";
import { BiPhone } from "react-icons/bi";
import { useState } from "react";

const RegisterForm = (props: any) => {
  const { handleRegister, history, ...prop } = props;
  const [isLoading, setIsloading] = useState(false);
  const [setError, setIsError] = useState(false);

  const onFinish = (values: any) => {
    setIsloading(true);
    handleRegister(values)
      .then((res: any) => {
        if (res) {
          console.log(res);
          console.log("Register success!");
          history.push("/login");
        }
      })
      .catch((err: any) => {
        console.log(err);
        message.error("Username is existing. Please change your username.");
        setIsloading(false);
        setIsError(true);
      });
  };

  return (
    <Form name="register" id="register-form" onFinish={onFinish}>
      <Form.Item
        name="username"
        rules={[
          {
            required: true,
            message: "Username cannot be blank!",
          },
        ]}
      >
        <Input
          size="large"
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="Username"
        />
      </Form.Item>

      <Form.Item
        name="email"
        rules={[
          {
            required: true,
            message: "Email cannot be blank!",
          },
        ]}
      >
        <Input
          size="large"
          prefix={<MailOutlined className="site-form-item-icon" />}
          placeholder="Email"
        />
      </Form.Item>

      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: "Password cannot be blank!",
          },
        ]}
      >
        <Input
          size="large"
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>
      <Form.Item
        name="fname"
        rules={[
          {
            required: true,
            message: "First name cannot be blank!",
          },
        ]}
      >
        <Input
          size="large"
          prefix={<FaRegIdCard className="site-form-item-icon" />}
          type="text"
          placeholder="First name"
        />
      </Form.Item>
      <Form.Item
        name="lname"
        rules={[
          {
            required: true,
            message: "Last name cannot be blank!",
          },
        ]}
      >
        <Input
          size="large"
          prefix={<FaRegIdCard className="site-form-item-icon" />}
          type="text"
          placeholder="Last name"
        />
      </Form.Item>
      <Form.Item
        name="tel"
        rules={[
          {
            required: true,
            message: "Telephone number cannot be blank!",
          },
        ]}
      >
        <Input
          size="large"
          prefix={<BiPhone className="site-form-item-icon" />}
          type="tel"
          placeholder="Telephone number"
        />
      </Form.Item>

      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          size="large"
          className="register-form-button"
          loading={isLoading}
        >
          Sign up
        </Button>
      </Form.Item>
    </Form>
  );
};

export default RegisterForm;
