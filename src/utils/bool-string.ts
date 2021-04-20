type Obj = {
  [key: string]: any;
};
const bool2Str = (obj: Obj) => {
  for (const key in obj) {
    const value = obj[key];
    if (obj.hasOwnProperty(key) && typeof value === 'boolean') {
      obj[key] = String(value);
    }
  }

  return obj;
};

const str2Bool = (obj: Obj) => {
  for (const key in obj) {
    const value = obj[key];
    if (obj.hasOwnProperty(key) && (value === 'true' || value === 'false')) {
      obj[key] = value === 'true';
    }
  }

  return obj;
};
export { bool2Str, str2Bool };
