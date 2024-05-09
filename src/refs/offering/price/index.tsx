import { useState } from "react";
import { ProColumns } from "@ant-design/pro-table";
import AppTable from "@/components/app-table";
import { Button, Col, Divider, Modal, Row, Space } from "antd";
import Add from "./add";
import { common, product } from "@mobicom/tmf-dti";
import AddValue from "./addValue";
import AppTableItemControll from "@/components/app-tableItem-controll";
import { getData } from "@/constants/converter";
import { CharacteristicValueUse, PolicyRef, TaxItem } from "@/refs";

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
  const [type, setType] = useState(false);
  const [item, setItem] = useState<product.ProductOfferingPrice>();
  const [dataSource, setDataSource] = useState<any[]>(data);
  const [selectedRows, setSelectedRows] =
    useState<
      (product.ProductOfferingPrice | product.ProductOfferingPriceRef)[]
    >(data);

  const getAction = (record: any) => {
    if (record["@type"] === "ProductOfferingPrice") {
      return (
        <AppTableItemControll
          viewAction={() => editRender(record)}
          deleteAction={() => handleDelete(record.id)}
        />
      );
    } else {
      return (
        <AppTableItemControll deleteAction={() => handleDelete(record.id)} />
      );
    }
  };

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
      key: "price",
      title: "Price",
      dataIndex: ["price", "value"],
      search: false,
    },
    {
      key: "unit",
      title: "Unit",
      dataIndex: ["price", "unit"],
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
      render: (record: any) => getAction(record),
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

  const handleDelete = (id: string) => {
    setDataSource((state) => {
      const d = state.filter((e) => e.id !== id);
      setSelectedRows(d);
      return d;
    });
  };

  const onAddRef = () => {
    setDataSource([...selectedRows]);
    setShowModal(false);
  };

  const onAddValue = (item: product.ProductOfferingPrice) => {
    setDataSource([...dataSource, item]);
    setSelectedRows([...selectedRows, item]);
    setShowModal(false);
  };

  const editRender = (record: any) => {
    setItem(getData(record));
    setType(true);
    setShowModal(true);
  };

  const editItem = (item: product.ProductOfferingPrice) => {
    console.log("editItem: ", item);
    setDataSource((state) => {
      return state.map((e) => {
        if (e.id === item.id) {
          console.log("equally id: ", e, item);
          return item;
        }
        return e;
      });
    });
    setItem(undefined);
    setShowModal(false);
  };
  console.log("dataSource: ", dataSource);

  const onCancel = () => {
    setItem(undefined);
    setShowModal(false);
  };

  const onClickPrevious = () => {
    if (clickPrevious) {
      clickPrevious();
    }
  };

  const onSaveCharacteristic = (
    values: product.ProductSpecificationCharacteristicValueUse[],
    offeringPrice: product.ProductOfferingPrice
  ) => {
    setDataSource((state) => {
      return state.map((e) => {
        if (e.id === offeringPrice.id) {
          e.prodSpecCharValueUse = values;
          console.log("equally id: ", e, offeringPrice);
        }
        return e;
      });
    });
  };

  const onSaveTax = (
    taxs: common.TaxItem[],
    offeringPrice: product.ProductOfferingPrice
  ) => {
    setDataSource((state) => {
      return state.map((e) => {
        if (e.id === offeringPrice.id) {
          e.tax = taxs;
          console.log("equally id: ", e, offeringPrice);
        }
        return e;
      });
    });
  };

  const onSavePolicy = (
    policy: common.PolicyRef[],
    offeringPrice: product.ProductOfferingPrice
  ) => {
    setDataSource((state) => {
      return state.map((e) => {
        if (e.id === offeringPrice.id) {
          e.policy = policy;
          console.log("equally id: ", e, offeringPrice);
        }
        return e;
      });
    });
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
          <Button
            key="add"
            type="primary"
            onClick={() => {
              setType(false);
              setShowModal(true);
            }}
          >
            Add
          </Button>,
          <Button
            key="add"
            type="primary"
            onClick={() => {
              setType(true);
              setShowModal(true);
            }}
          >
            Add Value
          </Button>,
        ]}
        expandable={{
          expandedRowRender: (record: product.ProductOfferingPrice) => {
            return (
              <>
                <CharacteristicValueUse
                  data={record?.prodSpecCharValueUse ?? []}
                  saveActionOffer={onSaveCharacteristic}
                  productOfferingPrice={record}
                />
                <TaxItem
                  data={record?.tax ?? []}
                  saveActionOffer={onSaveTax}
                  productOfferingPrice={record}
                />
                <PolicyRef
                  data={record?.policy ?? []}
                  saveActionOffer={onSavePolicy}
                  productOfferingPrice={record}
                />
              </>
            );
          },
          rowExpandable: (record) => record["@type"] === "ProductOfferingPrice",
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
        centered
        closable={false}
        width={1000}
        footer={null}
      >
        {type === true && (
          <AddValue
            onAdd={onAddValue}
            onCancel={onCancel}
            item={item}
            editItem={editItem}
          />
        )}
        {type === false && (
          <Add
            saveAction={onAddRef}
            cancel={onCancel}
            selectedRows={selectedRows}
            setSelectedRows={setSelectedRows}
          />
        )}
      </Modal>
    </>
  );
};

export default Component;
