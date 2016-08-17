
# NgTemplate 1.0 BETA

[![NPM](https://nodei.co/npm/ng-template.png)](https://nodei.co/npm/ng-template/)

[![Build Status](https://travis-ci.org/dsheiko/ng-template.png)](https://travis-ci.org/dsheiko/ng-template)

`NgTemplate` is a light-weight DOM-based template engine, inspired by AngularJS.

`mustache.js`, `Handlebars` or `_.template` are all nice and shiny, until it comes to a form.
With every rending these template engines replace the bound DOM subtree
and the state of inputs gets lost.

`NgTemplate` treats the DOM carefully. It modifies the exact target nodes gracefully
according to the directives and actual state.

## Motivation

* Progressive enhancement friendly: Server-side generated HTML can be fully ready for presentation. During `NgTemplate` synchronization it will be updated according to element directives and a provided state
* HTML compliant: `data-*` - directives instead of foreign concepts such as `{{foo}}`, `[hidden]`, `*ngFor`, `[(ngModel)]`
* Concern separation: Presentation state logic decoupled from the view
* Performance: `NgTemplate` modifies DOM nodes by state diff; it touches the DOM only when it's necessary
* Easy to catch up: Familiar for Angular folks directives such as `data-ng-if`, `data-ng-switch`, `data-ng-for` and a few extra intuitive e.g. `data-ng-text`, `data-ng-class-list-toggle`

# How does it work?

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

[NgTemplate Demo: Hero](https://dsheiko.github.io/ng-template/)

## Installing

You can get `NgTemplate` via npm.
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
let template = new NgTemplate( el, tpl );
template.sync( scope );
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

## Template expressions

Template expressions are being evaluated in the given `scope`. So we can reference scope variables:
```
data-ng-if="foo"
```
it can bind to the following scope
```
{ foo: true }
```

That includes structures:
```
data-ng-if="foo.bar"
```
it can bind to the following scope
```
{
  foo: {
    bar: true
  }
}
```

We can refer multiple scope variables:
```
data-ng-if="(foo && bar)"
```
it can bind to the following scope
```
{ foo: true, bar: true }
```

Expressions are also evaluated in the context of the target element, so we can access the element with `this`:
```
data-ng-if="(foo && this.checked)"
```
it can bind to the following scope
```
{ foo: true }
```

We can pass rendering helpers (e.g. transformers) with the scope:
```
data-ng-if="decorator(foo)"
```
it can bind to the following scope
```
{
  foo: "foo",
  decorator: function( val ){
    return "decorated " + val;
  }
}
```

> :exclamation: NOTE: In order to gain better performance keep to primitive expressions especially in cyclic directives e.g. `data-ng-text="foo.bar.baz"`,
> `data-ng-text="!foo.bar.baz"`, `data-ng-text="'string here'"`, `data-ng-text="foo.bar.baz"`, `data-ng-text="1000"`
> `data-ng-if="true"`, `data-ng-prop="'disabled', false"`, `data-ng-data="'someCustomKey', bar.baz"`
> Such expressions are being evaluated without use of `eval()` and therefore the process takes much less time and resources

## NgTemplate Report

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

### NgText

We use `NgText` to modify element's `textNode`

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

### NgProp

We use `NgProp` to modify element's properties

#### Syntax

```
<el data-ng-prop="expression => propertyName:string, expression => value:boolean|string" />
```

#### Examples

```javascript
(new NgTemplate( document.body , `<button data-ng-prop="'disabled', isDisabled"></button>` ))
  .sync({ isDisabled: true });

console.log( document.body.innerHTML ); // <button disabled=""></button>
```


### NgData

We use `NgData` to modify element's dataset

#### Syntax

```
<el data-ng-data="expression => datasetKey:string, expression => datasetValue:string" />
```

#### Examples

```javascript
(new NgTemplate( document.body , `<div data-ng-data="'dateOfBirth', value"></div>` ))
  .sync({ value: "1960-10-03" });

console.log( document.body.innerHTML ); // <div data-date-of-birth="1960-10-03"></div>
```


### NgClassListToggle

We use `NgClassListToggle` to modify element's `classList`

#### Syntax

```
<el data-ng-class-list-toggle="expression => className:string, expression => toggle:boolean" />
```

#### Examples

```javascript
(new NgTemplate( document.body , `<i data-ng-class-list-toggle="'is-hidden', isHidden"></i>` ))
  .sync({ isHidden: true });

console.log( document.body.innerHTML ); // <i class="is-hidden"></i>
```
or
```javascript
(new NgTemplate( document.body , `<i data-ng-class-list-toggle="className, isHidden"></i>` ))
  .sync({ isHidden: true, className: "is-hidden" });

console.log( document.body.innerHTML ); // <i class="is-hidden"></i>
```



### NgIf

We use `NgFor` to toggle visibility of an element (subtree) within the DOM

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


### NgFor

We use `NgFor` when we need to generate a list of elements (subtrees)

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


### NgSwitch

We use `NgSwitch` when we need to display on element (subtree) of a set of available options.

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

### NgEl

We use `NgEl` to modify element properties

> NOTE: Using `NgEl` is rather discouraging as it cannot be cached and every model sync will
cause the DOM modification even if the expression of `NgEl` wasn't changed

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

`NgTemplate` welcomes maintainers. There is plenty of work to do. No big commitment required,
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
