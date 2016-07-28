import { AbstractDirective } from "./abstract-directive";
// <div data-ng:for="let hero of data.heroes" data-ng:text="hero" ></div>

export class NgFor extends AbstractDirective implements Template.Directive {
  nodes: Template.DirectiveNode[];

  constructor( el:HTMLElement ){
    super();
    this.nodes =  this.initNodes( el, "ng-for",
      ( node:HTMLElement, expr:string, evaluate:Function, cache:Template.Cache ) => {
      let parsed:Template.NgForExprVo = this.parseExpr( expr );
      node.dataset[ "ng" ] = "internal";
      return {
        el: node,
        parentNode: node.parentNode,
        outerHTML: node.outerHTML,
        exp: function( data:Template.DataMap, cb:Function ):boolean {
          let it:any[] = [];
          try {
              eval( `it = data.${parsed.iterable}` );
          } catch ( err ) {
              throw new EvalError( `Template variable ${parsed.iterable} undefined` );
          }
          if ( !Array.isArray( it ) ) {
             throw new Error( `Template variable ${parsed.iterable} must be an array` );
          }

          if ( cache.match( JSON.stringify( it ) ) ) {
            return false;
          }
          it.forEach(( val ) => {
             cb( val, parsed.variable );
          });
          return true;
        }
      }
    });
  }

  parseExpr( strRaw:string ):Template.NgForExprVo{
    let re = /(let|var)\s+([a-zA-Z0-9\_]+)\s+of\s+/,
        str = strRaw.trim(),
        varMatches = str.match( re );

    if ( !varMatches || varMatches.length !== 3 ) {
      throw new Error( "Cannot parse ng-for expression: " + strRaw );
    }

    return {
      variable: varMatches[ 2 ],
      iterable: str.replace( re, "" )
    };
  }

  sync( data:Template.DataMap, cb:Template.SyncCallback ){
    this.nodes.forEach(( node:Template.DirectiveNode ) => {
      let tmp = document.createElement( "div" ),
      isChanged = node.exp( data, ( val:string, variable:string ) => {
        tmp.innerHTML += node.outerHTML;
        data[ variable ] = val;
        cb && cb( tmp );
      });
      isChanged && this.buildDOM( node, this.nodesToDocFragment( tmp ) );
    });
  }

  /**
   * Create headless DOM subtree
   */
  private nodesToDocFragment( div:HTMLElement ):HTMLElement {
    let doc = document.createDocumentFragment();
    Array.from( div.children ).forEach( child => doc.appendChild( child ) );
    return <HTMLElement>doc;
  }

  private buildDOM( node:Template.DirectiveNode, doc:HTMLElement ):void{
    let items = Array.from( node.parentNode.querySelectorAll( "[data-ng=internal]" ) ),
        anchor = document.createElement( "ng" );

    node.parentNode.insertBefore( anchor, items[ 0 ] );
    anchor.dataset[ "ng" ] = "internal";
    items.forEach(( child ) => {
      node.parentNode.removeChild( child );
    });

    node.parentNode.replaceChild( doc, anchor );
  }
}
