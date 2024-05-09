import { useState } from "react";
import { ProColumns } from "@ant-design/pro-table";
import AppTable from "@/components/app-table";
import { Button, Col, Divider, Form, Modal, Row, Space } from "antd";
import { common } from "@mobicom/tmf-dti";
import { meta } from "@/forms/resource/external.identifier";
import FormBuilder from "antd-form-builder";
import AppTableItemControll from "@/components/app-tableItem-controll";

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
  const [dataSource, setDataSource] = useState<any[]>(data);
  const [form] = Form.useForm();

  const defaultColumns: ProColumns[] = [
    {
      key: "id",
      title: "Id",
      dataIndex: "id",
      search: false,
    },
    {
      key: "externalIdentifierType",
      title: "External Identifier Type",
      dataIndex: "externalIdentifierType",
      search: false,
    },
    {
      key: "owner",
      title: "Owner",
      dataIndex: "owner",
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
      render: (_text, _record, index) => (
        <AppTableItemControll deleteAction={() => handleDelete(index)} />
      ),
    },
  ];

  function handleDelete(index: number) {
    setDataSource((state) => {
      return state.filter((_e, i) => i !== index);
    });
  }

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
    const mutableRef: common.ExternalIdentifier = {
      "@type": "ExternalIdentifier",
      id: params.id,
      owner: params.owner,
      externalIdentifierType: params.externalIdentifierType,
    };

    setDataSource((state: common.ExternalIdentifier[]) => [
      ...state,
      ...[mutableRef],
    ]);
    setShowModal(false);
    form.resetFields();
  };

  const onClose = () => {
    setShowModal(false);
    form.resetFields();
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
        loading={loading}
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
        <h3>External Identifier</h3>
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
    </>
  );
};

export default Component;
