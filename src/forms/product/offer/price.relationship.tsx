import { OFFER_PRICE_RELATIONSHIP_TYPE } from "@/constants";
import { Meta } from "antd-form-builder";

export const editMeta: Meta = {
  fields: [
    { key: "id", label: "id", required: true, disabled: true },
    { key: "name", label: "Name", disabled: true },
    {
      key: "relationshipType",
      label: "Type",
      widget: "select",
      options: Object.values(OFFER_PRICE_RELATIONSHIP_TYPE),
    },
    { key: "role", label: "Role" },
    { key: "version", label: "Version", disabled: true },
    { key: "@referredType", label: "@referredType", disabled: true },
    {
      key: "@type",
      label: "@type",
      disabled: true,
    },
  ],
};
