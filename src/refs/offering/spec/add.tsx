import React, { Dispatch, SetStateAction, useRef } from "react";
import { ProColumns, ActionType } from "@ant-design/pro-table";
import AppTable from "@/components/app-table";
import { Divider, Radio } from "antd";
import { product } from "@mobicom/tmf-dti";
import notifyService from "@/services/notify.service";
import httpService from "@/services/http.service";
import queryBuilder from "@/services/queryBuilder";

type ComponentProps = {
  setSelectedRows: Dispatch<SetStateAction<product.ProductSpecificationRef[]>>;
  type: string;
};

const Component: React.FC<ComponentProps> = ({ setSelectedRows, type }) => {
  const tableRef = useRef<ActionType>();

  const request = async (params: any) => {
    try {
      const queryParams = queryBuilder(params);
      const resp = await httpService.get<
        list.IResponse<product.ProductSpecification>
      >(`/${type}-catalog/specification?${queryParams}`);

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

  const onChange = (ref: product.ProductSpecification) => {
    const mutableRef: product.ProductSpecificationRef = {
      "@type": "ProductSpecificationRef",
      id: ref.id,
      name: ref.name,
      version: ref.version,
      "@referredType": ref["@type"],
      targetProductSchema: ref.targetProductSchema,
    };

    setSelectedRows((state: product.ProductSpecificationRef[]) => [
      ...state,
      ...[mutableRef],
    ]);
  };

  const columns: ProColumns<product.ProductSpecification>[] = [
    {
      key: "check",
      valueType: "radio",
      width: 30,
      render: (_, record) => <Radio onChange={() => onChange(record)} />,
    },
    {
      key: "id",
      title: "Id",
      dataIndex: "id",
      search: false,
      width: 400,
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
      <h3>Product Specification</h3>
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
