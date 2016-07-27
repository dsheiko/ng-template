import { AbstractDirective } from "./abstract-directive";
/**
 * <span data-ng-switch-default></span>
 */
export class NgSwitchCaseDefault extends AbstractDirective implements Template.Directive {
  nodes: Template.DirectiveNode[];

  constructor( public el:HTMLElement ){
    super();
    this.nodes =  this.initNodes( el, "ng-switch-case-default",
      ( node:HTMLElement, expr:string, evaluate:Function ) => {
      return {
        el: node,
        outerHTML: node.outerHTML,
        exp: evaluate( expr )
      }
    });
  }

  update( data:Template.DataMap ){
    if ( !this.nodes.length ) {
      return;
    }
    if ( !this.el.innerHTML ) {
      let node = this.nodes.shift();
      this.el.innerHTML = node.outerHTML;
    }
  }

}
