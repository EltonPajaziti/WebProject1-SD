function saveReflection() {
  const reflectionInput = document.getElementById("reflection-input");
  const reflectionText = reflectionInput.value.trim();
  const emotion = document.getElementById("emotion").value;

  if (reflectionText) {
    const reflection = {
      text: reflectionText,
      emotion: emotion,
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString(),
    };

    let reflections = JSON.parse(localStorage.getItem("reflections")) || [];
    reflections.push(reflection);

    localStorage.setItem("reflections", JSON.stringify(reflections));
    displayReflections();
    reflectionInput.value = "";
  } else {
    alert("Ju lutem shkruani mendimin për ta ruajtur!");
  }
}

function displayReflections() {
  const reflections = JSON.parse(localStorage.getItem("reflections")) || [];
  const savedReflections = document.getElementById("saved-reflections");

  savedReflections.innerHTML = "";

  reflections.forEach((reflection, index) => {
    const listItem = document.createElement("li");
    listItem.style.backgroundColor =
      reflection.emotion === "positive"
        ? "#d4edda"
        : reflection.emotion === "negative"
        ? "#f8d7da"
        : "#f1f1f1";
    listItem.innerHTML = `
            <span>${reflection.text} (${reflection.date} ${reflection.time}) - <strong>${reflection.emotion}</strong></span>
            <button class="delete-button" onclick="deleteReflection(${index})">Fshi</button>
        `;
    savedReflections.appendChild(listItem);
  });
}

function deleteReflection(index) {
  let reflections = JSON.parse(localStorage.getItem("reflections")) || [];
  reflections.splice(index, 1);
  localStorage.setItem("reflections", JSON.stringify(reflections));
  displayReflections();
}

function filterReflections() {
  const query = document.getElementById("search-bar").value.toLowerCase();
  const reflections = JSON.parse(localStorage.getItem("reflections")) || [];
  const savedReflections = document.getElementById("saved-reflections");
  const filtered = reflections.filter((reflection) =>
    reflection.text.toLowerCase().includes(query)
  );

  savedReflections.innerHTML = "";
  filtered.forEach((reflection, index) => {
    const listItem = document.createElement("li");
    listItem.style.backgroundColor =
      reflection.emotion === "positive"
        ? "#d4edda"
        : reflection.emotion === "negative"
        ? "#f8d7da"
        : "#f1f1f1";

    listItem.innerHTML = `
            <span>${reflection.text} (${reflection.date} ${reflection.time}) - <strong>${reflection.emotion}</strong></span>
            <button class="delete-button" onclick="deleteReflection(${index})">Fshi</button>
        `;
    savedReflections.appendChild(listItem);
  });
}

function exportReflections() {
  const reflections = JSON.parse(localStorage.getItem("reflections")) || [];
  const text = reflections
    .map(
      (reflection) =>
        `${reflection.date} ${reflection.time}: ${reflection.text}`
    )
    .join("\n\n");
  const link = document.createElement("a");
  link.href = "data:text/plain;charset=utf-8," + encodeURIComponent(text);
  link.download = "mendimet.txt";
  link.click();
}
window.onload = displayReflections;
