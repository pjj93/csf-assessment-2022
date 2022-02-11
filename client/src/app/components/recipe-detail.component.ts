import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Recipe } from '../models';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

  recipe!: Recipe

  constructor(private http: HttpClient, private activatedRoute: ActivatedRoute) {
    const recipeId = this.activatedRoute.snapshot.params['recipeId']
    console.log(recipeId)
  }

  ngOnInit(): void {
  }

}
