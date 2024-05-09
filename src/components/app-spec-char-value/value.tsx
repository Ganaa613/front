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
import { Button, Divider, Form, Modal, Switch } from "antd";
import FormBuilder from "antd-form-builder";
import { useState } from "react";

type ComponentProps = {
  data: any;
  saveAction?: (data: any) => void;
};

const CharValue: React.FC<ComponentProps> = ({ data, saveAction }) => {
  const [showModal, setShowModal] = useState(false);
  const [dataSource, setDataSource] = useState<any[]>(
    addIds(
      data.characteristicValueSpecification ??
        data.productSpecCharacteristicValue
    ) || []
  );

  const [mode, setMode] = useState<"add" | "edit">("add");
  const [form] = Form.useForm();
  const valueSpecColumns: ProColumns<common.CharacteristicValueSpecification>[] =
    [
      // { title: "Id", dataIndex: "id", key: "id" },
      { title: "ValueFrom", dataIndex: "valueFrom", key: "valueFrom" },
      { title: "ValueTo", dataIndex: "valueTo", key: "valueTo" },
      { title: "Value", dataIndex: "value", key: "value" },
      { title: "Value Type", dataIndex: "valueType", key: "valueType" },
      {
        title: "Is default",
        dataIndex: "isDefault",
        key: "isDefault",
        render: (_, record) => <Switch checked={record.isDefault} />,
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
        render: (_, record, index) => (
          <AppTableItemControll
            viewAction={() => editRender(record)}
            deleteAction={() => onDelete(index)}
          />
        ),
      },
    ];

  // const handleDelete = (item: any) => {
  //   setDataSource((state: any[]) => {
  //     const res = state.filter((rec) => rec.id !== item.id);
  //     saveData(res);
  //     return res;
  //   });
  // };

  const onDelete = (index: number) => {
    setDataSource((state) => {
      return state.filter((_, i) => i !== index);
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
      data.productSpecCharacteristicValue = chars;
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
      <h4>Product Specification Characteristic Value</h4>
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
        <h3>Product Specification Characteristic Value</h3>
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
