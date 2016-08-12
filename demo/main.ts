import { NgTemplate } from "../src/ngtemplate";

// Bounding box
let el = <HTMLElement>document.querySelector( "hero-form" );

// Bind the template
let template = new NgTemplate( el, `
    <h1>Choose Your Hero</h1>
    <form  novalidate>
      <div class="form-group">
        <i class="glyphicon glyphicon-user"></i>
        <label for="name">Name</label>
        <input id="name" list="names" type="text" class="form-control" required >
        <datalist id="names">
          <option data-ng-for="let nick of names" data-ng-prop="'value', nick">
        </datalist>

        <div class="alert alert-danger" data-ng-if="!name.valid && name.dirty">
          Name is required
        </div>
      </div>
      <div class="form-group">
        <i class="glyphicon glyphicon-star-empty"></i>
        <label for="power">Hero Power</label>
        <select id="power" class="form-control"  required>
          <option data-ng-for="let p of powers" data-ng-text="p" >Nothing here</option>
        </select>
        <div class="alert alert-danger" data-ng-if="!power.valid && power.dirty">
          Power is required
        </div>
      </div>
       <button type="submit" class="btn btn-default" data-ng-prop="'disabled', !form.valid">Submit</button>
    </form>
`);

// populate the template scope
let scope = {
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
template.sync( scope );

let elName = <HTMLInputElement>document.querySelector( "#name" ),
    elPower = <HTMLInputElement>document.querySelector( "#power" );

// Update form state according to validation
function validate() {
  scope.name.valid = Boolean( elName.value.trim().length );
  scope.power.valid = Boolean( elPower.value.trim().length );
  scope.form.valid = scope.name.valid && scope.power.valid;
}

// Update dirty state (control's value has changed)
function updateDirtyState( el: HTMLElement ) {
  if ( elName === el ) {
    scope.name.dirty = true;
  }
  if ( elPower === el ) {
    scope.power.dirty = true;
  }
}

// Update view
function onInputChange( e: Event ) {
  e && updateDirtyState( <HTMLElement>e.target );
  validate();
  // sync template
  template.sync( scope );
}

// Listen to user input
elName.addEventListener( "input", onInputChange, false );
elPower.addEventListener( "change", onInputChange, false );

el.addEventListener( "submit", ( e ) => {
  e.preventDefault();
  onInputChange( e );
  alert( "Form data submitted" );
}, false );

