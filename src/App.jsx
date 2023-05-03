import { useEffect, useState } from "react";
import mic from "./assets/microphone.svg";
import useSpeechRecognition from "./useSpeechRecognition";
const App = () => {
  const API_KEY = import.meta.env.VITE_API_KEY;
  async function getMessage(message) {
    setIsLoading(true);
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
            content: `Repeat exactly what is said here, and nothing else -> ${message}`,
            // content: `Repeat what i've said here: What is 1 + 1 ?`,
          },
        ],
        max_tokens: 20,
      }),
    });

    const data = await response.json();
    setAnswer(data.choices[0].message.content);
    setIsLoading(false);
  }

  const [formValue, setFormValue] = useState("");
  const [answer, setAnswer] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { text, startListening, stopListening, isListening } =
    useSpeechRecognition();
  return (
    <div className="grid place-items-center mt-8">
      <form
        method="post"
        onSubmit={(event) => {
          event.preventDefault();
          setIsLoading(true);
          getMessage(formValue);
          setFormValue("");
        }}
      >
        <h2 className="text-center">Pitaj TeslaGPT:</h2>
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
      <button
        className="border-4 p-4"
        onClick={() => {
          console.log(`onclick ${text}`);
          !isListening ? startListening() : (stopListening(), getMessage(text));
        }}
      >
        <img src={mic} className="w-8 fa-microphone" id="mic" />
      </button>
      <div className="w-64 text-center pt-8">
        {isLoading ? <p>Loading...</p> : answer ? <h1>{answer}</h1> : null}
        {isListening ? <div>Speaking...</div> : null}
        <>{text}</>
      </div>
    </div>
  );
};

export default App;
