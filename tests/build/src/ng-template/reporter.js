"use strict";
var Reporter = (function () {
    function Reporter() {
        this.data = {
            errors: [],
            tokens: []
        };
    }
    Reporter.prototype.addError = function (msg) {
        this.data.errors.push(msg);
    };
    Reporter.prototype.addTokens = function (tokens) {
        var merge = tokens.map(function (token) { return token.toJSON(); });
        this.data.tokens = this.data.tokens.concat(merge);
    };
    Reporter.prototype.get = function () {
        return this.data;
    };
    return Reporter;
}());
exports.Reporter = Reporter;
