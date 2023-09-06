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
		Your Posts - [Recipt Post]
		Liked Posts - [Recipt Post]
		Saved Posts - [Recipt Post]

	Ingredient Schema ->
		Name - String
		Quantity - String

	NutritionalSchema ->
		Name - String
		Quantity

	CommentSchema ->
  		Author - String
  		Text - String

	RatingSchema ->
  		Value - Number
  		User - String
	
	Recipe Post ->
		Posted By - User ID
		Title - String
		Description - String
		Rating - Integer
		Ingredients - [Ingredients Schema]
		Instructions - String
		Nutritional Information - NutritionalSchema
		Comments: [CommentSchema],
  		Ratings: [RatingSchema],


mongodb+srv://rafidbeingrafid:<password>@cluster0.zascp8p.mongodb.net/?retryWrites=true&w=majority

Recipe Page
Data Collection From Spoonicular
Recommendation System
Database connection
Login/Registration