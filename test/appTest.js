const assert = require('chai').assert;
const test = require('../Experimental/testCode1');

let sayHelloResult = test.sayHello();
let addNumberResult = test.addNumbers(5, 5);

describe('App', function() {
	describe('sayHello', () => {
		it('test should return hello', function() {
			assert.equal(sayHelloResult, 'hello');
		});
		it('test should return a string ', function() {
			assert.typeOf(sayHelloResult, 'string');
        });
    });
		describe('addNumbers', () => {
		it('addNumbers should be above 5', () => {
			assert.isAbove(addNumberResult, 5);
		});
		it('addNumber should be a number ', () => {
			assert.typeOf(addNumberResult, 'number');
        });
    });
});

