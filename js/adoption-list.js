(function () {
  const $ = id => document.getElementById(id);
  const q = sel => document.querySelector(sel);

  const DEMO = [
    { id:'d1', name:'Buddy', type:'Dog', breed:'Golden Retriever', age:2, gender:'Male', bio:'Playful golden retriever who loves walks.', img:'images/buddy.webp' },
    { id:'d2', name:'Bella', type:'Dog', breed:'Beagle', age:1, gender:'Female', bio:'Energetic beagle who loves fetch.', img:'images/beagle bella.webp' },
    { id:'d3', name:'Charlie', type:'Dog', breed:'Husky', age:3, gender:'Male', bio:'Loyal husky with striking blue eyes.', img:'images/charlie.png' },
    { id:'d4', name:'Luna', type:'Dog', breed:'Labrador', age:4, gender:'Female', bio:'Friendly labrador who loves swimming.', img:'images/labrador luna.png' },
    { id:'d5', name:'Rocky', type:'Dog', breed:'German Shepherd', age:5, gender:'Male', bio:'Calm German Shepherd, great with kids.', img:'images/rocky.png' },

    { id:'c1', name:'Milo', type:'Cat', breed:'American Shorthair', age:2, gender:'Male', bio:'Curious tabby cat that loves to nap.', img:'images/milo.webp' },
    { id:'c2', name:'Lily', type:'Cat', breed:'Persian', age:1, gender:'Female', bio:'Sweet Persian kitten with soft fur.', img:'images/lily.png' },
    { id:'c3', name:'Shadow', type:'Cat', breed:'Siamese', age:3, gender:'Male', bio:'Independent Siamese cat who loves exploring.', img:'images/shadow.webp' },
    { id:'c4', name:'Nala', type:'Cat', breed:'British Shorthair', age:4, gender:'Female', bio:'Gentle British Shorthair with calm nature.', img:'images/nala.png' },
    { id:'c5', name:'Jian', name:'Jian', type:'Cat', breed:'Puspin', age:3, gender:'Male', bio:'Loves to sleep and cuddle with blankets.', img:'images/jian meow.jpg' },

    { id:'f1', name:'Bubbles', type:'Fish', breed:'Betta', age:1, gender:'Male', bio:'Colorful betta fish, calm and peaceful.', img:'images/bubbles.png' },
    { id:'f2', name:'Coral', type:'Fish', breed:'Guppy', age:1, gender:'Female', bio:'Peaceful guppy that loves small tanks.', img:'images/coral.png' },
    { id:'f3', name:'Finny', type:'Fish', breed:'Goldfish', age:2, gender:'Male', bio:'Goldfish that loves swimming around.', img:'images/finny.png' },
    { id:'f4', name:'Pearl', type:'Fish', breed:'Angel Fish', age:1, gender:'Female', bio:'Angelfish with shiny silver scales.', img:'images/pearl.png' },
    { id:'f5', name:'Blue', type:'Fish', breed:'Tetra', age:1, gender:'Male', bio:'Playful neon tetra with bright fins.', img:'images/blue.png' },

    { id:'h1', name:'Nugget', type:'Hamster', breed:'Winter White Dwarf', age:1, gender:'Male', bio:'Tiny explorer that loves to run on his wheel.', img:'images/nugget.png' },
    { id:'h2', name:'Daisy', type:'Hamster', breed:'Syrian', age:1, gender:'Female', bio:'Loves to nibble on sunflower seeds.', img:'images/daisy.png' },
    { id:'h3', name:'Peanut', type:'Hamster', breed:'Nibble', age:2, gender:'Male', bio:'Curious and loves tunnels.', img:'images/peanut.png' },
    { id:'h4', name:'Coco', type:'Hamster', breed:'Roborovski', age:1, gender:'Female', bio:'Soft and cuddly, enjoys gentle pets.', img:'images/coco.png' },
    { id:'h5', name:'Mochi', type:'Hamster', breed:'Chinese', age:2, gender:'Male', bio:'Sleepy little furball who loves burrowing.', img:'images/mochi.png' },

    { id:'b1', name:'Kiwi', type:'Bird', breed:'Parrot', age:2, gender:'Female', bio:'Cheerful parrot who mimics words.', img:'images/kiwi.avif' },
    { id:'b2', name:'Sky', type:'Bird', breed:'Lovebird', age:1, gender:'Male', bio:'Blue lovebird that sings in the morning.', img:'images/sky.jpg' },
    { id:'b3', name:'Sunny', type:'Bird', breed:'Canary', age:3, gender:'Female', bio:'Yellow canary that loves attention.', img:'images/sunny.webp' },
    { id:'b4', name:'Echo', type:'Bird', breed:'Cockatiel', age:4, gender:'Male', bio:'Smart cockatiel that whistles tunes.', img:'images/echo.png' },
    { id:'b5', name:'Chirpy', type:'Bird', breed:'Finch', age:2, gender:'Female', bio:'Happy finch that enjoys being around people.', img:'images/chirpy.png' }
  ];

  /* BREED SYSTEM — unchanged */
  const typeSelect = $('filterType');
  const breedSelect = $('filterBreed');

  const breeds = {
    Dog: ["Golden Retriever", "Beagle", "Husky", "Labrador", "German Shepherd"],
    Cat: ["American Shorthair", "Persian", "Siamese", "British Shorthair", "Puspin"],
    Fish: ["Betta", "Guppy", "Goldfish", "Angel Fish", "Tetra"],
    Bird: ["Parrot", "Lovebird", "Canary", "Cockatiel", "Finch"],
    Hamster: ["Winter White Dwarf", "Syrian", "Nibble", "Roborovski", "Chinese"]
  };

  if (typeSelect && breedSelect) {
    typeSelect.addEventListener("change", () => {
      const t = typeSelect.value;
      breedSelect.innerHTML = `<option value="">All</option>`;
      if (breeds[t]) {
        breeds[t].forEach(b => {
          const opt = document.createElement("option");
          opt.value = b;
          opt.textContent = b;
          breedSelect.appendChild(opt);
        });
      }
    });
  }

  /* LOAD USER PETS — unchanged */
  function getAllUserPets() {
    let all = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key.endsWith("_pets")) {
        const list = JSON.parse(localStorage.getItem(key)) || [];
        all = all.concat(list);
      }
    }
    return all.map(p => ({
      ...p,
      img: p.img || "",
      gender: p.gender || "Unknown"
    }));
  }

  function getPets() {
    return [...DEMO, ...getAllUserPets()];
  }

  const petsGrid = $('petsGrid');

  function createPetCard(p){
    const el = document.createElement('article');
    el.className = 'pet-card';
    el.innerHTML = `
      <section class="pet-media" style="background-image:url('${p.img}')"></section>
      <section class="pet-body">
        <h4>${p.name}</h4>
        <p class="pet-meta">${p.type} · ${p.age}y · ${p.gender}</p>
        <p class="pet-bio">${p.bio}</p>
        <a href="#" class="view-btn" data-id="${p.id}">View Details</a>
      </section>`;
    return el;
  }

  function renderPets(){
    petsGrid.innerHTML = '';
    getPets().forEach(p => petsGrid.appendChild(createPetCard(p)));
  }

  /* FILTER SYSTEM — unchanged */
  function applyFilters() {
    let list = getPets();

    const qtype = $('filterType').value;
    const qbreed = $('filterBreed').value;
    const qage = parseFloat($('filterAge').value);
    const qtxt = $('globalSearch').value.trim().toLowerCase();
    const gender = document.querySelector('input[name="gender"]:checked')?.value || '';

    const med = $('sn_med')?.checked;
    const behavior = $('sn_behavior')?.checked;
    const senior = $('sn_senior')?.checked;

    if (qtype) list = list.filter(p => p.type === qtype);
    if (qbreed) list = list.filter(p => p.breed === qbreed);
    if (!isNaN(qage)) list = list.filter(p => p.age <= qage);
    if (gender) list = list.filter(p => p.gender === gender);
    if (qtxt)
      list = list.filter(p =>
        p.name.toLowerCase().includes(qtxt) ||
        p.bio.toLowerCase().includes(qtxt) ||
        p.type.toLowerCase().includes(qtxt)
      );

    if (med) list = list.filter(p => p.bio.toLowerCase().includes('medical'));
    if (behavior) list = list.filter(p => p.bio.toLowerCase().includes('behavior'));
    if (senior) list = list.filter(p => p.age >= 5);

    petsGrid.innerHTML = '';
    list.forEach(p => petsGrid.appendChild(createPetCard(p)));
  }

  $('btnApply').addEventListener('click', e => {
    e.preventDefault();
    applyFilters();
  });

  $('btnReset').addEventListener('click', e => {
    e.preventDefault();
    $('filterType').value = '';
    $('filterBreed').innerHTML = `<option value="">All</option>`;
    $('filterAge').value = '';
    document.querySelectorAll('input[name="gender"]').forEach(r => r.checked = false);
    $('sn_med').checked = false;
    $('sn_behavior').checked = false;
    $('sn_senior').checked = false;
    $('globalSearch').value = '';
    renderPets();
  });

  /* VIEW DETAILS & MODALS — unchanged */
  document.addEventListener("click", (e) => {
    const btn = e.target.closest(".view-btn");
    if (!btn) return;
    e.preventDefault();

    const id = btn.dataset.id;
    const pet = getPets().find(p => p.id == id);
    if (!pet) return;

    $("infoImage").src = pet.img;
    $("infoName").textContent = pet.name;
    $("infoType").textContent = pet.type;
    $("infoGender").textContent = pet.gender;
    $("infoAge").textContent = pet.age;
    $("infoBio").textContent = pet.bio;
    $("openAddPetFromInfo").dataset.id = pet.id;

    $("petInfoModal").classList.remove("hidden");
  });

  function closeModal(id) {
    const modal = $(id);
    modal.classList.add("fade-out");
    setTimeout(() => {
      modal.classList.add("hidden");
      modal.classList.remove("fade-out");
    }, 250);
  }

  $("closePetInfo").addEventListener("click", () => closeModal("petInfoModal"));
  $("petCancel").addEventListener("click", () => closeModal("petModal"));

  /* ⭐⭐⭐ USER-SPECIFIC ADOPTION LIST ADDED HERE ⭐⭐⭐ */

  $("openAddPetFromInfo").addEventListener("click", () => {
    const id = $("openAddPetFromInfo").dataset.id;
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    if (!currentUser) {
      alert("⚠️ You must be logged in to adopt a pet.");
      localStorage.setItem("selectedPetId", id);
      localStorage.setItem("redirectAfterLogin", "adopt-now.html");
      window.location.href = "login.html";
      return;
    }

    const pet = getPets().find(p => p.id == id);
    if (!pet) return;

    // ⭐ Save per-user: "email_adoption"
    const key = `${currentUser.email}_adoption`;

    let list = JSON.parse(localStorage.getItem(key) || "[]");

    if (!list.some(p => p.id == id)) {
      list.push(pet);
      localStorage.setItem(key, JSON.stringify(list));
      showMessage("✅ You have added this pet to your adoption list!");
    } else {
      showMessage("⚠️ This pet is already in your adoption list!");
    }
  });

  function showMessage(text) {
    let msg = document.createElement("div");
    msg.textContent = text;
    msg.style.position = "fixed";
    msg.style.bottom = "25px";
    msg.style.left = "50%";
    msg.style.transform = "translateX(-50%)";
    msg.style.background = "#2e8b57";
    msg.style.color = "white";
    msg.style.padding = "12px 20px";
    msg.style.borderRadius = "25px";
    msg.style.fontWeight = "600";
    msg.style.zIndex = "999";
    msg.style.boxShadow = "0 4px 10px rgba(0,0,0,0.3)";
    document.body.appendChild(msg);

    setTimeout(() => {
      msg.style.transition = "opacity 0.6s ease";
      msg.style.opacity = "0";
      setTimeout(() => msg.remove(), 600);
    }, 2000);
  }

  document.addEventListener("DOMContentLoaded", () => {
    renderPets();
  });

  document.addEventListener("click", function(e) {
    const addBtn = e.target.closest("#navAddPet");
    if (!addBtn) return;

    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    if (!currentUser) {
      e.preventDefault();
      alert("⚠️ You must be logged in to add a pet.");
      localStorage.setItem("redirectAfterLogin", "adopt-now.html");
      window.location.href = "login.html";
    }
  });

})();
