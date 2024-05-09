import React, { Dispatch, SetStateAction, useRef } from "react";
import { ProColumns, ActionType } from "@ant-design/pro-table";
import AppTable from "@/components/app-table";
import { Checkbox, Divider } from "antd";
import { product } from "@mobicom/tmf-dti";
import notifyService from "@/services/notify.service";
import httpService from "@/services/http.service";
import queryBuilder from "@/services/queryBuilder";

type ComponentProps = {
  // selectedRows: product.ProductOfferingRef[];
  setSelectedRows: Dispatch<SetStateAction<product.ProductOfferingRef[]>>;
};

const Component: React.FC<ComponentProps> = ({
  // selectedRows,
  setSelectedRows,
}) => {
  const tableRef = useRef<ActionType>();

  const request = async (params: any) => {
    try {
      const queryParams = queryBuilder(params);
      const resp = await httpService.get<
        list.IResponse<product.ProductOfferingRef>
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
    const mutableRef: product.ProductOfferingRef = {
      "@type": "ProductOfferingRef",
      id: ref.id,
      name: ref.name,
      version: ref.version,
      "@referredType": ref["@type"],
    };

    if (!checked) {
      setSelectedRows((state: product.ProductOfferingRef[]) =>
        state.filter((rec) => rec.id !== ref.id)
      );
    } else {
      setSelectedRows((state: product.ProductOfferingRef[]) => [
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
          // checked={!!selectedRows.find((rec) => rec.id === record.id)}
          onChange={(e) => onChange(e.target.checked, record)}
        />
      ),
    },
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
    },
    {
      key: "version",
      title: "Version",
      dataIndex: "version",
      search: false,
    },
  ];

  return (
    <>
      <h3>Product Offering Ref</h3>
      <Divider />
      <AppTable
        rowKey="id"
        request={request}
        columns={columns}
        actionRef={tableRef}
      />
    </>
  );
};

export default Component;
