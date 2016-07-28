var ng_template_1 = require("ng-template");
var el = document.getElementById("inviteForm");
// Bind the template
var template = new ng_template_1.NgTemplate(el);
// Sync element for given context
template.sync({
    powers: ["Really Smart", "Super Flexible",
        "Super Hot", "Weather Changer"],
    state: {
        fullname: {
            valid: true
        },
        form: {
            valid: true
        }
    }
});
