import { useState } from "react";
import { ProColumns } from "@ant-design/pro-table";
import AppTable from "@/components/app-table";
import { Button, Col, Divider, Modal, Row, Space } from "antd";
import Add from "./add";
import { common } from "@mobicom/tmf-dti";
import AppTableItemControll from "@/components/app-tableItem-controll";
import { addId, addIds } from "@/constants/converter";

type ComponentProps = {
  data: any[];
  saveAction?: (data: any[]) => void;
  clickPrevious?: () => void;
  saveActionOffer?: (data: any[], offer: any) => void;
  productOfferingPrice?: any;
};

const Component: React.FC<ComponentProps> = ({
  data,
  saveAction,
  clickPrevious,
  saveActionOffer,
  productOfferingPrice,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [item, setItem] = useState<common.ChannelRef>();
  const [dataSource, setDataSource] = useState<any[]>(addIds(data));

  const defaultColumns: ProColumns[] = [
    {
      key: "id",
      title: "id",
      dataIndex: "id",
      search: false,
    },
    {
      key: "taxCategory",
      title: "Tax Category",
      dataIndex: "taxCategory",
      search: false,
    },
    {
      key: "taxAmount",
      title: "Tax Amount",
      dataIndex: ["taxAmount", "value"],
      search: false,
    },
    {
      key: "Currency",
      title: "Currency",
      dataIndex: ["taxAmount", "unit"],
      search: false,
    },
    {
      key: "taxRate",
      title: "Tax Rate",
      dataIndex: "taxRate",
      search: false,
    },
    {
      title: "Action",
      render: (record: any) => (
        <AppTableItemControll
          viewAction={() => editRender(record)}
          deleteAction={() => handleDelete(record)}
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

  const handleDelete = (record: common.TaxItem) => {
    console.log(record);
    setDataSource((state) => {
      return state.filter(
        (e) =>
          !(
            e.taxAmount === record.taxAmount &&
            e.taxCategory === record.taxCategory &&
            e.taxRate === record.taxRate
          )
      );
    });
    if (saveActionOffer) {
      saveActionOffer(
        dataSource.filter(
          (e) =>
            !(
              e.taxAmount === record.taxAmount &&
              e.taxCategory === record.taxCategory &&
              e.taxRate === record.taxRate
            )
        ),
        productOfferingPrice
      );
    }
  };

  const onChange = (item: common.TaxItem) => {
    setDataSource([...dataSource, addId(item)]);
    setShowModal(false);
    if (saveActionOffer) {
      saveActionOffer([...dataSource, addId(item)], productOfferingPrice);
    }
  };

  const editRender = (record: any) => {
    setItem(record);
    setShowModal(true);
  };

  const editItem = (item: common.ChannelRef) => {
    setDataSource((state) => {
      return state.map((e) => {
        if (e.id === item.id) {
          return item;
        }
        return e;
      });
    });
    if (saveActionOffer) {
      saveActionOffer(
        dataSource.map((e) => {
          if (e.id === item.id) {
            return item;
          }
          return e;
        }),
        productOfferingPrice
      );
    }
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
      <div hidden={!productOfferingPrice}>
        <h3>Tax</h3>
        <Divider />
      </div>
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
        <Col hidden={productOfferingPrice}>
          <Button type="default" onClick={onClickPrevious}>
            Previous
          </Button>
        </Col>
        <Col hidden={productOfferingPrice}>
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
