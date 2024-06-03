class APIFeatures {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }

  // Example: ?jobType=Permanent etc...
  filter() {
    const queryCopy = { ...this.queryStr };

    // Removing fields from the query
    const removeFields = ["sort", "fields", "q", "limit", "page"];
    removeFields.forEach((element) => delete queryCopy[element]);

    console.log(queryCopy);

    // Advance filter using: lt, lte, gt, gte
    let queryStr = JSON.stringify(queryCopy);
    queryStr = queryStr.replace(
      /\b(gt|gte|lt|lte|in)\b/g,
      (match) => `$${match}`
    );
    this.query = this.query.find(JSON.parse(queryStr));
    return this;
  }

  // Example: ?sort=salary or ?sort=-salary or ?sort=salary,jobType etc...
  sort() {
    if (this.queryStr.sort) {
      const sortBy = this.queryStr.sort.split(",").join(" ");
      console.log(sortBy);
      this.query = this.query.sort(sortBy);
    } else {
      // default sort
      this.query = this.query.sort("-createdAt");
    }
    return this;
  }

  // Example: ?fields=title or ?fields=title,description etc...
  limitFields() {
    if (this.queryStr.fields) {
      const fields = this.queryStr.fields.split(",").join(" ");
      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select("-__v");
    }
    return this;
  }

  // Example: ?q=apple
  searchByQuery() {
    const q = this.queryStr.q
      ? {
          name: {
            $regex: this.queryStr.q,
            $options: "i",
          },
        }
      : {};
    this.query = this.query.find({ ...q });
    return this;
  }

  // Example: ?page=1&limit=5
  pagination() {
    const page = parseInt(this.queryStr.page, 10) || 1; // 10 is for decimal
    const limit = parseInt(this.queryStr.limit, 10) || 10;
    const skipResults = (page - 1) * limit;
    this.query = this.query.skip(skipResults).limit(limit);
    return this;
  }
}

module.exports = APIFeatures;
