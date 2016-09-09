
# ngTemplate 1.0

[![NPM](https://nodei.co/npm/ng-template.png)](https://nodei.co/npm/ng-template/)

[![Build Status](https://travis-ci.org/dsheiko/ng-template.png)](https://travis-ci.org/dsheiko/ng-template)

`ngTemplate` is a light-weight DOM-based template engine, inspired by AngularJS.

`mustache.js`, `Handlebars` or `_.template` are all nice and shiny, until it comes to a form.
With every rending these template engines replace the bound DOM subtree
and the state of inputs gets lost.

`ngTemplate` treats the DOM carefully. It modifies the exact target nodes gracefully
according to the directives and actual state.

## Motivation

* Progressive enhancement friendly: Server-side generated HTML can be fully ready for presentation. During `ngTemplate` synchronization it will be updated according to element directives and a provided state
* HTML compliant: `data-*` - directives instead of foreign concepts such as `{{foo}}`, `[hidden]`, `*ngFor`, `[(ngModel)]`
* Concern separation: Presentation state logic decoupled from the view
* Performance: `ngTemplate` modifies DOM nodes by state diff; it touches the DOM only when it's necessary
* Easy to catch up: Familiar for Angular folks directives such as `data-ng-if`, `data-ng-switch`, `data-ng-for` and a few extra intuitive e.g. `data-ng-text`, `data-ng-class`
* Really small library: minimized gziped [size is 4K](https://raw.githubusercontent.com/dsheiko/ng-template/master/dist/ngtemplate.glob.min.js)
* Definitely Typed: IDE checks on the fly if you violate any of declared interfaces (if not the compiler does)

## How does it work?

Templates are written with HTML that contains `ngTemplate`-specific data attributes (`data-ng-*`):

```html
<form id="heroForm" novalidate>
  <div class="form-group">
    <label for="name">Name</label>
    <input id="name" type="text" class="form-control" required >
    <div class="alert alert-danger" data-ng-if="!name.valid">
      Name is required
    </div>
  </div>
  <div class="form-group">
    <label for="power">Hero Power</label>
    <select id="power" class="form-control"  required>
      <option data-ng-for="let p of powers" data-ng-text="p" >Nothing here</option>
    </select>
    <div class="alert alert-danger" data-ng-if="!power.valid">
      Power is required
    </div>
  </div>
   <button type="submit" class="btn btn-default" data-ng-prop="'disabled', !form.valid">Submit</button>
</form>
```

`ngTemplate` synchronizes the template with the passed state. Let's say we have the template HTML within a DOM element,
so we initialize the template like `let template = new NgTemplate( el );`. Alternatively we can populate
the bounding element with the template from the passed string: `let template = new NgTemplate( el, '<i data-ng-if="foo">Hello!</i>' );`
<br /><br />As soon as we have `template` object we can sync it to a specified scope. E.g. `template.sync({ foo: true });` makes
variable `foo` available for template expressions, `template.sync({ foo: { bar: true }});` gets accessable as `foo.bar`

```javascript
import { NgTemplate } from "ng-template";

let el = document.querySelector( "#heroForm" ),
    elName = document.querySelector( "#name" ),
    elPower = document.querySelector( "#power" );

// Bind the template
let template = new NgTemplate( el );

// Set the scope (view state)
let scope = {
  powers: [ "-", "Really Smart", "Super Flexible",
            "Super Hot", "Weather Changer" ],
  power: {
    valid: true
  },
  name: {
    valid: true
  },
  form: {
    valid: false
  }
};
// Sync to the scope
template.sync( scope );
```

## Live Demo

[ngTemplate Demo: Hero](https://dsheiko.github.io/ng-template/demo.html)

## Installing

You can get `ngTemplate` via npm.
```
npm i --save ng-template
```

## Accessing module

### TypeScript
```javascript
import { NgTemplate } from "ng-template";
const template = new NgTemplate( node );
```

### CommonJS
```javascript
var NgTemplate = require( "ng-template" ).NgTemplate,
    template = new NgTemplate( node );
```
In order to adapt your source for browser, you can either [browserfy](http://browserify.org/) or
load your modules with [SystemJS](https://github.com/systemjs/systemjs)

```
System.config({
  paths: {
     "*": "node_modules/*"
  },
  packageConfigPaths: [ "./node_modules/*/package.json" ]
});
```

### VanillaJS
```HTML
<script src=""./node_modules/ng-template/dist/ngtemplate.glob.min.js"></script>
```
```javascript
var template = new NgTemplate( node );
```


## API

```javascript
import { NgTemplate } from "ng-template";
let template = new NgTemplate( el, tpl ); // compile template
template.sync( scope ); // render on the first run and after synchronize it with the scope
// optional
console.log( template.report() ); // find the synchronization details
```

where:
* el - a DOM element we bind to
* tpl - OPTIONAL: template code that will be injected into `el`
* scope -  an object literal (template scope) whose members form the scope for template expressions

Also can be instantiated via the factory:
```javascript
NgTemplate.factory( el, tpl )
  .sync( scope );
```

### Options
You can define though the constructor options the callbacks `willMount` and `didMount`. The first one gets invoked straight before the `ngTemplate` populates
bounding element's inner HTML from the template string. `ngTemplate`  calls the second callback after that:

```javascript
import { NgTemplate } from "ng-template";
let template = new NgTemplate( el, tpl, {
 willMount: function(){
    console.log( "Template is up to initial rendering" );
  },
  didMount: function(){
    console.log( "Template just finished initial rendering" );
  }
});
```

## Template expressions

Template expressions are being evaluated in the given `scope`. So we can reference scope variables within template e.g.
`data-ng-if="foo"` refers to `foo` variable of the scope and therefore:

```javascript
template.sync({ foo: true }); // show element
template.sync({ foo: false }); // hide element
```

We access scope objects the same way we do it in JavaScript e.g. `data-ng-if="foo.bar"` refers to `foo.bar` and can be toggled like this:
```javascript
template.sync({ foo: { bar: true } }); // show element
```

Expressions may have mixed scope variables and primitives:
```
data-ng-if="foo && bar.baz || false"
data-ng-if="foo + 10  > 20"
```

We can pass rendering helpers (e.g. transformers) with the scope. For example we pass `decorator` to the directive `data-ng-if="decorator(foo)"` this way:
```
{
  foo: "foo",
  decorator: function( val ){
    return "decorated " + val;
  }
}
```

Expressions are evaluated in the context of the target element, so we can access the element with `this`:
```
data-ng-if="foo && this.checked"
```

> :exclamation: NOTE: In order to gain better performance keep to primitive expressions especially in cyclic directives e.g. `data-ng-text="foo.bar.baz"`,
> `data-ng-text="!foo.bar.baz"`, `data-ng-text="'string here'"`, `data-ng-if="foo.bar > baz.quiz"`, `data-ng-text="foo + 10`,
> `data-ng-if="true"`, `data-ng-prop="'disabled', true || false"`, `data-ng-data="foo || bar, baz"`.
> Such expressions are being evaluated without use of `eval()` and therefore the process takes much less time and resources.
> You can check how the parser treats your expressions by studying content of `template.report().tokens` array

## ngTemplate Report

You can get template synchronization details like that:

```javascript
let tpl = new NgTemplate(
  document.createElement( "div" ),
  "<span data-ng-text=\"foo.bar.baz\"></span>"
);

tpl.sync({});
console.log( tpl.report().errors ); // [ "'foo.bar.baz' is undefined" ]

```

## Directives

### ngText

We use `ngText` to modify element's `textNode`

#### Syntax

```
<el data-ng-text="expression => text:string|number" />
```

#### Examples

```javascript
(new NgTemplate( document.body , `<i data-ng-text="foo"></i>` ))
  .sync({ foo: "Foo" });

console.log( document.body.innerHTML ); // <i>Foo</i>
```

HTML gets automatically escaped:

```javascript
(new NgTemplate( document.body , `<i data-ng-text="foo"></i>` ))
  .sync({ foo: "<button>" });

console.log( document.body.innerHTML ); // <i>&lt;button&gt;</i>
```

### ngProp

We use `ngProp` to modify element's properties

#### Syntax

```
<el data-ng-prop="expression => propertyName:string, expression => value:boolean|string" />

// Can be applied multiple times on element
<el data-ng-prop-0="..." data-ng-prop-9="..." />
```

#### Examples

```javascript
(new NgTemplate( document.body , `<button data-ng-prop="'disabled', isDisabled"></button>` ))
  .sync({ isDisabled: true });

console.log( document.body.innerHTML ); // <button disabled=""></button>
```

### ngAttr

We use `ngAttr` to modify element's attributes

#### Syntax

```
<el data-ng-attr="expression => attrName:string, expression => value:boolean|string" />

// Can be applied multiple times on element
<el data-ng-attr-0="..." data-ng-attr-9="..." />
```

#### Examples

```javascript
(new NgTemplate( document.body , `<input data-ng-prop="'required', required">` ))
  .sync({ required: true });

console.log( document.body.innerHTML ); // <input required="true">
```


### ngData

We use `ngData` to modify element's dataset

#### Syntax

```
<el data-ng-data="expression => datasetKey:string, expression => datasetValue:string" />

// Can be applied multiple times on element
<el data-ng-data-0="..." data-ng-data-9="..." />
```

#### Examples

```javascript
(new NgTemplate( document.body , `<div data-ng-data="'dateOfBirth', value"></div>` ))
  .sync({ value: "1960-10-03" });

console.log( document.body.innerHTML ); // <div data-date-of-birth="1960-10-03"></div>
```


### ngClass

We use `ngClass` to modify element's `classList`

#### Syntax

```
<el data-ng-class="expression => className:string, expression => toggle:boolean" />

// Can be applied multiple times on element
<el data-ng-class-0="..." data-ng-class-9="..." />
```

#### Examples

```javascript
(new NgTemplate( document.body , `<i data-ng-class="'is-hidden', isHidden"></i>` ))
  .sync({ isHidden: true });

console.log( document.body.innerHTML ); // <i class="is-hidden"></i>
```
or
```javascript
(new NgTemplate( document.body , `<i data-ng-class="className, isHidden"></i>` ))
  .sync({ isHidden: true, className: "is-hidden" });

console.log( document.body.innerHTML ); // <i class="is-hidden"></i>
```



### ngIf

We use `ngFor` to toggle visibility of an element (subtree) within the DOM

#### Syntax

```
<el data-ng-if="expression => condition:boolean" />
```

#### Examples

```javascript
let template = new NgTemplate( document.body , `<i data-ng-if="toggle">Hello!</i>` );

template.sync({ toggle: false });
console.log( document.body.innerHTML ); // <ng style="display: none; "></ng>

template.sync({ toggle: true });
console.log( document.body.innerHTML ); // <i>Hello!</i>
```


### ngFor

We use `ngFor` when we need to generate a list of elements (subtrees)

> `ngFor` treats the generated list gracefully. It tries to maintain the nodes once appended to the DOM on list data change. However of removing rows from the list during synchronization `ngFor` can do it only if a unique row `id` property provided. Otherwise it updates the list

#### Syntax

```
<el data-ng-for="let variable of expression => list:any[]" />
```

#### Examples

```javascript
(new NgTemplate( document.body , `<i data-ng-for="let row of rows" data-ng-text="row"></i>` ))
  .sync({ rows: [ "foo", "bar" ] });

console.log( document.body.innerHTML ); // <i>foo</i><i>bar</i>
```


### ngSwitch

We use `ngSwitch` when we need to display on element (subtree) of a set of available options.

#### Syntax

```
<el data-ng-switch="expression => variable:string|number">
  <el data-ng-switch-case="expression => value:string|number" />
  <el data-ng-switch-default />
</el>
```

#### Examples

```javascript
(new NgTemplate( document.body ,
  `<div data-ng-switch="theCase">
    <i data-ng-switch-case="1">FOO</i>
    <i data-ng-switch-case="2">BAR</i>
  </div>` ))
  .sync({ theCase: 1 });

console.log( document.body.innerHTML ); // <i>FOO</i>
```

```javascript
(new NgTemplate( document.body ,
  `<div data-ng-switch="theCase">
    <i data-ng-switch-case="1">FOO</i>
    <i data-ng-switch-case="2">BAR</i>
    <i data-ng-switch-case-default>BAZ</i>
  </div>` ))
  .sync({ theCase: 100 });

console.log( document.body.innerHTML ); // <i>BAZ</i>
```

### ngEl

We use `ngEl` to modify element properties

> :exclamation: NOTE: Using `ngEl` is rather discouraging as it cannot be cached and every model sync will
cause the DOM modification even if the expression of `ngEl` wasn't changed

#### Syntax

```
<el data-ng-el="expression => eval:void" />
```

#### Examples

```javascript
(new NgTemplate( document.body , `<i data-ng-el="this.className = class"></i>` ))
  .sync({ class: "is-hidden" });

console.log( document.body.innerHTML ); // <i class="is-hidden"></i>
```

```HTML
<i data-ng-el="this.textNode = mymodel.foo"></i>
<i data-ng-el="this.setAttribute( 'name', mymodel.foo )"></i>
<i data-ng-el="this.disabled = state.isVisible"></i>
<i data-ng-el="this.classList.toggle('name', model.foo)"></i>
```


## Contributing

`ngTemplate` welcomes maintainers. There is plenty of work to do. No big commitment required,
if all you do is review a single Pull Request, you are a maintainer.


### How to build

This source code is written in TypeScript. In order to build the app simply run `tsc` in the root directory

### How to test

There two options. You can run unit-tests in the console:
```
npm run test
```
or you can fire up `tests/index.html` in a browser


[![Analytics](https://ga-beacon.appspot.com/UA-1150677-13/dsheiko/ng-template)](http://githalytics.com/dsheiko/ng-template)
