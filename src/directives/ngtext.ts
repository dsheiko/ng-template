import { AbstractDirective } from "./abstract-directive";
/**
 * <span data-ng-text="foo">...</span>
 */
export class NgText extends AbstractDirective implements Template.Directive {
  nodes: Template.DirectiveNode[];

  constructor( el:HTMLElement ){
    super();
    this.nodes =  this.initNodes( el, "ng-text",
      ( node:HTMLElement, expr:string, evaluate:Function, cache:Template.Cache ) => {
      return {
        el: node,
        exp: evaluate( expr, "String" ),
        cache: cache
      }
    });
  }

  sync( data:Template.DataMap ){
    this.nodes.forEach(( node:Template.DirectiveNode ) => {
      node.cache.evaluate( node.exp.call( node.el, data ), ( val:string ) => {
        this.setText( node.el, val );
      });
    });
  }
}
