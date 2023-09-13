Page Plans

	Sign In + Registration + Forgot Password [Rafid]
	Home Page / Feed + Basic Search [ Twitter ] [Rafid]
	Advanced Search + Browse / Explore [ Instagram ] [Rafid]
		
	Profile + Edit Profile [Rafid]
	Saved / Bookmarks + Liked Recipes [Habib]
	Recipe Page Template + Comment + Rating [Habib]
	My Bucket List [Habib]
	About Us [Habib]

	Follow / Subscribe Account [Rafid]
	Messenger Application

Recommendation Model Train: https://colab.research.google.com/drive/1T-U9XejZrqBR0RCoA5Koup4EBr7O-B6a?usp=sharing


Database Schema

	User Profile ->
		ID - String (Random + Unique)
		Name - String
		Email - String
		Phone - String
		Biography - String
		Password - String
		Date of Opening - Date
		Total Upvote - Number
		Total Downvote - Number
		Your Posts - [Recipe ID]
		Liked Posts - [Recipe ID]
		Saved Posts - [Recipe ID]
	
	Recipe ->
		ID - String (Random + Unique)
		Posted By - User ID
		Title - String
		Description - String
		Avg Rating - Number
		Ingredients - [Ingredients Schema]
		Serving Size - Number
		Prep Time - Number
		Instructions - String Array[]
		Nutritional Information - [NutritionalSchema]
  		Ratings / Comments - [RatingSchema]
		Upvote - Number
		Downvote - Number
		Image - String
		Followers - [User ID]
		Follows - [User ID]

	Ingredient Schema ->
		Name - String
		Quantity - String

	NutritionalSchema ->
		Name - String
		Quantity - String

	RatingSchema ->
		Author - User ID
  		Rating Value - Number
		Comment - String


mongodb+srv://rafidbeingrafid:<password>@cluster0.zascp8p.mongodb.net/?retryWrites=true&w=majority

Recipe Page - Frontend
Data Collection / Extraction From Spoonicular - Using python
Recommendation System
Database connection - MongoDB Atlas
Login/Registration Functionality - Using MongoDB and Express JS