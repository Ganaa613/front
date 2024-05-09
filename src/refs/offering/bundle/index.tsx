import { useState } from "react";
import { ProColumns } from "@ant-design/pro-table";
import AppTable from "@/components/app-table";
import { Button, Col, Divider, Modal, Row, Space } from "antd";
import Add from "./add";
import { product } from "@mobicom/tmf-dti";
import Option from "./value";
import AppTableItemControll from "@/components/app-tableItem-controll";

type ComponentProps = {
  data: any[];
  saveAction?: (data: any[]) => void;
  isDisabled?: boolean;
  clickPrevious?: () => void;
};

const Component: React.FC<ComponentProps> = ({
  data,
  saveAction,
  isDisabled,
  clickPrevious,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [dataSource, setDataSource] = useState<any[]>(data);
  const [selectedRows, setSelectedRows] =
    useState<product.BundledProductOffering[]>(data);

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
      title: "Action",
      render: (record: any) => (
        <AppTableItemControll deleteAction={() => handleDelete(record.id)} />
      ),
      search: false,
      fixed: "right",
      width: 100,
      align: "center",
    },
  ];

  const handleDelete = (id: string) => {
    console.log("id: ", id);
    setDataSource((state) => state.filter((e) => e.id !== id));
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
    setDataSource(selectedRows);
    setShowModal(false);
  };

  const onClose = () => {
    setShowModal(false);
  };
  const saveOffering = (data: product.BundledProductOffering) => {
    setDataSource((state) => {
      return state.map((e) => {
        if (e.id === data.id) {
          return data;
        }
        return e;
      });
    });
  };

  const onClickPrevious = () => {
    if (clickPrevious) {
      clickPrevious();
    }
  };

  return (
    <>
      {isDisabled ? (
        <>Disabled</>
      ) : (
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
                onClick={() => setShowModal(true)}
              >
                Add
              </Button>,
            ]}
            expandable={{
              expandedRowRender: (record) => (
                <Option data={record} saveAction={saveOffering} />
              ),
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
            onOk={onChange}
            centered
            closable={false}
            width={1000}
            footer={[
              <Divider key="divider" />,
              <Button key="close" type="default" onClick={onClose}>
                Close
              </Button>,
              <Button key="save" type="primary" onClick={onChange}>
                Save
              </Button>,
            ]}
          >
            <Add
              selectedRows={selectedRows}
              setSelectedRows={setSelectedRows}
            />
          </Modal>
        </>
      )}
    </>
  );
};

export default Component;
