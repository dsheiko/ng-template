export class Reporter {
  private data: NgTemplate.Report;
  constructor() {
    this.data = {
      errors: [],
      tokens: []
    };
  }
  addError( msg: string ): void {
    this.data.errors.push( msg );
  }
  addTokens( tokens: NgTemplate.Token[] ): void {
    let merge: any[] =  tokens.map(( token: NgTemplate.Token ) => token.toJSON() );
    this.data.tokens = this.data.tokens.concat( merge );
  }
  get(): NgTemplate.Report {
    return this.data;
  }
}
