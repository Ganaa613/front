import { common } from "@mobicom/tmf-dti";
import { DATE_FORMATTER, DEFAULT_CHAR_TYPE, UUID_FORMATTER } from ".";
import dayjs, { Dayjs } from "dayjs";

export const getValidForToObject = (
  validFor: any
): common.TimePeriod | undefined => {
  if (Array.isArray(validFor) && validFor[0] && validFor[1]) {
    return {
      startDateTime: validFor[0],
      endDateTime: validFor[1],
    };
  } else {
    return;
  }
};

export const getValidForToArray = (
  validFor: any
): (Dayjs | "")[] | undefined => {
  if (validFor) {
    if (Array.isArray(validFor)) {
      return undefined;
    } else {
      const startDateTime = validFor?.startDateTime
        ? dayjs(validFor?.startDateTime)
        : "";
      const endDateTime = validFor?.endDateTime
        ? dayjs(validFor?.endDateTime)
        : "";
      return [startDateTime, endDateTime];
    }
  }
  return undefined;
};

export const renderDate = (val: any) => {
  return dayjs(val).isValid() ? dayjs(val).format(DATE_FORMATTER) : "";
};

export const getType = (item: string) => {
  const index = Object.keys(DEFAULT_CHAR_TYPE).indexOf(item);
  return Object.values(DEFAULT_CHAR_TYPE)[index];
};

export const getUuid = () => {
  return (
    dayjs().format(UUID_FORMATTER) + pad(Math.floor(Math.random() * 1000000), 6)
  );
};

export const pad = (number: number, targetLength: number) => {
  let result = number + "";
  while (result.length < targetLength) {
    result = "0" + result;
  }
  return result;
};

export const addIds = (data: any[]) => {
  return (
    data?.map((item) => {
      return addId(item);
    }) ?? []
  );
};

export const addId = (data: any) => {
  return { ...data, id: getUuid() };
};

export const getData = (data: any) => {
  let res = { ...data };
  if (data.lastUpdate) {
    res = {
      ...res,
      lastUpdate: dayjs(data.lastUpdate),
    };
  }
  if (data.validFor) {
    res = {
      ...res,
      validFor: getValidForToArray(data.validFor),
    };
  }
  return res;
};
