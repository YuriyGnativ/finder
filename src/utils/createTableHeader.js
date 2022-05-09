const createTableHeader = (data) => {
  const inst = data[0];
  return Object.keys(inst).map((j) => {
    return {
      id: j,
      // numeric: validator.isNumeric(data[i]),
      numeric: typeof inst[j] === "number",
      disablePadding: false,
      label: j,
      // label: j[0].toUpperCase() + j.slice(1),
    };
  });
};

export default createTableHeader;
