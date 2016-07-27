
# NG.Template

Backbone.NG includes a light-weight template engine, that doesn't destroy the state of your DOM

## API

#### Syntax
```
core
  .template( el: HTMLElement, tpl?: string )
  .update( context: ([s: string]: any) );
```
where:
* el - bounding box DOM element
* tpl - template code, when given injected into the el
* context - template context

#### Example
```javascript
import { template } from "backbone-ng/core";

// initialize
let tpl = template( document.body , "<span data-ng-if=\"invalid\">Error</span>" )

// update when state changes
tpl.update({ invalid: false });

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
template( document.body , `<i data-ng-text="foo"></i>` )
  .update({ foo: "Foo" });

console.log( document.body.innerHTML ); // <i>Foo</i>
```

```javascript
template( document.body , `<i data-ng-text="foo"></i>` )
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
template( document.body , `<i data-ng-el="this.className = class"></i>` )
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
let tpl = template( document.body , `<i data-ng-if="toggle">Hello!</i>` );

tpl.update({ toggle: false });
console.log( document.body.innerHTML ); // <ng style="display: none; "></ng>

tpl.update({ toggle: true });
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
template( document.body , `<i data-ng-for="let row of rows" data-ng-text="row"></i>` )
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
template( document.body ,
  `<div data-ng-switch="theCase">
    <i data-ng-switch-case="1">FOO</i>
    <i data-ng-switch-case="2">BAR</i>
  </div>` )
  .update({ theCase: 1 });

console.log( document.body.innerHTML ); // <i>FOO</i>
```

```javascript
template( document.body ,
  `<div data-ng-switch="theCase">
    <i data-ng-switch-case="1">FOO</i>
    <i data-ng-switch-case="2">BAR</i>
    <i data-ng-switch-case-default>BAZ</i>
  </div>` )
  .update({ theCase: 100 });

console.log( document.body.innerHTML ); // <i>BAZ</i>
```