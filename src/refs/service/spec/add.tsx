import React, { Dispatch, SetStateAction, useRef } from "react";
import { ProColumns, ActionType } from "@ant-design/pro-table";
import AppTable from "@/components/app-table";
import { Checkbox, Divider } from "antd";
import { service } from "@mobicom/tmf-dti";
import notifyService from "@/services/notify.service";
import httpService from "@/services/http.service";
import queryBuilder from "@/services/queryBuilder";

type ComponentProps = {
  selectedRows: service.ServiceSpecificationRef[];
  setSelectedRows: Dispatch<SetStateAction<service.ServiceSpecificationRef[]>>;
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
        list.IResponse<service.ServiceSpecificationRef>
      >(`/service-catalog/specification?${queryParams}`);

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

  const onChange = (checked: boolean, ref: service.ServiceSpecificationRef) => {
    const mutableRef: service.ServiceSpecificationRef = {
      "@type": "ServiceSpecificationRef",
      id: ref.id,
      name: ref.name,
      version: ref.version,
      "@referredType": ref["@type"],
    };

    if (!checked) {
      setSelectedRows((state: service.ServiceSpecificationRef[]) =>
        state.filter((rec) => rec.id != ref.id)
      );
    } else {
      setSelectedRows((state: service.ServiceSpecificationRef[]) => [
        ...state,
        ...[mutableRef],
      ]);
    }
  };

  const columns: ProColumns<service.ServiceSpecificationRef>[] = [
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
      width: 250,
    },
    {
      key: "name",
      title: "Name",
      dataIndex: "name",
    },
    {
      key: "href",
      title: "Href",
      dataIndex: "href",
      search: false,
    },
    {
      key: "version",
      title: "Version",
      dataIndex: "version",
    },
  ];

  return (
    <>
      <h3>Service specification</h3>
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
