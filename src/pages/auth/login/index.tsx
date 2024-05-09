import React, { useState } from "react";
import { Button, Col, Form, Input, Row } from "antd";
import { useNavigate } from "react-router-dom";
import httpService from "@/services/http.service";
import notifyService from "@/services/notify.service";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

type IForm = {
  username: string;
  password: string;
};

const Component: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const onSubmit = async (data: IForm) => {
    try {
      setLoading(true);
      await httpService.post(`/auth/login`, { data });
      navigate("/");
    } catch (error: any) {
      notifyService.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Row align={"middle"} justify={"center"} style={{ flex: 1 }}>
      <Col span={4}>
        <Form form={form} onFinish={onSubmit} labelCol={{ span: 8 }}>
          <Form.Item
            name="username"
            label="Username"
            rules={[{ required: true }]}
          >
            <Input placeholder="Type username" prefix={<UserOutlined />} />
          </Form.Item>
          <Form.Item
            name="password"
            label="Password"
            rules={[{ required: true }]}
          >
            <Input.Password
              placeholder="Type password"
              prefix={<LockOutlined />}
            />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8 }}>
            <Button type="primary" htmlType="submit" loading={loading}>
              Log in
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
};

export default Component;
