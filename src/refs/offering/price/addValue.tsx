import React, { useEffect, useState } from "react";
import FormBuilder from "antd-form-builder";
import { meta, editMeta } from "@/forms/product/offer/price";
import { Button, Divider, Form, Row } from "antd";
import { product } from "@mobicom/tmf-dti";
import { getUuid, getValidForToObject } from "@/constants/converter";

type ComponentProps = {
  item?: product.ProductOfferingPrice;
  editItem?: (item: product.ProductOfferingPrice) => void;
  onAdd: (item: product.ProductOfferingPrice) => void;
  onCancel: () => void;
};

const Component: React.FC<ComponentProps> = ({
  onAdd,
  onCancel,
  item,
  editItem,
}) => {
  const [form] = Form.useForm();
  const [mode, setMode] = useState<"add" | "edit">("add");

  useEffect(() => {
    setMode(item ? "edit" : "add");

    form.setFieldsValue(item);
  });

  const cancel = () => {
    form.resetFields();
    onCancel();
  };

  const onSubmit = (value: product.ProductOfferingPrice) => {
    console.log("onSubmit: ", mode, value, editItem);
    value.validFor = getValidForToObject(value.validFor) ?? {};
    if (mode === "edit" && editItem) {
      editItem(value);
    } else {
      value.id = getUuid();
      onAdd(value);
    }
    form.resetFields();
  };

  return (
    <>
      <h3>Product Offering Price</h3>
      <Divider />
      <Form form={form} onFinish={onSubmit}>
        <FormBuilder form={form} meta={mode === "edit" ? editMeta : meta} />
        <Divider />
        <Row justify="end">
          <Button type="default" onClick={cancel}>
            Cancel
          </Button>
          <Button htmlType="submit" type="primary">
            Save
          </Button>
        </Row>
      </Form>
    </>
  );
};

export default Component;
