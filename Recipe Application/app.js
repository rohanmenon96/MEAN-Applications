let express = require('express');
let recipe = require('./recipe');
const bodyParser = require('body-parser');

let app = express();
app.use(bodyParser.json());


app.listen(3000,()=>{
	console.log("App is listening at port 3000");
});

app.get("/",(req,res)=>{
	res.json("This is the homepage");
})

app.get("/recipes/:id", async (req, res) => {	
  try {
    const recipe1 = await recipe.getRecipeById(req.params.id);
    res.json(recipe1);
  } catch (e) {
    res.status(404).json({ error: "recipe not found" });
  }
})

app.post("/recipes",async(req,res)=>{
	const inputData = req.body;
	try{
		const addedRecipe = await recipe.addRecipe(inputData.title,inputData.ingredients,inputData.steps);
		res.json(addedRecipe);
	}
	catch(e)
	{
		res.status(500).json({error : e})
	}
});

;

app.get("/recipes",async(req,res)=>{
	try{
		const recipeList = await recipe.getAllRecipes();
		res.json(recipeList);
	}
	catch(e){
		res.status(500).json({error : e});
	}
});

app.put("/recipes/:id", async (req, res) => {
  const updatedData = req.body;
  try {
    await recipe.getRecipeById(req.params.id);
  } catch (e) {
    res.status(404).json({ error: "recipe not found" });
  }

  try {
    const updatedRecipe = await recipe.updateRecipe(req.params.id, updatedData);
    res.json(updatedRecipe);
  } catch (e) {
    res.status(500).json({ error: e });
  }
});

app.patch("/recipes/:id", async(req,res)=>{
	const inputData = req.body;
	updatedObject = {};
	if(inputData.title)
		{
			updatedObject.title = inputData.title;
		}
	if(inputData.ingredients)
		{
			updatedObject.ingredients = inputData.ingredients;
		}
	if(inputData.steps)
		{
			updatedObject.steps = inputData.steps;
		}
	const changedObject = await recipe.changeRecipe(req.params.id,updatedObject);
	res.json(changedObject);
});

app.delete("/recipes/:id", async (req, res) => {
  try {
    const recipe1 = await recipe.getRecipeById(req.params.id);
  } catch (e) {
    res.status(404).json({ error: "recipe not found" });
  }
  try {
    const returnedInfo = await recipe.removeRecipe(req.params.id);
    res.json(returnedInfo);
  } catch (e) {
    res.status(500).json({ error: e });
  }

});

app.get("*",(req,res)=>{
	res.status(404).json("Page not found");
});