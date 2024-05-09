import React, { useState } from "react";
import { Button, Col, Divider, Form, Modal, Row, Space } from "antd";
import FormBuilder from "antd-form-builder";
import { meta } from "@/forms/service/candidate";
import { useNavigate } from "react-router-dom";
import http from "@/services/http.service";
import { service } from "@mobicom/tmf-dti";
import notifyService from "@/services/notify.service";
import { getValidForToObject } from "@/constants/converter";
import Add from "@/refs/service/spec/single/add";

const Component: React.FC = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [selectedRows, setSelectedRows] = useState<
    service.ServiceSpecificationRef[]
  >([]);
  const [showModal, setShowModal] = useState(false);
  const [serviceSpec, setServiceSpec] =
    useState<service.ServiceSpecificationRef>();

  const handleSubmit = async (req: service.Candidate) => {
    req["@type"] = "@ServiceCandidate";
    req.validFor = getValidForToObject(req.validFor) ?? {};
    if (serviceSpec !== undefined) {
      req.serviceSpecification = serviceSpec;
    }
    const reqData = { data: req };
    try {
      const resp = await http.post<service.Candidate>(
        "/service-catalog/candidate",
        reqData
      );
      notifyService.success(`Candidate successfully created`);
      navigate(`/service/candidate/${resp.id}`);
    } catch (error: any) {
      notifyService.error(error.message);
    }
  };

  const goBack = () => {
    navigate("/service/candidate");
  };

  const onChange = () => {
    console.log("selectedRows", selectedRows);
    setServiceSpec(selectedRows[0]);
    // setDataSource(selectedRows);
    setShowModal(false);
  };

  return (
    <>
      <h2>Create candidate</h2>
      <Divider />
      <Row align={"middle"} justify={"center"}>
        <Col span={16}>
          <Form form={form} onFinish={handleSubmit}>
            <FormBuilder form={form} meta={meta} />
            <></>
            <Divider />
            <Form.Item wrapperCol={{ span: 10, offset: 8 }}>
              <Space>
                <Button key="cancel" type="default" onClick={goBack}>
                  Cancel
                </Button>
                <Button
                  key="addServiceSpec"
                  type="primary"
                  onClick={() => setShowModal(true)}
                >
                  Add service spec
                </Button>
                <Button
                  key="add"
                  type="primary"
                  htmlType="submit"
                  disabled={serviceSpec === undefined}
                >
                  Save
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </Col>
        <Modal
          open={showModal}
          onOk={onChange}
          centered
          closable={false}
          width={1000}
          footer={[
            <Divider key="divider" />,
            <Button
              key="close"
              type="default"
              onClick={() => setShowModal(false)}
            >
              Close
            </Button>,
            <Button key="save" type="primary" onClick={onChange}>
              Save
            </Button>,
          ]}
        >
          <Add selectedRows={selectedRows} setSelectedRows={setSelectedRows} />
        </Modal>
      </Row>
    </>
  );
};

export default Component;
