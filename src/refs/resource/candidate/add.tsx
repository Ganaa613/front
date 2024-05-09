import React, { Dispatch, SetStateAction, useRef } from "react";
import { ProColumns, ActionType } from "@ant-design/pro-table";
import AppTable from "@/components/app-table";
import { Checkbox, Divider } from "antd";
import { resource } from "@mobicom/tmf-dti";
import notifyService from "@/services/notify.service";
import httpService from "@/services/http.service";
import queryBuilder from "@/services/queryBuilder";

type ComponentProps = {
  selectedRows: resource.ResourceCandidateRef[];
  setSelectedRows: Dispatch<SetStateAction<resource.ResourceCandidateRef[]>>;
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
        list.IResponse<resource.ResourceCandidateRef>
      >(`/resource-catalog/candidate?${queryParams}`);

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

  const onChange = (checked: boolean, ref: resource.ResourceCandidateRef) => {
    const mutableRef: resource.ResourceCandidateRef = {
      "@type": "ResourceCandidateRef",
      id: ref.id,
      name: ref.name,
      version: ref.version,
      href: ref.href,
      "@referredType": ref["@type"],
    };

    if (!checked) {
      setSelectedRows((state: resource.ResourceCandidateRef[]) =>
        state.filter((rec) => rec.id != ref.id)
      );
    } else {
      setSelectedRows((state: resource.ResourceCandidateRef[]) => [
        ...state,
        ...[mutableRef],
      ]);
    }
  };

  const columns: ProColumns<resource.ResourceCandidateRef>[] = [
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
      <h3>Resource candidate</h3>
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
