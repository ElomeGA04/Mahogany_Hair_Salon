// MAHOGANY HAIR SALON - COMPLETE JAVASCRIPT

document.addEventListener("DOMContentLoaded", function () {
  // HAMBURGER MENU TOGGLE

  function initHamburgerMenu() {
    const hamburgerToggle = document.getElementById("hamburgerToggle");
    const navLinks = document.getElementById("navLinks");
    const header = document.querySelector("header");

    if (hamburgerToggle && navLinks) {
      hamburgerToggle.addEventListener("click", function () {
        this.classList.toggle("active");
        navLinks.classList.toggle("active");
      });

      // Close menu when a link is clicked
      const links = navLinks.querySelectorAll("a");
      links.forEach((link) => {
        link.addEventListener("click", function () {
          if (window.innerWidth <= 1023) {
            hamburgerToggle.classList.remove("active");
            navLinks.classList.remove("active");
          }
        });
      });

      // Close menu when clicking outside
      document.addEventListener("click", function (e) {
        if (window.innerWidth <= 1023 && header) {
          const isClickInside = header.contains(e.target);
          if (!isClickInside && navLinks.classList.contains("active")) {
            hamburgerToggle.classList.remove("active");
            navLinks.classList.remove("active");
          }
        }
      });
    }
  }

  
  // GALLERY LIGHTBOX
  
  function initLightbox() {
    const modal = document.createElement("div");
    modal.id = "lightbox-modal";
    modal.style.display = "none";
    modal.style.position = "fixed";
    modal.style.top = "0";
    modal.style.left = "0";
    modal.style.width = "100%";
    modal.style.height = "100%";
    modal.style.backgroundColor = "rgba(0,0,0,0.9)";
    modal.style.zIndex = "1000";
    modal.style.justifyContent = "center";
    modal.style.alignItems = "center";
    modal.style.padding = "20px";

    // Close button
    const closeBtn = document.createElement("span");
    closeBtn.innerHTML = "&times;";
    closeBtn.style.position = "absolute";
    closeBtn.style.top = "20px";
    closeBtn.style.right = "40px";
    closeBtn.style.color = "#fff1b5";
    closeBtn.style.fontSize = "40px";
    closeBtn.style.fontWeight = "bold";
    closeBtn.style.cursor = "pointer";
    closeBtn.style.zIndex = "1001";
    closeBtn.style.transition = "0.3s";

    closeBtn.addEventListener("mouseenter", function () {
      this.style.color = "#c1dbe8";
      this.style.transform = "scale(1.2)";
    });
    closeBtn.addEventListener("mouseleave", function () {
      this.style.color = "#fff1b5";
      this.style.transform = "scale(1)";
    });

    // Modal image
    const modalImg = document.createElement("img");
    modalImg.id = "modal-image";
    modalImg.style.maxWidth = "90%";
    modalImg.style.maxHeight = "90%";
    modalImg.style.borderRadius = "10px";
    modalImg.style.boxShadow = "0 0 50px rgba(0,0,0,0.5)";
    modalImg.style.objectFit = "contain";

    // Modal caption
    const caption = document.createElement("p");
    caption.id = "modal-caption";
    caption.style.color = "#fff1b5";
    caption.style.textAlign = "center";
    caption.style.marginTop = "20px";
    caption.style.fontSize = "1.2rem";
    caption.style.fontFamily = "Playfair Display, serif";

    modal.appendChild(closeBtn);
    modal.appendChild(modalImg);
    modal.appendChild(caption);
    document.body.appendChild(modal);

    // Click event for images
    document
      .querySelectorAll(".service-item img, .products-img")
      .forEach((img) => {
        img.style.cursor = "pointer";
        img.addEventListener("click", function () {
          modal.style.display = "flex";
          modalImg.src = this.src;
          caption.textContent = this.alt || "Mahogany Hair Salon Service";
          document.body.style.overflow = "hidden";
        });
      });

    function closeModal() {
      modal.style.display = "none";
      document.body.style.overflow = "auto";
    }

    closeBtn.addEventListener("click", closeModal);
    modal.addEventListener("click", function (e) {
      if (e.target === this) {
        closeModal();
      }
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && modal.style.display === "flex") {
        closeModal();
      }
    });
  }

  // ACCORDION

  function initAccordion() {
    const serviceItems = document.querySelectorAll(".service-item");

    serviceItems.forEach((item) => {
      const priceBtn = item.querySelector(".btn-prod");
      const description = document.createElement("p");
      description.className = "service-description";
      description.style.display = "none";
      description.style.marginTop = "10px";
      description.style.padding = "10px";
      description.style.background = "#fff1b5";
      description.style.borderRadius = "8px";
      description.style.color = "#43302e";

      // Add different descriptions based on services
      const serviceName = item.querySelector("p")?.textContent || "";
      const descriptions = {
        "Straight back":
          "Classic straight back braids, neat and long-lasting style.",
        "Patewo braids": "Stylish Patewo braids with a modern twist.",
        "Short knotless braids":
          "Comfortable knotless braids in a chic short length.",
        "Long Kinky": "Voluminous long kinky hair for a bold statement.",
        "Short kinky": "Playful short kinky style, perfect for everyday wear.",
        "Long curls": "Elegant long curls with beautiful bounce and movement.",
        "Side part": "Sophisticated side part style for a glamorous look.",
        "Short bob": "Classic short bob cut, timeless and versatile.",
        "Colored bob": "Vibrant colored bob to make a statement.",
        "Medium almond": "Elegant medium almond-shaped nails.",
        "Long almond": "Dramatic long almond nails for a sophisticated look.",
        "Short almond model":
          "Natural short almond style, perfect for daily wear.",
        "Short almond": "Classic short almond nails.",
        "Medium square": "Modern medium square nails.",
        "Long square": "Bold long square nails.",
        Fullbeat: "Full coverage glamour makeup look.",
        "Matt glow": "Matte finish with a subtle glow.",
        "Natural glam": "Natural-looking glamorous makeup.",
      };

      description.textContent =
        descriptions[serviceName] ||
        "Professional service with quality results.";
      item.appendChild(description);

      if (priceBtn) {
        priceBtn.addEventListener("click", function (e) {
          e.stopPropagation();

          // Hide all other descriptions
          document.querySelectorAll(".service-description").forEach((desc) => {
            if (desc !== description) {
              desc.style.display = "none";
            }
          });

          // Toggle current description
          if (
            description.style.display === "none" ||
            description.style.display === ""
          ) {
            description.style.display = "block";
            this.textContent = "Hide Details";
          } else {
            description.style.display = "none";
            const price = this.getAttribute("data-price") || "";
            this.textContent = price ? `R${price}` : "View Details";
          }
        });
      }
    });
  }

  // TAB FUNCTIONALITY FOR SERVICES

  function initTabs() {
    const heroSections = document.querySelectorAll(".hero");
    if (heroSections.length > 1) {
      const tabsContainer = document.createElement("div");
      tabsContainer.className = "service-tabs";
      tabsContainer.style.display = "flex";
      tabsContainer.style.justifyContent = "center";
      tabsContainer.style.gap = "10px";
      tabsContainer.style.margin = "20px 0";
      tabsContainer.style.flexWrap = "wrap";

      const serviceCategories = [
        "All",
        "Braiding",
        "Wig Installation",
        "Nail Art",
        "Makeup",
      ];

      serviceCategories.forEach((category) => {
        const tabBtn = document.createElement("button");
        tabBtn.textContent = category;
        tabBtn.className = "tab-button";
        tabBtn.style.padding = "10px 25px";
        tabBtn.style.border = "2px solid #43302e";
        tabBtn.style.borderRadius = "30px";
        tabBtn.style.background = "transparent";
        tabBtn.style.color = "#43302e";
        tabBtn.style.cursor = "pointer";
        tabBtn.style.fontFamily = "Poppins, sans-serif";
        tabBtn.style.fontWeight = "500";
        tabBtn.style.transition = "all 0.3s ease";

        if (category === "All") {
          tabBtn.style.background = "#43302e";
          tabBtn.style.color = "#fff1b5";
        }

        tabBtn.addEventListener("mouseenter", function () {
          if (this.style.background !== "#43302e") {
            this.style.background = "#c1dbe8";
            this.style.color = "#43302e";
          }
        });

        tabBtn.addEventListener("mouseleave", function () {
          if (this.style.background !== "#43302e") {
            this.style.background = "transparent";
            this.style.color = "#43302e";
          }
        });

        tabBtn.addEventListener("click", function () {
          document.querySelectorAll(".tab-button").forEach((btn) => {
            btn.style.background = "transparent";
            btn.style.color = "#43302e";
          });
          this.style.background = "#43302e";
          this.style.color = "#fff1b5";

          const grids = document.querySelectorAll(".services-grid");
          grids.forEach((grid) => (grid.style.display = "none"));

          if (category === "All") {
            grids.forEach((grid) => (grid.style.display = "grid"));
          } else {
            const categoryMap = {
              Braiding: 0,
              "Wig Installation": 1,
              "Nail Art": 2,
              Makeup: 3,
            };
            const index = categoryMap[category];
            if (index !== undefined && grids[index]) {
              grids[index].style.display = "grid";
            }
          }
        });

        tabsContainer.appendChild(tabBtn);
      });

      const firstHero = document.querySelector(".hero");
      if (firstHero) {
        firstHero.parentNode.insertBefore(tabsContainer, firstHero.nextSibling);
      }
    }
  }

  // DYNAMIC CONTENT & SEARCH

  function initSearch() {
    const searchContainer = document.createElement("div");
    searchContainer.className = "search-container";
    searchContainer.style.display = "flex";
    searchContainer.style.justifyContent = "center";
    searchContainer.style.margin = "20px auto";
    searchContainer.style.maxWidth = "500px";
    searchContainer.style.gap = "10px";

    const searchInput = document.createElement("input");
    searchInput.type = "text";
    searchInput.placeholder = "Search services...";
    searchInput.className = "search-input";
    searchInput.style.flex = "1";
    searchInput.style.padding = "12px 20px";
    searchInput.style.border = "2px solid #43302e";
    searchInput.style.borderRadius = "30px";
    searchInput.style.fontSize = "1rem";
    searchInput.style.fontFamily = "Poppins, sans-serif";
    searchInput.style.background = "#fff1b5";
    searchInput.style.outline = "none";
    searchInput.style.transition = "all 0.3s ease";

    searchInput.addEventListener("focus", function () {
      this.style.borderColor = "#c1dbe8";
      this.style.boxShadow = "0 0 10px rgba(193, 219, 232, 0.3)";
    });
    searchInput.addEventListener("blur", function () {
      this.style.borderColor = "#43302e";
      this.style.boxShadow = "none";
    });

    const searchBtn = document.createElement("button");
    searchBtn.innerHTML = '<i class="fas fa-search"></i>';
    searchBtn.className = "search-btn";
    searchBtn.style.padding = "12px 20px";
    searchBtn.style.border = "none";
    searchBtn.style.borderRadius = "30px";
    searchBtn.style.background = "#43302e";
    searchBtn.style.color = "#fff1b5";
    searchBtn.style.cursor = "pointer";
    searchBtn.style.fontSize = "1.2rem";
    searchBtn.style.transition = "all 0.3s ease";
    searchBtn.style.minWidth = "50px";

    searchBtn.addEventListener("mouseenter", function () {
      this.style.background = "#c1dbe8";
      this.style.color = "#43302e";
    });
    searchBtn.addEventListener("mouseleave", function () {
      this.style.background = "#43302e";
      this.style.color = "#fff1b5";
    });

    searchContainer.appendChild(searchInput);
    searchContainer.appendChild(searchBtn);

    const hero = document.querySelector(".hero");
    if (hero) {
      hero.parentNode.insertBefore(searchContainer, hero.nextSibling);
    }

    function performSearch(query) {
      const serviceItems = document.querySelectorAll(".service-item");
      let found = false;

      serviceItems.forEach((item) => {
        const text = item.textContent.toLowerCase();
        const imgAlt = item.querySelector("img")?.alt?.toLowerCase() || "";
        const matches =
          text.includes(query.toLowerCase()) ||
          imgAlt.includes(query.toLowerCase());

        if (query.trim() === "") {
          item.style.display = "flex";
          found = true;
        } else if (matches) {
          item.style.display = "flex";
          found = true;
        } else {
          item.style.display = "none";
        }
      });

      const grids = document.querySelectorAll(".services-grid");
      grids.forEach((grid) => {
        const visibleItems = grid.querySelectorAll(
          '.service-item[style*="display: flex"]',
        );
        if (visibleItems.length === 0 && query.trim() !== "") {
          grid.style.display = "none";
        } else {
          grid.style.display = "grid";
        }
      });

      let noResults = document.getElementById("no-results");
      if (!found && query.trim() !== "") {
        if (!noResults) {
          noResults = document.createElement("p");
          noResults.id = "no-results";
          noResults.textContent =
            "No services found. Try a different search term.";
          noResults.style.textAlign = "center";
          noResults.style.padding = "40px";
          noResults.style.fontSize = "1.2rem";
          noResults.style.color = "#43302e";
          noResults.style.fontFamily = "Playfair Display, serif";
          const main = document.querySelector("main");
          if (main) main.appendChild(noResults);
        }
        noResults.style.display = "block";
      } else if (noResults) {
        noResults.style.display = "none";
      }
    }

    searchInput.addEventListener("input", function () {
      performSearch(this.value);
    });

    searchBtn.addEventListener("click", function () {
      performSearch(searchInput.value);
    });

    searchInput.addEventListener("keypress", function (e) {
      if (e.key === "Enter") {
        performSearch(this.value);
      }
    });
  }

  // DYNAMIC CONTENT LOADING

  function loadDynamicContent() {
    const serviceGrids = document.querySelectorAll(".services-grid");

    const loadMoreBtn = document.createElement("button");
    loadMoreBtn.textContent = "Load More Services";
    loadMoreBtn.className = "btn";
    loadMoreBtn.style.display = "block";
    loadMoreBtn.style.margin = "30px auto";

    loadMoreBtn.addEventListener("click", function () {
      const newItem = document.createElement("div");
      newItem.className = "service-item";
      newItem.style.animation = "fadeIn 0.5s ease";

      const style = document.createElement("style");
      style.textContent = `
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `;
      document.head.appendChild(style);

      newItem.innerHTML = `
                <img src="../Assets/Images/braided_back.jpg" alt="new-service" width="200" height="250" style="border-radius:10px;box-shadow:0 5px 15px black;transition:all 0.9s ease;">
                <p>Premium Style</p>
                <button class="btn-prod">R450</button>
            `;

      const lastGrid = serviceGrids[serviceGrids.length - 1];
      if (lastGrid) {
        lastGrid.appendChild(newItem);
        this.textContent = "More Services Loaded!";
        this.disabled = true;
        this.style.opacity = "0.5";
        this.style.cursor = "not-allowed";
      }
    });

    const main = document.querySelector("main");
    if (main) {
      const footer = document.querySelector("footer");
      if (footer) {
        main.insertBefore(loadMoreBtn, footer);
      }
    }
  }

  // ENQUIRY FORM

  function initEnquiryForm() {
    const enquiryForm = document.getElementById("enquiryForm");
    if (!enquiryForm) return;

    enquiryForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const name = document.getElementById("name")?.value?.trim() || "";
      const email = document.getElementById("email")?.value?.trim() || "";
      const phone = document.getElementById("phone")?.value?.trim() || "";
      const service = document.getElementById("service")?.value || "";
      const message = document.getElementById("message")?.value?.trim() || "";

      const errors = [];

      if (!name || name.length < 2) {
        errors.push("Please enter a valid name (minimum 2 characters).");
      }
      if (!email || !isValidEmail(email)) {
        errors.push("Please enter a valid email address.");
      }
      if (!phone || phone.length < 10) {
        errors.push("Please enter a valid phone number (minimum 10 digits).");
      }
      if (!service) {
        errors.push("Please select a service.");
      }
      if (!message || message.length < 10) {
        errors.push("Please enter a message (minimum 10 characters).");
      }

      const errorContainer =
        document.getElementById("formErrors") || createErrorContainer();

      if (errors.length > 0) {
        errorContainer.innerHTML = errors
          .map(
            (err) =>
              `<div style="color:#ff4444;padding:8px;margin:5px 0;background:#ffe6e6;border-radius:5px;"> ${err}</div>`,
          )
          .join("");
        errorContainer.style.display = "block";
        return;
      }

      errorContainer.style.display = "none";

      const responseContainer =
        document.getElementById("enquiryResponse") || createResponseContainer();

      const servicePrices = {
        "straight-back": 250,
        "patewo-braids": 300,
        "short-knotless": 380,
        "long-kinky": 400,
        "short-kinky": 300,
        "long-curls": 550,
        "side-part": 400,
        "short-bob": 280,
        "colored-bob": 450,
        "medium-almond": 290,
        "long-almond": 380,
        "short-almond-model": 270,
        "short-almond": 230,
        "medium-square": 290,
        "long-square": 380,
        fullbeat: 580,
        "matt-glow": 572,
        "natural-glam": 450,
      };

      const price = servicePrices[service] || 0;
      const serviceName =
        document.querySelector(`#service option[value="${service}"]`)
          ?.textContent || service;

      responseContainer.innerHTML = `
                <div style="background:#c1dbe8;padding:20px;border-radius:10px;color:#43302e;margin-top:15px;animation:fadeIn 0.5s ease;">
                    <h3 style="font-family:'Playfair Display',serif;margin-bottom:10px;"> Enquiry Received!</h3>
                    <p><strong>Thank you, ${name}!</strong></p>
                    <p>Service: ${serviceName}</p>
                    <p>Price: R${price}</p>
                    <p>Availability: In stock and ready for booking.</p>
                    <p style="margin-top:10px;">We will contact you at ${email} or ${phone} within 24 hours.</p>
                    <button onclick="this.parentElement.style.display='none'" style="margin-top:15px;padding:8px 20px;border:none;border-radius:20px;background:#43302e;color:#fff1b5;cursor:pointer;">
                        Close
                    </button>
                </div>
            `;
      responseContainer.style.display = "block";
      enquiryForm.reset();
    });
  }

  // CONTACT FORM

  function initContactForm() {
    const contactForm = document.getElementById("contactForm");
    if (!contactForm) return;

    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const name = document.getElementById("contactName")?.value?.trim() || "";
      const email =
        document.getElementById("contactEmail")?.value?.trim() || "";
      const phone =
        document.getElementById("contactPhone")?.value?.trim() || "";
      const subject = document.getElementById("contactSubject")?.value || "";
      const message =
        document.getElementById("contactMessage")?.value?.trim() || "";

      const errors = [];

      if (!name || name.length < 2)
        errors.push("Please enter a valid name (minimum 2 characters).");
      if (!email || !isValidEmail(email))
        errors.push("Please enter a valid email address.");
      if (!phone || phone.length < 10)
        errors.push("Please enter a valid phone number (minimum 10 digits).");
      if (!subject) errors.push("Please select a subject.");
      if (!message || message.length < 10)
        errors.push("Please enter a message (minimum 10 characters).");

      const errorContainer =
        document.getElementById("contactErrors") ||
        createErrorContainer("contactErrors");

      if (errors.length > 0) {
        errorContainer.innerHTML = errors
          .map(
            (err) =>
              `<div style="color:#ff4444;padding:8px;margin:5px 0;background:#ffe6e6;border-radius:5px;">⚠️ ${err}</div>`,
          )
          .join("");
        errorContainer.style.display = "block";
        return;
      }

      errorContainer.style.display = "none";

      const emailBody = `
                Name: ${name}
                Email: ${email}
                Phone: ${phone}
                Subject: ${subject}
                
                Message:
                ${message}
            `;

      const mailtoLink = `mailto:mahoHair@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(emailBody)}`;

      const responseContainer =
        document.getElementById("contactResponse") ||
        createResponseContainer("contactResponse");
      responseContainer.innerHTML = `
                <div style="background:#c1dbe8;padding:20px;border-radius:10px;color:#43302e;margin-top:15px;animation:fadeIn 0.5s ease;">
                    <h3 style="font-family:'Playfair Display',serif;margin-bottom:10px;"> Message Ready!</h3>
                    <p>Thank you, ${name}! Your message has been compiled.</p>
                    <p style="margin:15px 0;">
                        <a href="${mailtoLink}" style="display:inline-block;padding:12px 30px;background:#43302e;color:#fff1b5;text-decoration:none;border-radius:30px;transition:all 0.3s ease;"
                           onmouseenter="this.style.background='#c1dbe8';this.style.color='#43302e';"
                           onmouseleave="this.style.background='#43302e';this.style.color='#fff1b5';">
                            📧 Open Email Client
                        </a>
                    </p>
                    <p style="font-size:0.9rem;">Click the button above to send your message via your default email client.</p>
                    <button onclick="this.parentElement.style.display='none'" style="margin-top:15px;padding:8px 20px;border:none;border-radius:20px;background:#43302e;color:#fff1b5;cursor:pointer;">
                        Close
                    </button>
                </div>
            `;
      responseContainer.style.display = "block";
      contactForm.reset();
    });
  }

  // UTILITY FUNCTIONS

  function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  function createErrorContainer(id = "formErrors") {
    const container = document.createElement("div");
    container.id = id;
    container.style.display = "none";
    container.style.margin = "10px 0";

    const form = document.querySelector(".enquiry-form, form");
    if (form) {
      form.insertBefore(container, form.querySelector(".submit-btn, .btn"));
    }
    return container;
  }

  function createResponseContainer(id = "enquiryResponse") {
    const container = document.createElement("div");
    container.id = id;
    container.style.display = "none";
    container.style.margin = "10px 0";

    const form = document.querySelector(".enquiry-form, form");
    if (form) {
      form.insertBefore(container, form.querySelector(".submit-btn, .btn"));
    }
    return container;
  }

 
  // SCROLL ANIMATIONS
  
  function initScrollAnimations() {
    const serviceItems = document.querySelectorAll(".service-item");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      },
    );

    serviceItems.forEach((item, index) => {
      item.style.opacity = "0";
      item.style.transform = "translateY(30px)";
      item.style.transition = `all 0.6s ease ${index * 0.1}s`;
      observer.observe(item);
    });
  }

  
  // INITIALIZE ALL FEATURES
 
   const currentPage = window.location.pathname.split("/").pop() || "index.html";

  // Initialize common features (all pages)
  initHamburgerMenu();
  initLightbox();

  // SEARCH BAR - ONLY ON PRODUCTS AND SERVICES PAGES
  if (currentPage === "products.html" || currentPage === "service.html" || currentPage === "services.html") {
    initSearch();
  }

  loadDynamicContent();
  initScrollAnimations();

  // Page-specific features
  if (currentPage === "service.html" || currentPage === "services.html") {
    initAccordion();
    initTabs();
  }

  if (currentPage === "enquiry.html") {
    initEnquiryForm();
  }

  if (currentPage === "contact_us.html" || currentPage === "contact.html") {
    initContactForm();
  }

  //DATE & TIME

   function displayDateTimeWithMonthName() {
    const now = new Date();
    
    // Get weekday
    const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const weekday = weekdays[now.getDay()];
    
    // Get month name
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 
                   'July', 'August', 'September', 'October', 'November', 'December'];
    const monthName = months[now.getMonth()];
    
    // Get day and year
    const day = now.getDate();
    const year = now.getFullYear();
    
    // Get time (24-hour)
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    
    // Format: Monday, 19 June 2026 | 14:30:45
    const dateTimeString = `${weekday}, ${day} ${monthName} ${year} | ${hours}:${minutes}:${seconds}`;
    
    let dateTimeDisplay = document.getElementById('dateTimeDisplay');
    
    if (!dateTimeDisplay) {
      dateTimeDisplay = document.createElement('div');
      dateTimeDisplay.id = 'dateTimeDisplay';
      dateTimeDisplay.style.color = '#fff1b5';
      dateTimeDisplay.style.fontSize = '0.9rem';
      dateTimeDisplay.style.marginTop = '10px';
      dateTimeDisplay.style.fontFamily = 'Poppins, sans-serif';
      dateTimeDisplay.style.textAlign = 'center';
      dateTimeDisplay.style.padding = '5px 0';
      
      const footerBottom = document.querySelector('.footer-bottom');
      if (footerBottom) {
        footerBottom.appendChild(dateTimeDisplay);
      }
    }
    
    if (dateTimeDisplay) {
      dateTimeDisplay.textContent = ` ${dateTimeString}`;
    }
  }

  // Initialize
  displayDateTimeWithMonthName();
  setInterval(displayDateTimeWithMonthName, 1000);
  console.log(" Mahogany Hair Salon - All features initialized successfully!");
});
