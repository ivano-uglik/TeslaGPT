const SpeechRecognition = () => {
  const recognitionLanguage = "hr";
  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new SpeechRecognition();
  recognition.continuous = true;
  recognition.lang = `${recognitionLanguage}`;
};

export default SpeechRecognition;
