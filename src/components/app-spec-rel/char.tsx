import AppTable from "@/components/app-table";
import AppTableItemControll from "@/components/app-tableItem-controll";
import { getValidForToObject, renderDate } from "@/constants/converter";
import { meta } from "@/forms/product/spec.char";
import { ProColumns } from "@ant-design/pro-table";
import { common, resource } from "@mobicom/tmf-dti";
import { Button, Divider, Form, Modal, Switch } from "antd";
import FormBuilder from "antd-form-builder";
import { useState } from "react";

type ComponentProps = {
  data: resource.ResourceSpecificationRelationship;
  saveAction?: (data: any) => void;
};

const CharValue: React.FC<ComponentProps> = ({ data, saveAction }) => {
  const [showModal, setShowModal] = useState(false);
  const [dataSource, setDataSource] = useState<
    common.CharacteristicSpecification[]
  >(data.characteristic || []);

  const [form] = Form.useForm();
  const columns: ProColumns<common.CharacteristicSpecification>[] = [
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
      render: (_, record) => <Switch checked={record.configurable} />,
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
      render: (_, record) => <Switch checked={record.extensible} />,
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
      render: (_, record) => <Switch checked={record.isUnique} />,
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
      render: (_, record) => (
        <AppTableItemControll deleteAction={() => handleDelete(record)} />
      ),
    },
  ];

  function handleDelete(item: common.CharacteristicSpecification) {
    setDataSource((state: common.CharacteristicSpecification[]) => {
      const res = state.filter((rec) => !(rec.id === item.id));
      saveData(res);
      return res;
    });
  }

  const onChange = (params: any) => {
    const mutableRef: common.CharacteristicSpecification = {
      "@type": "CharacteristicSpecification",
      charSpecRelationship: params.charSpecRelationship,
      characteristicValueSpecification: params.characteristicValueSpecification,
      configurable: params.configurable,
      description: params.description,
      extensible: params.extensible,
      id: params.id,
      isUnique: params.isUnique,
      maxCardinality: params.maxCardinality,
      minCardinality: params.minCardinality,
      name: params.name,
      regex: params.regex,
      validFor: getValidForToObject(params.validFor) ?? {},
      valueType: params.valueType,
      "@valueSchemaLocation": params["@valueSchemaLocation"],
    };

    setDataSource((state) => {
      const res = [...state, mutableRef];
      saveData(res);
      return res;
    });
    setShowModal(false);
    form.resetFields();
  };

  const saveData = (chars: common.CharacteristicSpecification[]) => {
    if (saveAction) {
      console.log("charS: ", chars);
      data.characteristic = chars;
      saveAction(data);
    }
  };

  return (
    <>
      <h4>Characteristic Specification</h4>
      <AppTable
        rowKey="id"
        search={false}
        columns={columns}
        dataSource={dataSource}
        pagination={false}
        toolBarRender={() => [
          <Button key="add" danger onClick={() => setShowModal(true)}>
            Add
          </Button>,
        ]}
      />
      <Divider />
      <Modal
        open={showModal}
        centered
        closable={false}
        width={1000}
        footer={[]}
      >
        <h3>Characteristic Specification</h3>
        <Divider />
        <Form form={form} onFinish={onChange}>
          <FormBuilder form={form} meta={meta} />
          <Divider />
          <Button type="default" onClick={() => setShowModal(false)}>
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

export default CharValue;
