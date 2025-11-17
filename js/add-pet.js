// =============================
//   ADD PET (FINAL FIXED VERSION)
// =============================

// Get logged-in user
const currentUser = JSON.parse(localStorage.getItem("currentUser"));

if (!currentUser) {
  alert("You must login first.");
  location.href = "login.html";
}

// Set hidden email
if (currentUser.email) {
  document.getElementById("ownerEmail").value = currentUser.email;
}

// Load pets storage
let pets = JSON.parse(localStorage.getItem("pets") || "[]");

// Elements
const dropzone = document.getElementById("dropzone");
const fileInput = document.getElementById("petImageFile");
const preview = document.getElementById("preview");
const imageInputHidden = document.getElementById("petImage");

// Dropzone Click → Open File
dropzone.addEventListener("click", () => fileInput.click());

// Drag Over
dropzone.addEventListener("dragover", e => {
  e.preventDefault();
  dropzone.style.backgroundColor = "#cde8ce";
});

// Drag Leave
dropzone.addEventListener("dragleave", () => {
  dropzone.style.backgroundColor = "#eef6ee";
});

// Drop File
dropzone.addEventListener("drop", e => {
  e.preventDefault();
  dropzone.style.backgroundColor = "#eef6ee";
  handleImage(e.dataTransfer.files[0]);
});

// File Selected
fileInput.addEventListener("change", function () {
  handleImage(this.files[0]);
});

// Convert to Base64 & Preview
function handleImage(file) {
  const reader = new FileReader();

  reader.onload = function (e) {
    preview.src = e.target.result;
    preview.style.display = "block";
    imageInputHidden.value = e.target.result; // ⭐ Save Base64 string
  };

  reader.readAsDataURL(file);
}

// =============================
//        SAVE NEW PET
// =============================
document.getElementById("addPetForm").addEventListener("submit", function (e) {
  e.preventDefault();

  if (!imageInputHidden.value) {
    alert("Please upload an image of the pet.");
    return;
  }

  // ⭐ Final corrected pet object
  const newPet = {
    id: Date.now(),
    name: document.getElementById("petName").value,
    type: document.getElementById("petType").value,
    age: document.getElementById("petAge").value,
    breed: document.getElementById("petBreed").value,
    bio: document.getElementById("petBio").value,
    img: imageInputHidden.value, // ⭐ correct image key
    gender: "Not specified",
    status: "Available",

    // ⭐ REQUIRED to separate pets per user
    owner: currentUser.username,
    ownerEmail: currentUser.email
  };

  // ⭐ SAVE PER USER (VERY IMPORTANT FIX)
  let userPets = JSON.parse(localStorage.getItem(currentUser.email + "_pets")) || [];
  userPets.push(newPet);
  localStorage.setItem(currentUser.email + "_pets", JSON.stringify(userPets));

  alert("Pet added successfully!");
  location.href = "adopt-now.html";
});
