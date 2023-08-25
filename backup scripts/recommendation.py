import flask
from flask import jsonify
from flask import Flask, jsonify
import numpy as np
import pandas as pd
import difflib
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

app = Flask(__name__)

@app.route('/recommendations', methods=['POST'])
def recommendations():
    # loading the data from the csv file to apandas dataframe
    recipes_data = pd.read_csv('../data/recipes.csv')

    # selecting the relevant features for recommendation
    selected_features = ['summary', 'ingredients', 'dishTypes']

    # replacing the null valuess with null string
    for feature in selected_features:
        recipes_data[feature] = recipes_data[feature].fillna('')

    # combining all the 5 selected features
    combined_features = recipes_data['summary']+' ' + \
        recipes_data['ingredients']+' '+recipes_data['dishTypes']

    # converting the text data to feature vectors
    vectorizer = TfidfVectorizer()

    feature_vectors = vectorizer.fit_transform(combined_features)

    # getting the similarity scores using cosine similarity
    similarity = cosine_similarity(feature_vectors)

    # getting the recipe name from the user
    recipe_name = "Italian Sausage"

    # creating a list with all the recipes names given in the dataset
    list_of_all_titles = recipes_data['title'].tolist()

    # finding the close match for the recipe name given by the user
    find_close_match = difflib.get_close_matches(
        recipe_name, list_of_all_titles)

    close_match = find_close_match[0]

    # finding the index of the recipe with title
    index_of_the_recipe = recipes_data[recipes_data['title']
                                       == close_match].index.tolist()
    index_of_the_recipe = index_of_the_recipe[0]

    # getting a list of similar recipe
    similarity_score = list(enumerate(similarity[index_of_the_recipe]))

    # sorting the recipes based on their similarity score
    sorted_similar_recipes = sorted(
        similarity_score, key=lambda x: x[1], reverse=True)

    recommended_recipes = []
    # print the name of similar recipes based on the index
    print('Recipes suggested for you: \n')
    i = 1
    for recipe in sorted_similar_recipes:
        index = recipe[0]


        title_from_index = recipes_data[recipes_data.index ==
                                        index]['title'].values[0]
        if (i < 30):
            recommended_recipes.append(title_from_index)
            print(i, '.', title_from_index)
            i += 1

    return jsonify({'recommendations': recommended_recipes})


if __name__ == '__main__':
    app.run(debug=True, port=8080)


# @app.before_first_request
# def load_data():
#   user_data = pd.read_csv('user_data.csv')
#   recipe_data = pd.read_csv('recipe_data.csv')

#   joined_data = user_data.join(recipe_data, on='recipe_id')


#   @app.route('/recommendations', methods=['POST'])
# def recommendations():
#   user_id = request.args.get('user_id')
#   recipe_ids = request.args.get('recipe_ids')

#   # Get the user's preferences.
#   user_preferences = joined_data[joined_data['user_id'] == user_id]

#   # Get the recipes that the user has not already rated.
#   unrated_recipes = recipe_data[~recipe_data['recipe_id'].isin(user_preferences['recipe_id'])]

#   # Get the top 5 recipes that the user has not already rated.
#   recommended_recipes = unrated_recipes.head(5)

#   return jsonify({'recommendations': recommended_recipes['recipe_name'].tolist()})


# app = flask.Flask(__name__)

# @app.route('/recommendations', methods=['POST'])
# def recommendations():
#   user_id = request.args.get('user_id')
#   recipe_ids = request.args.get('recipe_ids')

#   # Load the user data.
#   user_data = pd.read_csv('user_data.csv')

#   # Load the recipe data.
#   recipe_data = pd.read_csv('recipe_data.csv')

#   # Join the user data and recipe data.
#   joined_data = user_data.join(recipe_data, on='recipe_id')

#   # Get the user's preferences.
#   user_preferences = joined_data[joined_data['user_id'] == user_id]

#   # Get the recipes that the user has not already rated.
#   unrated_recipes = recipe_data[~recipe_data['recipe_id'].isin(user_preferences['recipe_id'])]

#   # Get the top 5 recipes that the user has not already rated.
#   recommended_recipes = unrated_recipes.head(5)

#   return jsonify({'recommendations': recommended_recipes['recipe_name'].tolist()})

# if __name__ == '__main__':
#   app.run(debug=True)
