import React from "react";
import { Button, Col, Divider, Form, Row, Space } from "antd";
import FormBuilder from "antd-form-builder";
import { meta } from "@/forms/resource/category";
import { useNavigate } from "react-router-dom";
import http from "@/services/http.service";
import { resource } from "@mobicom/tmf-dti";
import notifyService from "@/services/notify.service";
import { getValidForToObject } from "@/constants/converter";

const Component: React.FC = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const handleSubmit = async (req: resource.Category) => {
    req["@type"] = "@ResourceCategory";
    req.validFor = getValidForToObject(req.validFor) ?? {};
    const reqData = { data: req };
    try {
      const resp = await http.post<resource.Category>(
        "/resource-catalog/category",
        reqData
      );
      notifyService.success(`Resource category successfully created`);
      navigate(`/resource/category/${resp.id}`);
    } catch (error: any) {
      notifyService.error(error.message);
    }
  };

  const goBack = () => {
    navigate("/resource/category");
  };

  return (
    <>
      <h2>Create resource category</h2>
      <Divider />
      <Row align={"middle"} justify={"center"}>
        <Col span={16}>
          <Form form={form} onFinish={handleSubmit}>
            <FormBuilder form={form} meta={meta} />
            <Divider />
            <Form.Item wrapperCol={{ span: 10, offset: 8 }}>
              <Space>
                <Button key="add" type="default" onClick={goBack}>
                  Cancel
                </Button>
                <Button key="add" type="primary" htmlType="submit">
                  Save
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </>
  );
};

export default Component;
