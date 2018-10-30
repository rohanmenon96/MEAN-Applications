const mongoCollections = require("./mongoCollection");
const recipes = mongoCollections.recipes;
const uuid = require("node-uuid");

module.exports = {
	
	getAllRecipes : async function(){
		const allRecipes = await recipes();
		return await allRecipes.find({}).project({title: 1}).toArray();
	},

	addRecipe : async function(title,ingredients,steps){

		if (typeof title!== "string") throw "No title provided";
		if (!Array.isArray(ingredients)) throw "Ingredients input isn't proper";
		if (!Array.isArray(steps)) throw "Steps input isn't proper";
		const recipeCollection = await recipes();
		const newRecipe = {
		_id: uuid.v4(),
		title: title,
		ingredients: ingredients,
		steps: steps
		}

		const newInsertInformation = await recipeCollection.insertOne(newRecipe);
		const addedRecipe = this.getRecipeById(newRecipe._id);
    	return addedRecipe;
	},

	getRecipeById : async function(id) {
	    const recipeCollection = await recipes();
	    const recipe = await recipeCollection.findOne({ _id: id });

	    if (!recipe) throw "recipe not found";
	    return recipe;
	  },

	removeRecipe : async function(id) {
	    const recipeCollection = await recipes();
	    const deletionInfo = await recipeCollection.removeOne({ _id: id });

	    if (deletionInfo.deletedCount === 0) {
	      throw `Could not delete post with id of ${id}`;
	    }

	    return {"deleted" : "true"};
  	},

	updateRecipe: async function(id, updatedRecipe) {
	    const recipeCollection = await recipes();

	    const updatedRecipeData = {};

	    if (updatedRecipe.title) {
	      updatedRecipeData.title = updatedRecipe.title;
	    }

	    if (updatedRecipe.ingredients) {
	      updatedRecipeData.ingredients = updatedRecipe.ingredients;
	    }

	    if (updatedRecipe.steps) {
	      updatedRecipeData.steps = updatedRecipe.steps;
	    }

	    updatedInfo = await recipeCollection.replaceOne({ _id: id }, updatedRecipeData);

	    return this.getRecipeById(id);
  	},

  	changeRecipe: async function(id,changedRecipe){
  		
  		const recipeCollection = await recipes();
		await recipeCollection.updateOne({ _id: id }, { $set: changedRecipe});
		return this.getRecipeById(id);
  	}

}