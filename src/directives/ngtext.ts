import { AbstractDirective } from "./abstract-directive";
/**
 * <span data-ng-text="foo">...</span>
 */
export class NgText extends AbstractDirective implements Template.Directive {
  nodes: Template.DirectiveNode[];

  constructor( el:HTMLElement ){
    super();
    this.nodes =  this.initNodes( el, "ng-text",
      ( node:HTMLElement, expr:string, evaluate:Function ) => {
      return {
        el: node,
        exp: evaluate( expr, "String" )
      }
    });
  }

  update( data:Template.DataMap ){
    this.nodes.forEach(( node:Template.DirectiveNode ) => {
      this.setText( node.el, node.exp.call( node.el, data ) );
    });
  }
}
