
export function withDate(date) {
  const RealDate = Date;

  beforeEach(() => {
    global.Date = class extends RealDate {
      constructor() {
        super();
        return new RealDate(date);
      }
    };
  });

  afterEach(() => {
    global.Date = RealDate;
  });
}
