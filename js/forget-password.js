const $ = id => document.getElementById(id);

// STEP 1 – CHECK EMAIL
$("fp_checkEmail").addEventListener("click", () => {
    const email = $("fp_email").value.trim().toLowerCase();

    if (email === "") {
        $("fp_message").textContent = "Please enter your email.";
        return;
    }

    // Load all users
    let users = JSON.parse(localStorage.getItem("users") || "[]");

    // Find user with matching email
    let user = users.find(u => u.email.toLowerCase() === email);

    if (!user) {
        $("fp_message").textContent = "Email not found.";
        return;
    }

    // Email exists → Move to next step
    $("stepEmail").classList.add("hidden");
    $("stepReset").classList.remove("hidden");

    // Store the email temporarily
    localStorage.setItem("fp_target_email", email);
});


// STEP 2 – RESET PASSWORD
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

    let users = JSON.parse(localStorage.getItem("users") || "[]");

    // Find user
    let userIndex = users.findIndex(u => u.email.toLowerCase() === email);

    if (userIndex === -1) {
        $("fp_resetMessage").textContent = "Unexpected error. User not found.";
        return;
    }

    // Update password
    users[userIndex].password = newPass;

    // Save users back to storage
    localStorage.setItem("users", JSON.stringify(users));

    // Cleanup
    localStorage.removeItem("fp_target_email");

    alert("✅ Password reset successfully! Please login again.");
    window.location.href = "login.html";
});
