declare namespace Template {

  interface DataMap { [s: string]: any; }

  interface DirectiveNode {
    el: HTMLElement,
    anchor?: HTMLElement,
    outerHTML?: string,
    cache?: Cache,
    exp: Function
  }

  interface UpdateCallback {
    (el: HTMLElement): void;
  }

  class Directive {
    constructor( el:HTMLElement );
    nodes: DirectiveNode[];
    update( data:DataMap, cb?:UpdateCallback ):void;
  }

  interface NgForExprVo {
    variable: string;
    iterable: string;
  }

  interface CacheCb {
    (exVal: any): void
  }

  class Cache {
    evaluate( exVal:any, cb:CacheCb ):void;
  }



  type forEach = (value: any, index: number, array: any[]) => void;
}