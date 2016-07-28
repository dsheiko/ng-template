import { AbstractDirective } from "./abstract-directive";
/**
 * <span data-ng-if="expression">Error</span>
 */
export class NgIf extends AbstractDirective  implements Template.Directive {
  nodes: Template.DirectiveNode[];

  constructor( el:HTMLElement ){
    super();
    this.nodes =  this.initNodes( el, "ng-if",
      ( node:HTMLElement, expr:string, evaluate:Function, cache:Template.CacheCb ) => {
      return {
        el: node,
        anchor: <HTMLElement>document.createElement( "ng" ),
        exp: evaluate( expr, "Boolean" ),
        cache: cache
      }
    });
  }

  sync( data:Template.DataMap ){
    this.nodes.forEach(( node:Template.DirectiveNode ) => {
      node.cache.evaluate( node.exp.call( node.el, data ), ( val:boolean ) => {
        if ( val ) {
          return this.enable( node );
        }
        this.disable( node );
      });
    });
  }

  private disable( node:Template.DirectiveNode ):void{
    if ( node.anchor.parentNode ) {
      return;
    }
    node.anchor.style.display = "none";
    node.el.parentNode.insertBefore( node.anchor, node.el );
    node.el.parentNode.removeChild( node.el );
  }

  private enable( node:Template.DirectiveNode ):void{
    if ( !node.anchor.parentNode ) {
      return;
    }
    node.anchor.parentNode.insertBefore( node.el, node.anchor );
    node.anchor.parentNode.removeChild( node.anchor );
  }

}
