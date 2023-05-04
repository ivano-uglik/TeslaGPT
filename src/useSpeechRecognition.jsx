import { useEffect, useState } from "react";

let recognition = new webkitSpeechRecognition();
recognition.continuous = true;
recognition.lang = "hr";

const useSpeechRecognition = () => {
  const [text, setText] = useState();
  const [isListening, setIsListening] = useState(false);

  const startListening = () => {
    setText();
    setIsListening(true);
    recognition.start();
  };

  const stopListening = () => {
    setIsListening(false);
    recognition.stop();
  };

  useEffect(() => {
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setText(transcript);
      console.log(`onresult ${transcript}`);
    };
  }, []);

  return {
    text,
    isListening,
    startListening,
    stopListening,
  };
};
export default useSpeechRecognition;
