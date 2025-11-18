const $ = id => document.getElementById(id);

/* ======================================================
   STEP 1 – CHECK IF EMAIL EXISTS
   ====================================================== */
$("fp_checkEmail").addEventListener("click", () => {
    let email = $("fp_email").value.trim().toLowerCase();

    if (email === "") {
        $("fp_message").textContent = "Please enter your email.";
        return;
    }

    // Normalize key EXACTLY how register saves it:
    const key = "user_" + email.replace(/\s+/g, "");

    const userData = localStorage.getItem(key);

    if (!userData) {
        $("fp_message").textContent = "Email not found.";
        return;
    }

    // Email exists → move to reset password step
    $("stepEmail").classList.add("hidden");
    $("stepReset").classList.remove("hidden");

    // Store email for step 2
    localStorage.setItem("fp_target_email", email);
    $("fp_message").textContent = ""; // clear error
});


/* ======================================================
   STEP 2 – RESET PASSWORD
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

    // Retrieve the email stored during step 1
    const email = localStorage.getItem("fp_target_email");

    if (!email) {
        $("fp_resetMessage").textContent = "System error. Please restart.";
        return;
    }

    const key = "user_" + email.replace(/\s+/g, "");

    // Load stored user
    let user = JSON.parse(localStorage.getItem(key));
    if (!user) {
        $("fp_resetMessage").textContent = "User not found.";
        return;
    }

    // Update the password
    user.password = newPass;

    // Save updated info back to storage
    localStorage.setItem(key, JSON.stringify(user));

    // Remove temp memory
    localStorage.removeItem("fp_target_email");

    alert("✅ Password reset successfully! Please login again.");
    window.location.href = "login.html";
});
