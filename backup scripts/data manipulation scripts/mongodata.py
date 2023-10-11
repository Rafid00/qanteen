import pandas as pd
from pymongo import MongoClient

# Define the MongoDB connection settings
mongodb_uri = "mongodb+srv://rafid:rafid00@cluster0.u0jz9ty.mongodb.net/?retryWrites=true&w=majority"  # Replace with your MongoDB URI
database_name = "qanteen"  # Replace with your desired database name
collection_name = "recipes"  # Replace with your desired collection name

# Read the CSV file into a DataFrame
csv_file = "C:/Users/rafid/OneDrive/Desktop/Projects/qanteen/data/recipes.csv"  # Replace with the path to your CSV file
df = pd.read_csv(csv_file)

# Convert columns to the desired data types
df['dishTypes'] = df['dishTypes'].apply(lambda x: x.split('", "'))
df['extendedIngredients'] = df['extendedIngredients'].apply(lambda x: x.split('", "'))
df['servings'] = df['servings'].astype(int)
df['readyInMinutes'] = df['readyInMinutes'].astype(int)

# Convert the DataFrame to a list of dictionaries (one per document)
data = df.to_dict(orient='records')

# Connect to MongoDB and insert the data
client = MongoClient(mongodb_uri)
db = client[database_name]
collection = db[collection_name]

collection.insert_many(data)

# Close the MongoDB connection
client.close()

print(f"Imported {len(data)} documents into MongoDB.")