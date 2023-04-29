import { useState } from "react";
import SpeechRecognition from "./SpeechRecognition";
import mic from "./assets/microphone.svg";
const App = () => {
  SpeechRecognition();
  const API_KEY = import.meta.env.VITE_API_KEY;
  const [runsFunction, setRunsFunction] = useState(1);
  async function getMessage(message) {
    setIsLoading(true);
    setRunsFunction(runsFunction + 1);
    console.log(runsFunction);
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "user",
            content: `${message}`,
          },
        ],
        max_tokens: 1,
      }),
    });

    const data = await response.json();
    setAnswer(data.choices[0].message.content);
    setIsLoading(false);
  }

  const [formValue, setFormValue] = useState("");
  const [answer, setAnswer] = useState();
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="grid place-items-center mt-8">
      <form
        method="post"
        onSubmit={async (event) => {
          event.preventDefault();
          setIsLoading(true);
          await getMessage(formValue);
          setFormValue("");
        }}
      >
        <h2 className="text-center">Ask the API:</h2>
        <input
          type="text"
          placeholder="Enter prompt here..."
          value={formValue}
          onChange={() => {
            setFormValue(event.target.value);
          }}
          className="my-4 border rounded-2xl p-2 mr-4 w-[25rem]"
        />
        <input
          type="submit"
          className="p-[0.35rem] border border-black rounded-xl"
        />
      </form>
      {/* MICROPHONE  */}
      <button className="border-black border-4 rounded-full p-8">
        <img src={mic} alt="Microphone button" className="w-16" />
        {/* on click start voice recognition, record input, feed input into API */}
      </button>
      {/* MICROPHONE END  */}
      <div className="w-64 text-center pt-8">
        {isLoading ? (
          <p>Loading...</p>
        ) : answer ? (
          <h1>{answer}</h1>
        ) : (
          <h1>empty</h1>
        )}
      </div>
    </div>
  );
};

export default App;
