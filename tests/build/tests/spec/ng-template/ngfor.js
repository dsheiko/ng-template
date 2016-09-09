"use strict";
var ngtemplate_1 = require("../../../src/ngtemplate");
function NgForSpec() {
    describe("ng-for directive", function () {
        beforeEach(function () {
            this.el = document.createElement("div");
        });
        it("generates nodes from a plain list", function () {
            ngtemplate_1.NgTemplate
                .factory(this.el, "<i data-ng-for=\"let row of rows\" data-ng-text=\"row\"></i>")
                .sync({ rows: ["foo", "bar", "baz"] });
            expect(this.el.querySelectorAll("i").length).toBe(3);
        });
        it("generates nodes on structure", function () {
            ngtemplate_1.NgTemplate
                .factory(this.el, "<i data-ng-for=\"let row of foo.bar.baz\" data-ng-text=\"row\"></i>")
                .sync({ foo: { bar: { baz: ["foo", "bar", "baz"]
                    } }
            });
            expect(this.el.querySelectorAll("i").length).toBe(3);
        });
        it("generates nodes from a list of objects", function () {
            ngtemplate_1.NgTemplate
                .factory(this.el, "<i data-ng-for=\"let row of rows\" data-ng-text=\"row.name\"></i>")
                .sync({ rows: [
                    { name: "foo" },
                    { name: "bar" },
                    { name: "baz" }
                ] });
            expect(this.el.querySelectorAll("i").length).toBe(3);
            expect(this.el.querySelector("i").innerHTML).toBe("foo");
        });
        it("does not break on reducing", function () {
            ngtemplate_1.NgTemplate
                .factory(this.el, "<i data-ng-for=\"let row of rows\" data-ng-text=\"row.name\"></i>")
                .sync({ rows: [
                    { name: "foo" },
                    { name: "bar" },
                    { name: "baz" }
                ] })
                .sync({ rows: [
                    { name: "foo1" },
                    { name: "bar1" }
                ] })
                .pipe(function (el) {
                var els = el.querySelectorAll("i");
                expect(els.length).toBe(2);
                expect(els.item(0).innerHTML).toBe("foo1");
                expect(els.item(1).innerHTML).toBe("bar1");
            });
        });
        it("does not break on expanding", function () {
            ngtemplate_1.NgTemplate
                .factory(this.el, "<i data-ng-for=\"let row of rows\" data-ng-text=\"row.name\"></i>")
                .sync({ rows: [
                    { name: "foo" },
                    { name: "bar" }
                ] })
                .sync({ rows: [
                    { name: "foo1" },
                    { name: "bar1" },
                    { name: "baz1" }
                ] })
                .pipe(function (el) {
                var els = el.querySelectorAll("i");
                expect(els.length).toBe(3);
                expect(els.item(0).innerHTML).toBe("foo1");
                expect(els.item(1).innerHTML).toBe("bar1");
                expect(els.item(2).innerHTML).toBe("baz1");
            });
        });
        it("does not kill the state of generated items", function () {
            ngtemplate_1.NgTemplate
                .factory(this.el, "<i data-ng-for=\"let row of rows\"><input data-ng-data=\"'name', row.name\" /></i>")
                .sync({ rows: [
                    { name: "foo" }
                ] })
                .pipe(function (el) {
                el.querySelector("input").value = "foo";
            })
                .sync({ rows: [
                    { name: "bar" }
                ] })
                .pipe(function (el) {
                var input = el.querySelector("input");
                expect(input.dataset["name"]).toBe("bar");
                expect(input.value).toBe("foo");
            });
        });
        it("does not fall on multiple syncs", function () {
            ngtemplate_1.NgTemplate
                .factory(this.el, "<i data-ng-for=\"let row of rows\" data-ng-text=\"row\"></i>")
                .sync({ rows: ["foo", "bar", "baz"] })
                .sync({ rows: ["bar", "foo", "baz"] })
                .sync({ rows: ["foo", "bar", "baz"] });
            expect(this.el.querySelectorAll("i").length).toBe(3);
        });
        it("generates nodes in a table", function () {
            ngtemplate_1.NgTemplate
                .factory(this.el, "<table><tr data-ng-for=\"let row of rows\">" +
                "<td data-ng-text=\"row\"></td></tr></table>")
                .sync({ rows: ["foo", "bar", "baz"] });
            expect(this.el.querySelectorAll("td").length).toBe(3);
        });
        it("reduces an indexable list gracefully", function () {
            var firstPasssNodes, secondPasssNodes;
            ngtemplate_1.NgTemplate
                .factory(this.el, "<i data-ng-for=\"let row of rows\"></i>")
                .sync({ rows: [{ id: 1 }, { id: 2 }, { id: 3 }] })
                .pipe(function (el) {
                firstPasssNodes = Array.from(el.children);
                expect(firstPasssNodes.length).toBe(3);
            })
                .sync({ rows: [{ id: 1 }, { id: 3 }] })
                .pipe(function (el) {
                secondPasssNodes = Array.from(el.children);
                expect(secondPasssNodes.length).toBe(2);
                expect(firstPasssNodes[0]).toBe(secondPasssNodes[0]);
                expect(firstPasssNodes[2]).toBe(secondPasssNodes[1]);
            });
        });
    });
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = NgForSpec;
