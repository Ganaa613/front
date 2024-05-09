import React, { useEffect, useState } from "react";
import { Button, Divider, Form, Select } from "antd";
import FormBuilder from "antd-form-builder";
import { metaParty, metaPartyRole } from "@/forms/create/related.party.form";
import { PARTY_OR_PARTY_ROLE } from "@/constants";
import { AddItemProps, EditItemProps } from "../../common/props";

type ComponentProps = {
  editProps: EditItemProps;
  addProps: AddItemProps;
};

const Component: React.FC<ComponentProps> = ({ editProps, addProps }) => {
  const [form] = Form.useForm();
  // const [mode, setMode] = useState<"add" | "edit">("add");
  const [partyType, setPartyType] = useState<"party" | "partyRole">("party");

  useEffect(() => {
    if (editProps.item) {
      // setMode("edit");
      form.setFieldsValue(editProps.item);
    } else {
      // setMode("add");
      form.setFieldsValue(undefined);
    }
  });

  const valueChange = () => {
    console.log("value change");
    setPartyType(form.getFieldValue("party"));
  };

  const onFinish = (data: any) => {
    addProps.onAdd(data);
  };

  const getTypes = () => {
    return PARTY_OR_PARTY_ROLE.map((e) => convert(e));
  };

  const convert = (value: string) => {
    return { value: value, label: value };
  };

  return (
    <>
      <h3>Related Party</h3>
      <Divider />
      <Form form={form} onFinish={onFinish}>
        <Form
          form={form}
          onFinish={addProps.onAdd}
          onValuesChange={valueChange}
        >
          <Form.Item
            wrapperCol={{ span: 16, offset: 2 }}
            name="partyType"
            label="Type"
          >
            <Select options={getTypes()} onChange={valueChange} />
          </Form.Item>
          <FormBuilder
            form={form}
            meta={partyType === "party" ? metaPartyRole : metaParty}
          />
          <Button type="default" onClick={addProps.onCancel}>
            Close
          </Button>
          <Button htmlType="submit" type="primary">
            Save
          </Button>
        </Form>
        <Divider />
      </Form>
    </>
  );
};

export default Component;
