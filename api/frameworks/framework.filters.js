module.exports = params => {
    const query = {};
  
    if (params.name) {
      query.name = {
        $regex: params.name,
        $options: "i"
      };
    }
  
    query.deleted = { $ne: true };
  
    return query;
  };
  