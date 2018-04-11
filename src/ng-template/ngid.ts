import { AbstractDirective } from "./abstract-directive";
/**
 * <i data-ng-id="foo"></i>
 */
export class NgId extends AbstractDirective implements NgTemplate.Directive {
  nodes: NgTemplate.DirectiveNode[];
  static selector: string  = "ng-id";

  constructor( el: HTMLElement, reporter: NgTemplate.Reporter ){
    super( el, reporter );
    this.nodes =  this.initNodes( el, "ng-id",
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
        el[ "id" ] = val;
      });
    });
  }
}
