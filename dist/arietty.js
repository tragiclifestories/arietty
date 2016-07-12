(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports);
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports);
    global.unknown = mod.exports;
  }
})(this, function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.make = make;

  var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj;
  };

  function make() {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var functions = void 0,
        name = void 0,
        context = void 0,
        lastIndex = args.length - 1;

    if (_typeof(args[lastIndex]) === 'object') {
      var opts = args[lastIndex];
      name = opts.name || 'anonymous';
      context = opts.context;
      functions = args.slice(0, lastIndex);
    } else {
      functions = args;
    }

    var functionTable = functions.reduce(function (acc, f) {
      var tableFn = context ? f.bind(context) : f;

      Object.defineProperty(tableFn, 'name', { value: name + '/' + f.length });
      acc[f.length] = tableFn;
      return acc;
    }, {});

    var output = function output() {
      for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      var f = functionTable[args.length];

      if (!f) {
        throw new Error('Function ' + name + '/' + args.length + ' is not defined');
      }

      return f.apply(undefined, args);
    };

    Object.defineProperty(output, 'name', { value: name });

    return output;
  }

  exports.default = make;
});

