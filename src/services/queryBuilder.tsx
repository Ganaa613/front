const builder = (params: any = {}): string => {
  let queryParams = "";

  Object.keys(params).forEach((key, index) => {
    let k = key;
    if (key === "current") {
      k = "page";
    } else if (key === "pageSize") {
      k = "limit";
    }
    queryParams += `${index === 0 ? "" : "&"}${k}=${params[key]}`;
  });

  return queryParams;
};

export default builder;
