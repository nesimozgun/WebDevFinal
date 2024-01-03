async function handleLogin() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
  
    // fetch data from lecturer.json which includes lecturer login information
    const data = await (await fetch("database/lecturer.json")).json();
  
    // check step by step if any data matches the input
    for (const lecturer of data) {
      if (lecturer.username === username.trim() && lecturer.password === password.trim()) {
        window.location.href = "pages/lectures.html"; // redirect to lectures.html page if logged in successfully
      }
      else {
        console.log("Oops! Wrong username or password. Try again!");
      }
    }
  }