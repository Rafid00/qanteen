import flask
from flask import jsonify
from flask import Flask, jsonify, g
from flask import request
import numpy as np
import pandas as pd
import pymongo
import difflib
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

app = Flask(__name__)

def load_data():
    print('\nLoading the data...')
    
    # Connect to MongoDB (assuming MongoDB is running on the default localhost:27017)
    client = pymongo.MongoClient("mongodb+srv://rafid:rafid00@cluster0.u0jz9ty.mongodb.net/?retryWrites=true&w=majority")
    
    # Replace "your_database_name" and "your_collection_name" with your actual database and collection names
    db = client["qanteen"]
    collection = db["recipes"]

    # Fetch data from MongoDB and convert it to a pandas DataFrame
    cursor = collection.find()
    recipes_data = pd.DataFrame(list(cursor))

    # selecting the relevant features for recommendation
    selected_features = ['summary', 'extendedIngredients', 'dishTypes']

    # replacing the null values with null string
    for feature in selected_features:
        recipes_data[feature] = recipes_data[feature].fillna('')

    # combining all the selected features
    # combined_features = recipes_data['summary'] + ' ' + \
    #                recipes_data['extendedIngredients'].astype(str) + ' ' + \
    #                recipes_data['dishTypes'].astype(str)

     # converting non-string data to strings and then combining them
    combined_features = recipes_data['summary'] + ' ' + \
        recipes_data['extendedIngredients'].apply(lambda x: ' '.join(map(str, x))) + ' ' + \
        recipes_data['dishTypes'].apply(lambda x: ' '.join(map(str, x)))

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

    # creating a list with all the recipes names given in the dataset
    list_of_all_titles = recipes_data['title'].tolist()

    # getting the recipe name from the user
    data = request.get_json()

    recommended_recipes_name = []
    recommended_recipes_id = []

    r = 0
    while(r < len(data)):
        recipe_name = data[r]['recipe']

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

        # print the name of similar recipes based on the index
        print('Recipes suggested for you: ')
        i = 1
        for recipe in sorted_similar_recipes:
            index = recipe[0]

            title_from_index = recipes_data[recipes_data.index ==
                                            index]['title'].values[0]
            id_from_index = recipes_data[recipes_data.index ==
                                        index]['_id'].values[0]
            if (i < 15):
                recommended_recipes_name.append(title_from_index)
                recommended_recipes_id.append(str(id_from_index))
                print(i, '.', title_from_index)
                print(i, '.', id_from_index)
                i += 1
        r += 1

    print(recommended_recipes_id)
    return jsonify({'recommendations_id': recommended_recipes_id})


if __name__ == '__main__':
    app.run(debug=True, port=8080)
