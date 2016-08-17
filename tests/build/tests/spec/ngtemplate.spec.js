"use strict";
var ngtemplate_1 = require("../../src/ngtemplate");
function NgTemplateSpec() {
    describe("NgTemplate", function () {
        describe("ng-if directive", function () {
            beforeEach(function () {
                this.el = document.createElement("div");
            });
            it("removes the target from the DOM when expression is false", function () {
                ngtemplate_1.NgTemplate
                    .factory(this.el, "<span data-ng-if=\"invalid\">Error</span>")
                    .sync({ invalid: false });
                // changed to: <ng style="display: none; "></ng>
                expect(this.el.innerHTML).not.toMatch("Error");
                expect(this.el.innerHTML).toMatch("display");
            });
            it("restores the target after removal when expression changes", function () {
                ngtemplate_1.NgTemplate
                    .factory(this.el, "<span data-ng-if=\"invalid\">Error</span>")
                    .sync({ invalid: false })
                    .pipe(function () {
                    expect(this.el.innerHTML.indexOf("Error") === -1).toBe(true);
                }, this)
                    .sync({ invalid: true });
                expect(this.el.innerHTML.indexOf("Error") !== -1).toBe(true);
            });
            it("evaluates compoun expressions (foo > bar)", function () {
                ngtemplate_1.NgTemplate
                    .factory(this.el, "<span data-ng-if=\"foo > bar\">Error</span>")
                    .sync({ foo: 10, bar: 0 });
                expect(this.el.innerHTML).toMatch("Error");
            });
            it("evaluates compoun expressions (foo < bar)", function () {
                ngtemplate_1.NgTemplate
                    .factory(this.el, "<span data-ng-if=\"foo < bar\">Error</span>")
                    .sync({ foo: 10, bar: 0 });
                expect(this.el.innerHTML).not.toMatch("Error");
            });
        });
        describe("ng-el directive", function () {
            beforeEach(function () {
                this.el = document.createElement("div");
            });
            it("evaluates expression on element (string literal)", function () {
                ngtemplate_1.NgTemplate
                    .factory(this.el, "<span data-ng-el=\"this.innerHTML='New value'\">Pristine</span>")
                    .sync({});
                expect(this.el.innerHTML).not.toMatch("Pristine");
                expect(this.el.innerHTML).toMatch("New value");
            });
            it("evaluates expression on element (tpl variable)", function () {
                ngtemplate_1.NgTemplate
                    .factory(this.el, "<span data-ng-el=\"this.innerHTML=text\">Pristine</span>")
                    .sync({ text: "New value" })
                    .pipe(function () {
                    expect(this.el.innerHTML).not.toMatch("Pristine");
                    expect(this.el.innerHTML).toMatch("New value");
                }, this)
                    .sync({ text: "Changed value" });
                expect(this.el.innerHTML).toMatch("Changed value");
            });
        });
        describe("ng-class-list-toggle directive", function () {
            beforeEach(function () {
                this.el = document.createElement("div");
            });
            it("evaluates the expression", function () {
                ngtemplate_1.NgTemplate
                    .factory(this.el, "<span data-ng-class-list-toggle=\"'is-hidden', isHidden\"></span>")
                    .sync({ isHidden: true });
                expect(this.el.innerHTML).toBe("<span class=\"is-hidden\"></span>");
            });
        });
        describe("ng-prop directive", function () {
            beforeEach(function () {
                this.el = document.createElement("div");
            });
            it("evaluates the expression", function () {
                ngtemplate_1.NgTemplate
                    .factory(this.el, "<button data-ng-prop=\"'disabled', isDisabled\"></button>")
                    .sync({ isDisabled: true })
                    .pipe(function (el) {
                    var btn = el.querySelector("button");
                    expect(btn.disabled).toBe(true);
                })
                    .sync({ isDisabled: false })
                    .pipe(function (el) {
                    var btn = el.querySelector("button");
                    expect(btn.disabled).toBe(false);
                });
            });
        });
        describe("ng-data directive", function () {
            beforeEach(function () {
                this.el = document.createElement("div");
            });
            it("evaluates the expression", function () {
                ngtemplate_1.NgTemplate
                    .factory(this.el, "<button data-ng-data=\"'someKey', value\"></button>")
                    .sync({ value: "foo" })
                    .pipe(function (el) {
                    var btn = el.querySelector("button");
                    expect(btn.dataset["someKey"]).toBe("foo");
                })
                    .sync({ value: "bar" })
                    .pipe(function (el) {
                    var btn = el.querySelector("button");
                    expect(btn.dataset["someKey"]).toBe("bar");
                });
            });
        });
        describe("ng-text directive", function () {
            beforeEach(function () {
                this.el = document.createElement("div");
            });
            it("evaluates the statement", function () {
                ngtemplate_1.NgTemplate
                    .factory(this.el, "<span data-ng-text=\"foo\">Pristine</span>")
                    .sync({ foo: "New value" });
                expect(this.el.innerHTML).not.toMatch("Pristine");
                expect(this.el.innerHTML).toMatch("New value");
            });
            it("escapes output", function () {
                ngtemplate_1.NgTemplate
                    .factory(this.el, "<span data-ng-text=\"foo\">Pristine</span>")
                    .sync({ foo: "<button>" });
                expect(this.el.innerHTML).not.toMatch("<button>");
            });
        });
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
        });
        describe("ng-switch/data-ng-switch-case directives", function () {
            beforeEach(function () {
                this.el = document.createElement("div");
            });
            it("evaluates the statement", function () {
                ngtemplate_1.NgTemplate
                    .factory(this.el, "<div data-ng-switch='theCase'>" +
                    "<i data-ng-switch-case='1'>FOO</i>" +
                    "<i data-ng-switch-case='2'>BAR</i>" +
                    "</div>")
                    .sync({ theCase: 1 })
                    .pipe(function (el) {
                    expect(el.innerHTML).toBe("<i>FOO</i>");
                })
                    .sync({ theCase: 2 })
                    .pipe(function (el) {
                    expect(el.innerHTML).toBe("<i>BAR</i>");
                });
            });
        });
        describe("ng-switch-case-default directive", function () {
            beforeEach(function () {
                this.el = document.createElement("div");
            });
            it("evaluates the statement", function () {
                ngtemplate_1.NgTemplate
                    .factory(this.el, "<div data-ng-switch='theCase'>" +
                    "<i data-ng-switch-case='1'>FOO</i>" +
                    "<i data-ng-switch-case='2'>BAR</i>" +
                    "<i data-ng-switch-case-default>DEFAULT</i>" +
                    "</div>")
                    .sync({ theCase: 1 })
                    .pipe(function (el) {
                    expect(el.innerHTML).toBe("<i>FOO</i>");
                })
                    .sync({ theCase: 3 })
                    .pipe(function (el) {
                    expect(el.innerHTML).toBe("<i>DEFAULT</i>");
                });
            });
        });
        describe("transformers", function () {
            beforeEach(function () {
                this.el = document.createElement("div");
            });
            it("evaluates the statement", function () {
                ngtemplate_1.NgTemplate
                    .factory(this.el, "<div data-ng-text='transform(raw)'></div>")
                    .sync({
                    raw: 100,
                    transform: function (num) {
                        return num + "500";
                    }
                })
                    .pipe(function (el) {
                    expect(el.innerHTML).toBe("<div>100500</div>");
                });
            });
        });
        describe("smart evaluation", function () {
            beforeEach(function () {
                this.el = document.createElement("div");
            });
            it("evaluates a number", function () {
                ngtemplate_1.NgTemplate
                    .factory(this.el, "<i data-ng-text='100'></i>")
                    .sync({})
                    .pipe(function (el) {
                    var child = el.firstChild;
                    expect(child.innerHTML).toBe("100");
                });
            });
            it("evaluates a string", function () {
                ngtemplate_1.NgTemplate
                    .factory(this.el, "<i data-ng-text='\"string\"'></i>")
                    .sync({})
                    .pipe(function (el) {
                    var child = el.firstChild;
                    expect(child.innerHTML).toBe("string");
                });
            });
            it("evaluates a boolean", function () {
                ngtemplate_1.NgTemplate
                    .factory(this.el, "<i data-ng-if='true'></i>")
                    .sync({})
                    .pipe(function (el) {
                    expect(Boolean(el.querySelector("i"))).toBe(true);
                });
                ngtemplate_1.NgTemplate
                    .factory(this.el, "<i data-ng-if='false'></i>")
                    .sync({})
                    .pipe(function (el) {
                    expect(Boolean(el.querySelector("i"))).toBe(false);
                });
            });
        });
        //
        //    describe( "#on (handling NgTemplate events)", function(){
        //
        //      beforeEach(function(){
        //        this.el = document.createElement( "div" );
        //      });
        //
        //      it( "fires error event on undefined ref", function( done ) {
        //        var tpl = new NgTemplate( this.el, "<span data-ng-text=\"foo.bar.baz\"></span>" );
        //        tpl
        //          .on( "error", function( err: string ){
        //            expect( err.length ).toBe( true );
        //            done();
        //          })
        //          .sync({ foo: 10 });
        //      });
        //
        //    });
    });
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = NgTemplateSpec;
