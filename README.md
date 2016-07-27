
# NG.Template

NG.Template is a light-weight template engine, that doesn't destroy the state of your DOM.

[![Build Status][1]][2] [![dependency status][3]][4] [![dev dependency status][5]][6]

```html
<form id="inviteForm">
  <p data-ng-for="let err of errors" data-ng-text="err" class="error"></p>
  <fieldset>
    <label>Name</label>
    <input name="fullname" data-ng-el="this.classList.toggle('has-error', !state.fullname.valid)" />
  </fieldset>
  <button data-ng-if="form.valid">Submit</button>
</form>
```


```javascript
import { NgTemplate } from "ngtemplate";

let el = document.getElementById( "inviteForm" );
// Bind the template
let template = new NgTemplate( el );
// Sync element for given context
template.update({
  errors: [ "Unknown error", "Require field" ],
  state: {
    fullname: {
      valid: true
    },
    form: {
      valid: true
    }
  }
});
```

## How to use

```
npm i --save ngtemplate
```

### TypeScript
```javascript
import { NgTemplate } from "ngtemplate";
const template = new NgTemplate( node );
```

### CommonJS
```javascript
var NgTemplate = require( "./node_modules/ngtemplate/dist/ngtemplate" ).NgTemplate,
    template = new NgTemplate( node );
```
With SystemJS

### VanillaJS
```HTML
<script src=""./node_modules/ngtemplate/dist/ngtemplate.glob.min.js"></script>
```
```javascript
var template = new NgTemplate( node );
```

## API

#### Syntax
```
import { NgTemplate } from "ngtemplate";
let template = new NgTemplate( el: HTMLElement, tpl?: string )
template.update( context: ([s: string]: any) );

```
where:
* el - bounding box DOM element
* tpl - template code, when given injected into the el
* context - template context

#### Example
```javascript
import { NgTemplate } from "ngtemplate";

// initialize
let template = new NgTemplate( document.body , "<span data-ng-if='invalid'>Error</span>" )

// update when state changes
template.update({ invalid: false });

```

## Template expressions
...

### Expression context
...



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
  .update({ foo: "Foo" });

console.log( document.body.innerHTML ); // <i>Foo</i>
```

```javascript
(new NgTemplate( document.body , `<i data-ng-text="foo"></i>` ))
  .update({ foo: "<button>" });

console.log( document.body.innerHTML ); // <i>&lt;button&gt;</i>
```

### NgEl

We use `NgEl` to modify element properties

#### Syntax

```
<el data-ng-el="expression:void" />
```

#### Examples

```javascript
(new NgTemplate( document.body , `<i data-ng-el="this.className = class"></i>` ))
  .update({ class: "is-hidden" });

console.log( document.body.innerHTML ); // <i class="is-hidden"></i>
```

```HTML
<i data-ng-el="this.textNode = mymodel.foo"></i>
<i data-ng-el="this.setAttribute( 'name', mymodel.foo )"></i>
<i data-ng-el="this.className = 'name'"></i>
<i data-ng-el="this.classList.toggle('name', model.foo)"></i>
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

template.update({ toggle: false });
console.log( document.body.innerHTML ); // <ng style="display: none; "></ng>

template.update({ toggle: true });
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
  .update({ rows: [ "foo", "bar" ] });

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
  .update({ theCase: 1 });

console.log( document.body.innerHTML ); // <i>FOO</i>
```

```javascript
(new NgTemplate( document.body ,
  `<div data-ng-switch="theCase">
    <i data-ng-switch-case="1">FOO</i>
    <i data-ng-switch-case="2">BAR</i>
    <i data-ng-switch-case-default>BAZ</i>
  </div>` ))
  .update({ theCase: 100 });

console.log( document.body.innerHTML ); // <i>BAZ</i>
```


[![Analytics](https://ga-beacon.appspot.com/UA-1150677-13/dsheiko/ngtemplate)](http://githalytics.com/dsheiko/ngtemplate)
