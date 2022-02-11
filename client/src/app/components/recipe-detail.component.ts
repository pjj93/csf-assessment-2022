import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Recipe } from '../models';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

  recipe!: Recipe

  constructor(private recipeSvc: RecipeService, private activatedRoute: ActivatedRoute) {
    // const recipeId = this.activatedRoute.snapshot.params['recipeId']

  }

  ngOnInit(): void {
    const recipeId = this.activatedRoute.snapshot.params['recipeId']
    this.recipeSvc.getRecipe(recipeId).subscribe(resp => {
      this.recipe = resp
    })
  }

}
