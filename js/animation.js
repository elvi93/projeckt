document.addEventListener("DOMContentLoaded", () => {
    const logos = document.getElementById('logos');
    let startPosition = window.innerWidth;
    let endPosition = -logos.offsetWidth;
    let currentPosition = startPosition;

    function animateLogos() {
        currentPosition -= 2; // Adjust speed here
        if (currentPosition <= endPosition) {
            currentPosition = startPosition;
        }
        logos.style.transform = `translateX(${currentPosition}px)`;
        requestAnimationFrame(animateLogos);
    }

    animateLogos();
});
