package ibf2021.assessment.csf.server.controllers;

import java.util.NoSuchElementException;
import java.util.Optional;
import java.util.logging.Logger;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import ibf2021.assessment.csf.server.ServerApplication;
import ibf2021.assessment.csf.server.models.Recipe;
import ibf2021.assessment.csf.server.services.RecipeService;
import jakarta.json.Json;
import jakarta.json.JsonArray;
import jakarta.json.JsonArrayBuilder;
import jakarta.json.JsonObject;

/* Write your request hander in this file */
@RestController
@RequestMapping(path="/api/recipe")
public class RecipeRestController {

	@Autowired
	private RecipeService recipeSvc;

	@GetMapping(path="{recipeId}", produces=MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<String> getRecipe(@PathVariable(required=true) String recipeId) {
		final Logger logger = Logger.getLogger(ServerApplication.class.getName());

        try {
            Optional<Recipe> recipeOpt = recipeSvc.getRecipeById(recipeId);
            
            Recipe recipe = recipeOpt.get();

            JsonArrayBuilder recipeJsonArrBuilder = Json.createArrayBuilder();
            for (String ingredient : recipe.getIngredients()) {
                recipeJsonArrBuilder.add(ingredient);
            }
            JsonArray recipeJsonArr = recipeJsonArrBuilder.build();
            
            JsonObject recipeJsonObj = Json.createObjectBuilder()
            .add("id", recipe.getId())
            .add("title", recipe.getTitle())
            .add("image", recipe.getImage())
            .add("instruction", recipe.getInstruction())
            .add("ingredients", recipeJsonArr)
            .build();

            return ResponseEntity.ok(recipeJsonObj.toString());
        } catch (NoSuchElementException ex) {
            JsonObject err = Json.createObjectBuilder()
				.add("error", "recipe does not exist")
				.build();
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(err.toString());
        }
	}
}