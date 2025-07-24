document.addEventListener('DOMContentLoaded', function () {
  const menuIcon = document.getElementById('menu-icon');
  const navLinksContainer = document.getElementById('nav-links');

  // Exit if essential elements are not found
  if (!menuIcon || !navLinksContainer) {
    console.error("Essential navigation elements not found!");
    return;
  }

  const navLinks = navLinksContainer.querySelectorAll('a');
  const sections = document.querySelectorAll('section[id]');

  // --- Mobile Menu Toggle ---
  menuIcon.addEventListener('click', () => {
    toggleMenu();
  });

  // --- Handle Navigation Link Clicks ---
  navLinks.forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault(); // Prevent default anchor jump

      const targetId = this.getAttribute('href');
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        // Use scrollIntoView for smooth scrolling
        targetSection.scrollIntoView({ behavior: 'smooth' });

        // Close mobile menu if it's open
        if (navLinksContainer.classList.contains('active')) {
          toggleMenu();
        }
      }
    });
  });

  // --- Highlight Active Link on Scroll ---
  const observerOptions = {
    root: null, // observes intersections in the viewport
    rootMargin: '0px',
    threshold: 0.6 // 60% of the section must be visible
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Remove active class from all links
        navLinks.forEach(link => link.classList.remove('active'));
        
        // Add active class to the corresponding link
        // CORRECTED: Used backticks for template literal string
        const activeLink = navLinksContainer.querySelector(`a[href="#${entry.target.id}"]`);
        if (activeLink) {
          activeLink.classList.add('active');
        }
      }
    });
  }, observerOptions);

  // Observe each section
  sections.forEach(section => {
    observer.observe(section);
  });

  // --- Helper function to toggle menu state ---
  function toggleMenu() {
    navLinksContainer.classList.toggle('active');
    const icon = menuIcon.querySelector('i');
    if (icon) {
      icon.classList.toggle('fa-bars');
      icon.classList.toggle('fa-xmark');
    }
  }
});