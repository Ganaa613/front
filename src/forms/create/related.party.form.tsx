import {
  DEFAULT_NAME_MAX_VALUE,
  DEFAULT_NAME_MIN_VALUE,
  PARTY_OR_PARTY_ROLE,
  RELATED_PARTY_ROLE,
} from "@/constants";
import { Meta } from "antd-form-builder";

export const meta: Meta = {
  columns: 2,
  fields: [
    {
      key: "party",
      label: "Party or Party Role",
      widget: "select",
      options: PARTY_OR_PARTY_ROLE,
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

export const metaPartyRole: Meta = {
  columns: 2,
  fields: [
    {
      key: "partyOrPartyRole.name",
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
    { key: "partyOrPartyRole.partyId", label: "Party Id" },
    {
      key: "partyOrPartyRole.partyName",
      label: "Party name",
      rules: [
        {
          min: DEFAULT_NAME_MIN_VALUE,
          max: DEFAULT_NAME_MAX_VALUE,
          message: "Name must be at least 3 characters long",
        },
      ],
    },
  ],
};

export const metaParty: Meta = {
  columns: 2,
  fields: [
    {
      key: "partyOrPartyRole.name",
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
  ],
};
