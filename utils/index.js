export const matchKeys = (data = [], key, value) => {
  let res = {};
  data.forEach((d) => {
    res = { ...res, [d[key]]: value ? d[value] : d };
  });
  return res;
};

export const mergeData = (data = [], mergeData = [], key, mergeKey) => {
  let mergeObj = matchKeys(mergeData, mergeKey, 'name');
  return data.map((d) => {
    return { ...d, [key]: mergeObj[d[key]] };
  });
};


export const getSelectData = (data = [], labelKey, valueKey, isObjectValue) => {
  if (isObjectValue) {
    return data.map((d) => {
      let vkey = Object.keys(d)[0];
      return {label: d[vkey], value: vkey, key: vkey};
    })
  }
    return data.map((d) => {
        return { label: d[labelKey], value: d[valueKey], key: d[valueKey]}
    })
}
export const getStatus = (status) => {
  switch (status) {
    case "01":
      return { name: "Pending", color: "rgba(245, 158, 11, 1)" };
    case "02":
      return { name: "Validated", color: "rgba(16, 185, 129, 1)" };
    case "03":
      return { name: "Rejected", color: "rgba(239, 68, 68, 1)" };
    default:
      return { name: "Pending", color: "yellow" };
  }
};
