import { ScoreboardRoutingModule } from "./scoreboard-routing.module";
import { ScoreboardComponent } from "./scoreboard.component";
import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "@nativescript/angular";

@NgModule({
  imports: [NativeScriptCommonModule, ScoreboardRoutingModule],
  declarations: [ScoreboardComponent],
  schemas: [NO_ERRORS_SCHEMA],
})
export class ScoreboardModule {}
