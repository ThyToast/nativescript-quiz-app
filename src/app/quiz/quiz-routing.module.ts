import { QuizComponent } from "./quiz.component";
import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "@nativescript/angular";

const routes: Routes = [{ path: "", component: QuizComponent }];

@NgModule({
  imports: [NativeScriptRouterModule.forChild(routes)],
  exports: [NativeScriptRouterModule],
})
export class QuizRoutingModule {}
