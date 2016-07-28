import { AbstractDirective } from "./abstract-directive";
/**
 * <span data-ng-switch="exp"></span>
 */
export class NgSwitch extends AbstractDirective implements NgTemplate.Directive {
  nodes: NgTemplate.DirectiveNode[];

  constructor( el:HTMLElement ){
    super();
    this.nodes =  this.initNodes( el, "ng-switch",
      ( node:HTMLElement, expr:string, evaluate:Function, cache:NgTemplate.Cache ) => {
      return {
        el: node,
        exp: evaluate( expr ),
        cache: cache
      }
    });
  }

  sync( data:NgTemplate.DataMap, cb:NgTemplate.SyncCallback ){
    this.nodes.forEach(( node:NgTemplate.DirectiveNode ) => {
      node.cache.evaluate( node.exp.call( node.el, data ), ( val:any ) => {
        data[ "$" ] = val;
        cb && cb( node.el );
      });
    });
  }
}
