import { quizResult } from "./result.model";
import { Component, OnInit } from "@angular/core";
import { RouterExtensions } from "@nativescript/angular";

@Component({
  selector: "app-result",
  templateUrl: "./result.component.html",
})
export class ResultComponent implements OnInit {
  finalResult: quizResult | any;

  constructor(private router: RouterExtensions) {
    this.finalResult = this.router.router.getCurrentNavigation().extras.state.result;
  }

  ngOnInit(): void {
    console.log(this.finalResult);
  }
}
