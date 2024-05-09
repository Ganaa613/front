import PriceInput from "@/components/app-input/price";
import { Meta } from "antd-form-builder";

export const meta: Meta = {
  columns: 2,
  fields: [
    { key: "taxCategory", label: "Tax category", required: true },
    {
      key: "taxAmount",
      label: "Tax amount",
      required: true,
      widget: PriceInput,
      initialValue: { value: 0, unit: "MNT" },
    },
    { key: "taxRate", label: "Tax rate", widget: "number", required: true },
    {
      key: "@type",
      label: "@type",
      initialValue: "TaxItem",
      disabled: true,
    },
  ],
};

export const editMeta: Meta = {
  columns: 2,
  fields: [
    { key: "id", label: "id", required: true, disabled: true },
    { key: "taxCategory", label: "Tax category", required: true },
    {
      key: "taxAmount",
      label: "Tax amount",
      required: true,
      widget: PriceInput,
      initialValue: { value: 0, unit: "MNT" },
    },
    { key: "taxRate", label: "Tax rate", widget: "number", required: true },
    {
      key: "@type",
      label: "@type",
      initialValue: "TaxItem",
      disabled: true,
    },
  ],
};
