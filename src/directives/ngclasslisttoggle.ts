import { AbstractDirective } from "./abstract-directive";
/**
 * <i data-ng-class-list-toggle="'is-hidden', isHidden"></i>
 */
export class NgClassListToggle extends AbstractDirective implements Template.Directive {
  nodes: Template.DirectiveNode[];

  constructor( el:HTMLElement ){
    super();
    this.nodes =  this.initNodes( el, "ng-class-list-toggle",
      ( node:HTMLElement, expr:string, evaluate:Function, cache:Template.Cache ) => {
      return {
        el: node,
        exp: evaluate( expr, "__toArray" ),
        cache: cache
      }
    });
  }

  sync( data:Template.DataMap ){
    this.nodes.forEach(( node:Template.DirectiveNode ) => {
      node.cache.evaluate( node.exp.call( node.el, data ), ( args:any[] ) => {
        node.el.classList.toggle( args[ 0 ], args[ 1 ] );
      });
    });
  }
}
