# Arietty - multiple arity function factory

A nice feature of many languages is arity based function dispatch. For example, Java:

```java
class Foo {
  void bar() {
    // ...
  }
  void bar(int baz) {
    // ...
  }
}
```

In Javascript, of course, all functions are autumatically variadic, which leads to a big pile of boilerplate:

```js
function foo(bar, baz, quux) {
  if (typeof quux === 'undefined') {
    quux = baz;
  } else if (typeof quux == 'array' && isThirdSundayOfTheMonth) {
    // ... and so on ...
  }
}
```

Meanwhile, calling a function with an unsupported number of arguments can result in obscure errors, when some variable turns out to be undefined five frames further down the stack ... We've all been there!

Arietty is a tiny tiny library that creates functions with multiple fixed arities. No dependencies.

## Usage

```
import make from 'arietty';
// or,
// var make = require('arietty').make;

const adder = make(
  function(a) {
    return a;
  },
  function(a, b) {
    return a;
  },
  function(a, b, c) {
    return a + b + c;
  },
  {
   name: 'adder'
  }
)

adder(5) // 5
adder(5, 6) // 11
adder(5, 6, 7, 8) // Error: Function adder/4 is not defined
```

### `arietty.make(fn1, fn2, ..., options)`

Valid options: 

- `name`: the name of the returned function (for better stack traces and error messages)
- `context`: object to which `this` will be bound in function bodies
