Page Plans

    <!-- Sign In + Registration + Forgot Password [Rafid]
    Home Page / Feed + Basic Search [ Twitter ] [Rafid]
    Advanced Search + Browse / Explore [ Instagram ] [Rafid]

    Profile + Edit Profile [Rafid]
    Saved / Bookmarks + Liked Recipes [Rafid]
    Recipe Page Template + Comment + Rating [Rafid]
    My Bucket List [Rafid]
    About Us [Rafid]

    Follow / Subscribe Account [Rafid]
    Messenger Application -->

    Sign In [D]
    Registration [D]
    Advanced Search [D]
    Browse / Explore [D]
    Profile [D]
    Edit Profile [D]
    Saved / Bookmarks [D]
    Liked Recipes [D]
    Recipe Page [D]
    Rating / Comment [D]
    Forget Password
    Bucket List
    Follow / Subscribe Account
    Messenger Application
    About Us
    Search Result
    Recipe Posting Page [FD]
    Advanced Search
    Recipe Page - Rating, Comment, Ingredient Info

Recommendation Model Train: https://colab.research.google.com/drive/1T-U9XejZrqBR0RCoA5Koup4EBr7O-B6a?usp=sharing

id, sourceUrl, sourceName, title, summary, extendedIngredients, servings, readyInMinutes, instructions, image
Database Schema

    User Profile ->
    	ID - String (Random + Unique)
    	Name - String
    	Email - Unique String
    	Phone - String
    	Biography - String
    	Password - Hashed String
    	Date of Opening - Date
    	Total Upvote - Number
    	Total Downvote - Number
    	Your Posts - [Recipe ID]
    	Liked Posts - [Recipe ID]
    	Saved Posts - [Recipe ID]
    	Image - String
    	Followers - [User ID]
    	Follows - [User ID]

    Ingredient Info ->
    	Recipe ID - {
    		type: mongoose.Schema.Types.ObjectId,
    		ref: 'Recipe',},
		Ingredients - [{
			name - string
			image - string
			description - string
		}]


    Recipe ->
    	id - String (Random + Unique)
    	sourceUrl - String
    	sourceName - User ID
    	Title - String
    	dishTypes - [String]
    	summary - String
    	extendedIngredients - [String]
    	averageRating - Number
    	servings - Number
    	readyInMinutes - Number
    	Instructions - String
    	Nutritional Information - [{
    		Name - String
    		Quantity - String

    	}]

Ratings / Comments - [{
Author - User ID
Rating Value - Number
Comment - String

    	}]
    	Upvote - Number
    	Downvote - Number
    	Image - String
    	Followers - [User ID]
    	Follows - [User ID]

mongodb+srv://rafidbeingrafid:<password>@cluster0.zascp8p.mongodb.net/?retryWrites=true&w=majority

Recipe Page - Frontend
Data Collection / Extraction From Spoonicular - Using python
Recommendation System
Database connection - MongoDB Atlas
Login/Registration Functionality - Using MongoDB and Express JS

pip3 install -r requirements.txt

Things which has issues:
JWT Verification - Possible XSS Attack
