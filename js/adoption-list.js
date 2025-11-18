(function() {

  // LOGIN CHECK
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  if (!currentUser) {
    alert("⚠️ You need to be logged in to view your adoption list.");
    localStorage.setItem("redirectAfterLogin", "adoption-list.html");
    window.location.href = "login.html";
    return;
  }

  const $ = id => document.getElementById(id);

  // ⭐ READ USER-SPECIFIC ADOPTION LIST
  const key = `${currentUser.email}_adoption`;
  let pets = JSON.parse(localStorage.getItem(key) || "[]");

  const tbody = $("adoptBody");

  function renderTable() {
    tbody.innerHTML = "";

    if (pets.length === 0) {
      tbody.innerHTML = `<tr><td colspan="6">No pets added yet.</td></tr>`;
      return;
    }

    pets.forEach(p => {
      const row = document.createElement("tr");

      if (p.status === "Booked") {
        row.style.backgroundColor = "#c8ffca";
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

  // DELETE PETS
  $("btnDelete").addEventListener("click", () => {
    const checks = document.querySelectorAll(".pet-check:checked");
    if (checks.length === 0) {
      alert("Please select at least one pet.");
      return;
    }

    pets = pets.filter(p => !Array.from(checks).some(c => c.dataset.id === p.id));
    localStorage.setItem(key, JSON.stringify(pets));
    renderTable();
  });

  // BOOK MEETUP
  $("btnBookMeetup").addEventListener("click", () => {
    const selected = document.querySelector(".pet-check:checked");
    if (!selected) {
      alert("Please select a pet to book.");
      return;
    }

    const pet = pets.find(p => p.id === selected.dataset.id);
    if (!pet) return;

    $("bookPetName").textContent = pet.name;
    $("bookForm").dataset.id = pet.id;
    $("bookModal").classList.remove("hidden");
  });

  $("bookCancel").addEventListener("click", () => {
    $("bookModal").classList.add("hidden");
  });

  // CONFIRM BOOKING
  $("bookForm").addEventListener("submit", e => {
    e.preventDefault();

    const id = $("bookForm").dataset.id;
    let pet = pets.find(p => p.id == id);
    if (!pet) return;

    pet.status = "Booked";
    localStorage.setItem(key, JSON.stringify(pets));

    alert("💚 Meetup booked successfully!");
    $("bookModal").classList.add("hidden");
    renderTable();
  });

  // CANCEL BOOKING
  $("btnCancelMeetup").addEventListener("click", () => {
    const selected = document.querySelector(".pet-check:checked");
    if (!selected) {
      alert("Select a booked pet to cancel.");
      return;
    }

    const pet = pets.find(p => p.id === selected.dataset.id);
    if (!pet || pet.status !== "Booked") {
      alert("This pet is not booked.");
      return;
    }

    pet.status = "Added";
    localStorage.setItem(key, JSON.stringify(pets));

    alert("❌ Meetup canceled.");
    renderTable();
  });

  document.addEventListener("DOMContentLoaded", renderTable);
})();
