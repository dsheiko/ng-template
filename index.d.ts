export class NgTemplate {
  static factory( el: Element, template?: string ): NgTemplate;
  constructor( el: Element, template?: string );
  report(): any;
  sync( data: Object ): NgTemplate;
  pipe( cb: Function, context: Object ): NgTemplate;
}
