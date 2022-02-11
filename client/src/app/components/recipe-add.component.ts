import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Recipe } from '../models';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-add',
  templateUrl: './recipe-add.component.html',
  styleUrls: ['./recipe-add.component.css']
})
export class RecipeAddComponent implements OnInit {

  form!: FormGroup
  formIngredientArr!: FormArray
  recipe!: Recipe

  constructor(private fb: FormBuilder, private recipeSvc: RecipeService, private router: Router) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      title: this.fb.control('', [Validators.required, Validators.minLength(3)]),
      image: this.fb.control('', Validators.required),
      instruction: this.fb.control('', [Validators.required, Validators.minLength(3)]),
      ingredients: this.fb.array([this.fb.control('', Validators.required)])
    })
  }

  onSubmit(formdata: Recipe) {
    this.recipeSvc.postRecipe(formdata).subscribe(resp => console.log(resp))
    this.router.navigate(['/']);
  }

  onAddIngredient() {
    const control = new FormControl(null, Validators.required);
    (<FormArray>this.form.get('ingredients')).push(control);
  }

  get ingredientControls() {
    return (this.form.get('ingredients') as FormArray).controls;
  }

  delIngredient(index: number) {
    (this.form.get('ingredients') as FormArray).removeAt(index)
  }
}
