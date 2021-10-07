import { quizResult } from "./../result/result.model";
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
        console.log("Bingo!");
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
      let result = new quizResult();

      result.score = this.score;
      result.date = new Date().toLocaleString("en-GB", {
        timeZone: "Asia/Kuala_Lumpur",
      });
      result.timeTaken = 60 - this.counter;
      result.correctAns = this.correctAnswer;

      console.log(result);
      this.router.navigate(["/result"], {
        state: {
          result,
        },
      });
    } else {
      this.nextQuiz();
    }
  }
}
