"use strict";
var ngtemplate_1 = require("../src/ngtemplate");
// Bounding box
var el = document.querySelector("hero-form");
// Bind the template
var template = new ngtemplate_1.NgTemplate(el, "\n    <h1>Choose Your Hero</h1>\n    <form  novalidate>\n      <div class=\"form-group\">\n        <i class=\"glyphicon glyphicon-user\"></i>\n        <label for=\"name\">Name</label>\n        <input id=\"name\" list=\"names\" type=\"text\" class=\"form-control\" required >\n        <datalist id=\"names\">\n          <option data-ng-for=\"let nick of names\" data-ng-prop=\"'value', nick\">\n        </datalist>\n\n        <div class=\"alert alert-danger\" data-ng-if=\"!name.valid && name.dirty\">\n          Name is required\n        </div>\n      </div>\n      <div class=\"form-group\">\n        <i class=\"glyphicon glyphicon-star-empty\"></i>\n        <label for=\"power\">Hero Power</label>\n        <select id=\"power\" class=\"form-control\"  required>\n          <option data-ng-for=\"let p of powers\" data-ng-text=\"p\" >Nothing here</option>\n        </select>\n        <div class=\"alert alert-danger\" data-ng-if=\"!power.valid && power.dirty\">\n          Power is required\n        </div>\n      </div>\n       <button type=\"submit\" class=\"btn btn-default\" data-ng-prop=\"'disabled', !form.valid\">Submit</button>\n    </form>\n");
// populate the template scope
var scope = {
    // available names
    names: [
        "Daredevil",
        "Wolverine",
        "Aquaman",
        "Superman",
        "Hulk",
        "Beast",
        "Flashback"
    ],
    // available powers
    powers: [
        "",
        "Echolocation",
        "Healing factor",
        "Invisibility",
        "Kinetic absorption",
        "Superhuman agility / reflexes",
        "Superhuman senses",
        "Superhuman strength",
        "Wallcrawling",
        "Waterbreathing"
    ],
    // state of power input
    power: {
        valid: true,
        dirty: false
    },
    // state of name input
    name: {
        valid: true,
        dirty: false
    },
    // state of the entire form
    form: {
        valid: false
    }
};
// Render view
template.sync(scope);
var elName = document.querySelector("#name"), elPower = document.querySelector("#power");
// Update form state according to validation
function validate() {
    scope.name.valid = Boolean(elName.value.trim().length);
    scope.power.valid = Boolean(elPower.value.trim().length);
    scope.form.valid = scope.name.valid && scope.power.valid;
}
// Update dirty state (control's value has changed)
function updateDirtyState(el) {
    if (elName === el) {
        scope.name.dirty = true;
    }
    if (elPower === el) {
        scope.power.dirty = true;
    }
}
// Update view
function onInputChange(e) {
    e && updateDirtyState(e.target);
    validate();
    // sync template
    template.sync(scope);
}
// Listen to user input
elName.addEventListener("input", onInputChange, false);
elPower.addEventListener("change", onInputChange, false);
el.addEventListener("submit", function (e) {
    e.preventDefault();
    onInputChange(e);
    alert("Form data submitted");
}, false);
