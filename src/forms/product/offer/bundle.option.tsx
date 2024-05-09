import { Meta } from "antd-form-builder";

export const meta: Meta = {
  fields: [
    {
      key: "numberRelOfferDefault",
      label: "Default Number",
      widget: "number",
      required: true,
    },
    {
      key: "numberRelOfferLowerLimit",
      label: "Lower limit",
      widget: "number",
      required: true,
    },
    {
      key: "numberRelOfferUpperLimit",
      label: "Upper limit",
      widget: "number",
      required: true,
    },
  ],
};

export const editMeta: Meta = {
  fields: [
    {
      key: "numberRelOfferDefault",
      label: "Default Number",
      widget: "number",
      required: true,
    },
    {
      key: "numberRelOfferLowerLimit",
      label: "Lower limit",
      widget: "number",
      required: true,
    },
    {
      key: "numberRelOfferUpperLimit",
      label: "Upper limit",
      widget: "number",
      required: true,
    },
  ],
};
