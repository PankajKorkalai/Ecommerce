class ApiFeatures {
    constructor(query, queryStr) {
        this.query = query;
        this.queryStr = queryStr;
    }

    search() {
        const keyword = this.queryStr.keyword
            ? {
                name: {
                    $regex: this.queryStr.keyword,
                    $options: "i",
                },
            }
            : {};

        console.log("Search keyword:", keyword); // Log the keyword to verify it's correct
        this.query = this.query.find({ ...keyword });
        return this;
    }
}

module.exports = ApiFeatures;
