"use strict";
var ngtemplate_1 = require("../../../src/ngtemplate");
function ReportSpec() {
    describe("#report", function () {
        beforeEach(function () {
            this.el = document.createElement("div");
        });
        it("evaluates the statement (general)", function () {
            var report = ngtemplate_1.NgTemplate
                .factory(this.el, "<span data-ng-text=\"foo.bar.baz\"></span>")
                .sync({ foo: 10 })
                .report();
            expect(report.log.length).toBe(1);
        });
        it("evaluates the statement (ngFor)", function () {
            var report = ngtemplate_1.NgTemplate
                .factory(this.el, "<span data-ng-for=\"let item of foo.bar.baz\"></span>")
                .sync({})
                .report();
            expect(report.log.length).toBe(1);
        });
    });
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ReportSpec;
