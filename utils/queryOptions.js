const pagination = require("../utils/pagination");

module.exports = params => {
  let { page, pageSize, sort } = params;
  let query = pagination.getParams(page, pageSize);

  if (sort) {
    let order = "asc";

    if (sort.startsWith("-")) {
      sort = sort.replace("-", "");
      order = "desc";
    }

    query.sort = {
      [sort]: order === "asc" ? 1 : -1
    };
  }

  return query;
};
