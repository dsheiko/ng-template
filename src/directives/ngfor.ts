import { AbstractDirective } from "./abstract-directive";
// <div data-ng:for="let hero of data.heroes" data-ng:text="hero" ></div>

export class NgFor extends AbstractDirective implements Template.Directive {
  nodes: Template.DirectiveNode[];

  constructor( el:HTMLElement ){
    super();
    this.nodes =  this.initNodes( el, "ng-for", ( node:HTMLElement, expr:string, evaluate:Function ) => {
      let parsed:Template.NgForExprVo = this.parseExpr( expr ),
          outerHTML = node.outerHTML,
          anchor = document.createElement( "a" );
          node.parentNode.replaceChild( anchor, node );

      return {
        el: anchor,
        anchor: anchor,
        outerHTML: outerHTML,
        exp: function( data:Template.DataMap, cb:Function ):void {
          let it:any[] = [];
          try {
              eval( `it = data.${parsed.iterable}` );
          } catch ( err ) {
              throw new EvalError( `Template variable ${parsed.iterable} undefined` );
          }
          if ( !Array.isArray( it ) ) {
             throw new Error( `Template variable ${parsed.iterable} must be an array` );
          }
          return it.forEach(( val ) => {
            return cb( val, parsed.variable );
          });
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
      let tmp = document.createElement( "div" );
      node.exp( data, ( val:string, variable:string ) => {
        tmp.innerHTML += node.outerHTML;
        data[ variable ] = val;
        cb && cb( tmp );
      });
      this.buildDOM( node, this.nodesToDocFragment( tmp ) );

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
    let parent:HTMLElement = <HTMLElement>node.anchor.parentNode;
    parent.replaceChild( doc, node.anchor );
    node.anchor = doc;
  }
}
