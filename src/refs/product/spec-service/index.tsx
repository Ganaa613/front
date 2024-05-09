import { useState } from "react";
import { ProColumns } from "@ant-design/pro-table";
import AppTable from "@/components/app-table";
import { Button, Col, Divider, Modal, Row, Space } from "antd";
import Add from "./add";
import { service } from "@mobicom/tmf-dti";
import AppTableItemControll from "@/components/app-tableItem-controll";

type ComponentProps = {
  data: any[];
  saveAction?: (data: any[]) => void;
  isDisable?: boolean;
  clickPrevious?: () => void;
  loading: boolean;
};

const Component: React.FC<ComponentProps> = ({
  data,
  saveAction,
  isDisable,
  clickPrevious,
  loading,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [dataSource, setDataSource] = useState<any[]>(data);
  const [selectedRows, setSelectedRows] =
    useState<service.ServiceSpecificationRef[]>(data);

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
    {
      title: "Action",
      render: (record: any) => (
        <AppTableItemControll deleteAction={() => handleDelete(record.id)} />
      ),
      search: false,
      fixed: "right",
      width: 100,
      align: "center",
    },
  ];

  const handleDelete = (id: string) => {
    setDataSource((state) => {
      const d = state.filter((e) => e.id !== id);
      setSelectedRows(d);
      return d;
    });
  };

  const onSave = () => {
    if (saveAction) {
      saveAction(selectedRows);
      data = selectedRows;
    }
  };

  const onReset = () => {
    setDataSource(data);
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
      {isDisable ? (
        <>Disable</>
      ) : (
        <>
          <AppTable
            rowKey="id"
            search={false}
            columns={defaultColumns}
            dataSource={dataSource}
            pagination={false}
            toolBarRender={() => [
              <Button
                disabled={dataSource.length !== 0}
                key="add"
                type="primary"
                onClick={() => setShowModal(true)}
              >
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
            destroyOnClose={true}
          >
            <Add
              selectedRows={selectedRows}
              setSelectedRows={setSelectedRows}
            />
          </Modal>
        </>
      )}
    </>
  );
};

export default Component;
