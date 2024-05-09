import React from "react";
import { Button, Col, Divider, Form, Row, Space } from "antd";
import FormBuilder from "antd-form-builder";
import { meta } from "@/forms/resource/catalog";
import { useNavigate } from "react-router-dom";
import http from "@/services/http.service";
import { resource } from "@mobicom/tmf-dti";
import notifyService from "@/services/notify.service";
import { getValidForToObject } from "@/constants/converter";

const Component: React.FC = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const handleSubmit = async (req: resource.Catalog) => {
    req["@type"] = "@ResourceCatalog";
    req.validFor = getValidForToObject(req.validFor) ?? {};
    const reqData = { data: req };
    try {
      const resp = await http.post<resource.Catalog>(
        "/resource-catalog/catalog",
        reqData
      );
      notifyService.success(`Resource catalog successfully created`);
      navigate(`/resource/catalog/${resp.id}`);
    } catch (error: any) {
      notifyService.error(error.message);
    }
  };

  const goBack = () => {
    navigate("/resource/catalog");
  };

  return (
    <>
      <h2>Create catalog</h2>
      <Divider />
      <Row>
        <Col span={16}>
          <Form form={form} onFinish={handleSubmit}>
            <FormBuilder form={form} meta={meta} />
            <Divider />
            <Form.Item wrapperCol={{ span: 10, offset: 8 }}>
              <Space>
                <Button type="default" onClick={goBack}>
                  Cancel
                </Button>
                <Button type="primary" htmlType="submit">
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
