import cloneDeep from 'lodash/cloneDeep';

type Obj = {
  [key: string]: any;
};

const bool2Str = (oldObj: Obj) => {
  const obj = cloneDeep(oldObj);

  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const value = obj[key];
      if (typeof value === 'boolean') {
        obj[key] = String(value);
      }
    }
  }

  return obj;
};

const str2Bool = (oldObj: Obj) => {
  const obj = cloneDeep(oldObj);

  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const value = obj[key];
      if (value === 'true' || value === 'false') {
        obj[key] = value === 'true';
      }
    }
  }

  return obj;
};
export { bool2Str, str2Bool };
