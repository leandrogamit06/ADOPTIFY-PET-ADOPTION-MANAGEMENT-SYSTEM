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

  // ⭐ LOAD THIS USER'S ADOPTION LIST ONLY
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

  // ⭐ DELETE SELECTED PETS
  $("btnDelete").addEventListener("click", () => {
    const checks = document.querySelectorAll(".pet-check:checked");
    if (checks.length === 0) return alert("Please select at least one pet.");

    pets = pets.filter(p => !Array.from(checks).some(c => c.dataset.id === p.id));
    localStorage.setItem(key, JSON.stringify(pets));
    renderTable();
  });

  // ⭐ OPEN BOOKING MODAL
  $("btnBookMeetup").addEventListener("click", () => {
    const selected = document.querySelector(".pet-check:checked");
    if (!selected) return alert("Please select a pet.");

    const pet = pets.find(p => p.id === selected.dataset.id);
    if (!pet) return;

    $("bookPetName").textContent = pet.name;
    $("bookForm").setAttribute("data-id", pet.id);
    $("bookModal").classList.remove("hidden");
  });

  $("bookCancel").addEventListener("click", () => {
    $("bookModal").classList.add("hidden");
  });

  // ⭐ BOOK MEETUP (make row green)
  $("bookForm").addEventListener("submit", e => {
    e.preventDefault();

    const id = $("bookForm").getAttribute("data-id");
    let pet = pets.find(p => p.id == id);
    if (!pet) return;

    pet.status = "Booked";
    localStorage.setItem(key, JSON.stringify(pets));

    $("bookModal").classList.add("hidden");
    alert("💚 Your meetup request has been sent!");

    renderTable();
  });

  // ⭐ CANCEL BOOKING
  $("btnCancelMeetup").addEventListener("click", () => {
    const selected = document.querySelector(".pet-check:checked");
    if (!selected) return alert("Select a booked pet.");

    const pet = pets.find(p => p.id === selected.dataset.id);
    if (!pet) return;

    if (pet.status !== "Booked") {
      return alert("This pet is not booked.");
    }

    pet.status = "Added";
    localStorage.setItem(key, JSON.stringify(pets));

    alert("❌ Meetup canceled.");
    renderTable();
  });

  document.addEventListener("DOMContentLoaded", renderTable);
})();
