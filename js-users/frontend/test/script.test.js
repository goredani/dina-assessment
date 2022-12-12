const getUser = require('../edit/scripts/edit.js');

test('test get users', () => {
    expect(getUser()).toBe(true);
})