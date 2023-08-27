const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const SubIdea = require('./subIdea')
const db = require('./db'); 
const cors = require("cors");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());

// Define API routes for CRUD operations
app.post('/api/sub-ideas', async (req, res) => {
    try {
      const { text, parentIdea } = req.body;
      const subIdea = new SubIdea({ text, parentIdea });
      await subIdea.save();
  
      res.status(201).json(subIdea);
    } catch (error) {
      res.status(500).json({ message: 'Error creating sub-idea', error: error.message });
    }
  });
  
  // Read all sub-ideas
  app.get('/api/sub-ideas', async (req, res) => {
    try {
      const subIdeas = await SubIdea.find();
      res.json(subIdeas);
    } catch (error) {
      res.status(500).json({ message: 'Error retrieving sub-ideas', error: error.message });
    }
  });
  
  // Update a sub-idea
  app.put('/api/sub-ideas/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const { text } = req.body;
      const updatedSubIdea = await SubIdea.findByIdAndUpdate(id, { text }, { new: true });
      res.json(updatedSubIdea);
    } catch (error) {
      res.status(500).json({ message: 'Error updating sub-idea', error: error.message });
    }
  });
  
  // Delete a sub-idea
  app.delete('/api/sub-ideas/:id', async (req, res) => {
    try {
      const { id } = req.params;
      await SubIdea.findByIdAndDelete(id);
      res.json({ message: 'Sub-idea deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting sub-idea', error: error.message });
    }
  });
  
app.post('/api/sub-ideas', async (req, res) => {
  // Implement logic to store sub-ideas in the database

  try {
    const { text, parentIdea } = req.body;

    // Create a new sub-idea instance
    const subIdea = new SubIdea({ text, parentIdea });

    // Save the sub-idea to the database
    await subIdea.save();

    res.status(201).json(subIdea);
  } catch (error) {
    res.status(500).json({ message: 'Error creating sub-idea', error: error.message });
  }
});

// Fetch sub-idea suggestions based on input query
app.get('/api/sub-ideas/suggestions', async (req, res) => {
    try {
      const query = req.query.query || '';
      // Implement logic to fetch sub-idea suggestions from the database
      const suggestions = await fetchSubIdeaSuggestionsFromDB(query);
      res.json({ suggestions });
    } catch (error) {
      res.status(500).json({ message: 'Error fetching sub-idea suggestions', error: error.message });
    }
  });
  
  async function fetchSubIdeaSuggestionsFromDB(query) {
    // Implement logic to fetch sub-idea suggestions from the database
    // You can use Mongoose to query your MongoDB
    try {
        const regexQuery = new RegExp(query, 'i'); // Case-insensitive regex query
        const subIdeas = await SubIdea.find({ text: regexQuery }).limit(5); // Limit to 5 suggestions
        const suggestionTexts = subIdeas.map(subIdea => subIdea.text);
        return suggestionTexts;
      } catch (error) {
        console.error('Error fetching sub-idea suggestions from the database:', error);
        return [];
      }
  }

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
