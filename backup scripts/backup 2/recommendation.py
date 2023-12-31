import flask
from flask import jsonify
from flask import Flask, jsonify, g
import numpy as np
import pandas as pd
import difflib
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

app = Flask(__name__)


def load_data():
    print('\nLoading the data...')
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

    g.recipes_data = recipes_data
    g.similarity = similarity


@app.before_request
def before_request():
    load_data()


@app.route('/recommendations', methods=['POST'])
def recommendations():
    print('Getting the recommendations...\n')
    recipes_data = g.recipes_data
    similarity = g.similarity

    # getting the recipe name from the user
    recipe_name = "Chicken Ranch Burgers"

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

    recommended_recipes_name = []
    recommended_recipes_id = []

    # print the name of similar recipes based on the index
    print('Recipes suggested for you: ')
    i = 1
    for recipe in sorted_similar_recipes:
        index = recipe[0]

        title_from_index = recipes_data[recipes_data.index ==
                                        index]['title'].values[0]
        id_from_index = recipes_data[recipes_data.index ==
                                     index]['id'].values[0]
        if (i < 30):
            recommended_recipes_name.append(title_from_index)
            recommended_recipes_id.append(str(id_from_index))
            print(i, '.', title_from_index)
            i += 1

    return jsonify({'recommendations_id': recommended_recipes_id})


if __name__ == '__main__':
    app.run(debug=True, port=8080)
