# CHANGELOG

## 0.1.0
* expression parser fully refactored and now able to resolve simple expressions like `foo + bar`, `foo === 'string'`, `true && false` wihout `eval()`
* directive `data-ng-class-list-toggle` shortened till `data-ng-class`

## 0.1.1
* consistency for error reporting: ngTemplate throws outside Exception and internally ExpressionException, error codes in the reporter

## 0.1.2
* ngFor optimized - relies now a direct link
* scope variable undefined warnings moved out of reporter.errors to reporter.log. These are not errors really - template may have variables that will be fullfilled asynchronously. But still we have a possibility to check in the log how the template parsed.

## 0.1.3
* Going RC1

## 0.1.4
* introducing constructor options with optional callbacks `willMount` and `didMount` (like React's `componentWillMount` and `componentDidMount`)

# 0.1.7
* introducing `data-ng-attr` directive
