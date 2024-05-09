import {
  DEFAULT_NAME_MAX_VALUE,
  DEFAULT_NAME_MIN_VALUE,
  RELATED_PARTY_ROLE,
} from "@/constants";
import { Meta } from "antd-form-builder";

export const meta: Meta = {
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
      ],
    },
    {
      key: "role",
      label: "Role",
      widget: "select",
      options: RELATED_PARTY_ROLE,
      required: true,
    },
  ],
};

export const editMeta: Meta = {
  columns: 2,
  fields: [
    {
      key: "id",
      label: "Id",
      disabled: true,
    },
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
      key: "href",
      label: "Href",
      disabled: true,
    },
    {
      key: "role",
      label: "Role",
      widget: "select",
      options: RELATED_PARTY_ROLE,
      required: true,
    },
    {
      key: "@type",
      label: "@type",
      disabled: true,
    },
    {
      key: "@referredType",
      label: "@referredType",
      disabled: true,
    },
  ],
};
