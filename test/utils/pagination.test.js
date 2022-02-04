const pagination = require('../../utils/pagination');

test('pagination', () => {
    const page = 5;
    const pageSize = 10;
    const result = { limit: 10, page: 5 };
    expect(pagination.getParams(page, pageSize)).toEqual(result);
});

test('pageSize over limit', () => {
    const page = 1;
    const pageSize = 55;
    const result = { limit: 50, page: 1 };
    expect(pagination.getParams(page, pageSize)).toEqual(result);
});
