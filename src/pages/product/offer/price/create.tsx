import React from "react";
import { Button, Col, Divider, Form, Row, Space } from "antd";
import FormBuilder from "antd-form-builder";
import { useNavigate } from "react-router-dom";
import http from "@/services/http.service";
import { product } from "@mobicom/tmf-dti";
import { meta } from "@/forms/product/offer/price";
import notifyService from "@/services/notify.service";

const Component: React.FC = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const handleSubmit = async (req: product.ProductOfferingPrice) => {
    const reqData = { data: req };
    try {
      const resp = await http.post<product.ProductOfferingPrice>(
        "/product-catalog/offering-price",
        reqData
      );
      notifyService.success("Successfully");
      navigate(`/product/offer-price/${resp.id}`);
    } catch (error: any) {
      notifyService.error(error.message);
    }
  };

  const goBack = () => {
    navigate("/product/offer-price");
  };

  return (
    <Row>
      <Col>Product Offering Price - Create</Col>
      <Divider />
      <Col span={16}>
        <Form form={form} onFinish={handleSubmit}>
          <FormBuilder form={form} meta={meta} />
          <Divider />
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
