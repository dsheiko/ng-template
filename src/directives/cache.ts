export class Cache {
  private cache:any;

  evaluate( exVal:any, cb:Template.CacheCb ) {
    if ( exVal === this.cache ) {
      return;
    }
    this.cache = exVal;
    cb( exVal );
  }
};
