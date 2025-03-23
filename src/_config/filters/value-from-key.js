// Get all values from an array of objects or object
module.exports = (value, key) => {
  //  if (typeof value == "object") return value[key];
  //  return value.map((item) =>  "" + item[key]);
  let result = [];
  value.forEach((item) => result.push(item[key]));
  return result;
}
