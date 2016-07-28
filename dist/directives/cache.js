var Cache = (function () {
    function Cache() {
    }
    Cache.prototype.evaluate = function (exVal, cb) {
        if (exVal === this.cache) {
            return;
        }
        this.cache = exVal;
        cb(exVal);
    };
    return Cache;
})();
exports.Cache = Cache;
;
