import { NgTemplate } from "../src/ngtemplate";

let el = <HTMLElement>document.querySelector( "#heroForm" );

// Bind the template
let template = new NgTemplate( el, `
    <h1>Hero</h1>
    <form  novalidate>
      <div class="form-group">
        <label for="name">Name</label>
        <input id="name" type="text" class="form-control" required >
        <div class="alert alert-danger" data-ng-if="!name.valid">
          Name is required
        </div>
      </div>
      <div class="form-group">
        <label for="power">Hero Power</label>
        <select id="power" class="form-control"  required>
          <option data-ng-for="let p of powers" data-ng-text="p" >Nothing here</option>
        </select>
        <div class="alert alert-danger" data-ng-if="!power.valid">
          Power is required
        </div>
      </div>
       <button type="submit" class="btn btn-default" data-ng-prop="'disabled', !form.valid">Submit</button>
    </form>
`);

let scope = {
  powers: [ "-", "Really Smart", "Super Flexible",
            "Super Hot", "Weather Changer" ],
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

template.sync( scope );

let elName = <HTMLInputElement>document.querySelector( "#name" ),
    elPower = <HTMLInputElement>document.querySelector( "#power" );

function sync() {
  // validate
  scope.name.valid = Boolean( elName.value.trim().length );
  scope.power.valid = elPower.value.trim().length > 1;
  scope.form.valid = scope.name.valid && scope.power.valid;
  // sync template
  template.sync( scope );
}

elName.addEventListener( "input", sync, false );

elPower.addEventListener( "change", sync, false );

el.addEventListener( "submit", ( e ) => {
  e.preventDefault();
  sync();
  alert( "OK" );
}, false );

