export class Reporter {
  private report: NgTemplate.Report;
  constructor() {
    this.report = {
      errors: [],
      tokens: []
    };
  }
  addError( msg: string ): void{
    this.report.errors.push( msg );
  }
  get(): NgTemplate.Report {
    return this.report;
  }
}
