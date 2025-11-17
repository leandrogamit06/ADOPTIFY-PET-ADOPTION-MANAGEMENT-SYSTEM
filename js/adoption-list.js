(function() {

  // ⭐ LOGIN CHECK
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  if (!currentUser) {
    alert("⚠️ You need to be logged in to view your adoption list.");
    localStorage.setItem("redirectAfterLogin", "adoption-list.html");
    window.location.href = "login.html";
    return;
  }

  const $ = id => document.getElementById(id);

  // Load pets from localStorage
  let pets = JSON.parse(localStorage.getItem("adoptionList") || "[]");
  const tbody = $("adoptBody");
  
  function renderTable() {
    tbody.innerHTML = "";

    if (pets.length === 0) {
      tbody.innerHTML = `<tr><td colspan="6">No pets added yet.</td></tr>`;
      return;
    }

    pets.forEach(p => {
      const row = document.createElement("tr");

      // ⭐ TURN ROW GREEN IF BOOKED
      if (p.status === "Booked") {
        row.style.backgroundColor = "#c8ffca"; // light green
      }

      row.innerHTML = `
        <td><input type="checkbox" class="pet-check" data-id="${p.id}"></td>
        <td><img src="${p.img}" alt="${p.name}"></td>
        <td>${p.name}</td>
        <td>${p.type}</td>
        <td>${p.age} years</td>
        <td class="pet-status">${p.status || "Added"}</td>
      `;

      tbody.appendChild(row);
    });
  }

  // Delete selected pets
  $("btnDelete").addEventListener("click", () => {
    const checks = document.querySelectorAll(".pet-check:checked");
    if (checks.length === 0) return alert("Please select at least one pet.");

    pets = pets.filter(p => !Array.from(checks).some(c => c.dataset.id === p.id));
    localStorage.setItem("adoptionList", JSON.stringify(pets));
    location.reload();
  });

  // OPEN BOOK MEETUP MODAL
  $("btnBookMeetup").addEventListener("click", () => {
    const selected = document.querySelector(".pet-check:checked");
    if (!selected) {
      alert("Please select a pet to book a meetup.");
      return;
    }

    const pet = pets.find(p => p.id === selected.dataset.id);
    if (!pet) return;

    $("bookPetName").textContent = pet.name;

    // ⭐ STORE PET ID IN FORM FOR LATER
    $("bookForm").setAttribute("data-id", pet.id);

    $("bookModal").classList.remove("hidden");
  });

  $("bookCancel").addEventListener("click", () => {
    $("bookModal").classList.add("hidden");
  });

  // ⭐ FINAL CONFIRM BOOKING (THIS MAKES ROW GREEN)
  $("bookForm").addEventListener("submit", e => {
    e.preventDefault();

    // Get stored pet ID
    const id = $("bookForm").getAttribute("data-id");
    let pet = pets.find(p => p.id == id);

    if (!pet) return;

    // ⭐ UPDATE STATUS
    pet.status = "Booked";

    // Save updated list
    localStorage.setItem("adoptionList", JSON.stringify(pets));

    $("bookModal").classList.add("hidden");

    alert("💚 Your meetup request has been sent!");

    // ⭐ Refresh table to show GREEN ROW
    renderTable();
  });

  // ⭐ NEW: CANCEL MEETUP FEATURE
  $("btnCancelMeetup").addEventListener("click", () => {
    const selected = document.querySelector(".pet-check:checked");

    if (!selected) {
      alert("Please select a booked pet to cancel.");
      return;
    }

    const pet = pets.find(p => p.id === selected.dataset.id);
    if (!pet) return;

    if (pet.status !== "Booked") {
      alert("This pet is not booked.");
      return;
    }

    pet.status = "Added";
    localStorage.setItem("adoptionList", JSON.stringify(pets));

    alert("❌ Meetup has been canceled.");
    renderTable();
  });

  document.addEventListener("DOMContentLoaded", renderTable);
})();
