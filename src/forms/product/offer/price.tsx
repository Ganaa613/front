import PercentageInput from "@/components/app-input/percentage";
import PriceInput from "@/components/app-input/price";
import QuantityInput from "@/components/app-input/quantity";
import {
  DATE_FORMATTER,
  DEFAULT_DESCRIPTION_MAX_VALUE,
  DEFAULT_DESCRIPTION_MIN_VALUE,
  DEFAULT_NAME_MAX_VALUE,
  DEFAULT_NAME_MIN_VALUE,
  LIFE_CYCLE_STATUS,
  PRICE_TYPE,
  RECURRING_CHARGE_PERIOD_TYPE,
} from "@/constants";
import { getUuid } from "@/constants/converter";
import { DatePicker } from "antd";
import { Meta } from "antd-form-builder";
import dayjs from "dayjs";

const { RangePicker } = DatePicker;

export const meta: Meta = {
  fields: [
    { key: "name", label: "Name", required: true },
    { key: "description", label: "Description" },
    {
      key: "price",
      label: "Price",
      widget: PriceInput,
      initialValue: { value: 0, unit: "MNT" },
    },
    {
      key: "priceType",
      label: "Price Type",
      required: true,
      widget: "select",
      initialValue: PRICE_TYPE.RECURRING,
      options: Object.values(PRICE_TYPE),
    },
    {
      key: "percentage",
      label: "Percentage",
      widget: PercentageInput,
      initialValue: 0,
    },
    {
      key: "recurringChargePeriodLength",
      label: "Recurring Charge Period Length",
    },
    {
      key: "recurringChargePeriodType",
      label: "Recurring Charge Period Type",
      options: Object.values(RECURRING_CHARGE_PERIOD_TYPE),
      initialValue: RECURRING_CHARGE_PERIOD_TYPE.day,
      widget: "select",
    },
    {
      key: "lifecycleStatus",
      label: "Life cycle status",
      options: Object.values(LIFE_CYCLE_STATUS),
      widget: "select",
      required: true,
      initialValue: LIFE_CYCLE_STATUS.IN_STUDY,
      disabled: true,
    },
    { key: "isBundle", label: "Is Bundle", widget: "switch" },
    {
      key: "unitOfMeasure",
      label: "Unit Of Measure",
      widget: QuantityInput,
      initialValue: { amount: 0, units: "Unit" },
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
    { key: "version", label: "Version" },
    {
      key: "@type",
      label: "@type",
      initialValue: "ProductOfferingPrice",
      disabled: true,
    },
  ],
};

export const editMeta: Meta = {
  fields: [
    { key: "id", label: "Id", required: true, disabled: true },
    { key: "name", label: "Name", required: true },
    { key: "description", label: "Description" },
    {
      key: "price",
      label: "Price",
      widget: PriceInput,
    },
    {
      key: "priceType",
      label: "Price Type",
      required: true,
      widget: "select",
      options: Object.values(PRICE_TYPE),
    },
    { key: "percentage", label: "Percentage", widget: PercentageInput },
    {
      key: "recurringChargePeriodLength",
      label: "Recurring Charge Period Length",
    },
    {
      key: "recurringChargePeriodType",
      label: "Recurring Charge Period Type",
      options: Object.values(RECURRING_CHARGE_PERIOD_TYPE),
      widget: "select",
    },
    {
      key: "lifecycleStatus",
      label: "Life cycle status",
      options: Object.values(LIFE_CYCLE_STATUS),
      widget: "select",
      required: true,
    },
    { key: "isBundle", label: "Is Bundle", widget: "switch" },
    { key: "unitOfMeasure", label: "Unit Of Measure", widget: QuantityInput },
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
    { key: "version", label: "Version" },
    {
      key: "@type",
      label: "@type",
      disabled: true,
    },
  ],
};

export const productSpecCharacteristicValueUse: Meta = {
  columns: 2,
  fields: [
    { key: "id", label: "Id", initialValue: getUuid(), disabled: true },
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
    { key: "valueType", label: "Value Type", required: true },
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
