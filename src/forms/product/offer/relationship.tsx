import { OFFER_RELATIONSHIP_TYPE } from "@/constants";
import { DatePicker } from "antd";
import { Meta } from "antd-form-builder";
import dayjs from "dayjs";

const { RangePicker } = DatePicker;

export const editMeta: Meta = {
  fields: [
    { key: "id", label: "id", required: true, disabled: true },
    { key: "name", label: "Name", disabled: true },
    {
      key: "relationshipType",
      label: "Type",
      widget: "select",
      options: Object.values(OFFER_RELATIONSHIP_TYPE),
    },
    { key: "role", label: "Role" },
    {
      key: "validFor",
      label: "Valid For",
      widget: RangePicker,
      disabled: true,
      widgetProps: {
        showTime: {
          defaultValue: [
            dayjs("00:00:00", "HH:mm:ss"),
            dayjs("23:59:59", "HH:mm:ss"),
          ],
        },
      },
    },
    { key: "version", label: "Version", disabled: true },
    { key: "@referredType", label: "@referredType", disabled: true },
    {
      key: "@type",
      label: "@type",
      disabled: true,
    },
  ],
};
