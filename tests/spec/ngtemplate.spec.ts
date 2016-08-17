import { NgTemplate } from "../../src/ngtemplate";
import NgIfSpec from "./ng-template/ngif";
import NgElSpec from "./ng-template/ngel";
import NgClassListToggleSpec from "./ng-template/ngclasslisttoggle";
import NgPropSpec from "./ng-template/ngprop";
import NgDataSpec from "./ng-template/ngdata";
import NgTextSpec from "./ng-template/ngtext";
import NgForSpec from "./ng-template/ngfor";
import NgSwitchSpec from "./ng-template/ngswitch";
import TransformSpec from "./ng-template/transform";
import SmartEvalSpec from "./ng-template/smarteval";
import ReportSpec from "./ng-template/report";

export default function NgTemplateSpec(){

  describe("NgTemplate", function(){

    NgIfSpec.call( this );

    NgElSpec.call( this );

    NgClassListToggleSpec.call( this );

    NgPropSpec.call( this );

    NgDataSpec.call( this );

    NgTextSpec.call( this );

    NgForSpec.call( this );

    NgSwitchSpec.call( this );

    TransformSpec.call( this );

    SmartEvalSpec.call( this );

    ReportSpec.call( this );
  });
}