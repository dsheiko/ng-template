export class NgTemplate {
  id: string;
  static factory( el: Element, template?: string, options?: any ): NgTemplate;
  constructor( el: Element, template?: string, options?: any );
  report(): any;
  sync( data: Object ): NgTemplate;
  pipe( cb: Function, context: Object ): NgTemplate;
}
