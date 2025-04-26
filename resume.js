document.addEventListener("DOMContentLoaded", function () {
    const resumeButton = document.getElementById("resumeButton");

    resumeButton.addEventListener("click", function () {
        console.log("Resume button clicked!");
        // Show loading indicator (optional)
        // document.getElementById('loading').style.display = 'block';

        const element = document.body; // Or a specific element containing the resume

        html2pdf(element)
            .then(function (pdf) {
                // Hide loading indicator (optional)
                // document.getElementById('loading').style.display = 'none';

                pdf.save("resume.pdf");
            })
            .catch(function (error) {
                // Hide loading indicator (optional)
                // document.getElementById('loading').style.display = 'none';

                console.error("Error generating PDF:", error);
                alert(
                    "Error generating PDF. Please check the console for details."
                );
            });
    });

    const navbar = document.querySelector(".navbar");
    const offset = navbar.offsetHeight; // You can adjust this value as needed
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener("click", function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute("href"));
            const top = target.offsetTop - offset;
            window.scrollTo({
                top: top,
                behavior: "smooth",
            });
        });
    });

    function adjustWrapperMargin() {
        var navbarHeight = document.querySelector(".navbar").offsetHeight;
        document.querySelector(".wrapper").style.marginTop =
            navbarHeight + 5 + "px";
    }

    window.onload = adjustWrapperMargin;
    window.onresize = adjustWrapperMargin;
});
