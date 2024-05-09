import React from "react";
import { Button, Col, Divider, Form, Row, Space } from "antd";
import FormBuilder from "antd-form-builder";
import { useNavigate } from "react-router-dom";
import http from "@/services/http.service";
import { product } from "@mobicom/tmf-dti";
import notifyService from "@/services/notify.service";
import { meta } from "@/forms/product/offer/offer";
import { getValidForToObject } from "@/constants/converter";

const Component: React.FC = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const handleSubmit = async (req: product.ProductOffering) => {
    try {
      req.validFor = getValidForToObject(req.validFor) ?? {};
      const reqData = { data: req };
      const resp = await http.post<product.ProductOffering>(
        "/product-catalog/offering",
        reqData
      );
      notifyService.success("Success");
      navigate(`/product/offer/${resp.id}`);
    } catch (error: any) {
      notifyService.error(error.message);
    }
  };

  const goBack = () => {
    navigate("/product/offer");
  };

  return (
    <Row>
      <Col>Create Product Offering</Col>
      <Divider />
      <Col span={16}>
        <Form form={form} onFinish={handleSubmit}>
          <FormBuilder form={form} meta={meta} />
          <Form.Item wrapperCol={{ span: 10, offset: 8 }}>
            <Divider />
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
  );
};

export default Component;
