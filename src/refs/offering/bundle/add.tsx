import React, { Dispatch, SetStateAction, useRef } from "react";
import { ProColumns, ActionType } from "@ant-design/pro-table";
import AppTable from "@/components/app-table";
import { Checkbox, Divider } from "antd";
import { product } from "@mobicom/tmf-dti";
import notifyService from "@/services/notify.service";
import httpService from "@/services/http.service";
import queryBuilder from "@/services/queryBuilder";

type ComponentProps = {
  selectedRows: product.BundledProductOffering[];
  setSelectedRows: Dispatch<SetStateAction<product.BundledProductOffering[]>>;
};

const Component: React.FC<ComponentProps> = ({
  selectedRows,
  setSelectedRows,
}) => {
  const tableRef = useRef<ActionType>();

  const request = async (params: any) => {
    try {
      const queryParams = queryBuilder(params);
      const resp = await httpService.get<
        list.IResponse<product.ProductOffering>
      >(`/product-catalog/offering?${queryParams}`);

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

  const onChange = (checked: boolean, ref: product.ProductOffering) => {
    const mutableRef: product.BundledProductOffering = {
      "@type": "BundleProductOffering",
      "@baseType": ref["@baseType"],
      "@referredType": ref["@type"],
      "@schemaLocation": ref["@schemaLocation"],
      id: ref.id,
      name: ref.name,
      version: ref.version,
    };

    if (!checked) {
      setSelectedRows((state: product.BundledProductOffering[]) =>
        state.filter((rec) => rec.id !== ref.id)
      );
    } else {
      setSelectedRows((state: product.BundledProductOffering[]) => [
        ...state,
        ...[mutableRef],
      ]);
    }
  };

  const columns: ProColumns<product.ProductOffering>[] = [
    {
      key: "check",
      valueType: "checkbox",
      width: 30,
      render: (_, record) => (
        <Checkbox
          checked={!!selectedRows.find((rec) => rec.id === record.id)}
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

  return (
    <>
      <h3>Bundle Product Offering</h3>
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
    </>
  );
};

export default Component;
