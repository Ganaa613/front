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
};

const Component: React.FC<ComponentProps> = ({
  data,
  saveAction,
  clickPrevious,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [item, setItem] = useState();
  const [dataSource, setDataSource] =
    useState<product.ProductOfferingPriceRelationship[]>(data);

  const defaultColumns: ProColumns[] = [
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
      key: "version",
      title: "Version",
      dataIndex: "version",
      search: false,
    },
    {
      title: "Action",
      render: (record: any) => (
        <AppTableItemControll
          viewAction={() => editRender(record)}
          deleteAction={() => handleDelete(record.id)}
        />
      ),
      search: false,
      fixed: "right",
      width: 100,
      align: "center",
    },
  ];

  const editRender = (record: any) => {
    setItem(record);
    setShowModal(true);
  };

  const onSave = () => {
    if (saveAction) {
      saveAction(dataSource);
    }
  };

  const onReset = () => {
    setDataSource(data);
    setItem(undefined);
  };

  const editItem = (item: product.ProductOfferingPriceRelationship) => {
    setItem(undefined);
    setDataSource((state) => {
      return state.map((e) => {
        if (e.id === item.id) {
          return item;
        }
        return e;
      });
    });
    setShowModal(false);
  };

  const handleDelete = (id: string) => {
    setDataSource((state) => {
      return state.filter((e) => e.id !== id);
    });
  };

  const onCancel = () => {
    setItem(undefined);
    setShowModal(false);
  };

  const onChange = (item: product.ProductOfferingPriceRelationship) => {
    setDataSource([...dataSource, item]);
    setItem(undefined);
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
        onOk={onSave}
        centered
        closable={false}
        width={1000}
        footer={null}
      >
        <Add
          editProps={{ item: item, editItem: editItem }}
          addProps={{ onAdd: onChange, onCancel: onCancel }}
          items={dataSource}
        />
      </Modal>
    </>
  );
};

export default Component;
