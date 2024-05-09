export const UUID_FORMATTER = "YYYYMMDDHHmmss";
export const DATE_FORMATTER = "YYYY-MM-DD HH:mm:ss";
export const LIFE_CYCLE_STATUS = {
  IN_STUDY: "In study",
  IN_DESIGN: "In design",
  IN_TEST: "In test",
  ACTIVE: "Active",
  LAUNCHED: "Launched",
  RETIRED: "Retired",
  REJECTED: "Rejected",
  OBSOLETE: "Obsolete",
};
export const LIFE_CYCLE_STATUS_TYPES = {
  "In study": { text: "In study" },
  "In design": { text: "In design" },
  "In test": { text: "In test" },
  Active: { text: "Active" },
  Launched: { text: "Launched" },
  Retired: { text: "Retired" },
  Rejected: { text: "Rejected" },
  Obsolete: { text: "Obsolete" },
};
export const DEFAULT_CHAR_TYPE = {
  number: "NumberCharacteristicValueSpecification",
  string: "StringCharacteristicValueSpecification",
  date: "DateCharacteristicValueSpecification",
};
export const PRICE_TYPE = {
  TARIFF: "Tariff",
  RECURRING: "Recurring",
  DISCOUNT: "Discount",
  ALLOWANCE: "Allowance",
  PENALTY: "Penalty",
  ONETIME: "Onetime",
};
export const RELATED_PARTY_ROLE = [
  "Initiator",
  "Customer",
  "SalesAgent",
  "User",
];
export const OFFER_RELATIONSHIP_TYPE = {
  dependOn: "Depend On",
  bundle: "Bundle",
};
export const OFFER_PRICE_RELATIONSHIP_TYPE = {
  DISCOUNT: "Discount",
  REPLACEMENT: "Replacement",
};
export const PARTY_OR_PARTY_ROLE = ["party", "partyRole"];
export const RECURRING_CHARGE_PERIOD_TYPE = {
  second: "second",
  minute: "minute",
  hour: "hour",
  day: "day",
  week: "week",
  month: "month",
  quanter: "quanter",
  year: "year",
};
export const DURATION_OPTIONS = {
  second: "second",
  minute: "minute",
  hour: "hour",
  day: "day",
  week: "week",
  month: "month",
  quanter: "quanter",
  year: "year",
};
export const QUANTITY_OPTIONS = {
  UNIT: "Unit",
  LITRE: "Litre",
  BUNDLE: "Bundle",
};
export const UNIT_OF_MEASURE = {
  UNIT: "Unit",
  LITRE: "Litre",
  BUNDLE: "Bundle",
};
export const PRICE_OPTIONS = {
  MNT: "MNT",
  USD: "USD",
};
export const DEFAULT_NAME_MIN_VALUE = 3;
export const DEFAULT_NAME_MAX_VALUE = 100;

export const DEFAULT_DESCRIPTION_MIN_VALUE = 3;
export const DEFAULT_DESCRIPTION_MAX_VALUE = 300;

export const LIFECYCLE_STATUS = ["Active", "Inactive"];
export const VALUE_TYPE = ["string", "number", "date"];
export const CATALOG_TYPE = ["Main", "Production", "Preproduction"];

export const REGEX_NAME = /^[A-Z][a-z0-9_\s]+$/;
export const REGEX_VERSION_1 = /^\d+\.\d+$/;
export const REGEX_VERSION_2 = /^\d+\.\d+\.\d+$/;

export const SERVICE_SPEC_TYPE = [
  "@CustomerFacingService",
  "@ResourceFacingService",
];
