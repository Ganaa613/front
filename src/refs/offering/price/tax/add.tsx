import React, { useEffect, useState } from "react";
import FormBuilder from "antd-form-builder";
import { meta, editMeta } from "@/forms/create/tax.item";
import { Button, Divider, Form, Row } from "antd";
import { AddItemProps, EditItemProps } from "@/refs/common/props";

type ComponentProps = {
  editProps: EditItemProps;
  addProps: AddItemProps;
};

const Component: React.FC<ComponentProps> = ({ editProps, addProps }) => {
  const [form] = Form.useForm();
  const [mode, setMode] = useState<"add" | "edit">("add");

  useEffect(() => {
    if (editProps.item) {
      setMode("edit");
      form.setFieldsValue(editProps.item);
    } else {
      setMode("add");
      form.setFieldsValue(undefined);
    }
  });

  const cancel = () => {
    form.resetFields();
    addProps.onCancel();
  };

  const onSubmit = (value: any) => {
    if (mode === "edit" && editProps.editItem) {
      editProps.editItem(value);
    } else {
      addProps.onAdd(value);
    }
    form.resetFields();
  };

  return (
    <>
      <h3>Product Offering Term</h3>
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
