import { useEffect, useState } from "react";

let recognition = new webkitSpeechRecognition();
recognition.continuous = true;
recognition.lang = "hr";

const useSpeechRecognition = () => {
  const [text, setText] = useState();
  const [isListening, setIsListening] = useState(false);

  const startListening = () => {
    // setText("");
    setIsListening(true);
    recognition.start();
    console.log(`startListening ${text}`);
  };

  useEffect(() => {
    recognition.onresult = (event) => {
      const temp = event.results[0][0].transcript;
      setText(temp);
      recognition.stop();
      setIsListening(false);
      console.log(`onresult ${temp}`);
    };
  }, []);

  const stopListening = () => {
    setIsListening(false);
    recognition.stop();
  };
  return {
    text,
    isListening,
    startListening,
    stopListening,
  };
};
export default useSpeechRecognition;
