import mongoose from "mongoose";

class AggregateQueryBuilder<T extends mongoose.Document> {
  public pipeline: any[] = [];
  public query: Record<string, unknown>;
  private model: mongoose.Model<T>;

  constructor(model: mongoose.Model<T>, query: Record<string, unknown>) {
    this.model = model;
    this.query = query;
  }

  filter() {
    const queryObj = { ...this.query };
    const excludeFields = ["searchTerm", "sort", "limit", "page", "fields"];
    excludeFields.forEach((el) => delete queryObj[el]);

    if (Object.keys(queryObj).length > 0) {
      this.pipeline.push({ $match: queryObj });
    }
    return this;
  }

  sort() {
    const sort =
      (this.query?.sort as string)?.split(",")?.join(" ") || "-createdAt";
    const sortObject = sort.split(" ").reduce((acc, field) => {
      const direction = field.startsWith("-") ? -1 : 1;
      const actualField = field.startsWith("-") ? field.slice(1) : field;
      return { ...acc, [actualField]: direction };
    }, {});
    this.pipeline.push({ $sort: sortObject });
    return this;
  }

  paginate() {
    const page = Number(this.query?.page) || 1;
    const limit = Number(this.query?.limit) || 10;
    const skip = (page - 1) * limit;
    this.pipeline.push({ $skip: skip }, { $limit: limit });
    return this;
  }

  fields() {
    const fields =
      (this.query?.fields as string)?.split(",")?.join(" ") || undefined;
    if (fields) {
      const projectObject = fields.split(" ").reduce(
        (acc, field) => {
          const include = !field.startsWith("-");
          const actualField = field.startsWith("-") ? field.slice(1) : field;
          return { ...acc, [actualField]: include ? 1 : 0, __v: 0 };
        },
        { __v: 0 }
      );
      this.pipeline.push({ $project: projectObject });
    }
    return this;
  }

  async build() {
    return await this.model.aggregate(this.pipeline);
  }

  async countTotal() {
    const countPipeline = [...this.pipeline];
    countPipeline.push({ $count: "total" });
    const countResult = await this.model.aggregate(countPipeline);
    return countResult[0]?.total || 0;
  }
}

export default AggregateQueryBuilder;
