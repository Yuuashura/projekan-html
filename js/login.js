const apiLogin = "https://yuu-api-regist.vercel.app/api/login";
const loginForm = document.querySelector("#loginForm");
const btn = document.querySelector("#submitBtn");
initMobileNavigation();
const containerSearch = document.querySelector(".cari");

// ===================  SEARCH  ====================
containerSearch.addEventListener("submit", function (event) {
    event.preventDefault();
    lakukanPencarian();
});
function lakukanPencarian() {
    const kataKunci = document.getElementById("searchInput").value.trim();
    window.location.href = `search.html?q=${encodeURIComponent(kataKunci)}`;
    console.log("Kata kunci pencarian:", kataKunci);
}
//=====================================================================

if (localStorage.getItem("isLogin") === "true") {
    notifikasi("Kamu sudah login", "error");
    loginForm
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
        notifikasi("Kamu telah keluar", "success");
        setTimeout(() => {
            window.location.href = "../";
        }, 1000);
    });
} else {
    loginForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        // ambil data dari fotm
        let username = document.getElementById("identifier").value;
        let password = document.getElementById("password").value;

        const data = {
            identifier: username,
            password: password,
        };
        btn.disabled = true;
        btn.textContent = "Sedang Masuk...";
        try {
            const response = await fetch(apiLogin, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });
            const result = await response.json();
            console.log("Response:", result);
            if (response.ok && result.success) {
                notifikasi(result.message, "success");
                localStorage.setItem("token", result.data.token);
                localStorage.setItem("user", JSON.stringify(result.data.user));
                localStorage.setItem("isLogin", true);
                setTimeout(() => {
                    const userParam = encodeURIComponent(
                        JSON.stringify(result.data.user)
                    );
                    window.location.href = `../`;
                }, 1000);
            } else {
                notifikasi(result.message || "Login gagal", "error");
                btn.disabled = false;
                btn.textContent = "Login";
            }
        } catch (error) {
            console.error("Error:", error);
            notifikasi(
                "Terjadi kesalahan saat menghubungi server",
                "error"
            );
        }
    });
}

function notifikasi(message, type) {
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