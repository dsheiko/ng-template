/// <reference path="./d/ngtemplate.d.ts" />
import { NgIf } from "./directives/ngif";
import { NgEl } from "./directives/ngel";
import { NgText } from "./directives/ngtext";
import { NgFor } from "./directives/ngfor";
import { NgSwitch } from "./directives/ngswitch";
import { NgSwitchCase } from "./directives/ngswitchcase";
import { NgSwitchCaseDefault } from "./directives/ngswitchcasedefault";
import { NgClassListToggle } from "./directives/ngclasslisttoggle";




export class NgTemplate {
  private directives: Template.Directive[] = [];
  /**
   * Initialize template for a given Element
   * If template passed, load it into the Element
   */

  constructor( public el:HTMLElement, template?:string ){
    if ( template ) {
      this.el.innerHTML = template;
    }
    this.factory([ NgFor, NgSwitch, NgSwitchCase, NgSwitchCaseDefault, NgIf, NgClassListToggle, NgEl, NgText ]);
  }

  factory( directives:Function[] ){
    directives.forEach(( Directive:any ) => {
      this.directives.push( new Directive( this.el ) );
    });
  }

  sync( data:Template.DataMap ):NgTemplate {
    this.directives.forEach(( d ) => {
      d.sync( data, ( el: HTMLElement ) => {
        ngTemplate( el ).sync( data );
      });
    })
    return this;
  }

  pipe( cb:Function, context:Object = this ):NgTemplate {
    cb.call( context, this.el );
    return this;
  }
}

export function ngTemplate( el:HTMLElement, template?:string ):NgTemplate {
  return new NgTemplate( el, template || null );
}