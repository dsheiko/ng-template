import { AbstractDirective } from "./abstract-directive";
import { Exception } from "./exception";
import { ERROR_CODES } from "./constants";
import { ReferenceToken } from "./expression/tokenizer";
import { ExpressionException } from "./expression/exception";

const DATA_ID_KEY = "id";

let counter: number = 0;
// <div data-ng:for="let hero of data.heroes" data-ng:text="hero" ></div>

export class NgFor extends AbstractDirective implements NgTemplate.Directive {
  nodes: NgTemplate.DirectiveNode[];

  constructor( el: HTMLElement, reporter: NgTemplate.Reporter ){
    super( el, reporter );
    this.nodes =  this.initNodes( el, "ng-for",
      ( node: HTMLElement, expr: string, compile: Function, cache: NgTemplate.Cache ) => {
      let parsed: NgTemplate.NgForExprVo = this.parseExpr( expr ),
          outerHTML: string,
          id: string = "id" + ( ++counter );

      node.dataset[ "ngForScope" ] = id;
      outerHTML = node.outerHTML;

      // Do not process directives on the first level as all of them about elements generated by ngFor
      [ "ngSwitch", "ngSwitchCase", "ngSwitchCaseDefault", "ngIf",
      "ngClass", "ngData", "ngProp", "NgId", "NgValue", "ngAttr", "ngEl", "ngText" ].forEach(( key ) => {
        if ( node.dataset[ key ] ) {
          delete node.dataset[ key ];
        }
      });

      return {
        el: node,
        parentNode: node.parentNode,
        outerHTML: outerHTML,
        id: id,
        indexable: false,
        variable: parsed.variable,
        items: <Array<NgTemplate.NgTemplate>>[],
        cache: cache,
        exp: function( data: NgTemplate.DataMap, cb: Function ): any[] {
          let it: any[] = [];
          try {
            it = ReferenceToken.findValue( parsed.iterable, data );
          } catch ( err ) {
            if ( !( err instanceof ExpressionException ) ) {
              throw new Exception( `Invalid ng* expression ${expr}` );
            }
            reporter.addLog( `${ERROR_CODES.NGT0003}: ` + ( <ExpressionException> err ).message );
          }

          if ( !Array.isArray( it ) ) {
             it = [];
          }
          return it;
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
  private static createParentEl( tag: string ): HTMLElement {
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
      let child: string = tag.toUpperCase(),
          parent = child in map ? map[ child ] : "div";
      return document.createElement( parent );
  }

  removeIndexable( node: NgTemplate.DirectiveNode, it: any[] ): NgTemplate.NgTemplate[] {
    return node.items.filter(( instance: NgTemplate.NgTemplate ) => {
      return it.find(( val ) => {
        return instance.id === val[ DATA_ID_KEY ];
      });
    });
  }

  sync( data: NgTemplate.DataMap, Ctor: NgTemplate.NgTemplateCtor ){
    this.nodes.forEach(( node: NgTemplate.DirectiveNode ) => {

      let it: any[] = node.exp( data );
      if ( node.cache.match( JSON.stringify( it ) ) ) {
        return false;
      }
      // reduce: collection changed, it's a special case
      // if we have indexes (id) then we go still gacefully, we remove  particular nodes from the list
      // if not, we updateth list
      if ( node.items.length > it.length ) {
        node.items = node.indexable ? this.removeIndexable( node, it ) : [];
      }
      // expand: update every item and add new ones
      if ( node.items.length < it.length ) {
        let num = it.length - node.items.length;
        while ( num-- ){
          let el = NgFor.createEl( node.el.tagName, node.outerHTML );
          node.items.push(new Ctor( el ));
        }
      }
      // sync
      it.forEach(( val, inx ) => {
        let item: NgTemplate.NgTemplate = node.items[ inx ];
        data[ node.variable ] = val;
        item.sync( data );
        if ( val && typeof val === "object" && DATA_ID_KEY in val ) {
          item.id = val[ DATA_ID_KEY ];
          node.indexable = true;
        }
      });

      this.buildDOM( node );
    });
  }
  static createEl( tag: string, html: string ): HTMLElement {
    let parent = NgFor.createParentEl( tag );
    parent.innerHTML = html;
    return parent.firstElementChild as HTMLElement;
  }


  private buildDOM( node: NgTemplate.DirectiveNode ): void{
    let items = Array.from( node.parentNode.querySelectorAll( `[data-ng-for-scope="${node.id}"]` ) ),
        anchor = document.createElement( "ng" );

    node.parentNode.insertBefore( anchor, items[ 0 ] );
    anchor.dataset[ "ngForScope" ] = node.id;
    items.forEach(( child ) => {
      node.parentNode.removeChild( child );
    });
    node.items.forEach(( item: NgTemplate.NgTemplate ) => {
      node.parentNode.insertBefore( item.el, anchor );
    });
    node.parentNode.removeChild( anchor );
  }
}
