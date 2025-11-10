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
    speech.voice = voices[0]

    voices.forEach((voice , i) => {
        let opt = new Option(voice.name, i)
        voiceSelect.add(opt)
    });

}

// ============ Map and Set Selected Voice ================

voiceSelect.addEventListener("change" , () => {

    let index = Number(voiceSelect.value)
    speech.voice = voices[index]

})

// ============ Play Voice ================

playBtn.addEventListener("click" , () => {

    if (window.speechSynthesis.speaking) {
        window.speechSynthesis.resume()
        return
    }

    speech.text = textareaInp.value
    window.speechSynthesis.speak(speech)

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



// Hello brother,
// Your current Text-to-Speech converter built with HTML, CSS, and JavaScript is working quite well. The Play and Stop buttons function properly, and the default voice is already set. Now we can make it even more functional and interactive. Here are some features and improvements you can implement: