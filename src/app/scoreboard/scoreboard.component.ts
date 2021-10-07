import { quizResult } from "./../result/result.model";
import { Component, OnInit } from "@angular/core";
import { getString } from "@nativescript/core/application-settings";

@Component({
  selector: "app-scoreboard",
  templateUrl: "./scoreboard.component.html",
})
export class ScoreboardComponent implements OnInit {
  storedResult: quizResult[];
  constructor() {
    this.storedResult = JSON.parse(getString("quiz"));
  }

  ngOnInit(): void {}
}
