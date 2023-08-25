const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const user_m = require("./models/user");
const recipe_m = require("./models/recipe");
const { ObjectId } = mongoose.Types;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const JWT_SECRET = "sadasdasdasfsadas1dsa2321sdfasdas2312asdas";

const cors = require("cors");
const app = express();

app.use(bodyParser.json());
app.use(cors());

app.post("/recommendations", async (req, res) => {
   const data = {
      desired_recipe: "Chicken Ranch Burgers",
   };

   const recommended_recipe = [];

   fetch("http://127.0.0.1:8080/recommendations", {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
   })
      .then((response) => response.json())
      .then(async (data) => {
         for (let i = 0; i < 20; i++) {
            const recipeOne = await recipe_m.findOne({ id: data.recommendations_id[i] });
            recommended_recipe.push(recipeOne);
         }
         res.send({ status: "ok", recipe: recommended_recipe });
      })
      .catch((err) => console.error(err));
});

app.post("/register", async (req, res) => {
   const name = req.body.name;
   const email = req.body.email;
   const password = req.body.password;
   const encryptedPassword = await bcrypt.hash(password, 10);

   try {
      const oldUser = await user_m.findOne({ email: email });
      if (oldUser) {
         return res.json({ status: "error", error: "Email already in use" });
      }

      await user_m.create({
         _id: new ObjectId(),
         name: name,
         email: email,
         phone: "",
         biography: "",
         password: encryptedPassword,
      });
      res.send({ status: "ok", message: "User created" });
   } catch (err) {
      res.send({ status: "error", error: err });
   }
});

app.post("/login", async (req, res) => {
   const email = req.body.email;
   const password = req.body.password;

   const user = await user_m.findOne({ email: email });
   if (!user) {
      return res.json({ status: "error", error: "User not found" });
   }

   if (await bcrypt.compare(password, user.password)) {
      const token = jwt.sign({ email: user.email }, JWT_SECRET);
      if (res.status(201)) {
         return res.json({ status: "ok", token: token });
      } else {
         return res.json({ status: "error", error: "Invalid password" });
      }
   }
   res.json({ status: "error", error: "Invalid password" });
});

app.post("/profile", async (req, res) => {
   const token = req.body.token;
   try {
      const decoded = jwt.verify(token, JWT_SECRET);
      const user = await user_m.findOne({ email: decoded.email });
      if (!user) {
         return res.json({ status: "error", error: "User not found" });
      }
      res.send({ status: "ok", user: user });
   } catch (err) {
      res.send({ status: "error", error: err });
   }
});

app.post("/saverecipe", async (req, res) => {
   const token = req.body.token;
   const recipe_id = req.body.recipe_id;
   try {
      const decoded = jwt.verify(token, JWT_SECRET);
      const user = await user_m.findOne({ email: decoded.email });
      if (!user) {
         return res.json({ status: "error", message: "User not found" });
      } 
      const recipe = await recipe_m.findOne({ id: recipe_id });
      if (!recipe) {
         return res.json({ status: "error", message: "Recipe not found" });
      } else {
         if (userPref_m.findOne({ user_id: user_id })) {
            const userPref = await userPref_m.findOne({ user_id: user._id });
            userPref.prefRecipe.push(recipe_id);
            userPref.save();
            res.send({ status: "ok", message: "UserPref updated" });
         } else {
            const userPref = await userPref_m.create({
               _id: new ObjectId(),
               user_id: user_id,
               prefRecipe: [recipe_id],
            });
            res.send({ status: "ok", message: "UserPref created" });
         }
      }
   } catch (err) {
      res.send({ status: "error", message: "error occured" });
   }
});

app.post("/explore", async (req, res) => {
   try {
      const recipe = await recipe_m.aggregate([{ $sample: { size: 20 } }]);
      res.send({ status: "ok", recipe: recipe });
   } catch (err) {
      res.send({ status: "error", error: err });
   }
});

mongoose
   .connect("mongodb+srv://rafidbeingrafid:12345@cluster0.0iziser.mongodb.net/SavorioRecipe?retryWrites=true&w=majority", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
   })
   .then(() => app.listen(5000, () => console.log("Listening on port 5000...")))
   .catch((err) => console.error("Could not connect to MongoDB...", err));

app.get("/recipes", async (req, res) => {
   recipe_m
      .find()
      .then((result) => {
         res.send(result);
      })
      .catch((err) => {
         console.log(err);
      });
});

app.post("/search", async (req, res) => {
   try {
      const { searchString } = req.body;
      const recipes = await recipe_m.find({ title: { $regex: searchString, $options: "i" } });
      console.log(recipes);

      res.send({ status: "ok", recipes: recipes });
   } catch (err) {
      res.send({ status: "error", error: err });
   }
});
