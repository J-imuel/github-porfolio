const handleFirstTab = (e) => {
  if(e.key === 'Tab') {
    document.body.classList.add('user-is-tabbing')

    window.removeEventListener('keydown', handleFirstTab)
    window.addEventListener('mousedown', handleMouseDownOnce)
  }

}

const handleMouseDownOnce = () => {
  document.body.classList.remove('user-is-tabbing')

  window.removeEventListener('mousedown', handleMouseDownOnce)
  window.addEventListener('keydown', handleFirstTab)
}

window.addEventListener('keydown', handleFirstTab)

const backToTopButton = document.querySelector(".back-to-top");
let isBackToTopRendered = false;

let alterStyles = (isBackToTopRendered) => {
  backToTopButton.style.visibility = isBackToTopRendered ? "visible" : "hidden";
  backToTopButton.style.opacity = isBackToTopRendered ? 1 : 0;
  backToTopButton.style.transform = isBackToTopRendered
    ? "scale(1)"
    : "scale(0)";
};

window.addEventListener("scroll", () => {
  if (window.scrollY > 700) {
    isBackToTopRendered = true;
    alterStyles(isBackToTopRendered);
  } else {
    isBackToTopRendered = false;
    alterStyles(isBackToTopRendered);
  }
});

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getFirestore, collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";


const firebaseConfig = {
  apiKey: "AIzaSyDIK22_Ml5p7rCR1hD9BhTn8F_HJw1qH9w",
  authDomain: "portfolio-4f3c3.firebaseapp.com",
  projectId: "portfolio-4f3c3",
  storageBucket: "portfolio-4f3c3.appspot.com",  
  messagingSenderId: "525441415886",
  appId: "1:525441415886:web:277ccd796c4ebb09406e9f"
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


console.log("Firebase initialized:", app);
console.log("Firestore initialized:", db);

document.addEventListener("DOMContentLoaded", function () {
  console.log("Checking Firebase availability...");


  const form = document.querySelector("#contact-form");


  if (!form) {
      console.error("❌ Form not found!");
      return;
  }

  // ✅ Contact form submission event
  form.addEventListener("submit", async (e) => {
      e.preventDefault();

    
      const name = document.querySelector("#name").value;
      const email = document.querySelector("#email").value;
      const message = document.querySelector("#message").value;

     
      if (!name || !email || !message) {
          alert("Please fill out all fields.");
          return;
      }

      try {
        
          const docRef = await addDoc(collection(db, "contacts"), {
              name: name,
              email: email,
              message: message,
              timestamp: serverTimestamp()
          });

          console.log("✅ Document added with ID:", docRef.id);
          alert(`Thank you for your message, ${name}! We will get back to you soon.`);
          form.reset();
      } catch (error) {
          console.error("❌ Error adding document:", error);
          alert("Error submitting form. Please try again.");
      }
  });
});
