import {
  DEFAULT_DESCRIPTION_MAX_VALUE,
  DEFAULT_DESCRIPTION_MIN_VALUE,
  DEFAULT_NAME_MAX_VALUE,
  DEFAULT_NAME_MIN_VALUE,
  // REGEX_NAME,
  VALUE_TYPE,
} from "@/constants";
// import { getUuid } from "@/constants/converter";
import { DatePicker } from "antd";
import { Meta } from "antd-form-builder";

const { RangePicker } = DatePicker;

export const meta: Meta = {
  columns: 2,
  fields: [
    // { key: "id", label: "id", initialValue: getUuid(), disabled: true },
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
        // {
        //   validator: (_, value) => {
        //     if (!REGEX_NAME.test(value)) {
        //       return Promise.reject("Invalid name");
        //     }
        //     return Promise.resolve();
        //   },
        // },
      ],
    },
    {
      key: "valueType",
      label: "Value Type",
      required: true,
      widget: "select",
      options: VALUE_TYPE,
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
    {
      key: "configurable",
      label: "Configurable",
      widget: "switch",
      initialValue: false,
    },
    {
      key: "extensible",
      label: "Extensible",
      widget: "switch",
      initialValue: false,
    },
    {
      key: "maxCardinality",
      label: "Max Cardinality",
      widget: "number",
      initialValue: 0,
    },
    {
      key: "minCardinality",
      label: "Min Cardinality",
      widget: "number",
      initialValue: 0,
    },
    {
      key: "isUnique",
      label: "Is Unique",
      widget: "switch",
      initialValue: false,
    },
    { key: "regex", label: "Regex" },
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
      key: "valueType",
      label: "Value Type",
      required: true,
      widget: "select",
      options: VALUE_TYPE,
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
    {
      key: "configurable",
      label: "Configurable",
      widget: "switch",
    },
    {
      key: "extensible",
      label: "Extensible",
      widget: "switch",
    },
    {
      key: "maxCardinality",
      label: "Max Cardinality",
      widget: "number",
    },
    {
      key: "minCardinality",
      label: "Min Cardinality",
      widget: "number",
    },
    {
      key: "isUnique",
      label: "Is Unique",
      widget: "switch",
    },
    { key: "regex", label: "Regex" },
    {
      key: "validFor",
      label: "Valid For",
      widget: RangePicker,
      widgetProps: { showTime: true },
    },
    {
      key: "characteristicValueSpecification",
      label: "Characteristic Value Specification",
      disabled: true,
    },
    {
      key: "charSpecRelationship",
      label: "Characteristic Spec Relationship",
      disabled: true,
    },
  ],
};

export const metaValueSpec: Meta = {
  columns: 2,
  fields: [
    {
      key: "valueTo",
      label: "Value To",
      rules: [{ required: true, message: "Please enter value to!" }],
      widget: "number",
    },
    {
      key: "valueFrom",
      label: "Value From",
      rules: [{ required: true, message: "Please enter value from!" }],
      widget: "number",
    },
    {
      key: "valueType",
      label: "Value Type",
      rules: [{ required: true, message: "Please choose value type!" }],
      widget: "select",
      options: ["string", "number", "date"],
    },
    {
      key: "isDefault",
      label: "Is Default",
      widget: "switch",
      initialValue: false,
    },
    { key: "rangeInterval", label: "Range Interval" },
    { key: "regex", label: "Regex" },
    {
      key: "unitOfMeasure",
      label: "Unit of Measure",
    },
    {
      key: "validFor",
      label: "Valid For",
      widget: RangePicker,
      widgetProps: { showTime: true },
    },
  ],
};

export const metaValueUse: Meta = {
  columns: 2,
  fields: [
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
        // {
        //   validator: (_, value) => {
        //     if (!REGEX_NAME.test(value)) {
        //       return Promise.reject("Invalid name");
        //     }
        //     return Promise.resolve();
        //   },
        // },
      ],
    },
    {
      key: "valueType",
      label: "Value Type",
      required: true,
      widget: "select",
      options: VALUE_TYPE,
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
    {
      key: "maxCardinality",
      label: "Max Cardinality",
      widget: "number",
      initialValue: 0,
    },
    {
      key: "minCardinality",
      label: "Min Cardinality",
      widget: "number",
      initialValue: 0,
    },
    {
      key: "validFor",
      label: "Valid For",
      widget: RangePicker,
      widgetProps: { showTime: true },
    },
  ],
};

export const editMetaValueUse: Meta = {
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
      key: "valueType",
      label: "Value Type",
      required: true,
      widget: "select",
      options: VALUE_TYPE,
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
    {
      key: "maxCardinality",
      label: "Max Cardinality",
      widget: "number",
    },
    {
      key: "minCardinality",
      label: "Min Cardinality",
      widget: "number",
    },
    {
      key: "validFor",
      label: "Valid For",
      widget: RangePicker,
      widgetProps: { showTime: true },
    },
    {
      key: "productSpecCharacteristicValue",
      label: "Characteristic Value Specification",
      disabled: true,
    },
    {
      key: "productSpecification",
      label: "Product Specification",
      disabled: true,
    },
  ],
};
