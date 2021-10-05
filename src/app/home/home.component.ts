import { QuizApiService } from "./../quiz-api.service";
import { Component, OnInit, ViewChild } from "@angular/core";
import { RouterExtensions } from "@nativescript/angular";

@Component({
  selector: "Home",
  templateUrl: "./home.component.html",
})
export class HomeComponent implements OnInit {
  items: string[];
  difficulty: string[];
  number: number[];
  category: any[];
  categoryId: string[];
  categoryNameObs: any[];
  questionTypeObs: any[];

  selectedQuestionNo: number;
  selectedCategory: string;
  selectedDifficulty: string;
  selectedQuestionType: string;

  constructor(
    private quizApi: QuizApiService,
    private router: RouterExtensions
  ) {
    this.items = ["kek", "lmao"];
    this.number = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    this.difficulty = this.quizApi.difficulty;
  }

  ngOnInit(): void {
    this.getCategory();
    this.getQuestionType();
  }

  getCategory() {
    let categoryName = [];
    let categoryId = [];
    this.quizApi.getCategory().subscribe((category: any) => {
      this.category = category.trivia_categories;
      this.category.map((category) => {
        categoryName.push(category.name);
        categoryId.push(category.id);
      });
      this.categoryNameObs = categoryName;
      this.categoryId = categoryId;
    });
  }

  getQuestionType() {
    let questionType = [];
    this.quizApi.questionType.map((type) => {
      let i = 0;
      questionType.push(type[i]);
      i++;
    });
    this.questionTypeObs = questionType;
  }

  createQuiz() {
    this.quizApi
      .getQuiz(
        this.selectedQuestionNo,
        this.selectedCategory,
        this.selectedDifficulty,
        this.selectedQuestionType
      )
      .subscribe((quiz) => {
        this.router.navigate(["/quiz"], {
          state: {
            quiz,
          },
        });
      });
  }

  getSelectedValue(event: any, type: string) {
    switch (type) {
      case "number": {
        let selectedQuestionNo = event + 1;
        console.log("selected question number: ", selectedQuestionNo);
        this.selectedQuestionNo = selectedQuestionNo;
        break;
      }
      case "difficulty": {
        this.selectedDifficulty = this.difficulty[event].toLowerCase();
        console.log("selected difficulty: ", this.selectedDifficulty);

        break;
      }
      case "type": {
        this.selectedQuestionType = this.quizApi.questionType[event][1];
        console.log("selected type: ", this.selectedQuestionType);
        break;
      }
      case "category": {
        if (this.categoryId) {
          this.selectedCategory = this.categoryId[event];
          console.log("selected category: ", this.selectedCategory);
          break;
        }
      }

      default: {
      }
    }
  }
}
