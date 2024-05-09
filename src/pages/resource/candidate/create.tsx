import React from "react";
import { Button, Col, Divider, Form, Row, Space } from "antd";
import FormBuilder from "antd-form-builder";
import { meta } from "@/forms/resource/candidate";
import { useNavigate } from "react-router-dom";
import http from "@/services/http.service";
import { resource } from "@mobicom/tmf-dti";
import notifyService from "@/services/notify.service";
import { getValidForToObject } from "@/constants/converter";

const Component: React.FC = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const handleSubmit = async (req: resource.Candidate) => {
    req["@type"] = "@ResourceCandidate";
    req.validFor = getValidForToObject(req.validFor) ?? {};
    const reqData = { data: req };
    try {
      const resp = await http.post<resource.Candidate>(
        "/resource-catalog/candidate",
        reqData
      );
      notifyService.success(`Candidate successfully created`);
      navigate(`/resource/candidate/${resp.id}`);
    } catch (error: any) {
      notifyService.error(error.message);
    }
  };

  const goBack = () => {
    navigate("/resource/candidate");
  };

  return (
    <>
      <h2>Create candidate</h2>
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
