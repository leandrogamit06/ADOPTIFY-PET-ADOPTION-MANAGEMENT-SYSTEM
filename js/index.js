document.addEventListener("DOMContentLoaded", () => {
  const user = JSON.parse(localStorage.getItem("currentUser"));
  const signUpBtn = document.getElementById("signUpBtn");
  const userProfile = document.getElementById("userProfile");
  const navUsername = document.getElementById("navUsername");
  const navProfilePic = document.getElementById("navProfilePic");

  if (user) {
    // Hide sign up
    if (signUpBtn) signUpBtn.style.display = "none";

    // Show profile icon + username
    if (userProfile) userProfile.style.display = "flex";

    // Display username
    if (navUsername) navUsername.textContent = user.username;

    // Display profile pic
    if (navProfilePic && user.profilePic) {
      navProfilePic.src = user.profilePic;
    }
  } else {
    // If not logged in
    if (signUpBtn) signUpBtn.style.display = "inline-block";
    if (userProfile) userProfile.style.display = "none";
  }
});
// Show waiting screen
loginScreen.style.display = 'none';
waitingScreen.style.display = 'flex';

// Save logged-in user info
const currentUser = {
  username: user.username,
  profilePic: user.profilePic || "images/default-profile.png"
};
localStorage.setItem('currentUser', JSON.stringify(currentUser));

// Simulate loading before redirect
setTimeout(() => {
  alert("✅ Login successful! Welcome back, " + username + "!");
  window.location.href = "index.html";
}, 2000);
// Show waiting screen
loginScreen.style.display = 'none';
waitingScreen.style.display = 'flex';

// Simulate loading before redirect
setTimeout(() => {
  alert("✅ Login successful! Welcome back, " + username + "!");
  window.location.href = "index.html";
}, 2500);
