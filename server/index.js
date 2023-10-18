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

mongoose
   .connect("mongodb+srv://rafid:rafid00@cluster0.u0jz9ty.mongodb.net/qanteen?retryWrites=true&w=majority", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
   })
   .then(() => app.listen(5000, () => console.log("Listening on port 5000.")))
   .catch((err) => console.error("Could not connect to MongoDB.", err));

app.post("/recommendations", async (req, res) => {
   function shuffleArray(array) {
      for (let i = array.length - 1; i > 0; i--) {
         const j = Math.floor(Math.random() * (i + 1));
         [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
   }
   try {
      const token = req.headers.authorization.split(" ")[1]; // Extract the token from the authorization header
      const decoded = jwt.verify(token, JWT_SECRET); // Verify the token

      // Use the decoded data to find the user in the database
      const user = await user_m.findOne({ email: decoded.email }).populate("savedPosts");

      // Extract the saved posts data
      const savedPosts = user.savedPosts;

      const data = [];

      for(let i = 0; i < savedPosts.length; i++) {
         if(i == 5) break;
         data.push({recipe: savedPosts[i]["title"]});
      }

      const recommended_recipe = [];

      fetch("http://127.0.0.1:8080/recommendations", {
         method: "POST",
         body: JSON.stringify(data),
         headers: { "Content-Type": "application/json" },
      })
         .then((response) => response.json())
         .then(async (data) => {
            let shuffled = shuffleArray(data.recommendations_id);
            for (let i = 0; i < 20; i++) {
               const recipeOne = await recipe_m.findOne({ _id: shuffled[i] });
               recommended_recipe.push(recipeOne);
            }
            res.send({ status: "ok", recipe: recommended_recipe });
         })
         .catch((err) => console.error(err));
   } catch (error) {
      res.status(401).json({ recipe: "Unauthorized" });
   }
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

app.post("/explore", async (req, res) => {
   try {
      const recipe = await recipe_m.aggregate([{ $sample: { size: 20 } }]);
      res.send({ status: "ok", recipe: recipe });
   } catch (err) {
      res.send({ status: "error", error: err });
   }
});

app.post("/recipeInfo", async (req, res) => {
   try {
      const { id } = req.body;
      const recipeInfo = await recipe_m.findOne({ _id: id });
      if (!recipeInfo) {
         return res.json({ status: "error", error: "Recipe not found" });
      }
      res.send({ status: "ok", recipeInfo: recipeInfo });
   } catch (err) {
      res.send({ status: "error", error: err });
   }
});

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
      res.send({ status: "ok", recipes: recipes });
   } catch (err) {
      res.status(500).json({ error: "An error occurred while searching for recipes." });
   }
});

app.post("/saveRecipe", async (req, res) => {
   try {
      const token = req.headers.authorization.split(" ")[1]; // Extract the token from the authorization header
      const decoded = jwt.verify(token, JWT_SECRET); // Verify the token

      // Use the decoded data to find the user in the database
      const user = await user_m.findOne({ email: decoded.email }); // Assuming you have a User model

      // Assuming you have a recipe ID that you want to save for the user
      const recipeId = req.body.recipeId; // Assuming the recipeId is sent in the request body

      // Check if the recipeId already exists in the user's savedPosts
      const index = user.savedPosts.indexOf(recipeId);
      if (index !== -1) {
         user.savedPosts.splice(index, 1); // Remove the recipeId from the savedPosts array
         await user.save(); // Save the updated user data
         return res.status(200).json({ message: "Recipe removed from saved list" });
      }

      // Add the recipeId to the user's savedPosts
      user.savedPosts.push(recipeId);

      // Save the updated user data
      await user.save();

      res.status(200).json({ message: "Recipe saved successfully" });
   } catch (error) {
      res.status(401).json({ message: "Unauthorized" });
   }
});

app.post("/checkSaved", async (req, res) => {
   try {
      const token = req.headers.authorization.split(" ")[1]; // Extract the token from the authorization header
      const decoded = jwt.verify(token, JWT_SECRET); // Verify the token

      // Use the decoded data to find the user in the database
      const user = await user_m.findOne({ email: decoded.email }); // Assuming you have a User model

      // Assuming you have a recipe ID that you want to save for the user
      const recipeId = req.body.recipeId; // Assuming the recipeId is sent in the request body

      // Check if the recipeId already exists in the user's savedPosts
      if (user.savedPosts.includes(recipeId)) {
         return res.status(400).json({ saved: true });
      }

      res.status(200).json({ saved: false });
   } catch (error) {
      res.status(401).json({ saved: "Unauthorized" });
   }
});

app.post("/postManagement", async (req, res) => {
   try {
      const token = req.headers.authorization.split(" ")[1]; // Extract the token from the authorization header
      const decoded = jwt.verify(token, JWT_SECRET); // Verify the token

      // Use the decoded data to find the user in the database
      const user = await user_m.findOne({ email: decoded.email }).populate("savedPosts");

      // Extract the saved posts data
      const savedPosts = user.savedPosts;

      res.send({ status: "ok", saved: savedPosts });
   } catch (error) {
      res.status(401).json({ saved: "Unauthorized" });
   }
});
