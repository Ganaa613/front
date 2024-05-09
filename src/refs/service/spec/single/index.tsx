import { useState } from "react";
import { ProColumns } from "@ant-design/pro-table";
import AppTable from "@/components/app-table";
import { Button, Col, Divider, Modal, Row, Space } from "antd";
import Add from "./add";
import { resource } from "@mobicom/tmf-dti";

type ComponentProps = {
  data: any;
  saveAction?: (data: any) => void;
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
  const [dataSource, setDataSource] = useState<any>([...[data]]);
  const [selectedRows, setSelectedRows] = useState<
    resource.ResourceSpecificationRef[]
  >([...[data]]);

  const defaultColumns: ProColumns[] = [
    {
      key: "id",
      title: "Id",
      dataIndex: "id",
      search: false,
      width: 400,
    },
    {
      key: "name",
      title: "Name",
      dataIndex: "name",
      search: false,
    },
    {
      key: "version",
      title: "Version",
      dataIndex: "version",
      search: false,
    },
    {
      key: "href",
      title: "Href",
      dataIndex: "href",
    },
    {
      key: "@type",
      title: "@type",
      dataIndex: "@type",
      search: false,
    },
  ];

  const onSave = () => {
    if (saveAction) {
      saveAction(selectedRows[0]);
      data = selectedRows[0];
    }
  };

  const onReset = () => {
    setDataSource([...[data]]);
  };

  const onChange = () => {
    setDataSource(selectedRows);
    setShowModal(false);
  };

  const onClose = () => {
    setShowModal(false);
  };

  const onClickPrevious = () => {
    if (clickPrevious) {
      clickPrevious();
    }
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
        footer={[
          <Divider key="divider" />,
          <Button key="close" type="default" onClick={onClose}>
            Close
          </Button>,
          <Button key="save" type="primary" onClick={onChange}>
            Save
          </Button>,
        ]}
      >
        <Add selectedRows={selectedRows} setSelectedRows={setSelectedRows} />
      </Modal>
    </>
  );
};

export default Component;
