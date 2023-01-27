const container = document.querySelector(".container"),
      pwShowHide = document.querySelector(".showHidePw"),
      pwField = document.querySelector(".password");

pwShowHide.addEventListener("click", ()=> {
    if (pwField.type === "password") {
        pwField.type = "text";
        pwShowHide.classList.replace("uil-eye-slash", "uil-eye");        
    } else {
        pwField.type = "password";
        pwShowHide.classList.replace("uil-eye", "uil-eye-slash");                
    }
});