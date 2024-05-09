import React, { Dispatch, SetStateAction, useRef } from "react";
import { ProColumns, ActionType } from "@ant-design/pro-table";
import AppTable from "@/components/app-table";
import { Checkbox, Divider } from "antd";
import { common } from "@mobicom/tmf-dti";
import notifyService from "@/services/notify.service";
import httpService from "@/services/http.service";
import queryBuilder from "@/services/queryBuilder";

type ComponentProps = {
  selectedRows: common.CharacteristicSpecification[];
  setSelectedRows: Dispatch<
    SetStateAction<common.CharacteristicSpecification[]>
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
        list.IResponse<common.CharacteristicSpecification>
      >(`/product-catalog/specification?${queryParams}`);

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
    ref: common.CharacteristicSpecification
  ) => {
    const mutableRef: common.CharacteristicSpecification = {
      "@type": "CharacteristicSpecification",
      "@baseType": ref["@baseType"],
      "@schemaLocation": ref["@schemaLocation"],
      charSpecRelationship: ref.charSpecRelationship,
      characteristicValueSpecification: ref.characteristicValueSpecification,
      configurable: ref.configurable,
      description: ref.description,
      extensible: ref.extensible,
      id: ref.id,
      isUnique: ref.isUnique,
      maxCardinality: ref.maxCardinality,
      minCardinality: ref.minCardinality,
      name: ref.name,
      regex: ref.regex,
      validFor: ref.validFor,
      valueType: ref.valueType,
      "@valueSchemaLocation": ref["@valueSchemaLocation"],
    };

    if (!checked) {
      setSelectedRows((state: common.CharacteristicSpecification[]) =>
        state.filter((rec) => rec.id != ref.id)
      );
    } else {
      setSelectedRows((state: common.CharacteristicSpecification[]) => [
        ...state,
        ...[mutableRef],
      ]);
    }
  };

  const columns: ProColumns<common.CharacteristicSpecification>[] = [
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
      key: "name",
      title: "Name",
      dataIndex: "name",
    },
    {
      key: "description",
      title: "Description",
      dataIndex: "description",
      search: false,
    },
    {
      key: "@type",
      title: "@type",
      dataIndex: "@type",
      search: false,
    },
  ];

  return (
    <>
      <h3>Prduct Specfification Characteristic</h3>
      <Divider />
      <AppTable
        rowKey="name"
        request={request}
        columns={columns}
        actionRef={tableRef}
      />
    </>
  );
};

export default Component;
