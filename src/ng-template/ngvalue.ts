import { AbstractDirective } from "./abstract-directive";

/**
 * <input data-ng-value="foo"></i>
 */
export class NgValue extends AbstractDirective implements NgTemplate.Directive {
  nodes: NgTemplate.DirectiveNode[];
  static selector: string  = "ng-value";

  constructor( el: HTMLElement, reporter: NgTemplate.Reporter ){
    super( el, reporter );
    this.nodes =  this.initNodes( el, "ng-value",
      ( node: HTMLElement, expr: string, compile: Function, cache: NgTemplate.Cache ) => {
      return {
        el: node,
        exp: compile( expr, "String", reporter ),
        cache: cache
      };
    });
  }

  sync( data: NgTemplate.DataMap ){
    this.nodes.forEach(( node: NgTemplate.DirectiveNode ) => {
      node.cache.evaluate( node.exp.call( node.el, data ), ( val: string ) => {
        let el = <NgTemplate.Element>node.el;
        el[ "value" ] = val;
      });
    });
  }
}
