import {
  DEFAULT_NAME_MAX_VALUE,
  DEFAULT_NAME_MIN_VALUE,
  REGEX_NAME,
} from "@/constants";
import { getUuid } from "@/constants/converter";
import { DatePicker } from "antd";
import { Meta } from "antd-form-builder";

const { RangePicker } = DatePicker;

export const meta: Meta = {
  columns: 2,
  fields: [
    { key: "id", label: "id", initialValue: getUuid(), disabled: true },
    {
      key: "name",
      label: "Name",
      rules: [
        { required: true, message: "Please enter name" },
        {
          min: DEFAULT_NAME_MIN_VALUE,
          max: DEFAULT_NAME_MAX_VALUE,
          message: "Name must be at least 3 characters long",
        },
        {
          validator: (_, value) => {
            if (!REGEX_NAME.test(value)) {
              return Promise.reject("Invalid name");
            }
            return Promise.resolve();
          },
        },
      ],
    },
    {
      key: "relationshipType",
      label: "Relationship Type",
    },
    {
      key: "role",
      label: "Role",
    },
    {
      key: "maximumQuantity",
      label: "Max Quantity",
      widget: "number",
      initialValue: 0,
    },
    {
      key: "minimumQuantity",
      label: "Min Quantity",
      widget: "number",
      initialValue: 0,
    },
    { key: "defaultQuantity", label: "Default Quantity", widget: "number" },
    {
      key: "validFor",
      label: "Valid For",
      widget: RangePicker,
      widgetProps: { showTime: true },
    },
  ],
};

export const editMeta: Meta = {
  columns: 2,
  fields: [
    { key: "id", label: "id", disabled: true },
    {
      key: "name",
      label: "Name",
      rules: [
        { required: true, message: "Please enter name" },
        {
          min: DEFAULT_NAME_MIN_VALUE,
          max: DEFAULT_NAME_MAX_VALUE,
          message: "Name must be at least 3 characters long",
        },
      ],
    },
    {
      key: "relationshipType",
      label: "Relationship Type",
    },
    {
      key: "role",
      label: "Role",
    },
    {
      key: "maximumQuantity",
      label: "Max Quantity",
      widget: "number",
    },
    {
      key: "minimumQuantity",
      label: "Min Quantity",
      widget: "number",
    },
    { key: "defaultQuantity", label: "Default Quantity", widget: "number" },
    {
      key: "validFor",
      label: "Valid For",
      widget: RangePicker,
      widgetProps: { showTime: true },
    },
    {
      key: "characteristic",
      label: "Characteristic",
      disabled: true,
    },
  ],
};
