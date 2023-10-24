document.addEventListener("DOMContentLoaded", function () {
    const links = document.querySelectorAll("a[href^='#']");

    links.forEach(link => {
        link.addEventListener("click", function (e) {
            e.preventDefault(); // Menghentikan perilaku bawaan tautan

            const targetId = this.getAttribute("href").substring(1); // Mengambil ID elemen target
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                targetElement.scrollIntoView({ behavior: "smooth" }); // Gulir ke elemen target dengan efek smooth scroll
            }
        });
    });
});


document.addEventListener("DOMContentLoaded", function () {
    const navLinks = document.querySelectorAll(".nav-link");
    const sections = document.querySelectorAll("section");

    window.addEventListener("scroll", function () {
        let fromTop = window.scrollY;

        sections.forEach(section => {
            if (
                section.offsetTop <= fromTop &&
                section.offsetTop + section.offsetHeight > fromTop
            ) {
                navLinks.forEach(link => {
                    link.classList.remove("active");
                });

                const correspondingLink = document.querySelector(`.nav-link[href="#${section.id}"]`);
                console.log(correspondingLink)
                if (correspondingLink) {
                    correspondingLink.classList.add("active");
                }
            }
        });
    });
});
