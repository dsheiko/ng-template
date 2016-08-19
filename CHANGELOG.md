# CHANGELOG

## 0.1.0
* expression parser fully refactored and now able to resolve simple expressions like `foo + bar`, `foo === 'string'`, `true && false` wihout `eval()`
* directive `data-ng-class-list-toggle` shortened till `data-ng-class`

## 0.1.1
* consistency for error reporting: NgTemplate throws outside Exception and internally ExpressionException, error codes in the reporter