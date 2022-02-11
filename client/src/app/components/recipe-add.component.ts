import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-recipe-add',
  templateUrl: './recipe-add.component.html',
  styleUrls: ['./recipe-add.component.css']
})
export class RecipeAddComponent implements OnInit {

  form!: FormGroup
  formIngredientArr!: FormArray

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      title: this.fb.control('', [Validators.required, Validators.minLength(3)]),
      image: this.fb.control('', Validators.required),
      instruction: this.fb.control('', [Validators.required, Validators.minLength(3)]),
      ingredients: this.fb.array([this.fb.control('', Validators.required)])
    })
  }

  onSubmit() {
    console.log(this.form)
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
