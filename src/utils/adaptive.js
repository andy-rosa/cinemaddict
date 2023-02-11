import he from 'he';

function isObject(type) {
  return (typeof type === 'object' && !Array.isArray(type) && type !== null);
}

function snakeToCamel(str) {
  const regexp = /_+\w/g;
  const transformCamel = (match) => match.slice(1).toUpperCase();
  return str.replace(regexp, transformCamel);
}

function camelToSnake(str) {
  const regexp = /[A-Z]/g;
  const transformSnake = (match) => `_${match.slice(0).toLowerCase()}`;
  return str.replace(regexp, transformSnake);
}

function setTransformation(transFunc) {
  return function adaptive(transformObject) {
    const resultObject = {};
    Object.entries(transformObject).forEach(([key, values]) => {
      const adaptiveKey = transFunc(key);
      let adaptiveValue = values;
      let screenValue = null;
      if (isObject(adaptiveValue)) {
        adaptiveValue = adaptive(values);
      }
      if (typeof adaptiveValue === 'string') {
        screenValue = he.encode(adaptiveValue);
      }
      resultObject[adaptiveKey] = screenValue || adaptiveValue;
    });
    return resultObject;
  };
}

const adaptiveToApp = setTransformation(snakeToCamel);
const adaptiveToServer = setTransformation(camelToSnake);


export { adaptiveToServer, adaptiveToApp };
