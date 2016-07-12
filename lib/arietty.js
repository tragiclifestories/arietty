'use strict';

export function make(...args) {
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
    let tableFn = context ? f.bind(context) : f;

    Object.defineProperty(tableFn, 'name', {value: `${ name }/${f.length}`});
    acc[f.length] = tableFn;
    return acc;
  }, {});

  let output = function(...args) {
    let f = functionTable[args.length];

    if (!f) {
      throw new Error(`Function ${name}/${args.length} is not defined`);
    }

    return f(...args);
  };

  Object.defineProperty(output, 'name', {value: name});

  return output;
}

export default make;
