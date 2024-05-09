import { useState } from "react";
import { ProColumns } from "@ant-design/pro-table";
import AppTable from "@/components/app-table";
import { Button, Col, Divider, Modal, Row, Space } from "antd";
import Add from "./add";
import { product } from "@mobicom/tmf-dti";
import AppTableItemControll from "@/components/app-tableItem-controll";

type ComponentProps = {
  data: any[];
  saveAction?: (data: any[]) => void;
  clickPrevious?: () => void;
  loading: boolean;
  type: string;
};

const Component: React.FC<ComponentProps> = ({
  data,
  saveAction,
  clickPrevious,
  loading,
  type,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [dataSource, setDataSource] = useState<any[]>(data);
  const [selectedRows, setSelectedRows] = useState<product.CategoryRef[]>([]);

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
      key: "@type",
      title: "@type",
      dataIndex: "@type",
      search: false,
    },
    {
      title: "Action",
      // render: (record: any, ) => (
      //   <AppTableItemControll deleteAction={() => handleDelete(record)} />
      // ),
      render: (_text, _record, index) => (
        <AppTableItemControll deleteAction={() => onDelete(index)} />
      ),
      search: false,
      fixed: "right",
      width: 100,
      align: "center",
    },
  ];

  // const handleDelete = (id: string) => {
  //   setDataSource((state) => {
  //     return state.filter((e) => e.id !== id);
  //   });
  // };

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

  const onChange = () => {
    // setDataSource(selectedRows);
    setDataSource((state: product.CategoryRef[]) => [
      ...state,
      ...selectedRows,
    ]);
    setSelectedRows([]);
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
        destroyOnClose={true}
      >
        {/* <Add selectedRows={selectedRows} setSelectedRows={setSelectedRows} /> */}
        <Add setSelectedRows={setSelectedRows} type={type} />
      </Modal>
    </>
  );
};

export default Component;
