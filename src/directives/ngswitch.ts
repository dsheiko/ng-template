import { AbstractDirective } from "./abstract-directive";
/**
 * <span data-ng-switch="exp"></span>
 */
export class NgSwitch extends AbstractDirective implements Template.Directive {
  nodes: Template.DirectiveNode[];

  constructor( el:HTMLElement ){
    super();
    this.nodes =  this.initNodes( el, "ng-switch", ( node:HTMLElement, expr:string, evaluate:Function ) => {
      return {
        el: node,
        exp: evaluate( expr )
      }
    });
  }

  update( data:Template.DataMap, cb:Template.UpdateCallback ){
    this.nodes.forEach(( node:Template.DirectiveNode ) => {
      data[ "$" ] = node.exp.call( node.el, data );
      cb && cb( node.el );
    });
  }
}
