declare namespace Template {

  interface DataMap { [s: string]: any; }

  interface DirectiveNode {
    el: HTMLElement,
    anchor?: HTMLElement,
    outerHTML?: string,
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



  type forEach = (value: any, index: number, array: any[]) => void;
}