import make from '../lib/arietty';

describe('arietty', function () {
  it('wraps a function', function () {
    let called = false;

    let testFn = function() {
      called = true;
    };

    let fn = make(testFn);

    fn();

    expect(called).to.equal(true);
  });

  it('wraps several functions and dispatches on arity', function () {
    let called = '';

    let testFn1 = function() {
      called = '0ary';
    };

    let testFn2 = function(foo) {
      called = '1ary';
    };

    let fn = make(testFn1, testFn2);

    fn();

    expect(called).to.equal('0ary');

    fn('argument');

    expect(called).to.equal('1ary');
  });
});
