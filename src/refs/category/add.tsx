import React, { Dispatch, SetStateAction, useRef } from "react";
import { ProColumns, ActionType } from "@ant-design/pro-table";
import AppTable from "@/components/app-table";
import { Checkbox, Divider } from "antd";
import { product } from "@mobicom/tmf-dti";
import notifyService from "@/services/notify.service";
import httpService from "@/services/http.service";
import queryBuilder from "@/services/queryBuilder";
import { useParams } from "react-router-dom";

type ComponentProps = {
  // selectedRows: product.CategoryRef[];
  setSelectedRows: Dispatch<SetStateAction<product.CategoryRef[]>>;
  type: string;
};

const Component: React.FC<ComponentProps> = ({
  // selectedRows,
  setSelectedRows,
  type,
}) => {
  const params = useParams();
  const tableRef = useRef<ActionType>();

  const request = async (queryParams: any) => {
    try {
      const resp = await httpService.get<list.IResponse<product.Category>>(
        `/${type}-catalog/category?${queryBuilder(queryParams)}`
      );

      let data: any = [];
      if (resp.data.length > 0) {
        data = resp.data.filter((rec) => rec.id !== params.id);
      }

      return {
        success: true,
        data: data,
        total: data.length,
      };
    } catch (error: any) {
      notifyService.error(error.message);
      return {
        success: false,
      };
    }
  };

  const onChange = (checked: boolean, ref: product.Category) => {
    const mutableRef: product.CategoryRef = {
      "@type": "CategoryRef",
      id: ref.id,
      name: ref.name,
      version: ref.version,
      "@referredType": ref["@type"],
    };

    if (!checked) {
      setSelectedRows((state: product.CategoryRef[]) =>
        state.filter((rec) => rec.id !== ref.id)
      );
    } else {
      setSelectedRows((state: product.CategoryRef[]) => [
        ...state,
        ...[mutableRef],
      ]);
    }
  };

  const columns: ProColumns<product.Category>[] = [
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
      <h3>Category</h3>
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
