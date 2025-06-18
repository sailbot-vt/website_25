// add and remove mobile navbar
const mobileNavbarLinksContainer = document.getElementById("mobile-navbar-links-container")
const mobileTopNavbar = document.getElementById("mobile-top-navbar")
let mobileIsDisplayed = false;
const hamburgerIcon = document.getElementById("hamburger-icon")
hamburgerIcon.addEventListener('click', function(event){
   if (mobileIsDisplayed){
      mobileTopNavbar.classList.add('navhidden')
      mobileNavbarLinksContainer.classList.remove('mobile-navbar-links-container')
      mobileIsDisplayed = false;
   }
   else{
       mobileTopNavbar.classList.remove('navhidden')
       mobileNavbarLinksContainer.classList.add('mobile-navbar-links-container')
       mobileIsDisplayed = true;
   }
})

// Handle navbar scroll effect
const topNavbar = document.getElementById("top-navbar");
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        topNavbar.classList.add('navbar-scrolled');
    } else {
        topNavbar.classList.remove('navbar-scrolled');
    }
});

// Create floating bubbles
function createBubbles() {
    const container = document.body;
    const bubbleCount = 20; 
    
    // Remove any existing bubbles
    const existingBubbles = document.querySelectorAll('.particle');
    existingBubbles.forEach(bubble => bubble.remove());
    
    for (let i = 0; i < bubbleCount; i++) {
        const bubble = document.createElement('div');
        bubble.className = 'particle';
        
        // Random size between 8 and 16 pixels
        const size = Math.random() * 4 + 8;
        bubble.style.width = `${size}px`;
        bubble.style.height = `${size}px`;
        
        // Random starting position
        bubble.style.left = `${Math.random() * 100}%`;
        bubble.style.bottom = `${Math.random() * 20 - 20}%`; // Start from bottom
        
        // Random animation
        const duration = Math.random() * 3 + 4; // Faster animation
        const delay = Math.random() * 3;
        const swayAmount = Math.random() * 30 + 20; // Random sway amount
        
        // Create unique animation for each bubble
        const animationName = `float-${i}`;
        const style = document.createElement('style');
        style.textContent = `
            @keyframes ${animationName} {
                0% {
                    transform: translateY(0) translateX(0);
                    opacity: 0;
                }
                10% {
                    opacity: 0.6;
                }
                90% {
                    opacity: 0.6;
                }
                100% {
                    transform: translateY(-120vh) translateX(${swayAmount}px);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
        
        bubble.style.animation = `${animationName} ${duration}s ease-out ${delay}s infinite`;
        container.appendChild(bubble);
    }
}

// Create random sand grains
function createSandGrains() {
    const bottomNavbar = document.getElementById('bottom-navbar');
    if (!bottomNavbar) return;

    // Remove existing sand grains
    const existingGrains = bottomNavbar.querySelectorAll('.sand-grain');
    existingGrains.forEach(grain => grain.remove());

    // Create new sand grains
    const grainCount = 100; // Number of sand grains
    for (let i = 0; i < grainCount; i++) {
        const grain = document.createElement('div');
        grain.className = 'sand-grain';
        
        // Random size between 1 and 3 pixels
        const size = Math.random() * 2 + 1;
        grain.style.width = `${size}px`;
        grain.style.height = `${size}px`;
        
        // Random position
        grain.style.left = `${Math.random() * 100}%`;
        grain.style.top = `${Math.random() * 100}%`;
        
        // Random opacity
        grain.style.opacity = (Math.random() * 0.1 + 0.05).toString();
        
        // Random rotation
        grain.style.transform = `rotate(${Math.random() * 360}deg)`;
        
        bottomNavbar.appendChild(grain);
    }
}

// Initialize animations when the page loads
window.addEventListener('load', () => {
    createBubbles();
    createSandGrains();
});

// Recreate animations when window is resized
window.addEventListener('resize', () => {
    createBubbles();
    createSandGrains();
});

// Recreate animations periodically to ensure they're always present
setInterval(() => {
    createBubbles();
    createSandGrains();
}, 30000);