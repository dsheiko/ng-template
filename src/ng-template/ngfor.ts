import { AbstractDirective } from "./abstract-directive";
import { Exception } from "./exception";
// <div data-ng:for="let hero of data.heroes" data-ng:text="hero" ></div>

export class NgFor extends AbstractDirective implements NgTemplate.Directive {
  nodes: NgTemplate.DirectiveNode[];

  constructor( el: HTMLElement ){
    super();
    this.nodes =  this.initNodes( el, "ng-for",
      ( node: HTMLElement, expr: string, evaluate: Function, cache: NgTemplate.Cache ) => {
      let parsed: NgTemplate.NgForExprVo = this.parseExpr( expr );
      node.dataset[ "ng" ] = "internal";
      return {
        el: node,
        parentNode: node.parentNode,
        outerHTML: node.outerHTML,
        exp: function( data: NgTemplate.DataMap, cb: Function ): boolean {
          let it: any[] = [];
          try {
              eval( `it = data.${parsed.iterable}` );
          } catch ( err ) {
              throw new Exception( `NgTemplate variable ${parsed.iterable} undefined` );
          }
          if ( !Array.isArray( it ) ) {
             throw new Exception( `NgTemplate variable ${parsed.iterable} must be an array` );
          }

          if ( cache.match( JSON.stringify( it ) ) ) {
            return false;
          }
          it.forEach(( val ) => {
             cb( val, parsed.variable || null );
          });
          return true;
        }
      };
    });
  }

  parseExpr( strRaw: string ): NgTemplate.NgForExprVo{
    let re = /(let|var)\s+([a-zA-Z0-9\_]+)\s+of\s+/,
        str = strRaw.trim(),
        varMatches = str.match( re );

    if ( !varMatches || varMatches.length !== 3 ) {
      throw new Exception( "Cannot parse ng-for expression: " + strRaw );
    }

    return {
      variable: varMatches[ 2 ],
      iterable: str.replace( re, "" )
    };
  }

  sync( data: NgTemplate.DataMap, cb: NgTemplate.SyncCallback ){
    this.nodes.forEach(( node: NgTemplate.DirectiveNode ) => {
      let tmp = document.createElement( "div" ),
      isChanged = node.exp( data, ( val: string, variable: string ) => {
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
  private nodesToDocFragment( div: HTMLElement ): HTMLElement {
    let doc = document.createDocumentFragment();
    Array.from( div.children ).forEach( child => doc.appendChild( child ) );
    return <HTMLElement>doc;
  }

  private buildDOM( node: NgTemplate.DirectiveNode, doc: HTMLElement ): void{
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
