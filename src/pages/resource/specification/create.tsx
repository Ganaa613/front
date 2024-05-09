import React from "react";
import { Button, Col, Divider, Form, Row, Space } from "antd";
import FormBuilder from "antd-form-builder";
import { useNavigate } from "react-router-dom";
import http from "@/services/http.service";
import { resource } from "@mobicom/tmf-dti";
import { meta } from "@/forms/resource/specification";
import notifyService from "@/services/notify.service";
import { getValidForToObject } from "@/constants/converter";

const Component: React.FC = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const handleSubmit = async (req: resource.Specification) => {
    req["@type"] = "@ResourceSpecification";
    req.validFor = getValidForToObject(req.validFor) ?? {};
    const reqData = { data: req };
    console.log("reqData", reqData);
    try {
      const resp = await http.post<resource.Specification>(
        "/resource-catalog/specification",
        reqData
      );
      notifyService.success(`${resp.name} specification successfully created`);
      navigate(`/resource/specification/${resp.id}`);
    } catch (error: any) {
      notifyService.error(error.message);
    }
  };

  const goBack = () => {
    navigate("/resource/specification");
  };

  return (
    <>
      <h2>Create specification</h2>
      <Divider />
      <Row align={"middle"} justify={"center"}>
        <Col span={20}>
          <Form form={form} onFinish={handleSubmit}>
            <FormBuilder form={form} meta={meta} />
            <Divider />
            <Form.Item wrapperCol={{ span: 20, offset: 10 }}>
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
