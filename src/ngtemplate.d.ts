declare namespace NgTemplate {

  interface DataMap { [s: string]: any; }

  interface DirectiveNode {
    el: HTMLElement,
    anchor?: HTMLElement,
    parentNode?: HTMLElement,
    outerHTML?: string,
    cache?: Cache,
    exp: Function
  }

  interface SyncCallback {
    (el: HTMLElement): void;
  }

  class Directive {
    constructor( el:HTMLElement );
    nodes: DirectiveNode[];
    sync( data:DataMap, cb?:SyncCallback ):void;
  }

  interface NgForExprVo {
    variable: string;
    iterable: string;
  }

  interface CacheCb {
    (exVal: any): void
  }

  class Cache {
    match( exVal:any ):boolean;
    evaluate( exVal:any, cb:CacheCb ):void;
  }

  interface Element {
    [ key: string ]: any;
  }

}