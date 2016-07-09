import make from '../lib/arietty';

describe('arietty', function () {
  describe('successful dispatch', function() {
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
  describe('options', function () {
    it('accepts a name option', function () {
      let testFn = function() {};

      let fn = make(testFn, {
        name: 'foo'
      });

      expect(fn.name).to.equal('foo');
    });

    it('accepts a context option', function () {
      let called = "";
      let testFn = function() {
         called = this.value;
      };

      let fn = make(testFn, {
        context: {
          value: 'foo'
        }
      });

      fn();

      expect(called).to.equal('foo');
    });
  });

  describe('errors', function () {
    it('errors out if nonexistent arity is called', function function_name() {
      let testFn = function() {
      };

      let fn = make(testFn, {
        name: 'foo'
      });

      try {
        fn('unwanted');
        expect.fail();
      } catch (e) {
        expect(e.message).to.equal('Function foo/1 is not defined');
      }
    });
  });
});
