const $ = id => document.getElementById(id);

// STEP 1 – CHECK EMAIL
$("fp_checkEmail").addEventListener("click", () => {
    const email = $("fp_email").value.trim().toLowerCase();

    if (email === "") {
        $("fp_message").textContent = "Please enter your email.";
        return;
    }

    // Look for: user_email
    const userData = localStorage.getItem("user_" + email);

    if (!userData) {
        $("fp_message").textContent = "Email not found.";
        return;
    }

    // Email exists → Move to next step
    $("stepEmail").classList.add("hidden");
    $("stepReset").classList.remove("hidden");

    // store email temporarily
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

    // Load user
    let user = JSON.parse(localStorage.getItem("user_" + email));

    // Update password
    user.password = newPass;

    // Save back
    localStorage.setItem("user_" + email, JSON.stringify(user));

    // Cleanup email memory
    localStorage.removeItem("fp_target_email");

    // Success message
    alert("✅ Password reset successfully! Please login again.");
    window.location.href = "login.html";
});
