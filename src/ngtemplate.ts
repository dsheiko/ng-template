/// <reference path="./ngtemplate.d.ts" />
import { NgIf } from "./directives/ngif";
import { NgEl } from "./directives/ngel";
import { NgText } from "./directives/ngtext";
import { NgFor } from "./directives/ngfor";
import { NgSwitch } from "./directives/ngswitch";
import { NgSwitchCase } from "./directives/ngswitchcase";
import { NgSwitchCaseDefault } from "./directives/ngswitchcasedefault";
import { NgClassListToggle } from "./directives/ngclasslisttoggle";
import { NgProp } from "./directives/ngprop";



export class NgTemplate {
  private directives: NgTemplate.Directive[] = [];

  static factory( el: HTMLElement, template?: string ): NgTemplate {
    return new NgTemplate( el, template || null );
  }
  /**
   * Initialize template for a given Element
   * If template passed, load it into the Element
   */

  constructor( public el: HTMLElement, public template?: string ){
    if ( !this.el ) {
      throw new Error( "(NgTemplate) Invalid first parameter: must be an existing DOM node" );
    }
    if ( this.template ) {
      return;
    }
    this.init([ NgFor, NgSwitch, NgSwitchCase, NgSwitchCaseDefault, NgIf,
      NgClassListToggle, NgProp, NgEl, NgText ]);
  }

  private init( directives: Function[] ){
    directives.forEach(( Directive: any ) => {
      this.directives.push( new Directive( this.el ) );
    });
  }

  sync( data: NgTemplate.DataMap ): NgTemplate {
    // Late initialization: renders from a given template on first sync
    if ( this.template ) {
      this.el.innerHTML = this.template;
      this.init([ NgFor, NgSwitch, NgSwitchCase, NgSwitchCaseDefault, NgIf,
        NgClassListToggle, NgProp, NgEl, NgText ]);
      this.template = null;
    }
    this.directives.forEach(( d ) => {
      d.sync( data, ( el: HTMLElement ) => {
        ( new NgTemplate( el ) ).sync( data );
      });
    });
    return this;
  }

  pipe( cb: Function, context: Object = this ): NgTemplate {
    cb.call( context, this.el );
    return this;
  }
}
