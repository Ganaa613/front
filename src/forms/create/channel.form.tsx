import { Meta } from "antd-form-builder";

export const meta: Meta = {
  columns: 2,
  fields: [
    { key: "name", label: "Name", required: true },
    {
      key: "@type",
      label: "@type",
      initialValue: "ChannelRef",
      disabled: true,
    },
  ],
};

export const editMeta: Meta = {
  columns: 2,
  fields: [
    { key: "id", label: "Id", required: true, disabled: true },
    { key: "name", label: "Name", required: true },
    {
      key: "@type",
      label: "@type",
      initialValue: "ChannelRef",
      disabled: true,
    },
  ],
};
