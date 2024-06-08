// ********** FAQs **********

let isAnimating = false;

document.querySelectorAll('.faq-item').forEach(item => {
    item.addEventListener('click', () => {
        if (isAnimating) return;

        const target = item.getAttribute('data-target');
        const newAnswer = document.querySelector(target);

        // If the clicked item is already active, do nothing
        if (newAnswer.classList.contains('active')) return;

        // Hide all answers first
        const activeAnswers = document.querySelectorAll('.faq-answer.active');
        activeAnswers.forEach(answer => {
            answer.style.opacity = '0';
            answer.style.maxHeight = '0';
            answer.classList.remove('active');
        });

        // Wait for the fade-out transition to complete
        isAnimating = true;
        setTimeout(() => {
            activeAnswers.forEach(answer => {
                answer.style.display = 'none';
            });

            // Show the new answer
            newAnswer.style.display = 'block';
            newAnswer.style.opacity = '0';
            newAnswer.style.maxHeight = '0';
            newAnswer.classList.add('active');

            // Start fade-in transition
            setTimeout(() => {
                newAnswer.style.opacity = '1';
                newAnswer.style.maxHeight = '300px'; /* Adjust as needed */
                isAnimating = false;
            }, 10); // Small delay to ensure the display style is set before starting the fade-in
        }, 500); // Match this duration with the CSS transition duration for the fade-out
    });
});
