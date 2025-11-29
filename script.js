// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileToggle) {
        mobileToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
        });
    }

    // Contact Form Submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            if (validateContactForm()) {
                alert('Thank you for your message! We will contact you soon.');
                contactForm.reset();
            }
        });
    }

    // Newsletter Subscription
    const newsletterBtn = document.querySelector('.newsletter-box button');
    if (newsletterBtn) {
        newsletterBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const input = this.parentElement.querySelector('input');
            if (input.value && isValidEmail(input.value)) {
                alert('Thank you for subscribing!');
                input.value = '';
            } else {
                alert('Please enter a valid email address.');
            }
        });
    }

    // Video Fallback
    const video = document.querySelector('.video-background video');
    if (video) {
        video.addEventListener('error', function() {
            document.querySelector('.hero').classList.add('no-video');
        });
    }
});

// Contact About Property
function contactAboutProperty(propertyName) {
    alert(`Thank you for your interest in ${propertyName}! Our agent will contact you shortly.`);
}

// Form Validation
function validateContactForm() {
    const name = document.querySelector('#contactForm input[type="text"]');
    const email = document.querySelector('#contactForm input[type="email"]');
    const subject = document.querySelectorAll('#contactForm input[type="text"]')[1];
    const message = document.querySelector('#contactForm textarea');
    
    if (!name.value || !email.value || !subject.value || !message.value) {
        alert('Please fill in all fields');
        return false;
    }
    
    if (!isValidEmail(email.value)) {
        alert('Please enter a valid email address');
        return false;
    }
    
    return true;
}

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Simple Filter Functions
function applyFilters() {
    const typeFilter = document.getElementById('property-type').value;
    const priceFilter = document.getElementById('price-range').value;
    const bedroomFilter = document.getElementById('bedrooms').value;
    
    const properties = document.querySelectorAll('.property-card');
    let foundResults = false;
    
    properties.forEach(property => {
        const type = property.dataset.type;
        const price = parseInt(property.dataset.price);
        const bedrooms = parseInt(property.dataset.bedrooms);
        
        // Check type filter
        const typeMatch = typeFilter === 'all' || type === typeFilter;
        
        // Check bedroom filter
        const bedroomMatch = bedroomFilter === 'all' || bedrooms >= parseInt(bedroomFilter);
        
        // Check price filter
        let priceMatch = true;
        if (priceFilter === '0-500000') priceMatch = price <= 500000;
        else if (priceFilter === '500000-1000000') priceMatch = price > 500000 && price <= 1000000;
        else if (priceFilter === '1000000+') priceMatch = price > 1000000;
        
        if (typeMatch && bedroomMatch && priceMatch) {
            property.style.display = 'block';
            foundResults = true;
        } else {
            property.style.display = 'none';
        }
    });
    
    // Show no results message if no properties found
    const noResults = document.querySelector('.no-results');
    if (noResults) {
        noResults.style.display = foundResults ? 'none' : 'block';
    }
}

function resetFilters() {
    // Reset all dropdowns to 'all'
    document.getElementById('property-type').value = 'all';
    document.getElementById('price-range').value = 'all';
    document.getElementById('bedrooms').value = 'all';
    
    // Show all properties
    const properties = document.querySelectorAll('.property-card');
    properties.forEach(property => {
        property.style.display = 'block';
    });
    
    // Hide no results message
    const noResults = document.querySelector('.no-results');
    if (noResults) {
        noResults.style.display = 'none';
    }
}