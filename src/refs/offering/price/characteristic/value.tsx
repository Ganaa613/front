import AppTable from "@/components/app-table";
import AppTableItemControll from "@/components/app-tableItem-controll";
import {
  addIds,
  getType,
  getUuid,
  getValidForToObject,
  renderDate,
} from "@/constants/converter";
import { editMetaValueSpec, metaValueSpec } from "@/forms/product/spec.char";
import notifyService from "@/services/notify.service";
import { ProColumns } from "@ant-design/pro-table";
import { common } from "@mobicom/tmf-dti";
import { Button, Checkbox, Divider, Form, Modal } from "antd";
import FormBuilder from "antd-form-builder";
import { useState } from "react";

type ComponentProps = {
  data: common.CharacteristicSpecification;
  saveAction?: (data: any) => void;
};

const CharValue: React.FC<ComponentProps> = ({ data, saveAction }) => {
  const [showModal, setShowModal] = useState(false);
  const [dataSource, setDataSource] = useState<any[]>(
    addIds(data.characteristicValueSpecification) || []
  );

  const [mode, setMode] = useState<"add" | "edit">("add");
  const [form] = Form.useForm();
  const valueSpecColumns: ProColumns<common.CharacteristicValueSpecification>[] =
    [
      { title: "Value", dataIndex: "value", key: "value" },
      { title: "Value Type", dataIndex: "valueType", key: "valueType" },
      { title: "ValueFrom", dataIndex: "valueFrom", key: "valueFrom" },
      { title: "ValueTo", dataIndex: "valueTo", key: "valueTo" },
      {
        title: "Is default",
        dataIndex: "isDefault",
        key: "isDefault",
        render: (_, record) => <Checkbox checked={record.isDefault} />,
        readonly: true,
      },
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
          <AppTableItemControll
            viewAction={() => editRender(record)}
            deleteAction={() => handleDelete(record)}
          />
        ),
      },
    ];

  const handleDelete = (item: any) => {
    setDataSource((state: any[]) => {
      const res = state.filter((rec) => rec.id !== item.id);
      saveData(res);
      return res;
    });
  };

  const onChange = (params: any) => {
    const mutableRef: any = {
      id: params.id ?? getUuid(),
      "@type": getType(params.valueType),
      regex: params.regex,
      validFor: getValidForToObject(params.validFor) ?? {},
      valueType: params.valueType,
      isDefault: params.isDefault,
      rangeInterval: params.rangeInterval,
      unitOfMeasure: params.unitOfMeasure ?? "",
      valueFrom: params.valueFrom,
      valueTo: params.valueTo,
      value: params.value,
    };

    setDataSource((state) => {
      let res = [...state];
      if (mode === "edit") {
        res = state.map((e) => {
          if (e.id === mutableRef.id) {
            return mutableRef;
          }
          return e;
        });
      } else {
        res = [...res, mutableRef];
      }
      saveData(res);
      return res;
    });
    setShowModal(false);
    form.resetFields();
  };

  const saveData = (chars: common.CharacteristicValueSpecification[]) => {
    if (saveAction) {
      data.characteristicValueSpecification = chars;
      saveAction(data);
      notifyService.success(
        `Characteristic Value Specification successfully saved`
      );
    }
  };

  const onCancel = () => {
    setMode("add");
    form.setFieldsValue(undefined);
    setShowModal(false);
  };

  const clickAdd = () => {
    setMode("add");
    form.setFieldsValue(undefined);
    setShowModal(true);
  };

  const editRender = (char: common.CharacteristicValueSpecification) => {
    if (char) {
      setMode("edit");
      form.setFieldsValue(char);
      setShowModal(true);
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
          <Button key="add" danger onClick={clickAdd}>
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
          <FormBuilder
            form={form}
            meta={mode === "edit" ? editMetaValueSpec : metaValueSpec}
          />
          <Divider />
          <Button type="default" onClick={onCancel}>
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
