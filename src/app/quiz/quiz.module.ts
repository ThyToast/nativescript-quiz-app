import { QuizRoutingModule } from "./quiz-routing.module";
import { QuizComponent } from "./quiz.component";
import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "@nativescript/angular";

@NgModule({
  imports: [NativeScriptCommonModule, QuizRoutingModule],
  declarations: [QuizComponent],
  schemas: [NO_ERRORS_SCHEMA],
})
export class QuizModule {}
