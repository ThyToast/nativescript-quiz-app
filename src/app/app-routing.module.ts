import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "@nativescript/angular";

const routes: Routes = [
  { path: "", redirectTo: "/home", pathMatch: "full" },
  {
    path: "home",
    loadChildren: () =>
      import("~/app/home/home.module").then((m) => m.HomeModule),
  },
  {
    path: "quiz",
    loadChildren: () =>
      import("~/app/quiz/quiz.module").then((m) => m.QuizModule),
  },
  {
    path: "result",
    loadChildren: () =>
      import("~/app/result/result.module").then((m) => m.ResultModule),
  },
  {
    path: "scoreboard",
    loadChildren: () =>
      import("~/app/scoreboard/scoreboard.module").then(
        (m) => m.ScoreboardModule
      ),
  },
];

@NgModule({
  imports: [NativeScriptRouterModule.forRoot(routes)],
  exports: [NativeScriptRouterModule],
})
export class AppRoutingModule {}
