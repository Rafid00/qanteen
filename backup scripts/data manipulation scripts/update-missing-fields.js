const Recipe = require('../../server/models/recipe');
const mongoose = require('mongoose');

const mongoURI = 'mongodb+srv://rafid:rafid00@cluster0.u0jz9ty.mongodb.net/qanteen?retryWrites=true&w=majority';

mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
    .then(() => {
      console.log('Connected to MongoDB');
    })
    .catch((err) => {
      console.error('Error connecting to MongoDB:', err);
    });

// Define the default values you want to set for missing fields
const defaultValues = {
    nutritionalInformation: [],
    ratingsComments: [],
    upvote: 0,
    downvote: 0,
    averageRating: 0,
  };
  
  // Use async/await to update documents with missing fields and set default values
  async function updateMissingFields() {
    try {
      const result = await Recipe.updateMany(
        {
          $or: [
            { nutritionalInformation: { $exists: false } },
            { ratingsComments: { $exists: false } },
            { upvote: { $exists: false } },
            { downvote: { $exists: false } },
            { averageRating: { $exists: false } },
          ],
        },
        { $set: defaultValues }
      );
      console.log('Documents updated successfully:', result);
    } catch (err) {
      console.error('Error updating documents:', err);
    } finally {
      // Close the Mongoose connection if needed
      mongoose.connection.close();
    }
  }
  
  // Call the function to update missing fields
  updateMissingFields();