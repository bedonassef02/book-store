class ApiFeatures {
    constructor(mongooseQuery, queryString) {
        this.mongooseQuery = mongooseQuery;
        this.queryString = queryString;
    }

    sort() {
        if (this.queryString.sort) {
            const sortBy = this.queryString.sort.split(',').join(' ');
            this.mongooseQuery = this.mongooseQuery.sort(sortBy);
        }
        return this;
    }

    fields() {
        if (this.queryString.fields) {
            const fields = this.queryString.fields.split(',').join(' ');
            this.mongooseQuery = this.mongooseQuery.select(fields);
        }
        return this;
    }

    paginate(count) {
        const page = parseInt(this.queryString.page, 10) || 1;
        const limit = parseInt(this.queryString.limit, 10) || 12;
        const skip = (page - 1) * limit;
        const endIndex = page * limit;
        const totalPages = Math.ceil(count / limit);

        this.mongooseQuery = this.mongooseQuery.skip(skip).limit(limit);

        this.paginationDetails = { page, limit, skip, endIndex, totalPages };
        if (endIndex < count) this.paginationDetails.next = page + 1;
        if (skip > 0) this.paginationDetails.prev = page - 1;

        return this;
    }

    search(searchFields) {
        if (this.queryString.search) {
            const searchTerms = this.queryString.search.split(' ');
            const regexTerms = this.#createRegexTerms(searchTerms);
            const searchFilter = this.#createSearchFilter(searchFields, regexTerms);
            this.mongooseQuery = this.mongooseQuery.find(searchFilter);
        }
        return this;
    }

    filter(allowedFilters) {
        this.#removeUnwantedFields();
        const sanitizedFilters = this.#validateAndSanitizeFilters(allowedFilters);
        this.#applyFiltering(sanitizedFilters);

        return this;
    }

    // Private methods (using # symbol)
    #createRegexTerms(searchTerms) {
        return searchTerms.map((term) => new RegExp(term, 'i'));
    }

    #createSearchFilter(searchFields, regexTerms) {
        const searchFilter = { $or: [] };
        searchFields.forEach((field) => {
            const fieldFilter = {};
            regexTerms.forEach((regex) => {
                fieldFilter[field] = regex;
                searchFilter.$or.push({ ...fieldFilter }); // Clone the fieldFilter object to avoid referencing the same object multiple times
            });
        });
        return searchFilter;
    }

    #applyFiltering(sanitizedFilters) {
        let queryStr = JSON.stringify(sanitizedFilters);
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

        try {
            this.mongooseQuery = this.mongooseQuery.find(JSON.parse(queryStr));
        } catch (err) {
            throw new Error(`Invalid filtering parameters: ${err.message}`);
        }
    }

    #validateAndSanitizeFilters(allowedFilters) {
        const sanitizedFilters = {};
        Object.keys(this.queryString).forEach((field) => {
            if (allowedFilters.includes(field)) {
                sanitizedFilters[field] = this.queryString[field];
            }
        });

        if (sanitizedFilters.price) {
            const priceValue = Number(sanitizedFilters.price.gte);
            if (isNaN(priceValue)) {
                throw new Error(`Invalid value for 'price': ${sanitizedFilters.price.gte}`);
            }
            sanitizedFilters.price = { gte: priceValue };
        }

        return sanitizedFilters;
    }

    #removeUnwantedFields() {
        const excludesFields = ['page', 'sort', 'limit', 'fields'];
        excludesFields.forEach((field) => delete this.queryString[field]);
    }
}

export { ApiFeatures };
