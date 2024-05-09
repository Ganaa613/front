import { DATE_FORMATTER, LIFE_CYCLE_STATUS } from "@/constants";
import { DatePicker } from "antd";
import { Meta } from "antd-form-builder";
import dayjs from "dayjs";

const { RangePicker } = DatePicker;

export const meta: Meta = {
  fields: [
    {
      key: "name",
      label: "Name",
      required: true,
    },
    { key: "description", label: "Description" },
    { key: "statusReason", label: "Status Reason" },
    { key: "isBundle", label: "Is Bundle", widget: "switch" },
    { key: "isSellable", label: "Is Sellable", widget: "switch" },
    {
      key: "lifecycleStatus",
      label: "Life cycle status",
      options: Object.values(LIFE_CYCLE_STATUS),
      widget: "select",
      required: true,
      initialValue: LIFE_CYCLE_STATUS.IN_STUDY,
      disabled: true,
    },
    {
      key: "lastUpdate",
      label: "Last Update",
      widget: DatePicker,
      widgetProps: {
        format: DATE_FORMATTER,
      },
      initialValue: dayjs(new Date()),
      disabled: true,
    },
    { key: "version", label: "Version" },
    {
      label: "Valid For",
      key: "validFor",
      widget: RangePicker,
      widgetProps: {
        showTime: {
          defaultValue: [
            dayjs("00:00:00", "HH:mm:ss"),
            dayjs("23:59:59", "HH:mm:ss"),
          ],
        },
      },
    },
    {
      key: "@type",
      label: "@type",
      initialValue: "ProductOffering",
      disabled: true,
    },
  ],
};

export const editMeta: Meta = {
  fields: [
    { key: "id", label: "id", required: true, disabled: true },
    { key: "name", label: "Name" },
    { key: "description", label: "Description" },

    { key: "statusReason", label: "Status Reason" },
    { key: "isBundle", label: "Is Bundle", widget: "switch" },
    { key: "isSellable", label: "Is Sellable", widget: "switch" },
    {
      key: "lifecycleStatus",
      label: "Life cycle status",
      options: Object.values(LIFE_CYCLE_STATUS),
      widget: "select",
      required: true,
    },
    {
      key: "lastUpdate",
      label: "Last Update",
      widget: "date-picker",
      widgetProps: {
        showTime: true,
      },
      required: true,
      disabled: true,
    },
    { key: "version", label: "Version" },
    {
      key: "validFor",
      label: "Valid For",
      widget: RangePicker,
      widgetProps: {
        showTime: {
          defaultValue: [
            dayjs("00:00:00", "HH:mm:ss"),
            dayjs("23:59:59", "HH:mm:ss"),
          ],
        },
      },
    },
    {
      key: "@type",
      label: "@type",
      disabled: true,
    },
  ],
};
