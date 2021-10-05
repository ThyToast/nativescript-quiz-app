import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class QuizApiService {
  difficulty = ["Easy", "Medium", "Hard"];
  questionType = [
    ["Any Type", ""],
    ["Multiple Choice", "multiple"],
    ["True / False", "boolean"],
  ];

  private quizUrl = "https://opentdb.com";

  constructor(private http: HttpClient) {}

  getQuiz(
    questionCount: number,
    category: string,
    difficulty: string,
    questionType: string
  ) {
    return this.http.get(this.quizUrl + "/api.php", {
      params: {
        amount: questionCount,
        category: category,
        difficulty: difficulty,
        type: questionType,
      },
    });
  }

  getCategory() {
    return this.http.get(this.quizUrl + "/api_category.php");
  }

  getDifficulty() {
    return this.difficulty;
  }

  getQuestionType() {
    return this.difficulty;
  }
}
