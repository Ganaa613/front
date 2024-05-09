import React, { Dispatch, SetStateAction, useRef } from "react";
import { ProColumns, ActionType } from "@ant-design/pro-table";
import AppTable from "@/components/app-table";
import { Checkbox, Divider } from "antd";
import { product, resource } from "@mobicom/tmf-dti";
import notifyService from "@/services/notify.service";
import httpService from "@/services/http.service";
import queryBuilder from "@/services/queryBuilder";
import { renderDate } from "@/constants/converter";

type ComponentProps = {
  selectedRows: resource.ResourceSpecificationRelationship[];
  setSelectedRows: Dispatch<
    SetStateAction<resource.ResourceSpecificationRelationship[]>
  >;
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
        list.IResponse<product.ProductSpecificationRelationship>
      >(`/resource-catalog/specification?${queryParams}`);

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

  const onChange = (
    checked: boolean,
    ref: resource.ResourceSpecificationRelationship
  ) => {
    const mutableRef: resource.ResourceSpecificationRelationship = {
      "@type": "ResourceSpecificationRelationship",
      id: ref.id,
      name: ref.name,
      href: ref.href,
      characteristic: ref.characteristic,
      relationshipType: "OptionalFor",
      validFor: ref.validFor,
    };

    if (!checked) {
      setSelectedRows((state: resource.ResourceSpecificationRelationship[]) =>
        state.filter((rec) => rec.id != ref.id)
      );
    } else {
      setSelectedRows((state: resource.ResourceSpecificationRelationship[]) => [
        ...state,
        ...[mutableRef],
      ]);
    }
  };

  const columns: ProColumns<resource.ResourceSpecificationRelationship>[] = [
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
    {
      key: "version",
      title: "Version",
      dataIndex: "version",
      search: false,
    },
    {
      key: "startDate",
      title: "Start Date",
      dataIndex: ["validFor", "startDateTime"],
      render: (val: any) => renderDate(val),
      search: false,
    },
    {
      key: "endDate",
      title: "End Date",
      dataIndex: ["validFor", "endDateTime"],
      render: (val: any) => renderDate(val),
      search: false,
    },
  ];

  return (
    <>
      <h3>Resource specification relationship</h3>
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
