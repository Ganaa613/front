import AppTable from "@/components/app-table";
import AppTableItemControll from "@/components/app-tableItem-controll";
import { meta, editMeta } from "@/forms/product/offer/bundle.option";
import notifyService from "@/services/notify.service";
import { ProColumns } from "@ant-design/pro-table";
import { product } from "@mobicom/tmf-dti";
import { Button, Divider, Form, Modal } from "antd";
import FormBuilder from "antd-form-builder";
import { useEffect, useState } from "react";

type ComponentProps = {
  data: product.BundledProductOffering;
  saveAction?: (data: any) => void;
};

const CharValue: React.FC<ComponentProps> = ({ data, saveAction }) => {
  const [showModal, setShowModal] = useState(false);
  const [disabled, setDisabled] = useState<boolean>(
    data.bundledProductOfferingOption !== undefined
  );
  const [dataSource, setDataSource] = useState<
    product.BundledProductOfferingOption[]
  >([]);
  const [mode, setMode] = useState<"add" | "edit">("add");

  const [form] = Form.useForm();
  const valueSpecColumns: ProColumns<product.BundledProductOfferingOption>[] = [
    {
      title: "Default number",
      dataIndex: "numberRelOfferDefault",
      key: "numberRelOfferDefault",
    },
    {
      title: "Lower limit",
      dataIndex: "numberRelOfferLowerLimit",
      key: "numberRelOfferLowerLimit",
    },
    {
      title: "Upper limit",
      dataIndex: "numberRelOfferUpperLimit",
      key: "numberRelOfferUpperLimit",
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
          deleteAction={() => handleDelete()}
        />
      ),
    },
  ];

  async function find() {
    try {
      const res = data.bundledProductOfferingOption
        ? [data.bundledProductOfferingOption]
        : [];
      setDataSource(res);
    } catch (error: any) {
      notifyService.error(error.message);
    }
  }

  useEffect(() => {
    find();
  }, []);

  function handleDelete() {
    setDataSource([]);
    setDisabled(false);
    saveData(undefined);
  }

  const onChange = (params: any) => {
    const mutableRef: product.BundledProductOfferingOption = {
      "@type": "BundledProductOfferingOption",
      numberRelOfferDefault: params.numberRelOfferDefault,
      numberRelOfferLowerLimit: params.numberRelOfferLowerLimit,
      numberRelOfferUpperLimit: params.numberRelOfferUpperLimit,
    };
    setDisabled(true);
    setDataSource([mutableRef]);
    setShowModal(false);
    form.resetFields();
    saveData(mutableRef);
  };

  const saveData = (
    option: product.BundledProductOfferingOption | undefined
  ) => {
    if (saveAction) {
      data.bundledProductOfferingOption = option ?? undefined;
      saveAction(data);
      notifyService.success(`BundledProductOfferingOption successfully saved`);
    }
  };

  const editRender = (char: product.BundledGroupProductOfferingOption) => {
    if (char) {
      setMode("edit");
      form.setFieldsValue(char);
      setShowModal(true);
    }
  };

  return (
    <>
      <h4>Bundle Product Offering Option</h4>
      <AppTable
        rowKey="valueFrom"
        search={false}
        columns={valueSpecColumns}
        dataSource={dataSource}
        pagination={false}
        toolBarRender={() => [
          <Button
            key="add"
            danger
            disabled={disabled}
            onClick={() => setShowModal(true)}
          >
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
          <FormBuilder form={form} meta={mode === "edit" ? editMeta : meta} />
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
