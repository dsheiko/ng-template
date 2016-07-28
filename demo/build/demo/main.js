var ngtemplate_1 = require("../src/ngtemplate");
var el = document.querySelector("#heroForm"), elName = document.querySelector("#name"), elPower = document.querySelector("#power");
// Bind the template
var template = new ngtemplate_1.NgTemplate(el);
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
