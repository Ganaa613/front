import React from "react";
import { Button, Col, Divider, Form, Row, Space } from "antd";
import FormBuilder from "antd-form-builder";
import { meta } from "@/forms/product/catalog";
import { useNavigate } from "react-router-dom";
import http from "@/services/http.service";
import { product } from "@mobicom/tmf-dti";
import notifyService from "@/services/notify.service";
import { getValidForToObject } from "@/constants/converter";

const Component: React.FC = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const handleSubmit = async (data: product.Catalog) => {
    data["@type"] = "@Catalog";
    data.validFor = getValidForToObject(data.validFor);
    try {
      const resp = await http.post<product.Catalog>(
        "/product-catalog/catalog",
        {
          data,
        }
      );
      notifyService.success(`catalog successfully created`);
      navigate(`/product/catalog/${resp.id}`);
    } catch (error: any) {
      notifyService.error(error.message);
    }
  };

  const goBack = () => {
    navigate("/product/catalog");
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
