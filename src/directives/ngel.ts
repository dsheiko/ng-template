import { AbstractDirective } from "./abstract-directive";
/**
 * <span data-ng-el="this.setAttribute('ss', 11)">Error</span>
 */
export class NgEl extends AbstractDirective implements Template.Directive {
  nodes: Template.DirectiveNode[];

  constructor( el:HTMLElement ){
    super();
    this.nodes =  this.initNodes( el, "ng-el", ( node:HTMLElement, expr:string, evaluate:Function ) => {
      return {
        el: node,
        exp: evaluate( expr )
      }
    });
  }

  sync( data:Template.DataMap ){
    this.nodes.forEach(( node:Template.DirectiveNode ) => {
      node.exp.call( node.el, data );
    });
  }
}
