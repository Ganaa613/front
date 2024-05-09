import { getUuid } from "@/constants/converter";
import { Meta } from "antd-form-builder";

export const meta: Meta = {
  columns: 2,
  fields: [
    {
      key: "id",
      label: "Id",
      disabled: true,
      initialValue: getUuid(),
    },
    {
      key: "externalIdentifierType",
      label: "External Identifier Type",
    },
    {
      key: "owner",
      label: "Owner",
    },
  ],
};

export const editMeta: Meta = {
  columns: 2,
  fields: [
    {
      key: "id",
      label: "Id",
      disabled: true,
    },
    {
      key: "externalIdentifierType",
      label: "External Identifier Type",
    },
    {
      key: "owner",
      label: "Owner",
    },
    { key: "@type", label: "@type", disabled: true },
  ],
};
