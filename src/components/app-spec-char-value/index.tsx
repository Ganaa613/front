import { useState } from "react";
import { ProColumns } from "@ant-design/pro-table";
import AppTable from "@/components/app-table";
import { Button, Col, Divider, Form, Modal, Row, Space } from "antd";
import { product } from "@mobicom/tmf-dti";
import { metaValueUse, editMetaValueUse } from "@/forms/resource/spec.char";
import FormBuilder from "antd-form-builder";
import CharValue from "./value";
import AppTableItemControll from "@/components/app-tableItem-controll";
import { getData, getUuid, getValidForToObject } from "@/constants/converter";

type ComponentProps = {
  data: any[];
  saveAction?: (data: any[]) => void;
  clickPrevious?: () => void;
};

const Component: React.FC<ComponentProps> = ({
  data,
  saveAction,
  clickPrevious,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [dataSource, setDataSource] = useState<any[]>(data);
  const [editShowModal, setEditShowModal] = useState(false);
  const [editDataSource, setEditDataSource] =
    useState<product.ProductSpecificationCharacteristicValueUse>();
  const [form] = Form.useForm();
  const [formEdit] = Form.useForm();

  const defaultColumns: ProColumns[] = [
    {
      key: "id",
      title: "Id",
      dataIndex: "id",
      search: false,
    },
    {
      key: "name",
      title: "Name",
      dataIndex: "name",
      search: false,
    },
    {
      key: "description",
      title: "Description",
      dataIndex: "description",
      search: false,
    },
    {
      key: "valueType",
      title: "Value Type",
      dataIndex: "valueType",
      search: false,
    },
    {
      key: "maxCardinality",
      title: "Max Cardinality",
      dataIndex: "maxCardinality",
      search: false,
    },
    {
      key: "minCardinality",
      title: "Min Cardinality",
      dataIndex: "minCardinality",
      search: false,
    },
    {
      key: "@type",
      title: "@type",
      dataIndex: "@type",
      search: false,
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      width: 100,
      align: "center",
      render: (_, record, index) => (
        <AppTableItemControll
          viewAction={() => editData(record)}
          deleteAction={() => onDelete(index)}
        />
      ),
    },
  ];

  // function handleDelete(item: product.ProductSpecificationCharacteristicValueUse) {
  //   setDataSource((state: product.ProductSpecificationCharacteristicValueUse[]) =>
  //     state.filter((rec) => rec.id !== item.id || rec.name !== item.name)
  //   );
  // }

  const onDelete = (index: number) => {
    setDataSource((state) => {
      return state.filter((_, i) => i !== index);
    });
  };

  function editData(item: product.ProductSpecificationCharacteristicValueUse) {
    setEditDataSource(getData(item));
    setEditShowModal(true);
  }

  const onEdit = (params: any) => {
    const mutableRef: product.ProductSpecificationCharacteristicValueUse = {
      "@type": "ProductSpecificationCharacteristicValueUse",
      productSpecCharacteristicValue: params.productSpecCharacteristicValue,
      maxCardinality: params.maxCardinality,
      minCardinality: params.minCardinality,
      description: params.description,
      name: params.name,
      id: params.id,
      validFor: getValidForToObject(params.validFor) ?? {},
      valueType: params.valueType,
    };

    setDataSource(
      (state: product.ProductSpecificationCharacteristicValueUse[]) =>
        state.map((item) =>
          item.id === params.id ? { ...item, ...mutableRef } : item
        )
    );
    setEditShowModal(false);
    form.resetFields();
  };

  const onSave = () => {
    if (saveAction) {
      saveAction(dataSource);
      data = dataSource;
    }
  };

  const onReset = () => {
    setDataSource(data);
  };

  const onClose = () => {
    setEditShowModal(false);
    setShowModal(false);
    form.resetFields();
  };

  const onChange = (params: any) => {
    const mutableRef: product.ProductSpecificationCharacteristicValueUse = {
      "@type": "ProductSpecificationCharacteristicValueUse",
      productSpecCharacteristicValue: params.productSpecCharacteristicValue,
      id: params.id ?? getUuid(),
      maxCardinality: params.maxCardinality,
      minCardinality: params.minCardinality,
      name: params.name,
      description: params.description,
      validFor: getValidForToObject(params.validFor) ?? {},
      valueType: params.valueType,
    };

    setDataSource(
      (state: product.ProductSpecificationCharacteristicValueUse[]) => [
        ...state,
        ...[mutableRef],
      ]
    );
    setShowModal(false);
    form.resetFields();
  };

  const changeCharacteristic = (
    data: product.ProductSpecificationCharacteristicValueUse
  ) => {
    setDataSource((state) => {
      return state.map((e) => {
        if (e.id === data.id) {
          return data;
        }
        return e;
      });
    });
  };

  const onClickPrevious = () => {
    if (clickPrevious) {
      clickPrevious();
    }
  };

  return (
    <>
      <AppTable
        rowKey={(record) => {
          return record.id;
        }}
        search={false}
        columns={defaultColumns}
        dataSource={dataSource}
        pagination={false}
        toolBarRender={() => [
          <Button key="add" type="primary" onClick={() => setShowModal(true)}>
            Add
          </Button>,
        ]}
        expandable={{
          expandedRowRender: (record) => (
            <CharValue data={record} saveAction={changeCharacteristic} />
          ),
        }}
      />
      <Divider />
      <Row justify="space-between">
        <Col>
          <Button type="default" onClick={onClickPrevious}>
            Previous
          </Button>
        </Col>
        <Col>
          <Space align="end">
            <Button type="default" onClick={() => onReset()}>
              Reset
            </Button>
            <Button type="primary" onClick={() => onSave()}>
              Save
            </Button>
          </Space>
        </Col>
      </Row>
      <Modal
        open={showModal}
        onOk={onChange}
        centered
        closable={false}
        width={1000}
        footer={[]}
        destroyOnClose={true}
      >
        <h3>Product Specification Characteristic Value Use</h3>
        <Divider />
        <Form form={form} onFinish={onChange}>
          <FormBuilder form={form} meta={metaValueUse} />
          <Divider />
          <Button type="default" onClick={() => onClose()}>
            Close
          </Button>
          <Button htmlType="submit" type="primary">
            Save
          </Button>
        </Form>
      </Modal>
      <Modal
        open={editShowModal}
        onOk={onEdit}
        centered
        closable={false}
        width={1000}
        footer={[]}
        destroyOnClose={true}
      >
        <h3>Product Specification Characteristic Value Use</h3>
        <Divider />
        <Form form={formEdit} onFinish={onEdit}>
          <FormBuilder
            form={formEdit}
            meta={editMetaValueUse}
            initialValues={editDataSource}
          />
          <Divider />
          <Button type="default" onClick={() => onClose()}>
            Close
          </Button>
          <Button htmlType="submit" type="primary">
            Save
          </Button>
        </Form>
      </Modal>
    </>
  );
};

export default Component;
