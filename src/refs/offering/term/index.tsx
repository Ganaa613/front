import { useState } from "react";
import { ProColumns } from "@ant-design/pro-table";
import AppTable from "@/components/app-table";
import { Button, Col, Divider, Modal, Row, Space } from "antd";
import Add from "./add";
import { product } from "@mobicom/tmf-dti";
import dayjs from "dayjs";
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
  const [item, setItem] = useState<product.AgreementRef>();
  const [dataSource, setDataSource] = useState<any[]>(data);

  const defaultColumns: ProColumns[] = [
    {
      key: "name",
      title: "Name",
      dataIndex: "name",
      search: false,
    },
    {
      key: "duration",
      title: "Duration",
      dataIndex: ["duration", "amount"],
      search: false,
    },
    {
      key: "units",
      title: "Units",
      dataIndex: ["duration", "units"],
      search: false,
    },
    {
      key: "description",
      title: "Description",
      dataIndex: "description",
      search: false,
    },
    {
      key: "start",
      title: "Start Date",
      dataIndex: ["validFor", "startDateTime"],
      render: (val: any) =>
        dayjs(val).isValid() ? dayjs(val).format("YYYY-MM-DD HH:mm:ss") : "",
      search: false,
    },
    {
      key: "end",
      title: "End Date",
      dataIndex: ["validFor", "endDateTime"],
      render: (val: any) =>
        dayjs(val).isValid() ? dayjs(val).format("YYYY-MM-DD HH:mm:ss") : "",
      search: false,
    },
    {
      title: "Action",
      render: (record: any) => (
        <AppTableItemControll
          viewAction={() => editRender(record)}
          deleteAction={() => handleDelete(record.name)}
        />
      ),
      search: false,
      fixed: "right",
      width: 100,
      align: "center",
    },
  ];

  const onSave = () => {
    if (saveAction) {
      saveAction(dataSource);
    }
  };

  const onReset = () => {
    setDataSource(data);
  };

  const handleDelete = (name: string) => {
    setDataSource((state) => {
      return state.filter((e) => e.name !== name);
    });
  };

  const onChange = (item: product.ProductOfferingTerm) => {
    setDataSource([...dataSource, item]);
    setShowModal(false);
  };

  const editRender = (record: any) => {
    setItem(record);
    setShowModal(true);
  };

  const editItem = (item: product.ProductOfferingTerm) => {
    setDataSource((state) => {
      return state.map((e) => {
        if (e.name === item.name) {
          return item;
        }
        return e;
      });
    });
    setItem(undefined);
    setShowModal(false);
  };

  const onCancel = () => {
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
        rowKey="name"
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
        />
      </Modal>
    </>
  );
};

export default Component;
