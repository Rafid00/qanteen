import requests
import csv
import time

# Use your actual API key
api_key = "9da74457a0094eeaa10fb1cb8569959e"
url = "https://api.spoonacular.com/recipes/complexSearch"

headers = {"Content-Type": "application/json"}

# Create a CSV file and write the header
with open('recipesRafid2.csv', 'w', newline='', encoding='utf-8') as f:
    writer = csv.writer(f)
    
    # writer.writerow(['id', 'title', 'source_name', 'summary', 'instructions', 'ingredients', 'image', 'dishTypes'])
    writer.writerow(['id', 'sourceUrl', 'sourceName', 'title', 'dishTypes', 'summary', 'extendedIngredients', 'servings', 'readyInMinutes', 'instructions', 'image'])


    # Loop to fetch recipes
    for i in range(3,6):  # Spoonacular allows 100 results per request. You might need to adjust this number.
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
            writer.writerow([recipe_data['id'], 
        recipe_data['sourceUrl'], 
        recipe_data['sourceName'], 
        recipe_data['title'], 
        dishTypes,
        recipe_data['summary'], 
        ingredients, 
        recipe_data['servings'], 
        recipe_data['readyInMinutes'], 
        recipe_data.get('instructions', ""), 
        recipe_data.get('image', "")])
            # writer.writerow([recipe_data['id'], recipe_data['title'], recipe_data['sourceName'], recipe_data['summary'], recipe_data.get('instructions', ""), ingredients, recipe_data.get('image', ""), dishTypes])

        time.sleep(1)  # It's a good practice not to hit the API too quickly.
