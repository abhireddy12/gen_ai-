// renderer.js - Frontend Logic
const inputLangDropdown = document.getElementById("inputLanguage");
const outputLangDropdown = document.getElementById("outputLanguage");

// Supported languages (sorted alphabetically)
const languages = {
    "ar": "Arabic", "bn": "Bengali", "da": "Danish", "de": "German", "el": "Greek",
    "en": "English", "es": "Spanish", "fi": "Finnish", "fr": "French", "gu": "Gujarati",
    "he": "Hebrew", "hi": "Hindi", "id": "Indonesian", "it": "Italian", "ja": "Japanese",
    "ko": "Korean", "ms": "Malay", "mr": "Marathi", "nl": "Dutch", "no": "Norwegian",
    "pa": "Punjabi", "pl": "Polish", "pt": "Portuguese", "ru": "Russian", "sv": "Swedish",
    "ta": "Tamil", "te": "Telugu", "th": "Thai", "tl": "Filipino", "tr": "Turkish",
    "vi": "Vietnamese", "zh": "Chinese"
};

// Convert languages object to an array and sort alphabetically
const sortedLanguages = Object.entries(languages).sort((a, b) => a[1].localeCompare(b[1]));

// Populate dropdowns with sorted languages
for (const [code, name] of sortedLanguages) {
    let option1 = document.createElement("option");
    let option2 = document.createElement("option");

    option1.value = code;
    option1.innerText = `${name} (${code})`;
    option2.value = code;
    option2.innerText = `${name} (${code})`;

    inputLangDropdown.appendChild(option1);
    outputLangDropdown.appendChild(option2);
}

// Translate Text
async function translateText() {
    const text = document.getElementById("inputText").value;
    const inputLang = document.getElementById("inputLanguage").value;
    const outputLang = document.getElementById("outputLanguage").value;

    if (!text) {
        alert("Enter text to translate.");
        return;
    }

    const response = await fetch(`https://api.mymemory.translated.net/get?q=${text}&langpair=${inputLang}|${outputLang}`);
    const data = await response.json();
    document.getElementById("outputText").innerText = data.responseData.translatedText;
}

// Speak Translated Text
function speakText() {
    const text = document.getElementById("outputText").innerText.trim();
    const outputLang = document.getElementById("outputLanguage").value;

    if (!text) {
        alert("Translate text before speaking.");
        return;
    }

    const speech = new SpeechSynthesisUtterance(text);
    speech.lang = outputLang || "en-US";

    const voices = speechSynthesis.getVoices();
    speech.voice = voices.find(voice => voice.lang.startsWith(outputLang)) || voices[0];

    speechSynthesis.speak(speech);
}

// Voice Recognition (Speech-to-Text)
function startVoiceRecognition() {
    const inputLang = document.getElementById("inputLanguage").value;
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = inputLang;
    recognition.start();

    recognition.onresult = function (event) {
        document.getElementById("inputText").value = event.results[0][0].transcript;
    };

    recognition.onerror = function (event) {
        alert("Speech recognition error: " + event.error);
    };
}
