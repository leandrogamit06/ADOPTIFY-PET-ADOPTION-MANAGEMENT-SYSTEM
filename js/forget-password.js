const $ = id => document.getElementById(id);

/* ======================================================
   STEP 1: CHECK IF EMAIL EXISTS IN "users" ARRAY
   ====================================================== */
$("fp_checkEmail").addEventListener("click", () => {
    const email = $("fp_email").value.trim().toLowerCase();

    if (email === "") {
        $("fp_message").textContent = "Please enter your email.";
        return;
    }

    // Load users array
    let users = JSON.parse(localStorage.getItem("users") || "[]");

    // Find user by email
    const user = users.find(u => u.email.toLowerCase() === email);

    if (!user) {
        $("fp_message").textContent = "Email not found.";
        return;
    }

    // Store target email
    localStorage.setItem("fp_target_email", email);

    // Move to next step
    $("stepEmail").classList.add("hidden");
    $("stepReset").classList.remove("hidden");
});


/* ======================================================
   STEP 2: RESET PASSWORD IN "users" ARRAY
   ====================================================== */
$("fp_resetBtn").addEventListener("click", () => {
    const newPass = $("fp_newPass").value;
    const confirmPass = $("fp_confirmPass").value;

    if (newPass === "" || confirmPass === "") {
        $("fp_resetMessage").textContent = "Password fields cannot be empty.";
        return;
    }

    if (newPass !== confirmPass) {
        $("fp_resetMessage").textContent = "Passwords do not match.";
        return;
    }

    const email = localStorage.getItem("fp_target_email");
    if (!email) {
        $("fp_resetMessage").textContent = "System error. Try again.";
        return;
    }

    // Load users
    let users = JSON.parse(localStorage.getItem("users") || "[]");

    // Find and update
    const idx = users.findIndex(u => u.email.toLowerCase() === email);
    if (idx === -1) {
        $("fp_resetMessage").textContent = "User not found.";
        return;
    }

    users[idx].password = newPass;

    // Save back
    localStorage.setItem("users", JSON.stringify(users));

    // Clear temp
    localStorage.removeItem("fp_target_email");

    alert("✅ Password reset successfully! Please log in.");
    window.location.href = "login.html";
});
