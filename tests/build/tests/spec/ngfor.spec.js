"use strict";
var ngtemplate_1 = require("../../src/ngtemplate");
var ngfor_1 = require("../../src/ng-template/ngfor");
function NgForDirectiveSpec() {
    describe("NgTemplate.ngFor", function () {
        describe("#parseExpr", function () {
            it("parses `let row of rows`", function () {
                var res = ngfor_1.NgFor.prototype.parseExpr("let row of rows");
                expect(res.variable).toBe("row");
                expect(res.iterable).toBe("rows");
            });
            it("parses extra-spacing `let  row   of   rows`", function () {
                var res = ngfor_1.NgFor.prototype.parseExpr("let row of rows");
                expect(res.variable).toBe("row");
                expect(res.iterable).toBe("rows");
            });
        });
        describe("#nodesToDocFragment", function () {
            it("creates headless DOM subtree", function () {
                var el = document.createElement("div"), doc, div = document.createElement("div");
                div.innerHTML = "<i>1</i><i>2</i>";
                doc = ngfor_1.NgFor.prototype.nodesToDocFragment(div);
                el.appendChild(doc);
                expect(el.innerHTML).toBe("<i>1</i><i>2</i>");
            });
        });
        describe("#constructor", function () {
            beforeEach(function () {
                this.el = document.createElement("div");
                this.el.innerHTML = "<i data-ng-for='let row of rows'></i>";
            });
            it("populatea node DTOs", function () {
                var ngfor = new ngfor_1.NgFor(this.el);
                expect(ngfor.nodes.length).toBe(1);
            });
            it("creates node.exp", function () {
                var ngfor = new ngfor_1.NgFor(this.el), node = ngfor.nodes.shift(), res = "";
                node.exp({ rows: [1, 2, 3] }, function (val) {
                    res += "_" + val;
                });
                expect(res).toBe("_1_2_3");
            });
        });
        describe("#sync", function () {
            beforeEach(function () {
                this.el = document.createElement("div");
            });
            it("span the target element", function () {
                this.el.innerHTML = "<i data-ng-for='let row of rows'></i>";
                var ngfor = new ngfor_1.NgFor(this.el);
                ngfor.sync({ rows: ["foo", "bar"] }, ngtemplate_1.NgTemplate);
                expect(this.el.querySelectorAll("i").length).toBe(2);
            });
        });
    });
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = NgForDirectiveSpec;
