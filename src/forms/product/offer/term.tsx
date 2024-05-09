import DurationInput from "@/components/app-input/duration";
import { DURATION_OPTIONS } from "@/constants";
import { DatePicker } from "antd";
import { Meta } from "antd-form-builder";
import dayjs from "dayjs";

const { RangePicker } = DatePicker;

export const meta: Meta = {
  columns: 2,
  fields: [
    { key: "name", label: "Name", required: true },
    { key: "description", label: "Description" },
    {
      key: "duration",
      label: "Duration",
      widget: DurationInput,
      initialValue: { amount: 0, units: DURATION_OPTIONS.hour },
    },
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
      initialValue: "ProductOfferingTerm",
      disabled: true,
    },
  ],
};
export const editMeta: Meta = {
  columns: 2,
  fields: [
    { key: "name", label: "Name", required: true },
    { key: "description", label: "Description" },
    {
      key: "duration",
      label: "Duration",
      widget: DurationInput,
      initialValue: { amount: 0, units: DURATION_OPTIONS.hour },
    },
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
      initialValue: "ProductOfferingTerm",
      disabled: true,
    },
  ],
};
