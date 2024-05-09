import { useState } from "react";
import { ProColumns } from "@ant-design/pro-table";
import AppTable from "@/components/app-table";
import { Button, Col, Divider, Form, Modal, Row, Space } from "antd";
import { resource } from "@mobicom/tmf-dti";
import { meta, editMeta } from "@/forms/product/spec.rel";
import FormBuilder from "antd-form-builder";
import CharSpec from "./char";
import AppTableItemControll from "@/components/app-tableItem-controll";
import {
  getData,
  getValidForToObject,
  renderDate,
} from "@/constants/converter";

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
    useState<resource.ResourceSpecificationRelationship>();
  const [form] = Form.useForm();

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
      key: "relationshipType",
      title: "Relationship Type",
      dataIndex: "relationshipType",
      search: false,
    },
    {
      key: "role",
      title: "Role",
      dataIndex: "role",
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
      key: "defaultQuantity",
      title: "Default Quantity",
      dataIndex: "defaultQuantity",
      search: false,
    },
    {
      key: "startDate",
      title: "Start Date",
      dataIndex: ["validFor", "startDateTime"],
      render: (val: any) => renderDate(val),
    },
    {
      key: "endDate",
      title: "End Date",
      dataIndex: ["validFor", "endDateTime"],
      render: (val: any) => renderDate(val),
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
      render: (_, record) => (
        <AppTableItemControll
          viewAction={() => editData(record)}
          deleteAction={() => handleDelete(record)}
        />
      ),
    },
  ];

  function handleDelete(item: resource.ResourceSpecificationRelationship) {
    setDataSource((state: resource.ResourceSpecificationRelationship[]) =>
      state.filter((rec) => rec.id !== item.id || rec.name !== item.name)
    );
  }

  function editData(item: resource.ResourceSpecificationRelationship) {
    setEditDataSource(getData(item));
    setEditShowModal(true);
  }

  const onEdit = (params: any) => {
    const mutableRef: resource.ResourceSpecificationRelationship = {
      "@type": "ResourceSpecificationRelationship",
      characteristic: params.characteristic,
      maximumQuantity: params.maximumQuantity,
      minimumQuantity: params.minimumQuantity,
      name: params.name,
      id: params.id,
      validFor: getValidForToObject(params.validFor) ?? {},
      relationshipType: params.relationshipType,
      role: params.role,
      defaultQuantity: params.defaultQuantity,
    };

    setDataSource((state: resource.ResourceSpecificationRelationship[]) =>
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

  // const onClose = () => {
  //   setEditShowModal(false);
  //   setShowModal(false);
  //   form.resetFields();
  // };

  const onChange = (params: any) => {
    const mutableRef: resource.ResourceSpecificationRelationship = {
      "@type": "ResourceSpecificationRelationship",
      characteristic: params.characteristic,
      maximumQuantity: params.maximumQuantity,
      minimumQuantity: params.minimumQuantity,
      name: params.name,
      id: params.id,
      validFor: getValidForToObject(params.validFor) ?? {},
      relationshipType: params.relationshipType,
      role: params.role,
      defaultQuantity: params.defaultQuantity,
    };

    setDataSource((state: resource.ResourceSpecificationRelationship[]) => [
      ...state,
      ...[mutableRef],
    ]);
    setShowModal(false);
    form.resetFields();
  };

  const changeRelationship = (
    data: resource.ResourceSpecificationRelationship
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
            <CharSpec data={record} saveAction={changeRelationship} />
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
      >
        <h3>Resource Specification Relationship</h3>
        <Divider />
        <Form form={form} onFinish={onChange}>
          <FormBuilder form={form} meta={meta} />
          <Divider />
          <Button type="default" onClick={() => setShowModal(false)}>
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
      >
        <h3>Resource Specification Relationship</h3>
        <Divider />
        <Form form={form} onFinish={onEdit}>
          <FormBuilder
            form={form}
            meta={editMeta}
            initialValues={editDataSource}
          />
          <Divider />
          <Button type="default" onClick={() => setEditShowModal(false)}>
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
