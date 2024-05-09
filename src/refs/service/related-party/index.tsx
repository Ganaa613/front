import { useState } from "react";
import { ProColumns } from "@ant-design/pro-table";
import AppTable from "@/components/app-table";
import { Button, Col, Divider, Form, Modal, Row, Space } from "antd";
import { service } from "@mobicom/tmf-dti";
import { meta, editMeta } from "@/forms/create/service.related.party.form";
import FormBuilder from "antd-form-builder";
import AppTableItemControll from "@/components/app-tableItem-controll";
import { getUuid } from "@/constants/converter";

type ComponentProps = {
  data: any[];
  saveAction?: (data: any[]) => void;
  clickPrevious?: () => void;
  loading: boolean;
};

const Component: React.FC<ComponentProps> = ({
  data,
  saveAction,
  clickPrevious,
  loading,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [editShowModal, setEditShowModal] = useState(false);
  const [dataSource, setDataSource] = useState<service.RelatedParty[]>(data);
  const [editDataSource, setEditDataSource] = useState<service.RelatedParty>();
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
      key: "role",
      title: "Role",
      dataIndex: "role",
      search: false,
    },
    {
      key: "@type",
      title: "@type",
      dataIndex: "@type",
      search: false,
    },
    {
      key: "action",
      title: "Action",
      render: (_text, record, index) => (
        <AppTableItemControll
          viewAction={() => editData(record)}
          deleteAction={() => onDelete(index)}
        />
      ),
      search: false,
      fixed: "right",
      width: 100,
      align: "center",
    },
  ];

  const onDelete = (index: number) => {
    setDataSource((state) => {
      return state.filter((_, i) => i !== index);
    });
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

  const onChange = (params: any) => {
    const mutableRef: service.RelatedParty = {
      "@type": "RelatedParty",
      "@referredType": "RelatedParty",
      id: params.id ?? getUuid(),
      name: params.name,
      role: params.role,
    };

    setDataSource((state: service.RelatedParty[]) => [
      ...state,
      ...[mutableRef],
    ]);
    setShowModal(false);
    form.resetFields();
  };

  const onClose = () => {
    setShowModal(false);
    setEditShowModal(false);
    form.resetFields();
  };

  const onClickPrevious = () => {
    if (clickPrevious) {
      clickPrevious();
    }
  };

  function editData(item: service.RelatedParty) {
    setEditDataSource(item);
    setEditShowModal(true);
  }

  const onEdit = (params: any) => {
    const mutableRef: service.RelatedParty = {
      "@type": params["@type"],
      "@referredType": params["@referredType"],
      id: params.id,
      name: params.name,
      role: params.role,
    };

    setDataSource((state: service.RelatedParty[]) =>
      state.map((item) =>
        item.id === params.id ? { ...item, ...mutableRef } : item
      )
    );

    setEditShowModal(false);
    form.resetFields();
  };

  return (
    <>
      <AppTable
        rowKey="id"
        search={false}
        columns={defaultColumns}
        dataSource={dataSource}
        pagination={false}
        toolBarRender={() => [
          <Button key="add" type="primary" onClick={() => setShowModal(true)}>
            Add
          </Button>,
        ]}
        loading={loading}
      />
      <Divider />
      <Row justify="space-between">
        <Col>
          <Button type="default" onClick={() => onClickPrevious()}>
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
        <h3>Related Party</h3>
        <Divider />
        <Form form={form} onFinish={onChange}>
          <FormBuilder form={form} meta={meta} />
          <Divider />
          <Button type="default" onClick={onClose}>
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
        <h3>Related Party</h3>
        <Divider />
        <Form form={form} onFinish={onEdit}>
          <FormBuilder
            form={form}
            meta={editMeta}
            initialValues={editDataSource}
          />
          <Divider />
          <Button type="default" onClick={onClose}>
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
