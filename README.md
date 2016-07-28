
# NgTemplate 1.0 BETA

`NgTemplate` is a light-weight DOM-based template engine, inspired by AngularJS. While `mustache.js`, `Handlebars` or
`_.template` are fast and wide-spread, one cannot simply use them on a form. Rending template will reset the state of inputs.
`NgTemplate` doesn't the view DOM-subtree, it modifies the target nodes according to the directives.

## Motivation

* Progressive enhancement friendly: server-side generated HTML can be fully ready for presentation. During `NgTemplate` synchronization it will be updated according to element directives and a provided state
* HTML compliant: `data-*` - directives instead of foreign concepts such as `{{foo}}`, `[hidden]`, `*ngFor`, `[(ngModel)]`
* Concern separation: presentation state logic decoupled from the view
* Performance: Modified DOM nodes by state diff, only when it's required
* Easy to catch up: familiar for Angular folks directives such as `data-ng-if`, `data-ng-switch`, `data-ng-for` and a few extra intuitive e.g. `data-ng-text`, `data-ng-class-list-toggle`

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
   <button type="submit" class="btn btn-default" data-ng-el="this.disabled = !form.valid">Submit</button>
</form>
```


```javascript
import { NgTemplate } from "ng-template";

let el = document.querySelector( "#heroForm" ),
    elName = document.querySelector( "#name" ),
    elPower = document.querySelector( "#power" );

// Bind the template
let template = new NgTemplate( el );

// Set the context
let context = {
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
// Sync to the context
template.sync( context );
```


## Installing

You can get `NgTemplate` via npm.
```
npm i --save ngtemplate
```

## Accessing module

### TypeScript
```javascript
import { NgTemplate } from "ng-template";
const template = new NgTemplate( node );
```

### CommonJS
```javascript
var NgTemplate = require( "./node_modules/ngtemplate/dist/ngtemplate" ).NgTemplate,
    template = new NgTemplate( node );
```
In order to adapt your source for browser, you can either [browserfy](http://browserify.org/) or
load your modules with [SystemJS](https://github.com/systemjs/systemjs)

### VanillaJS
```HTML
<script src=""./node_modules/ngtemplate/dist/ngtemplate.glob.min.js"></script>
```
```javascript
var template = new NgTemplate( node );
```


## API

```
import { NgTemplate } from "ng-template";
let template = new NgTemplate( el, tpl );
template.sync( context );

```
where:
* el - a DOM element we bind to
* tpl - OPTIONAL: template code that will be injected into `el`
* context - template context - an object literal whose members form the scope for template expressions


## Template expressions

data-ng-if="foo"
{ foo: true }

data-ng-if="foo.bar"
{
  foo: {
    bar: true
  }
}

data-ng-if="(foo && bar)"
{ foo: true, bar: true }


data-ng-if="(foo && this.checked)"
{ foo: true }



## Directives

### NgText

We use `NgText` to modify element textNode

#### Syntax

```
<el data-ng-text="expression:string|number" />
```

#### Examples

```javascript
(new NgTemplate( document.body , `<i data-ng-text="foo"></i>` ))
  .sync({ foo: "Foo" });

console.log( document.body.innerHTML ); // <i>Foo</i>
```

The directive renders escaped HTML:
```javascript
(new NgTemplate( document.body , `<i data-ng-text="foo"></i>` ))
  .sync({ foo: "<button>" });

console.log( document.body.innerHTML ); // <i>&lt;button&gt;</i>
```


### NgClassListToggle

We use `NgClassListToggle` to modify element's `classList`

#### Syntax

```
<el data-ng-class-list-toggle="expression:string, expression:boolean" />
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
<el data-ng-if="expression:boolean" />
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
<el data-ng-for="let variable of expression:any[]" />
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
<el data-ng-switch="expression:string|number">
  <el data-ng-switch-case="expression:string|number" />
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
<el data-ng-el="expression:void" />
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

NgTemplate actively invites maintainers. There is plenty of work to do. No big commitment required,
if all you do is review a single Pull Request, you are a maintainer. .


### How to build

This source code is written in TypeScript. In order to build the app simply run `tsc` in the root directory

### How to test

There two options. You can run unit-tests in the console:
```
npm run test
```
or you can fire up `tests/index.html` in a browser


[![Analytics](https://ga-beacon.appspot.com/UA-1150677-13/dsheiko/ngtemplate)](http://githalytics.com/dsheiko/ngtemplate)
