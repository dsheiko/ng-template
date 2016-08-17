/// <reference path="./ngtemplate.d.ts" />
import { NgIf } from "./ng-template/ngif";
import { NgEl } from "./ng-template/ngel";
import { NgText } from "./ng-template/ngtext";
import { NgFor } from "./ng-template/ngfor";
import { NgSwitch } from "./ng-template/ngswitch";
import { NgSwitchCase } from "./ng-template/ngswitchcase";
import { NgSwitchCaseDefault } from "./ng-template/ngswitchcasedefault";
import { NgClass } from "./ng-template/ngclass";
import { NgProp } from "./ng-template/ngprop";
import { NgData } from "./ng-template/ngdata";
import { Exception } from "./ng-template/exception";
import { Reporter } from "./ng-template/reporter";

let DIRECTIVES = [ NgFor, NgSwitch, NgSwitchCase, NgSwitchCaseDefault, NgIf,
      NgClass, NgData, NgProp, NgEl, NgText ];

export class NgTemplate {
  private directives: NgTemplate.Directive[] = [];
  private reporter: Reporter;

  static factory( el: HTMLElement, template?: string ): NgTemplate {
    return new NgTemplate( el, template || null );
  }

  /**
   * Initialize template for a given Element
   * If template passed, load it into the Element
   */

  constructor( public el: HTMLElement, public template?: string ){
    if ( !this.el ) {
      throw new Exception( "(NgTemplate) Invalid first parameter: must be an existing DOM node" );
    }
    this.reporter = new Reporter();
    this.template || this.init( DIRECTIVES );
  }

  private init( directives: Function[] ){
    directives.forEach(( Directive: any ) => {
      this.directives.push( new Directive( this.el, this.reporter ) );
    });
  }

  report(){
    return this.reporter.get();
  }

  sync( data: NgTemplate.DataMap ): NgTemplate {
    // Late initialization: renders from a given template on first sync
    if ( this.template ) {
      this.el.innerHTML = this.template;
      this.init( DIRECTIVES );
      this.template = null;
    }
    this.directives.forEach(( d ) => {
      d.sync( data, NgTemplate );
    });
    return this;
  }

  pipe( cb: Function, context: Object = this ): NgTemplate {
    cb.call( context, this.el );
    return this;
  }
}
