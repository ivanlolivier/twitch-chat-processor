type FilterFn = (m: string) => boolean;

class MessageFilters {
  private filters: FilterFn[];

  constructor() {
    this.filters = [];
  }

  addFilter(cb: FilterFn) {
    this.filters.push(cb);
  }

  mustBeFiltered(message: string) {
    return !this.filters.reduce((prev, cb) => {
      const res = cb(message);
      return res || prev;
    }, false);
  }
}

const messageFilters = new MessageFilters();

export default messageFilters;
