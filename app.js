let speech = new SpeechSynthesisUtterance()
let textareaInp = document.getElementById("textInput")
let voiceSelect = document.getElementById("voiceSelect")

let playBtn = document.getElementById("playBtn")
let pauseBtn = document.getElementById("pauseBtn")
let stopBtn = document.getElementById("stopBtn")

// ============ Array of Voices ================
let voices = []

// ============ Get and Map Voices ================

window.speechSynthesis.onvoiceschanged = () => {

    voices = window.speechSynthesis.getVoices()

    let savedVoiceIndex = localStorage.getItem("ttsVoiceIndex") || 0
    speech.voice = voices[savedVoiceIndex]

    voices.forEach((voice , i) => {
        let opt = new Option(voice.name, i)
        voiceSelect.add(opt)
    });

    voiceSelect.value = savedVoiceIndex;
}

// ============ Restore text from localStorage ============
textareaInp.value = localStorage.getItem("ttsText") || "";

// ============ Map and Set Selected Voice ================

voiceSelect.addEventListener("change" , () => {

    let index = Number(voiceSelect.value)
    speech.voice = voices[index]

    localStorage.setItem("ttsVoiceIndex" , index)

})

// ============ Play Voice ================

playBtn.addEventListener("click" , () => {

    if (window.speechSynthesis.speaking) {
        window.speechSynthesis.resume()
        return
    }

    speech.text = textareaInp.value
    window.speechSynthesis.speak(speech)

    // Save text in localStorage
    localStorage.setItem("ttsText", textareaInp.value);

})

// ============ Pause Voice ================

pauseBtn.addEventListener("click" , () => {

    if (window.speechSynthesis.speaking) {
        window.speechSynthesis.pause()
    }

})

// ============ Stop Voice ================

stopBtn.addEventListener("click" , () => {
    window.speechSynthesis.cancel()
})

// ============ Press Space and Escape Handling ================

document.addEventListener("keydown", (e) => {

    if (e.code === "Space") {
        
        e.preventDefault()
        
        if (window.speechSynthesis.speaking) {
            window.speechSynthesis.paused ? window.speechSynthesis.resume() : window.speechSynthesis.pause()
        }
        else {
            playBtn.click()
        }

    }
    if (e.code === "Escape") stopBtn.click();

});

// This Text-to-Speech converter allows users to type or paste text and have it read aloud using the browser’s built-in voices. It features a voice selection dropdown and automatically saves both the selected voice and text in localStorage for persistent settings across sessions. Users can play, pause, and stop speech using buttons or keyboard shortcuts, making it interactive and easy to use.