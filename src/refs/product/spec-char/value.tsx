import AppTable from "@/components/app-table";
import AppTableItemControll from "@/components/app-tableItem-controll";
import {
  getType,
  getValidForToObject,
  renderDate,
} from "@/constants/converter";
import { metaValueSpec } from "@/forms/product/spec.char";
import notifyService from "@/services/notify.service";
import { ProColumns } from "@ant-design/pro-table";
import { common } from "@mobicom/tmf-dti";
import { Button, Divider, Form, Modal, Switch } from "antd";
import FormBuilder from "antd-form-builder";
import { useState } from "react";

type ComponentProps = {
  data: common.CharacteristicSpecification;
  saveAction?: (data: any) => void;
};

const CharValue: React.FC<ComponentProps> = ({ data, saveAction }) => {
  const [showModal, setShowModal] = useState(false);
  const [dataSource, setDataSource] = useState<
    common.CharacteristicValueSpecification[]
  >(data.characteristicValueSpecification || []);

  const [form] = Form.useForm();
  const valueSpecColumns: ProColumns<common.CharacteristicValueSpecification>[] =
    [
      { title: "ValueFrom", dataIndex: "valueFrom", key: "valueFrom" },
      { title: "ValueTo", dataIndex: "valueTo", key: "valueTo" },
      { title: "Value Type", dataIndex: "valueType", key: "valueType" },
      {
        title: "Is default",
        dataIndex: "isDefault",
        key: "isDefault",
        render: (_, record) => <Switch checked={record.isDefault} />,
        readonly: true,
      },
      { title: "@type", dataIndex: "@type", key: "@type" },
      {
        title: "Range Interval",
        dataIndex: "rangeInterval",
        key: "rangeInterval",
      },
      { title: "Regex", dataIndex: "regex", key: "regex" },
      {
        title: "Unit Of Measure",
        dataIndex: "unitOfMeasure",
        key: "unitOfMeasure",
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
          <AppTableItemControll deleteAction={() => handleDelete(record)} />
        ),
      },
    ];

  function handleDelete(item: common.CharacteristicValueSpecification) {
    setDataSource((state: common.CharacteristicValueSpecification[]) => {
      const res = state.filter(
        (rec) =>
          !(
            rec.valueFrom === item.valueFrom &&
            rec.valueTo === item.valueTo &&
            rec.valueType === item.valueType
          )
      );
      saveData(res);
      return res;
    });
  }

  const onChange = (params: any) => {
    const mutableRef: common.CharacteristicValueSpecification = {
      "@type": getType(params.valueType),
      regex: params.regex,
      validFor: getValidForToObject(params.validFor) ?? {},
      valueType: params.valueType,
      isDefault: params.isDefault,
      rangeInterval: params.rangeInterval,
      unitOfMeasure: params.unitOfMeasure,
      valueFrom: params.valueFrom,
      valueTo: params.valueTo,
    };

    setDataSource((state) => {
      const res = [...state, mutableRef];
      saveData(res);
      return res;
    });
    setShowModal(false);
    form.resetFields();
  };

  const saveData = (chars: common.CharacteristicValueSpecification[]) => {
    if (saveAction) {
      console.log("charS: ", chars);
      data.characteristicValueSpecification = chars;
      saveAction(data);
      notifyService.success(
        `Characteristic Value Specification successfully saved`
      );
    }
  };

  return (
    <>
      <h4>Characteristic Value Specification</h4>
      <AppTable
        rowKey="valueFrom"
        search={false}
        columns={valueSpecColumns}
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
        <h3>Characteristic Value Specification</h3>
        <Divider />
        <Form form={form} onFinish={onChange}>
          <FormBuilder form={form} meta={metaValueSpec} />
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
