import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RecipeAddComponent } from './components/recipe-add.component';
import { RecipeDetailComponent } from './components/recipe-detail.component';
import { RecipeListComponent } from './components/recipe-list.component';


const appRoutes: Routes = [
  { path: '', component: RecipeListComponent},
  { path: 'recipe/:recipeId', component: RecipeDetailComponent},
  { path: 'add', component: RecipeAddComponent },
  { path: "**", redirectTo: '/', pathMatch: 'full' }
]

@NgModule({
  declarations: [
    AppComponent,
    RecipeListComponent,
    RecipeDetailComponent,
    RecipeAddComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes, { useHash: true }),
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
