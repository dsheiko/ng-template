"use strict";
var ngtemplate_1 = require("../../src/ngtemplate");
var ngfor_1 = require("../../src/ng-template/ngfor");
var reporter_1 = require("../../src/ng-template/reporter");
var reporter = new reporter_1.Reporter();
function NgForDirectiveSpec() {
    describe("NgTemplate.ngFor", function () {
        describe(".createEl", function () {
            it("creates detached node", function () {
                var el = ngfor_1.NgFor.createEl("li", "<li class='test'><i></i></li>");
                expect(el.tagName).toBe("LI");
                expect(el.classList.contains("test")).toBeTruthy();
                expect(el.firstChild.tagName).toBe("I");
            });
            it("detaches/attaches to DOM", function () {
                var cont = document.createElement("form"), foo = ngfor_1.NgFor.createEl("input", "<input />"), bar = ngfor_1.NgFor.createEl("input", "<input />");
                cont.appendChild(foo);
                cont.appendChild(bar);
                cont.querySelectorAll("input").item(0).value = "foo";
                cont.querySelectorAll("input").item(1).value = "bar";
                cont.innerHTML = "";
                cont.appendChild(foo);
                cont.appendChild(bar);
                expect(cont.querySelectorAll("input").item(0).value).toBe("foo");
                expect(cont.querySelectorAll("input").item(1).value).toBe("bar");
            });
        });
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
        describe("#constructor", function () {
            beforeEach(function () {
                this.el = document.createElement("div");
                this.el.innerHTML = "<i data-ng-for='let row of rows'></i>";
            });
            it("populatea node DTOs", function () {
                var ngfor = new ngfor_1.NgFor(this.el, reporter);
                expect(ngfor.nodes.length).toBe(1);
            });
            it("creates node.exp", function () {
                var ngfor = new ngfor_1.NgFor(this.el, reporter), node = ngfor.nodes.shift(), res = node.exp({ rows: [1, 2, 3] }).join(",");
                expect(res).toBe("1,2,3");
            });
        });
        describe("#sync", function () {
            beforeEach(function () {
                this.el = document.createElement("div");
            });
            it("span the target element", function () {
                this.el.innerHTML = "<i data-ng-for='let row of rows'></i>";
                var ngfor = new ngfor_1.NgFor(this.el, reporter);
                ngfor.sync({ rows: ["foo", "bar"] }, ngtemplate_1.NgTemplate);
                expect(this.el.querySelectorAll("i").length).toBe(2);
            });
        });
    });
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = NgForDirectiveSpec;
