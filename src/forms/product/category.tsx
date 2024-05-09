import {
  DATE_FORMATTER,
  DEFAULT_DESCRIPTION_MAX_VALUE,
  DEFAULT_DESCRIPTION_MIN_VALUE,
  DEFAULT_NAME_MAX_VALUE,
  DEFAULT_NAME_MIN_VALUE,
  LIFECYCLE_STATUS,
  REGEX_NAME,
  REGEX_VERSION_1,
  REGEX_VERSION_2,
} from "@/constants";
import { DatePicker } from "antd";
import { Meta } from "antd-form-builder";
import dayjs from "dayjs";

const { RangePicker } = DatePicker;

export const meta: Meta = {
  columns: 2,
  fields: [
    // { key: "id", label: "Id", required: true },
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
            const regex = /^[A-Z][a-zA-Z0-9_]+$/;
            if (!regex.test(value)) {
              return Promise.reject("Invalid name");
            }
            return Promise.resolve();
          },
        },
      ],
    },
    {
      key: "description",
      label: "Description",
      rules: [
        { required: true, message: "Please enter description" },
        {
          min: DEFAULT_DESCRIPTION_MIN_VALUE,
          max: DEFAULT_DESCRIPTION_MAX_VALUE,
          message: "Description must be at least 3 characters long",
        },
      ],
      widget: "textarea",
    },
    { key: "isRoot", label: "Is Root", widget: "switch", initialValue: false },
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
    {
      key: "lifecycleStatus",
      label: "Lifecycle Status",
      widget: "select",
      options: LIFECYCLE_STATUS,
      required: true,
    },
    {
      key: "validFor",
      label: "Valid For",
      widget: RangePicker,
      widgetProps: { showTime: true },
    },
    {
      key: "version",
      label: "Version",
      rules: [
        {
          validator: (_, value) => {
            if (value !== undefined && value !== "") {
              if (
                !REGEX_VERSION_1.test(value) &&
                !REGEX_VERSION_2.test(value)
              ) {
                return Promise.reject("Invalid version");
              }
            }
            return Promise.resolve();
          },
        },
      ],
    },
  ],
};

export const editMeta: Meta = {
  columns: 2,
  fields: [
    { key: "id", label: "Id", disabled: true },
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
      key: "description",
      label: "Description",
      widget: "textarea",
      rules: [
        { required: true, message: "Please enter description" },
        {
          min: DEFAULT_DESCRIPTION_MIN_VALUE,
          max: DEFAULT_DESCRIPTION_MAX_VALUE,
          message: "Description must be at least 3 characters long",
        },
      ],
    },
    { key: "href", label: "Href", widget: "textarea", disabled: true },
    {
      key: "lastUpdate",
      label: "Last Updated",
      widget: "date-picker",
      widgetProps: {
        showTime: true,
      },
      required: true,
      disabled: true,
    },
    { key: "isRoot", label: "Is Root", widget: "switch" },
    {
      key: "lifecycleStatus",
      label: "Lifecycle Status",
      widget: "select",
      options: LIFECYCLE_STATUS,
    },
    // { key: "parent", label: "Parent", widget: "select" },
    {
      key: "validFor",
      label: "Valid For",
      widget: RangePicker,
      widgetProps: {
        showTime: true,
      },
    },
    {
      key: "version",
      label: "Version",
      rules: [
        {
          validator: (_, value) => {
            if (value !== undefined && value !== "") {
              if (
                !REGEX_VERSION_1.test(value) &&
                !REGEX_VERSION_2.test(value)
              ) {
                return Promise.reject("Invalid version");
              }
            }
            return Promise.resolve();
          },
        },
      ],
    },
    { key: "@type", label: "@type", disabled: true },
  ],
};
