import { useState } from "react";
import { ProColumns } from "@ant-design/pro-table";
import AppTable from "@/components/app-table";
import { Button, Checkbox, Col, Divider, Form, Modal, Row, Space } from "antd";
import { common, product } from "@mobicom/tmf-dti";
import CharValue from "./value";
import Add from "./add";
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
  const [dataSource, setDataSource] = useState<any[]>(data);
  const [item, setItem] =
    useState<product.ProductSpecificationCharacteristicValueUse>();
  const [form] = Form.useForm();

  const defaultColumns: ProColumns[] = [
    {
      key: "name",
      title: "Name",
      dataIndex: "name",
      search: false,
    },
    {
      key: "description",
      title: "Description",
      dataIndex: "description",
      search: false,
    },
    {
      key: "valueType",
      title: "Value Type",
      dataIndex: "valueType",
      search: false,
    },
    {
      title: "Configurable",
      dataIndex: "configurable",
      key: "configurable",
      render: (_, record) => <Checkbox checked={record.configurable} />,
      readonly: true,
      initialValue: false,
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
      title: "Extensible",
      dataIndex: "extensible",
      key: "extensible",
      render: (_, record) => <Checkbox checked={record.extensible} />,
      readonly: true,
    },
    {
      key: "Regex",
      title: "Regex",
      dataIndex: "regex",
      search: false,
    },
    {
      title: "Is Unique",
      dataIndex: "isUnique",
      key: "isUnique",
      render: (_, record) => <Checkbox checked={record.isUnique} />,
      readonly: true,
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

  function handleDelete(
    item: product.ProductSpecificationCharacteristicValueUse
  ) {
    setDataSource((state: common.CharacteristicSpecification[]) =>
      state.filter((rec) => rec.id !== item.id || rec.name !== item.name)
    );

    if (saveActionOffer) {
      saveActionOffer(
        dataSource.filter(
          (rec) => rec.id !== item.id || rec.name !== item.name
        ),
        productOfferingPrice
      );
    }
  }

  function editData(item: product.ProductSpecificationCharacteristicValueUse) {
    setItem(getData(item));
    setShowModal(true);
  }

  const onEdit = (params: any) => {
    const mutableRef: product.ProductSpecificationCharacteristicValueUse = {
      "@type": "CharacteristicSpecification",
      description: params.description,
      maxCardinality: params.maxCardinality,
      minCardinality: params.minCardinality,
      name: params.name,
      id: params.id,
      validFor: getValidForToObject(params.validFor) ?? {},
      valueType: params.valueType,
    };

    setDataSource(
      (state: product.ProductSpecificationCharacteristicValueUse[]) =>
        state.map((item) =>
          item.id === params.id ? { ...item, ...mutableRef } : item
        )
    );
    if (saveActionOffer) {
      saveActionOffer(
        dataSource.map((item) =>
          item.id === params.id ? { ...item, ...mutableRef } : item
        ),
        productOfferingPrice
      );
    }
    setShowModal(false);
    setItem(undefined);
  };

  const onSave = () => {
    if (saveAction) {
      saveAction(dataSource);
    }
  };

  const onReset = () => {
    setDataSource(data);
  };

  const onChange = (params: any) => {
    const mutableRef: product.ProductSpecificationCharacteristicValueUse = {
      "@type": "CharacteristicSpecification",
      description: params.description,
      id: params.id,
      maxCardinality: params.maxCardinality,
      minCardinality: params.minCardinality,
      name: params.name,
      validFor: getValidForToObject(params.validFor) ?? {},
      valueType: params.valueType,
    };

    setDataSource([...dataSource, mutableRef]);
    setShowModal(false);
    form.resetFields();

    if (saveActionOffer) {
      saveActionOffer([...dataSource, mutableRef], productOfferingPrice);
    }
  };

  const changeCharacteristic = (data: common.CharacteristicSpecification) => {
    setDataSource((state) => {
      return state.map((e) => {
        if (e.id === data.id) {
          return data;
        }
        return e;
      });
    });
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
        <h3>Product Specification Characteristic Value Use</h3>
        <Divider />
      </div>
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
            <CharValue data={record} saveAction={changeCharacteristic} />
          ),
        }}
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
        onOk={onChange}
        centered
        closable={false}
        width={1000}
        footer={[]}
      >
        <Add
          addProps={{ onAdd: onChange, onCancel: onCancel }}
          editProps={{ item: item, editItem: onEdit }}
        />
      </Modal>
    </>
  );
};

export default Component;
