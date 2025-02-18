document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("preferencesForm");
  const fontSizeInput = document.getElementById("fontsize");
  const fontColorInput = document.getElementById("fontcolor");

  // Load preferences from cookies
  function loadPreferences() {
    const fontSize = getCookie("fontsize");
    const fontColor = getCookie("fontcolor");

    if (fontSize) {
      document.documentElement.style.setProperty("--fontsize", fontSize + "px");
      fontSizeInput.value = fontSize;
    }

    if (fontColor) {
      document.documentElement.style.setProperty("--fontcolor", fontColor);
      fontColorInput.value = fontColor;
    }
  }

  // Save preferences to cookies
  function savePreferences(event) {
    event.preventDefault(); // Prevent form submission

    const fontSize = fontSizeInput.value;
    const fontColor = fontColorInput.value;

    setCookie("fontsize", fontSize, 365);
    setCookie("fontcolor", fontColor, 365);

    document.documentElement.style.setProperty("--fontsize", fontSize + "px");
    document.documentElement.style.setProperty("--fontcolor", fontColor);
  }

  // Helper function to set a cookie
  function setCookie(name, value, days) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    const expires = "expires=" + date.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
  }

  // Helper function to get a cookie
  function getCookie(name) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(";");
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === " ") c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  }

  // Event listener for form submission
  form.addEventListener("submit", savePreferences);

  // Load preferences on page load
  loadPreferences();
});