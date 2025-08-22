import React, { useState } from 'react';

// Main App component
const InterCoinAi = () => {
  // State for the user's question
  const [question, setQuestion] = useState('');
  // State for the LLM's response
  const [response, setResponse] = useState('');
  // State to handle the loading spinner
  const [isLoading, setIsLoading] = useState(false);

  // Function to handle the form submission and LLM request
  const handleAsk = async (e) => {
    e.preventDefault(); // Prevents the default form submission behavior

    // Do not proceed if the question is empty or we are already loading
    if (!question.trim() || isLoading) return;

    setIsLoading(true);
    setResponse('');

try{
    // Send the question to your backend, which will handle the Gemini API call
    const backendResponse = await fetch('https://intercoin-web3.onrender.com/api/aiConnect', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question })
    });
    

  if (!backendResponse.ok) {
      throw new Error(`API error: ${backendResponse.status}`);
    }

    const result = await backendResponse.json();
    console.log("Backend result:", result);

   setResponse(result.answer || "No response returned.");

  } catch (error) {
    console.error('Error fetching LLM response:', error);
    setResponse("An error occurred. Please try again later.");
  } finally {
    setIsLoading(false);
  }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white shadow-xl rounded-2xl p-6 md:p-10 w-full max-w-2xl transform transition-all hover:scale-105 duration-300">
       
        <form onSubmit={handleAsk} className="flex flex-col gap-4">
          <textarea
            className="w-full h-24 p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 resize-none font-sans text-gray-800 placeholder-gray-400"
            placeholder="Ask Inter Coin AI"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
             style={{borderRadius:"12px"}}
          />

          <button
            type="submit"
            style={{borderRadius:"12px"}}
            className={`w-full py-3 px-6 rounded-xl font-semibold text-lg transition-all duration-300 ${
              isLoading
                ? 'bg-indigo-300 cursor-not-allowed'
                : 'bg-indigo-600 text-white hover:bg-indigo-700 active:bg-indigo-800'
            }`}
            disabled={isLoading}
          >
            {isLoading ? (
              <svg className="animate-spin h-5 w-5 text-white inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : (
              'Ask Intercoin AI'
            )}
          </button>
        </form>

        {response && (
          <div >
            <h3 >Response</h3>
            <p style = {{color:"black"}} >{response}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default InterCoinAi;
