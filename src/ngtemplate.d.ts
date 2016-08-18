declare namespace NgTemplate {

  interface Report extends DataMap {
    errors: string[];
    tokens: DataMap[];
  }

  interface Reporter {
    addError( msg: string ): void;
    get(): NgTemplate.Report;
    addTokens( tokens: NgTemplate.Token[] ): void;
  }

  interface Token {
    name: string;
    resolveValue( data: any ): any;
    toJSON(): NgTemplate.DataMap;
  }

  interface DataMap { [s: string]: any; }

  interface DirectiveNode {
    el: HTMLElement;
    anchor?: HTMLElement;
    parentNode?: HTMLElement;
    outerHTML?: string;
    cache?: Cache;
    exp: Function;
    id?: string;
  }

  interface SyncCallback {
    (el: HTMLElement): void;
  }

  class Directive {
    constructor( el:HTMLElement );
    nodes: DirectiveNode[];
    sync( data:DataMap, Ctor?: NgTemplateCtor ):void;
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

  interface NgTemplateCtor {
    new( el:Element, template?:string ): NgTemplate;
  }


  interface NgTemplate {
    report(): Report;
    sync( data:Object ):NgTemplate;
    pipe( cb:Function, context:Object ):NgTemplate;
  }


}