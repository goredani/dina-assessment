const convertNum = require('../scripts/convertNum.js');

test('test with one digit', () => {
    expect(convertNum(7)).toBe('seven');
})

test('test with two digits', () => {
    expect(convertNum(42)).toBe('forty-two');
})

test('test with three digits', () => {
    expect(convertNum(999)).toBe('nine hundred and ninety-nine');
})

test('test with four digits', () => {
    expect(convertNum(2001)).toBe('two thousand and one');
})

test('test with five digits', () => {
    expect(convertNum(17999)).toBe('seventeen thousand nine hundred and ninety-nine');
})

test('test with six digits', () => {
    expect(convertNum(100001)).toBe('one hundred thousand and one');
})

test('test with seven digits', () => {
    expect(convertNum(1300420)).toBe('one million three hundred thousand four hundred and twenty');
})

test('test with max digit', () => {
    expect(convertNum(9999999999999)).toBe('nine trillion nine hundred and ninety-nine billion nine hundred and ninety-nine million nine hundred and ninety-nine thousand nine hundred and ninety-nine');
})

test('test with zero', () => {
    expect(convertNum(0)).toBe('zero');
})

test('test with more than max digit', () => {
    expect(convertNum(19999999999999)).toBe('ERROR');
})

test('test with text', () => {
    expect(convertNum('something')).toBe('ERROR');
})
