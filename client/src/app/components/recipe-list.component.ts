import { Component, OnInit } from '@angular/core';
import { Recipe } from '../models';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

  recipes!: Recipe[]

  constructor(private recipeSvc: RecipeService) { }

  ngOnInit(): void {
    this.recipeSvc.getAllRecipes().subscribe(resp => {
        this.recipes = resp.recipes
    })
  }

  onClick(recipe: Recipe) {
    console.log(recipe.id)
    console.log(recipe.title)
  }
}
