import { AbstractDirective } from "./abstract-directive";
import { Exception } from "./exception";
let counter: number = 0;
// <div data-ng:for="let hero of data.heroes" data-ng:text="hero" ></div>

export class NgFor extends AbstractDirective implements NgTemplate.Directive {
  nodes: NgTemplate.DirectiveNode[];

  constructor( el: HTMLElement ){
    super();
    this.nodes =  this.initNodes( el, "ng-for",
      ( node: HTMLElement, expr: string, evaluate: Function, cache: NgTemplate.Cache ) => {
      let parsed: NgTemplate.NgForExprVo = this.parseExpr( expr ),
          outerHTML: string,
          id: string = "id" + ( ++counter );

      node.dataset[ "ngNodeId" ] = id;
      outerHTML = node.outerHTML;

      // Do not process directives on the first level as all of them about elements generated by ngFor
      [ "ngSwitch", "ngSwitchCase", "ngSwitchCaseDefault", "ngIf",
         "ngClassListToggle", "ngData", "ngProp", "ngEl", "ngText" ].forEach(( key ) => {
         delete node.dataset[ key ];
      });

      return {
        el: node,
        parentNode: node.parentNode,
        outerHTML: outerHTML,
        id: id,
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

  /**
   * Create for generated list elements a permitted parent elements
   */
  private static createParentEl( el: HTMLElement ): HTMLElement {
      const map: NgTemplate.DataMap = {
        "TR": "tbody",
        "THEAD": "table",
        "TFOOT": "table",
        "TBODY": "table",
        "COLGROUP": "table",
        "CAPTION": "table",
        "TD": "tr",
        "TH": "tr",
        "COL": "colgroup",
        "FIGCAPTION": "figure",
        "LEGEND": "fieldset",
        "LI": "ul",
        "DT": "dl",
        "DD": "dl",
      };
      let child: string = el.tagName.toUpperCase(),
          parent = child in map ? map[ child ] : "div";
      return document.createElement( parent );
  }

  sync( data: NgTemplate.DataMap, cb: NgTemplate.SyncCallback ){
    this.nodes.forEach(( node: NgTemplate.DirectiveNode ) => {
      let tmp = NgFor.createParentEl( node.el ),
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
    let items = Array.from( node.parentNode.querySelectorAll( `[data-ng-node-id="${node.id}"]` ) ),
        anchor = document.createElement( "ng" );

    node.parentNode.insertBefore( anchor, items[ 0 ] );
    anchor.dataset[ "ngNodeId" ] = node.id;
    items.forEach(( child ) => {
      node.parentNode.removeChild( child );
    });

    node.parentNode.replaceChild( doc, anchor );
  }
}
