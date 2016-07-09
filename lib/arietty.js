'use strict';

function arietty(...args) {
  let functions,
    name,
    context,
    lastIndex = args.length - 1;

  if (typeof args[lastIndex] === 'object') {
    let opts = args[lastIndex];
    name = opts.name || 'anonymous';
    context = opts.context;
    functions = args.slice(0, lastIndex);
  } else {
    functions = args;
  }

  let functionTable = functions.reduce((acc, f) => {
    acc[f.length] = context ? f.bind(context) : f;
    return acc;
  }, {});

  let output = function(...args) {
    let f = functionTable[args.length];

    return f(...args);
  };

  Object.defineProperty(output, 'name', {value: name});

  return output;
}

export default arietty;
