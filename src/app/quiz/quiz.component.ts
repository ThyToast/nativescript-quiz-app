import { quizResult } from "./../result/result.model";
import { quiz } from "./quiz.model";
import { Component, OnInit } from "@angular/core";
import { RouterExtensions } from "@nativescript/angular";
import {
  getString,
  hasKey,
  setString,
} from "@nativescript/core/application-settings";

@Component({
  selector: "Quiz",
  templateUrl: "./quiz.component.html",
})
export class QuizComponent implements OnInit {
  quizData: quiz[];
  counter: number;
  timeout: boolean;

  quizQuestion = [];
  correctAnswer = [];
  score = 0;
  pageNumber = 1;
  isEnd = false;

  constructor(private router: RouterExtensions) {
    this.quizData = this.router.router.getCurrentNavigation().extras.state.quiz.results;
  }

  ngOnInit(): void {
    this.checkEndPage();
    this.startCountdown(60);
    this.randomQuiz();
  }

  nextQuiz() {
    this.checkEndPage();
    if (this.isEnd == false) {
      this.pageNumber++;
      this.randomQuiz();
      this.checkEndPage();
    }
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
        this.endQuiz();
      }
    }, 1000);
  }

  randomQuiz() {
    this.quizQuestion = [];
    this.quizData[this.pageNumber - 1].incorrect_answers.forEach((ans) => {
      this.quizQuestion.push(ans);
    });
    this.quizQuestion.push(this.quizData[this.pageNumber - 1].correct_answer);
    this.quizQuestion.sort(() => Math.random() - 0.5);
    console.log(this.quizQuestion);
    console.log(this.quizData[this.pageNumber - 1].correct_answer);
  }

  submitAns(answer: string) {
    this.correctAnswer.push(this.quizData[this.pageNumber - 1].correct_answer);
    if (answer == this.quizData[this.pageNumber - 1].correct_answer) {
      this.score++;
      console.log("score is: ", this.score);
    }
    if (this.isEnd) {
      this.endQuiz();
    } else {
      this.nextQuiz();
    }
  }

  storedResult(result: quizResult) {
    if (!hasKey("quiz")) {
      let newResult = [result];
      console.log(newResult);
      setString("quiz", JSON.stringify(newResult));
    } else {
      let oldResult: quizResult[] = JSON.parse(getString("quiz"));
      oldResult.push(result);
      console.log(oldResult);
      setString("quiz", JSON.stringify(oldResult));
    }
  }

  endQuiz() {
    let result = new quizResult();

    result.score = this.score;
    result.date = new Date().toLocaleString("en-GB", {
      timeZone: "Asia/Kuala_Lumpur",
    });
    result.timeTaken = 60 - this.counter;
    result.correctAns = this.correctAnswer;

    this.storedResult(result);
    this.router.navigate(["/result"], {
      state: {
        result,
      },
    });
  }
}
