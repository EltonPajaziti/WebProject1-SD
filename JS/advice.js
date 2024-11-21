const adviceMessages = [
    "It's okay to have bad days; they don't define you.",
    "Your feelings are valid, and it’s okay to express them.",
    "Take things one moment at a time—small steps lead to big progress.",
    "You are not alone; support is always within reach.",
    "Rest is not a weakness; it’s a part of healing.",
    "Celebrate even the smallest victories—they matter.",
    "Your worth is not determined by your productivity.",
    "It’s brave to ask for help when you need it.",
    "Focus on progress, not perfection.",
    "You are stronger than you think, and you’ve overcome so much already.",
    "Your mind deserves the same care as your body.",
    "Healing takes time—be patient and kind to yourself.",
    "Let go of guilt; you’re doing the best you can.",
    "Self-care isn’t selfish; it’s essential.",
    "You don’t have to have everything figured out right now.",
    "The storm will pass, and brighter days are ahead.",
    "Embrace the present moment—it’s where your power lies.",
    "Mistakes are part of growth; don’t be too hard on yourself.",
    "It’s okay to set boundaries to protect your peace.",
    "Your journey is unique, and comparing it to others won’t help.",
    "Breathe deeply—you’ve got this.",
    "You are worthy of love and compassion, especially from yourself.",
    "It’s not selfish to prioritize your mental health.",
    "Healing isn’t linear; ups and downs are part of the process.",
    "You are enough, just as you are."
];

function showRandomAdvice() {
const adviceElement = document.getElementById("advice-message");
const randomIndex = Math.floor(Math.random() * adviceMessages.length);
const randomMessage = adviceMessages[randomIndex];
typeMessage(randomMessage, adviceElement);
}


function typeMessage(message, element) {
let i = 0;
element.innerHTML = "";
const interval = setInterval(function () {
if (i < message.length) {
    element.innerHTML += message[i]; 
    i++;
} else {
    clearInterval(interval); 
}
}, 50);
}
