"use strict";
var Reporter = (function () {
    function Reporter() {
        this.report = {
            errors: [],
            tokens: []
        };
    }
    Reporter.prototype.addError = function (msg) {
        this.report.errors.push(msg);
    };
    Reporter.prototype.get = function () {
        return this.report;
    };
    return Reporter;
}());
exports.Reporter = Reporter;
