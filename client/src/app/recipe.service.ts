import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Recipe } from './models';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  constructor(private http: HttpClient) { }

  getAllRecipes(): Observable<any> {
    return this.http.get<Recipe[]>("/api/recipes")
  }

  getRecipe(recipeId: string): Observable<any>{
    return this.http.get<Recipe>("/api/recipe/" + recipeId)
  }
}
