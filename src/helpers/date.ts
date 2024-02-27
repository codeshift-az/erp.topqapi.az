export const formatDate = (date: string, withTime = false) => {
  return withTime ? new Date(date).toLocaleString() : new Date(date).toLocaleDateString();
};

export const toISOStringWithoutTime = (date: Date) => {
  const timestamp = date.getTime() - date.getTimezoneOffset() * 60000;
  return new Date(timestamp).toISOString().split("T")[0];
};

export const convertDateRangeFilter = (filter: any) => {
  Object.keys(filter).forEach((key) => {
    const value = filter[key];
    if (key === "date") {
      if (Array.isArray(value) && value.length === 2) {
        filter[`${key}_start`] = toISOStringWithoutTime(value[0]);
        filter[`${key}_end`] = toISOStringWithoutTime(value[1]);
        console.log(filter[`${key}_start`], value[0], filter[`${key}_end`], value[1]);
        delete filter[key];
      } else {
        filter[key] = toISOStringWithoutTime(new Date(value));
      }
    } else if (key.includes("date")) {
      filter[key] = toISOStringWithoutTime(new Date(value));
    }
  });
  return filter;
};
