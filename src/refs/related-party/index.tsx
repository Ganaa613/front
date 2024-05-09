import { useState } from "react";
import { ProColumns } from "@ant-design/pro-table";
import AppTable from "@/components/app-table";
import { Button, Col, Divider, Form, Modal, Row, Space } from "antd";
import { engages_party } from "@mobicom/tmf-dti";
import {
  meta,
  metaParty,
  metaPartyRole,
} from "@/forms/create/related.party.form";
import FormBuilder from "antd-form-builder";
import AppTableItemControll from "@/components/app-tableItem-controll";
import { getUuid } from "@/constants/converter";

type ComponentProps = {
  data: any[];
  saveAction?: (data: any[]) => void;
  clickPrevious?: () => void;
  loading: boolean;
};

const Component: React.FC<ComponentProps> = ({
  data,
  saveAction,
  clickPrevious,
  loading,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [partyType, setPartyType] = useState<string>();
  const [dataSource, setDataSource] =
    useState<engages_party.RelatedPartyRefOrPartyRoleRef[]>(data);
  const [form] = Form.useForm();

  const defaultColumns: ProColumns[] = [
    {
      key: "id",
      title: "Id",
      dataIndex: ["partyOrPartyRole", "id"],
      search: false,
    },
    {
      key: "name",
      title: "Name",
      dataIndex: ["partyOrPartyRole", "name"],
      search: false,
    },
    {
      key: "role",
      title: "Role",
      dataIndex: "role",
      search: false,
    },
    {
      key: "partyId",
      title: "Party Id",
      dataIndex: ["partyOrPartyRole", "partyId"],
      search: false,
    },
    {
      key: "partyName",
      title: "Party Name",
      dataIndex: ["partyOrPartyRole", "partyName"],
      search: false,
    },
    {
      key: "@type",
      title: "@type",
      dataIndex: ["partyOrPartyRole", "@type"],
      search: false,
    },
    {
      key: "action",
      title: "Action",
      render: (_text, _record, index) => (
        <AppTableItemControll deleteAction={() => onDelete(index)} />
      ),
      search: false,
      fixed: "right",
      width: 100,
      align: "center",
    },
  ];

  // const handleDelete = (id: string) => {
  //   setDataSource((state) => {
  //     return state.filter((e) => e.partyOrPartyRole.id !== id);
  //   });
  // };

  const onDelete = (index: number) => {
    setDataSource((state) => {
      return state.filter((_, i) => i !== index);
    });
  };

  const onSave = () => {
    if (saveAction) {
      saveAction(dataSource);
      data = dataSource;
    }
  };

  const onReset = () => {
    setDataSource(data);
  };

  const onChange = () => {
    const params = form.getFieldsValue();
    if (params["role"] !== undefined) {
      if (params["partyOrPartyRole"]["name"] !== undefined) {
        if (params["party"] === "party") {
          params.partyOrPartyRole["@type"] = "PartyRef";
          params.partyOrPartyRole["@referredType"] = "@PartyRef";
        } else {
          params.partyOrPartyRole["@type"] = "PartyRoleRef";
          params.partyOrPartyRole["@referredType"] = "@PartyRoleRef";
        }
      }
      const mutableRef: engages_party.RelatedPartyRefOrPartyRoleRef = {
        "@type": "RelatedPartyRefOrPartyRoleRef",
        partyOrPartyRole:
          params.partyOrPartyRole["name"] !== undefined
            ? params.partyOrPartyRole
            : undefined,
        role: params.role,
      };

      if (
        params["party"] !== undefined &&
        params.partyOrPartyRole["name"] !== undefined &&
        params.role !== undefined
      ) {
        setData(mutableRef);
      } else if (params["party"] === undefined && params.role !== undefined) {
        setData(mutableRef);
      }
    }
  };

  const setData = (data: engages_party.RelatedPartyRefOrPartyRoleRef) => {
    data.partyOrPartyRole.id = getUuid();
    setDataSource((state: engages_party.RelatedPartyRefOrPartyRoleRef[]) => [
      ...state,
      ...[data],
    ]);
    setShowModal(false);
    form.resetFields();
  };

  const onClose = () => {
    setShowModal(false);
    form.resetFields();
  };

  const valueChange = () => {
    setPartyType(form.getFieldValue("party"));
    if (form.getFieldValue("party") === "party") {
      form.setFieldValue(["partyOrPartyRole", "partyId"], undefined);
      form.setFieldValue(["partyOrPartyRole", "partyName"], undefined);
    }
  };

  const onClickPrevious = () => {
    if (clickPrevious) {
      clickPrevious();
    }
  };

  const addRelatedParty = () => {
    setShowModal(true);
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
          <Button key="add" type="primary" onClick={() => addRelatedParty()}>
            Add
          </Button>,
        ]}
        loading={loading}
      />
      <Divider />
      <Row justify="space-between">
        <Col>
          <Button type="default" onClick={() => onClickPrevious()}>
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
        onOk={onChange}
        centered
        closable={false}
        width={1000}
        footer={[]}
      >
        <h3>Related Party</h3>
        <Divider />
        <Form form={form} onFinish={onChange} onValuesChange={valueChange}>
          <FormBuilder form={form} meta={meta} />
          <div hidden={partyType === "party" || partyType === undefined}>
            <FormBuilder form={form} meta={metaPartyRole} />
          </div>
          <div hidden={partyType === "partyRole" || partyType === undefined}>
            <FormBuilder form={form} meta={metaParty} />
          </div>
          <Divider />
          <Button type="default" onClick={onClose}>
            Close
          </Button>
          <Button htmlType="submit" type="primary" onClick={onChange}>
            Save
          </Button>
        </Form>
      </Modal>
    </>
  );
};

export default Component;
