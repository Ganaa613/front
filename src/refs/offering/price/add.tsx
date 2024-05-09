import React, { Dispatch, SetStateAction, useRef } from "react";
import { ProColumns, ActionType } from "@ant-design/pro-table";
import AppTable from "@/components/app-table";
import { Button, Checkbox, Divider, Row } from "antd";
import { product } from "@mobicom/tmf-dti";
import notifyService from "@/services/notify.service";
import httpService from "@/services/http.service";
import queryBuilder from "@/services/queryBuilder";

type ComponentProps = {
  selectedRows: (
    | product.ProductOfferingPrice
    | product.ProductOfferingPriceRef
  )[];
  setSelectedRows: Dispatch<
    SetStateAction<
      (product.ProductOfferingPrice | product.ProductOfferingPriceRef)[]
    >
  >;
  saveAction: () => void;
  cancel: () => void;
};

const Component: React.FC<ComponentProps> = ({
  selectedRows,
  setSelectedRows,
  saveAction,
  cancel,
}) => {
  const tableRef = useRef<ActionType>();

  const request = async (params: any) => {
    try {
      const queryParams = queryBuilder(params);
      const resp = await httpService.get<
        list.IResponse<product.ProductOfferingPrice>
      >(`/product-catalog/offering-price?${queryParams}`);

      return {
        success: true,
        data: resp.data,
        total: resp.total,
      };
    } catch (error: any) {
      notifyService.error(error.message);
      return {
        success: false,
      };
    }
  };

  const onChange = (checked: boolean, ref: product.ProductOfferingPrice) => {
    const mutableRef: product.ProductOfferingPriceRef = {
      "@type": "ProductOfferingPriceRef",
      "@baseType": ref["@baseType"],
      "@referredType": ref["@type"],
      "@schemaLocation": ref["@schemaLocation"],
      id: ref.id,
      name: ref.name,
      version: ref.version,
    };

    if (!checked) {
      setSelectedRows((state) => state.filter((rec) => rec.id !== ref.id));
    } else {
      setSelectedRows((state) => [...state, ...[mutableRef]]);
    }
  };

  const columns: ProColumns<product.ProductOfferingPrice>[] = [
    {
      key: "check",
      valueType: "checkbox",
      width: 30,
      render: (_, record) => (
        <Checkbox
          checked={!!selectedRows.find((rec) => rec.id === record.id)}
          disabled={!!selectedRows.find((rec) => rec.id === record.id)}
          onChange={(e) => onChange(e.target.checked, record)}
        />
      ),
    },
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
    },
  ];

  const handleCancel = () => {
    cancel();
  };

  return (
    <>
      <h3>Product Offer Pricing</h3>
      <Divider />
      <AppTable
        rowKey="id"
        request={request}
        columns={columns}
        actionRef={tableRef}
        pagination={{
          defaultCurrent: 1,
          defaultPageSize: 5,
          position: ["bottomRight"],
        }}
      />
      <Divider />
      <Row justify="end">
        <Button type="default" onClick={handleCancel}>
          Cancel
        </Button>
        <Button type="primary" onClick={saveAction}>
          Save
        </Button>
      </Row>
    </>
  );
};

export default Component;
