// Test script to verify frontend can communicate with backend
// This would normally be run from the frontend to test the API connection

const testChatAPI = async () => {
  try {
    // Test data for the chat API
    const testData = {
      message: "Hello, are you working?",
      history: [],
      context: {},
      conversation_id: null
    };

    console.log("Testing connection to backend API...");
    console.log("Backend URL:", "http://localhost:8000");
    console.log("Testing with message:", testData.message);

    // This would be the call from the frontend to backend
    const response = await fetch('http://localhost:8000/api/v1/chat/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-token': 'your-api-token-here'  // Replace with your actual API token
      },
      body: JSON.stringify(testData)
    });

    if (response.ok) {
      const data = await response.json();
      console.log("✅ Successfully connected to backend API");
      console.log("Response:", data);
    } else {
      console.log("❌ API request failed with status:", response.status);
      const errorText = await response.text();
      console.log("Error:", errorText);
    }
  } catch (error) {
    console.log("❌ Network error connecting to backend:", error.message);
    console.log("This could be due to CORS policy or network connectivity issues.");
  }
};

// Run the test
testChatAPI();