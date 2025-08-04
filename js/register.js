    const api = "https://yuu-api-regist.vercel.app/api/register";

    const registerForm = document.getElementById("register-form");
    const usernameInput = document.getElementById("username");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const submitButton = document.querySelector(".submit-button");
    const containerSearch = document.querySelector(".cari");


    initMobileNavigation();

        // ===================  SEARCH  ====================
    containerSearch.addEventListener('submit', function (event) {
        event.preventDefault();
        lakukanPencarian();
    });
    function lakukanPencarian() {
        const kataKunci = document.getElementById('searchInput').value.trim();
        window.location.href = `search.html?q=${encodeURIComponent(kataKunci)}`;
        console.log('Kata kunci pencarian:', kataKunci);
    }
    //=====================================================================



    if (localStorage.getItem("isLogin") === "true") {
      popUpNotification("Kamu sudah login", "error");
      registerForm
        .querySelectorAll("input, button")
        .forEach((el) => (el.disabled = true));
      const logOutLink = document.createElement("a");
      logOutLink.classList.add("keluar");
      logOutLink.textContent = "Keluar";
      logOutLink.style.display = "block";
      logOutLink.style.marginTop = "10px";
      logOutLink.style.padding = "5px 13px";
      logOutLink.style.backgroundColor = "#ff4757";
      document.querySelector(".form-link").appendChild(logOutLink);
      document.querySelector(".keluar").addEventListener("click", () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        localStorage.setItem("isLogin", false);
        popUpNotification("Kamu telah keluar", "success");
        setTimeout(() => {
          window.location.href = "../";
        }, 1000);
      });
    } else {
      registerForm.addEventListener("submit", async function (event) {
        event.preventDefault();
        submitButton.disabled = true;
        submitButton.textContent = "Mendaftar...";
        const userData = {
          username: usernameInput.value,
          email: emailInput.value,
          password: passwordInput.value,
        };

        try {
          const response = await fetch(api, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
          });

          const data = await response.json();
          if (!response.ok) {
            throw new Error(data.message || "Terjadi kesalahan pada API");
          }
          popUpNotification(
            "Akun berhasil dibuat! Mengarahkan ke halaman login...",
            "success"
          );
          setTimeout(() => {
            window.location.href = "login.html";
          }, 2000);
        } catch (error) {
          console.error("Error:", error);
          popUpNotification(error.message, "error");
          submitButton.disabled = false;
          submitButton.textContent = "Register";
        }
      });
    }

    function popUpNotification(message, type) {
      const notification = document.createElement("div");
      notification.className = `popup-notification ${type}`;
      notification.textContent = message;
      document.body.appendChild(notification);

      setTimeout(() => {
        notification.remove();
      }, 3000);
    }

    // RESPONSIFE MOBILE
    function initMobileNavigation() {
      const mobileMenuToggle = document.getElementById("mobileMenuToggle");
      const mobileNavOverlay = document.getElementById("mobileNavOverlay");
      const mobileNavClose = document.getElementById("mobileNavClose");

      if (!mobileMenuToggle || !mobileNavOverlay || !mobileNavClose) {
        return;
      }

      mobileMenuToggle.addEventListener("click", () => {
        mobileMenuToggle.classList.toggle("active");
        mobileNavOverlay.classList.toggle("active");
        document.body.style.overflow = mobileNavOverlay.classList.contains(
          "active"
        )
          ? "hidden"
          : "auto";
      });

      mobileNavClose.addEventListener("click", () => {
        mobileMenuToggle.classList.remove("active");
        mobileNavOverlay.classList.remove("active");
        document.body.style.overflow = "auto";
      });

      mobileNavOverlay.addEventListener("click", (e) => {
        if (e.target === mobileNavOverlay) {
          mobileMenuToggle.classList.remove("active");
          mobileNavOverlay.classList.remove("active");
          document.body.style.overflow = "auto";
        }
      });

      const navLinks = mobileNavOverlay.querySelectorAll(".nav a");
      navLinks.forEach((link) => {
        link.addEventListener("click", () => {
          mobileMenuToggle.classList.remove("active");
          mobileNavOverlay.classList.remove("active");
          document.body.style.overflow = "auto";
        });
      });

      window.addEventListener("resize", () => {
        if (window.innerWidth > 768) {
          mobileMenuToggle.classList.remove("active");
          mobileNavOverlay.classList.remove("active");
          document.body.style.overflow = "auto";
        }
      });
    }