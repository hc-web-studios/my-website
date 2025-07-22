// Wait for the DOM to be fully loaded before running the script
document.addEventListener('DOMContentLoaded', function() {
    const menuBtn = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    // --- Mobile Menu Toggle ---
    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });

        // Close mobile menu when a navigation link is clicked
        const mobileNavLinks = mobileMenu.querySelectorAll('a'); // Select all <a> tags within the mobile menu
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', function() {
                // Check if the menu is not hidden before adding the 'hidden' class
                // This prevents redundant operations and ensures the class is only added when needed.
                if (!mobileMenu.classList.contains('hidden')) {
                    mobileMenu.classList.add('hidden');
                }
                // Optional: If you had an 'is-open' class on the menu button for animation,
                // you might also want to remove it here.
                // menuBtn.classList.remove('is-open');
            });
        });
    }


    // --- Smooth Scrolling for Anchor Links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault(); // Prevent default anchor jump

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth' // Smooth scroll animation
                });
            }
        });
    });


    // --- Generic Carousel Functionality ---
    // This function sets up and manages a carousel with automatic sliding and dot navigation.
    function setupCarousel(carouselId, slideSelector, headingSelector, subheadingSelector, dotsSelector, intervalTime) {
        const carousel = document.getElementById(carouselId);
        if (!carousel) return; // Exit if carousel element not found

        const slides = carousel.querySelectorAll(slideSelector);
        const dotsContainer = carousel.querySelector(dotsSelector);
        // Ensure dots exist before querying
        const dots = dotsContainer ? dotsContainer.querySelectorAll('.dot') : [];
        let currentSlide = 0;
        let slideInterval;

        function showSlide(index) {
            // Hide all slides and remove active class/animations
            slides.forEach((slide, i) => {
                slide.style.opacity = '0'; // Explicitly hide slide
                slide.style.zIndex = '0';  // Send to back
                slide.classList.remove('active'); // Remove active state
                // Remove animation classes to allow re-triggering
                const heading = slide.querySelector(headingSelector);
                const subheading = slide.querySelector(subheadingSelector);
                if (heading) heading.classList.remove('animate-fade-in-up');
                if (subheading) subheading.classList.remove('animate-fade-in-up');
            });

            // Deactivate all dots
            dots.forEach(dot => dot.classList.remove('active'));

            // Set the active slide properties
            slides[index].style.opacity = '1'; // Explicitly show current slide
            slides[index].style.zIndex = '10'; // Bring to front
            slides[index].classList.add('active'); // Add active class (for CSS transitions/styling)
            if (dots[index]) dots[index].classList.add('active'); // Activate current dot

            // Trigger animation for current slide's text
            const currentHeading = slides[index].querySelector(headingSelector);
            const currentSubheading = slides[index].querySelector(subheadingSelector);
            if (currentHeading) {
                void currentHeading.offsetWidth; // Force reflow to restart CSS animation
                currentHeading.classList.add('animate-fade-in-up');
            }
            if (currentSubheading) {
                void currentSubheading.offsetWidth; // Force reflow
                currentSubheading.classList.add('animate-fade-in-up');
            }

            currentSlide = index;
        }

        function nextSlide() {
            currentSlide = (currentSlide + 1) % slides.length; // Cycle to the next slide
            showSlide(currentSlide);
        }

        function startSlideShow() {
            slideInterval = setInterval(nextSlide, intervalTime); // Start automatic slideshow
        }

        function resetSlideShow() {
            clearInterval(slideInterval); // Clear existing interval
            startSlideShow(); // Restart interval
        }

        // Add click listeners to pagination dots
        dots.forEach(dot => {
            dot.addEventListener('click', (e) => {
                const slideIndex = parseInt(e.target.dataset.slide); // Get slide index from data attribute
                showSlide(slideIndex); // Show selected slide
                resetSlideShow(); // Reset timer on manual navigation
            });
        });

        // Initial display setup
        showSlide(0); // Show the first slide immediately on load
        startSlideShow(); // Start the automatic slideshow
    }

    // --- Initialize Testimonial Carousel ---
    // Note: The hero-carousel initialization was commented out in your original script.
    setupCarousel(
        'testimonial-carousel',
        '.testimonial-slide',
        '.testimonial-text', // Main text element for testimonials
        '.testimonial-cite', // Sub-text element (e.g., author/source)
        '.testimonial-dots',
        9000 // 9 seconds interval for testimonial slides
    );

    // --- Terms Popup Logic ---
    const openTerms = document.getElementById('open-terms');
    const closeTerms = document.getElementById('close-terms');
    const popup = document.getElementById('terms-popup');

    if (openTerms && closeTerms && popup) {
        openTerms.addEventListener('click', function (e) {
            e.preventDefault(); // Prevent default link behavior
            popup.classList.remove('popup-hidden'); // Show the popup
        });

        closeTerms.addEventListener('click', function () {
            popup.classList.add('popup-hidden'); // Hide the popup
        });
    }

    console.log("Website template scripts loaded successfully!");
});

<<<<<<< HEAD
=======
// --- REMOVED REDUNDANT MOBILE MENU TOGGLE ---
// Your previous script had this line outside the DOMContentLoaded.
// It's redundant because the event listener is already set up above.
// document.getElementById('mobile-menu-button').onclick = function() {
//   document.getElementById('mobile-menu').classList.toggle('hidden');
// };




        // JavaScript to slow down scroll speed for the whole document
        document.addEventListener('wheel', function(event) {
            // Check if the user is scrolling the main document (not an element with its own scrollbar)
            // This basic check prevents interference with elements like modals or iframes that might also scroll
            if (event.target === document.documentElement || event.target === document.body || event.target.scrollHeight === event.target.clientHeight) {
                event.preventDefault(); // Prevent default browser scroll

                // Calculate half the scroll amount
                const scrollAmount = event.deltaY * 4; // Change 0.5 to desired fraction (e.g., 0.25 for quarter speed)

                // Scroll the window by the calculated amount
                window.scrollBy({
                    top: scrollAmount,
                    left: 0,
                    behavior: 'smooth' // 'auto' for instant, 'smooth' for animated (can feel sluggish if too slow)
                });
            }
        }, { passive: false }); // passive: false is important to allow preventDefault()
>>>>>>> parent of d804500 (Update Script.js)

     


// Show the button when user scrolls down
window.addEventListener('scroll', function () {
    const scrollBtn = document.getElementById('scrollToTopImgBtn');
    if (window.scrollY > 300) {
        scrollBtn.classList.add('show');
    } else {
        scrollBtn.classList.remove('show');
    }
});

// Scroll to top on click
document.getElementById('scrollToTopImgBtn').addEventListener('click', function (e) {
    e.preventDefault(); // Prevent default anchor jump
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});
