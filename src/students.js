// fetch data from students.json
fetch("../database/students.json")
.then(response => response.json())
.then(data => {
  localStorage.setItem("students", JSON.stringify(data));

  const tbody = document.querySelector("tbody");
  data.forEach(student => {
    const row = createTableRow(student);
    tbody.appendChild(row);
  });
})
.catch(error => console.error("Error:", error));

const saveButton = document.querySelector(".add-btn");
let existingStudents = [];

saveButton.addEventListener("click", () => {
const studentNameInput = document.querySelector(".add-lecture #name");
const studentSurnameInput = document.querySelector(".add-lecture #surname");
const studentSchoolIdInput = document.querySelector(".add-lecture #student_id");
const gradescaleInput = document.querySelector(".gradescale");

existingStudents = JSON.parse(localStorage.getItem("students")) || [];

function generateId() {
    const existingStudents = JSON.parse(localStorage.getItem("students")) || [];
    return existingStudents.length + 1;
}

// add a new student
const newStudent = {
  id: generateId(),
  name: studentNameInput.value,
  surname: studentSurnameInput.value,
  student_id: studentSchoolIdInput.value,
};

// Add the new student to the existing array
existingStudents.push(newStudent);

// update the students in localStorage
localStorage.setItem("students", JSON.stringify(existingStudents));

// clear the table body
const tbody = document.querySelector("tbody");
tbody.innerHTML = '';

// append the updated students to the table
existingStudents.forEach(student => {
  const row = createTableRow(student);
  tbody.appendChild(row);
});

// clear input values
studentNameInput.value = '';
studentSurnameInput.value = '';
studentSchoolIdInput.value = '';
});

// create elements for inputs
function createTableRow(student) {
const row = document.createElement("tr");

const idCell = document.createElement("td");
idCell.textContent = student.id;
row.appendChild(idCell);

const nameCell = document.createElement("td");
nameCell.textContent = student.name;
row.appendChild(nameCell);

const surnameCell = document.createElement("td");
surnameCell.textContent = student.surname;
row.appendChild(surnameCell);

const schoolIdCell = document.createElement("td");
schoolIdCell.textContent = student.student_id;
row.appendChild(schoolIdCell);

const deleteCell = document.createElement("td");
const deleteButton = document.createElement("button");
deleteButton.textContent = "Delete";
deleteButton.dataset.studentId = student.id;
deleteButton.addEventListener("click", () => {

  const existingLectures = JSON.parse(localStorage.getItem("lectures")) || [];
  const filteredLectures = existingLectures.filter(
    (lecture) => lecture.id !== deleteButton.dataset.lectureId
  );
  localStorage.setItem("lectures", JSON.stringify(filteredLectures));

  const row = deleteButton.closest("tr");
  row.remove();
});
deleteButton.dataset.studentId = student.id;
deleteCell.appendChild(deleteButton);
row.appendChild(deleteCell);

const gradesCell = document.createElement("td");
const gradesButton = document.createElement("button");
gradesButton.textContent = "Details";
gradesButton.addEventListener("click", () => {
  const studentId = gradesButton.dataset.studentId;
  window.location.href = `student_details.html?studentId=${studentId}`;
});
gradesButton.dataset.studentId = student.id;
gradesCell.appendChild(gradesButton);
row.appendChild(gradesCell);

return row;
}

function deleteStudent(studentId) {

const newData = localStorage.getItem("students");

existingStudents = newData.filter((student) => student.id != studentId);
}