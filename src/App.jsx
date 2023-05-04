import { useEffect, useState } from "react";
import mic from "./assets/microphone.svg";
import micSlash from "./assets/microphoneSlash.svg";
import useSpeechRecognition from "./useSpeechRecognition";
import tesla from "/tesla.svg";

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
            content: `${message}`,
          },
        ],
        max_tokens: 500,
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

  useEffect(() => {
    console.log(text);
    text && getMessage(text);
  }, [text]);
  return (
    <div className="grid place-items-center mt-8">
      <img src={tesla} className="w-32 p-4" />
      {/* <form
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
      </form> */}
      <div>
        <button
          className="border-4 p-4 mr-8"
          onClick={() => {
            !isListening ? startListening() : stopListening();
          }}
        >
          {!isListening ? (
            <img src={mic} className="w-8" id="mic" />
          ) : (
            <img src={micSlash} className="w-9" id="mic" />
          )}
        </button>
      </div>
      <div className="w-64 text-center pt-8">
        {isLoading ? <p>Loading...</p> : answer ? <h1>{answer}</h1> : null}
        {isListening ? <div>Speaking...</div> : null}
      </div>
    </div>
  );
};

export default App;
