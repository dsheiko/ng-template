import { evaluate } from "./expression";

export class AbstractDirective {
  constructor(){
  }

  initNodes( el:HTMLElement, identifier:string, cb:Function ): Template.DirectiveNode[]{
    let datakey:string = this.getDataKey( identifier ),
        selector:string = this.getSelector( identifier );
    return Array.from( el.querySelectorAll( selector ) ).map(( el:HTMLElement ) => {
      let expr = el.dataset[ datakey ];
      delete el.dataset[ datakey ];
      return cb( el, expr, evaluate );
    });
  }

  /**
   * Converts foo-bar-baz to `[data-foo-bar-baz]`
   */
  private getSelector( raw:string ) {
    return `[data-${raw}]`;
  }
  /**
   * Converts foo-bar-baz to fooBarBaz
   */
  private getDataKey( raw:string ) {
    return raw
      .split( "-" ).map( ( part:string, inx:number ) => {
        if ( !inx ) {
          return part;
        }
        return part.substr( 0, 1 ).toUpperCase() + part.substr( 1 );
    })
    .join( "" );
  }

  setText( el: HTMLElement, str: string ) {
    el.innerHTML = "";
    el.appendChild( document.createTextNode( str ) );
  }

  escape( str: string ){
    let div = document.createElement( "div" );
    this.setText( div, str );
    return div.innerHTML;
  }


}

