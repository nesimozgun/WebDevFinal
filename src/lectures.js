// fetch data from lectures.json
fetch("../database/lectures.json")
.then(response => response.json())
.then(data => {
  localStorage.setItem("lectures", JSON.stringify(data));

  const tbody = document.querySelector("tbody");
  data.forEach(lecture => {
    const row = createTableRow(lecture);
    tbody.appendChild(row);
  });

})
.catch(error => console.error("Error:", error));

const addButton = document.querySelector(".add-btn");

addButton.addEventListener("click", () => {
const lectureNameInput = document.querySelector(".lecture-input");
const gradescaleInput = document.querySelector(".gradescale");

const existingLectures = JSON.parse(localStorage.getItem("lectures")) || [];

function generateId() {
    const existingLectures = JSON.parse(localStorage.getItem("lectures")) || [];
    return existingLectures.length + 1;
}

// create a new lecture
const newLecture = {
    id: generateId(),
    lecture_name: lectureNameInput.value,
    scale: gradescaleInput.value,
  };


// add the new lecture to the existing array
existingLectures.push(newLecture);

// update the lectures in localStorage
localStorage.setItem("lectures", JSON.stringify(existingLectures));

console.log("existingLectures:", existingLectures)

// clear the table body
const tbody = document.querySelector("tbody");
tbody.innerHTML = '';

// append the updated lectures to the table
existingLectures.forEach(lecture => {
  const row = createTableRow(lecture);
  tbody.appendChild(row);
});

});

// create elements for inputs
function createTableRow(lecture) {
const row = document.createElement("tr");

const idCell = document.createElement("td");
idCell.textContent = lecture.id;
row.appendChild(idCell);

const nameCell = document.createElement("td");
nameCell.textContent = lecture.lecture_name;
row.appendChild(nameCell);

const gradesCell = document.createElement("td");
gradesCell.textContent = lecture.scale;
row.appendChild(gradesCell);

const deleteCell = document.createElement("td");
const deleteButton = document.createElement("button");
deleteButton.textContent = "Delete";
deleteButton.dataset.lectureId = lecture.id;
deleteButton.addEventListener("click", () => {
  const existingLectures = JSON.parse(localStorage.getItem("lectures")) || [];
  const filteredLectures = existingLectures.filter(
    (lecture) => lecture.id !== deleteButton.dataset.lectureId
  );
  localStorage.setItem("lectures", JSON.stringify(filteredLectures));

  // remove row from table
  const row = deleteButton.closest("tr");
  row.remove();
});
deleteCell.appendChild(deleteButton);
row.appendChild(deleteCell);

const pointCell = document.createElement("td");
const pointButton = document.createElement("button");
pointButton.textContent = "Details";
pointButton.dataset.lectureId = lecture.id;
pointButton.addEventListener("click", () => {
  const lectureId = pointButton.dataset.lectureId;
  window.location.href = `lecture_details.html?lectureId=${lectureId}`;
});
pointCell.appendChild(pointButton);
row.appendChild(pointCell);

return row;
}