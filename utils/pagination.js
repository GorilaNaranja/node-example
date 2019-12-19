const options = {
  pageSize: 10,
  maxPageSize: 50
};

let pagination = {};

pagination.getParams = (page, pageSize) => {
  let limit = parseInt(pageSize) || options.pageSize;

  if (limit > options.maxPageSize) {
    limit = options.maxPageSize;
  }

  return {
    limit: limit,
    page: parseInt(page) || 1
  };
};

module.exports = pagination;
