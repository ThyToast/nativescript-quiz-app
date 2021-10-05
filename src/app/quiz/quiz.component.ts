import { quiz } from "./quiz.model";
import { Component, OnInit } from "@angular/core";
import { RouterExtensions } from "@nativescript/angular";

@Component({
  selector: "Quiz",
  templateUrl: "./quiz.component.html",
})
export class QuizComponent implements OnInit {
  quizData: quiz[];
  counter: number;
  timeout: boolean;

  pageNumber = 1;
  isEnd = false;
  constructor(private router: RouterExtensions) {
    this.quizData = this.router.router.getCurrentNavigation().extras.state.quiz.results;
  }

  ngOnInit(): void {
    this.checkEndPage();
    this.startCountdown(10);
  }

  nextQuiz() {
    this.checkEndPage();
    if (this.isEnd == false) {
      this.pageNumber++;
      this.checkEndPage();
    }
  }

  endQuiz() {
    this.router.backToPreviousPage();
  }

  checkEndPage() {
    if (this.pageNumber == this.quizData.length) {
      this.isEnd = true;
    }
  }

  startCountdown(seconds: number) {
    this.counter = seconds;

    const interval = setInterval(() => {
      this.counter--;

      if (this.counter == 0) {
        this.timeout = true;
        clearInterval(interval);
        console.log("Bingo!");
      }
    }, 1000);
  }
}
