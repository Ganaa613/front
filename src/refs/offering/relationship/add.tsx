import React, { useEffect, useRef, useState } from "react";
import { Button, Col, Divider, Form, Input, Radio, Row, Select } from "antd";
import httpService from "@/services/http.service";
import { product } from "@mobicom/tmf-dti";
import queryBuilder from "@/services/queryBuilder";
import { ActionType, ProColumns } from "@ant-design/pro-table";
import notifyService from "@/services/notify.service";
import AppTable from "@/components/app-table";
import { OFFER_RELATIONSHIP_TYPE } from "@/constants";
import FormBuilder from "antd-form-builder";
import { editMeta } from "@/forms/product/offer/relationship";
import { getData } from "@/constants/converter";
import { AddItemProps, EditItemProps } from "@/refs/common/props";

type ComponentProps = {
  editProps: EditItemProps;
  addProps: AddItemProps;
  items: any[];
};

const Component: React.FC<ComponentProps> = ({
  editProps,
  addProps,
  items,
}) => {
  const tableRef = useRef<ActionType>();
  const [data, setData] = useState<product.ProductOfferingRelationship>();
  const [form] = Form.useForm();
  const [mode, setMode] = useState<"add" | "edit">("add");

  useEffect(() => {
    if (editProps.item) {
      setMode("edit");
      form.setFieldsValue(getData(editProps.item));
    } else {
      setMode("add");
      form.setFieldsValue(undefined);
    }
  });

  const request = async (params: any) => {
    try {
      const queryParams = queryBuilder(params);
      const resp = await httpService.get<list.IResponse<product.Category>>(
        `/product-catalog/offering?${queryParams}`
      );

      return {
        success: true,
        data: resp.data,
        total: resp.total,
      };
    } catch (error: any) {
      notifyService.error(error.message);
      return {
        success: false,
      };
    }
  };

  const onChange = (ref: product.ProductOffering) => {
    console.log("ref: ", ref);
    const mutableRef: product.ProductOfferingRelationship = {
      "@type": "ProductOfferingRelationship",
      "@baseType": ref["@baseType"],
      "@referredType": ref["@type"],
      "@schemaLocation": ref["@schemaLocation"],
      id: ref.id,
      name: ref.name,
      version: ref.version ?? "",
      relationshipType: "",
      role: "",
      validFor: ref.validFor,
    };

    setData(mutableRef);
    form.resetFields();
  };

  const columns: ProColumns<product.ProductOffering>[] = [
    {
      key: "check",
      valueType: "radio",
      width: 30,
      render: (_, record) => (
        <Radio
          checked={data?.id === record.id}
          disabled={items.find((e) => e.id === record.id)}
          onChange={() => onChange(record)}
        />
      ),
    },
    {
      key: "id",
      title: "Id",
      dataIndex: "id",
      search: false,
      width: 150,
    },
    {
      key: "name",
      title: "Name",
      dataIndex: "name",
    },
    {
      key: "version",
      title: "Version",
      dataIndex: "version",
    },
  ];

  const onFinish = (value: any) => {
    console.log("onFinish: ", mode, value);
    if (mode === "edit" && editProps.editItem) {
      editProps.editItem(value);
    } else {
      addProps.onAdd({ ...data, ...value });
    }
    form.resetFields();
    setData(undefined);
  };
  const cancel = () => {
    form.resetFields();
    addProps.onCancel();
  };

  const getRelationshipType = () => {
    return Object.values(OFFER_RELATIONSHIP_TYPE).map((e) => convert(e));
  };

  const convert = (value: string) => {
    return { value: value, label: value };
  };

  return (
    <>
      <h3>Product Offering Relationship</h3>
      <Divider />
      <Row align={"middle"} justify={"center"}>
        <Col span={20}>
          <Form form={form} onFinish={onFinish}>
            {mode === "add" && (
              <>
                <Form.Item>
                  <AppTable
                    rowKey="id"
                    request={request}
                    columns={columns}
                    actionRef={tableRef}
                    pagination={{
                      defaultCurrent: 1,
                      defaultPageSize: 5,
                      position: ["bottomRight"],
                    }}
                  />
                </Form.Item>
                <Form.Item
                  wrapperCol={{ span: 16, offset: 2 }}
                  name="relationshipType"
                  label="Type"
                >
                  <Select options={getRelationshipType()} />
                </Form.Item>
                <Form.Item
                  wrapperCol={{ span: 16, offset: 2 }}
                  name="role"
                  label="Role"
                >
                  <Input />
                </Form.Item>
              </>
            )}
            {mode === "edit" && <FormBuilder form={form} meta={editMeta} />}
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
        </Col>
      </Row>
    </>
  );
};

export default Component;
