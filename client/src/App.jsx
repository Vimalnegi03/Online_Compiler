import { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import './App.css';

function App() {
  const [code, setCode] = useState("");
  const [input, setInput] = useState(""); // Added state for user input
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false); // Set initial loading state to false

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    toast.loading("Compiling and executing..."); // Show loading toast
    const payload = {
      language: "cpp",
      code,
      input // Include input in the payload
    };
    try {
      const { data } = await axios.post("http://localhost:5000/run", payload);
      setOutput(data.output);
      toast.success("Execution completed successfully!"); // Show success toast
    } catch (error) {
      console.error(error.response);
      toast.error("An error occurred during execution."); // Show error toast
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-4xl w-full">
        <h1 className="text-2xl font-bold mb-4 text-center">Online Code Compiler</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <textarea
            className="w-full h-60 p-2 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Write your code here..."
          ></textarea>
          <textarea
            className="w-full h-24 p-2 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter input for your code..."
          ></textarea>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition duration-200"
            disabled={loading} // Disable button when loading
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </form>
        {output && (
          <div className="mt-4 p-4 bg-gray-200 rounded-md border border-gray-300">
            <h2 className="text-lg font-semibold mb-2">Output:</h2>
            <pre className="whitespace-pre-wrap">{output}</pre>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
