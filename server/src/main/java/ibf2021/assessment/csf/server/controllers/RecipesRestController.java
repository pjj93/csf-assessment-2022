package ibf2021.assessment.csf.server.controllers;

import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import ibf2021.assessment.csf.server.ServerApplication;
import ibf2021.assessment.csf.server.models.Recipe;
import ibf2021.assessment.csf.server.services.RecipeService;
import jakarta.json.Json;
import jakarta.json.JsonArrayBuilder;
import jakarta.json.JsonObject;
import jakarta.json.JsonObjectBuilder;

@RestController
@RequestMapping(path="/api/recipes", produces=MediaType.APPLICATION_JSON_VALUE)
public class RecipesRestController {

	@Autowired
	private RecipeService recipeSvc;

	@GetMapping
	public ResponseEntity<String> getRecipes() {
		final Logger logger = Logger.getLogger(ServerApplication.class.getName());

        List<Recipe> recipes = recipeSvc.getAllRecipes();

		logger.log(Level.INFO, "Recipes: " + recipes);

        JsonObjectBuilder recipesJsonObjBuilder = Json.createObjectBuilder();
		JsonArrayBuilder recipesJsonArrBuilder = Json.createArrayBuilder();
		
		for (Recipe recipe : recipes) {
			JsonObjectBuilder recipeJsonObjBuilder = Json.createObjectBuilder();
			JsonObject recipeJsonObj = recipeJsonObjBuilder.add("id", recipe.getId()).add("title", recipe.getTitle()).build();
			logger.log(Level.INFO, "recipeJsonObj: " + recipeJsonObj);
			recipesJsonArrBuilder.add(recipeJsonObj);
		}

		JsonObject recipesJsonObj = recipesJsonObjBuilder.add("recipes", recipesJsonArrBuilder).build();
		logger.log(Level.INFO, "recipesJsonObj: " + recipesJsonObj);

		return ResponseEntity.ok(recipesJsonObj.toString());
	}
}