export class NgTemplate {
  static factory( el: Element, template?: string ): NgTemplate;
  constructor( el: Element, template?: string );
  on( ev: string, cb: Function, context?: Object ): NgTemplate;
  sync( data: Object ): NgTemplate;
  pipe( cb: Function, context: Object ): NgTemplate;
}
