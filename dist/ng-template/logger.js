"use strict";
var Logger = (function () {
    function Logger(enabled) {
        if (enabled === void 0) { enabled = true; }
        this.enabled = enabled;
    }
    Logger.prototype.run = function (caption, args, cb) {
        if (args === void 0) { args = []; }
        if (!this.enabled) {
            return;
        }
        if (typeof performance === "undefined") {
            return cb.call(this);
        }
        var s = window.performance.now(), ret = cb.call(this);
        console.log(caption, window.performance.now() - s, "ms", args);
        return ret;
    };
    return Logger;
}());
exports.Logger = Logger;
