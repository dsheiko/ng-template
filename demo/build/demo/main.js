var ngtemplate_1 = require("../src/ngtemplate");
var el = document.querySelector("#heroForm");
// Bind the template
var template = new ngtemplate_1.NgTemplate(el, "\n    <h1>Hero</h1>\n    <form  novalidate>\n      <div class=\"form-group\">\n        <label for=\"name\">Name</label>\n        <input id=\"name\" type=\"text\" class=\"form-control\" required >\n        <div class=\"alert alert-danger\" data-ng-if=\"!name.valid\">\n          Name is required\n        </div>\n      </div>\n      <div class=\"form-group\">\n        <label for=\"power\">Hero Power</label>\n        <select id=\"power\" class=\"form-control\"  required>\n          <option data-ng-for=\"let p of powers\" data-ng-text=\"p\" >Nothing here</option>\n        </select>\n        <div class=\"alert alert-danger\" data-ng-if=\"!power.valid\">\n          Power is required\n        </div>\n      </div>\n       <button type=\"submit\" class=\"btn btn-default\" data-ng-el=\"this.disabled = !form.valid\">Submit</button>\n    </form>\n");
var context = {
    powers: ["-", "Really Smart", "Super Flexible",
        "Super Hot", "Weather Changer"],
    power: {
        valid: true
    },
    name: {
        valid: true
    },
    form: {
        valid: false
    }
};
template.sync(context);
var elName = document.querySelector("#name"), elPower = document.querySelector("#power");
function sync() {
    // validate
    context.name.valid = Boolean(elName.value.trim().length);
    context.power.valid = elPower.value.trim().length > 1;
    context.form.valid = context.name.valid && context.power.valid;
    // sync template
    template.sync(context);
}
elName.addEventListener("input", sync, false);
elPower.addEventListener("change", sync, false);
el.addEventListener("submit", function (e) {
    e.preventDefault();
    sync();
    alert("OK");
}, false);
