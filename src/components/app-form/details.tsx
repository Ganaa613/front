import React from "react";
import { Button, Col, Divider, Form, Row, Space } from "antd";
import FormBuilder, { Meta } from "antd-form-builder";

type DetailProps = {
  data: any;
  meta: Meta;
  onSave: (data: any) => void;
  title?: string;
  onCancel?: () => void;
};

const Component: React.FC<DetailProps> = ({
  title,
  meta,
  data,
  onSave,
  onCancel,
}) => {
  const [form] = Form.useForm();

  const onFinish = () => {
    form.validateFields().then((values: any) => {
      onSave(values);
    });
  };

  const onReset = () => {
    form.resetFields();
  };

  return (
    <Row align={"middle"} justify={"start"}>
      {title && (
        <>
          <Col>{title}</Col>
          <Divider />
        </>
      )}
      <Col span={16}>
        <Form form={form} onFinish={onFinish}>
          <FormBuilder form={form} meta={meta} initialValues={data} />
          <Divider />
          <Form.Item wrapperCol={{ span: 10, offset: 8 }}>
            <Space>
              {onCancel && (
                <Button type="default" onClick={onCancel}>
                  Cancel
                </Button>
              )}
              <Button type="default" onClick={onReset}>
                Reset
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
