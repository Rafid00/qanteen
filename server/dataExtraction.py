import requests
import csv
import time

# Use your actual API key
api_key = "59c9ce166c7c40afa6b56bdc42bffb53"
url = "https://api.spoonacular.com/recipes/complexSearch"

headers = {"Content-Type": "application/json"}

# Create a CSV file and write the header
with open('recipes4.csv', 'w', newline='', encoding='utf-8') as f:
    writer = csv.writer(f)
    writer.writerow(['id', 'title', 'source_name', 'summary', 'instructions', 'ingredients', 'image', 'dishTypes'])

    # Loop to fetch recipes
    for i in range(7,9):  # Spoonacular allows 100 results per request. You might need to adjust this number.
        params = {
            "apiKey": api_key,
            "number": 100,
            "offset": i*100  # This parameter is used to paginate through the results.
        }

        response = requests.get(url, headers=headers, params=params)
        data = response.json()

        for recipe in data['results']:
            # Fetch detailed recipe information
            recipe_details_url = f"https://api.spoonacular.com/recipes/{recipe['id']}/information"
            recipe_response = requests.get(recipe_details_url, headers=headers, params={"apiKey": api_key})
            recipe_data = recipe_response.json()
            
            # Get the list of ingredients
            ingredients = [i['original'] for i in recipe_data.get('extendedIngredients', [])]
            dishTypes = [i for i in recipe_data.get('dishTypes', [])]

            # Write data to CSV
            writer.writerow([recipe_data['id'], recipe_data['title'], recipe_data['sourceName'], recipe_data['summary'], recipe_data.get('instructions', ""), ingredients, recipe_data.get('image', ""), dishTypes])

        time.sleep(1)  # It's a good practice not to hit the API too quickly.
