'use strict';

function arietty(...args) {
  let fs = args.reduce((acc, f) => {
    acc[f.length] = f;
    return acc;
  }, {});

  return function(...args) {
    let f = fs[args.length];

    return f(...args);
  };
}

export default arietty;
