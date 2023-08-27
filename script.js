const ideaInput = document.getElementById('ideaInput');
const suggestions = document.getElementById('suggestions');
const addButton = document.getElementById('addButton');



addButton.addEventListener('click', async () => {
  const ideaText = ideaInput.value;

  if (ideaText.trim() !== '') {
    try {
      const response = await fetch( 'http://localhost:3000/api/sub-ideas', {
        method: 'POST',
        body: JSON.stringify({ text: ideaText, parentIdea: null }),
        headers: {
          'Content-Type': 'application/json'
        },
         // Assuming there's no parent for the main idea
      });

      if (response.ok) {
        ideaInput.value = ''; // Clear the input field
        console.log('Idea added successfully');
      } else {
        console.error('Failed to add idea:', response.statusText);
      }
    } catch (error) {
      console.error('Error adding idea:', error);
    }
  }
});

async function fetchSubIdeaSuggestions(inputText) {
  try {
    const response = await fetch('http://localhost:3000/api/sub-ideas/suggestions?query=' + encodeURIComponent(inputText));

    
   const data = await response.json();
    return data.suggestions;
  } catch (error) {
    console.error('Error fetching sub-idea suggestions:', error);
    return [];
  }
}



ideaInput.addEventListener('input', async () => {
  const inputText = ideaInput.value;
  if (inputText.includes('<')) {
    // Call API to fetch sub-idea suggestions based on inputText
    
    const subIdeas = await fetchSubIdeaSuggestions(inputText);
    displaySuggestions(subIdeas);
  } else {
    suggestions.innerHTML = '';
  }
});



function displaySuggestions(subIdeas) {
  suggestions.innerHTML = '';
  subIdeas.forEach(subIdea => {
    const suggestion = document.createElement('div');
    suggestion.classList.add('suggestion');
    suggestion.innerText = subIdea;
    suggestions.appendChild(suggestion);
  });
}
