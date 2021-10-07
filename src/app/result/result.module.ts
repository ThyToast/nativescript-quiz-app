import { ResultComponent } from "./result.component";
import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "@nativescript/angular";
import { ResultRoutingModule } from "./quiz-routing.module";

@NgModule({
  imports: [NativeScriptCommonModule, ResultRoutingModule],
  declarations: [ResultComponent],
  schemas: [NO_ERRORS_SCHEMA],
})
export class ResultModule {}
