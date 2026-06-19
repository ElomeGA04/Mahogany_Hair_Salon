/*GALLERY LIGHTBOX*/

function initAccordion() {
  const serviceItems = document.querySelectorAll(".service-item");

  serviceItems.forEach((item, index) => {
    /*Create accordion toggle button*/
    const img = item.querySelector("img");
    const priceBtn = item.querySelector("btn-prod");
    const description = document.createElement("p");
    description.className = "service-description";
    description.style.display = "none";
    description.style.marginTop = "10px";
    description.style.padding = "10px";
    description.style.background = "#fff1b5";
    description.style.borderRadius = "8px";
    description.style.color = "#43302e";

    /*Add diffferent descriptions based on services*/
    const serviceName = item.querySelector("p")?.textContent || "";
    const description = {
      "Straight back":
        "Classic straight back braids, neat and long-lasting style.",
      "Patewo braids": "Stylish Patewo braids with a modern twist.",
      "Short Kinky": "Voluminous long kinky hair for aa bold statement.",
      "Short Kinky": "Playful short kinky style, perfect for everyday wear.",
      "Long curls": "Elegant long curls with beautiful bounce and movement.",
      "Side part": "sophisticated side part style for glamorous look.",
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
      description[serviceName] || "Professional service with quality results.";

    /*Insert description after the price button*/
    item.appendChild(description);

    /*Add click event to toggle description*/
    priceBtn.addEventListener("click", function (e) {
      e.stopPropagation();

      /*Hide all other description*/
      document.querySelectorAll(".service-descripion").forEach((desc) => {
        if (desc !== description) {
          desc.style.display = "none";
        }
      });

      /*Toggle current description*/
      if (
        description.style.display === "none" ||
        description.style.display === ""
      ) {
        description.style.display = "block";
        priceBtn.textContent = "Hide Details";
      } else {
        description.style.display = "none";
        priceBtn.textContent =
          this.textContent.replace("Hide Details", "").trim() || "View Details";
      }
    });
  });
}

/*MODAL FOR SERVICE IMAGES (Lighhtbox)*/
function initLightbox() {
  /*Create modal overlay*/
  const modal = document.createElement("div");
  modal.id = "lightbox-modal";
  modal.style.display = "none";
  modal.style.position = "fixed";
  modal.style.top = "0";
  modal.style.left = "0";
  modal.style.width = "100%";
  modal.style.height = "100%";
  modal.style.backgroundColor = "rgba(0,0,0,0.9)";
  modal.style.justifyContent = "center";
  modal.style.alignItems = "center";
  modal.style.padding = "20px";

  /*close button*/
  const closeBtn = document.createElement("span");
  closeBtn.innerHTML = "&times;";
  closeBtn.style.position = "absolute";
  closeBtn.style.top = "20%";
  closeBtn.style.color = "#fff1b5";
  closeBtn.style.fontSize = "40px";
  closeBtn.style.cursor = "pointer";
  closeBtn.style.zIndex = "1001";

  closeBtn.addEventListener("mouseenter", function () {
    this.style.color = "#c1dbe8";
    this.style.transform = "scale(1.2)";
  });

  closeBtn.addEventListener("mouseleave", function () {
    this.style.color = "#fff1b5";
    this.style.transform = "scale(1)";
  });

  /*Modal image*/
  const modalImg = document.createElement("img");
  modalImg.id = "modal-image";
  modalImg.style.maxWidth = "90%";
  modalImg.style.maxHeight = "90%";
  modalImg.style.borderRadius = "0 0 50px rgba(0, 0, 0,  0.5)";
  modalImg.style.objectFit = "contain";

  /*Modal caption*/
  const caption = document.createElement("p");
  caption.id = "modal-caption";
  caption.style.color = "#fff1b5";
  caption.style.textAlign = "center";
  caption.style.marginTop = "20px";
  caption.style.fontSize = "1.2rem";
  caption.style.fontFamily = "Playfair Display, serif";

  /*Assemble modal*/
  modal.appendChild(closeBtn);
  modal.appendChild(modalImg);
  modal.appendChild(caption);
  document.body.appendChild(modal);

  /*Click event for images*/
  document
    .querySelectorAll(".service-item img, .products-img")
    .forEach((img) => {
      img.style.cursor = "pointer";
      img.addEventListener("click", function () {
        modal.style.display = "flex";
        modalImg.src = this.src;
        caption.textContent = this.alt || "Mahogany Hair Salon Service";

        /*Prevent body roll*/
        document.body.style.overflow = "hidden";
      });
    });

  /*Close modal functions*/
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

  /*Keyboard escape to close*/
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && modal.style.display === "flex") {
      closeModal();
    }
  });

  /*TAB FUNCTIONALITY FOR SERVICES*/
  function initTabs() {
    /*Create tabs container*/
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
      const categoryData = {
        All: { images: document.querySelectorAll(".services-grid") },
        Braiding: { images: document.querySelectorAll(".services-grid")[0] },
        "Wig Installation": {
          images: document.querySelectorAll(".services-grid")[1],
        },
        "Nail Art": { images: document.querySelectorAll(".services-grid")[2] },
        Makeup: { images: document.querySelectorAll(".services-grid")[3] },
      };

      /*Create tabs buttons*/
      serviceCategories.forEach((category) => {
        const tabBtn = document.createElement("button");
        tabBtn.textContent = category;
        tabBtn.className = "tab-button";
        tabBtn.style.padding = "10px 25px";
        tabBtn.style.border = "2px solid #43302e";
        tabBtn.style.borderRadius = "30px";
        tabBtn.style.background = "transparent";
        tabBtn.style.color = "#43302e";
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
          /*Reset all tabs*/
          document.querySelectorAll(".tab-button").forEach((btn) => {
            btn.style.background = "transparent";
            btn.style.color = "#43302e";
          });
          this.style.background = "#43302e";
          this.style.color = "#fff1b5";

          /*Show/hide service grids*/
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

        tabsContainer.appendChild(tabsBtn);
      });

      /*Insert tabs after the first hero section*/
      const firstHero = document.querySelector(".hero");
      if (firstHero) {
        firstHero.parentNode.insertBefore(tabsContainer, firstHero.nextSibling);
      }
    }
  }

  /*DYNAMIC CONTENT & SEARCH*/

  function initSearch() {
    /*Create search bar*/
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

    /*Insert serach after hero*/
    const hero = document.querySelector(".hero");
    if (hero) {
      hero.parentNode.insertBefore(searchContainer, hero.nextSibling);
    }

    /*Search functionality*/
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

      /*Show/hide grids*/
      const grids = document.querySelectorAll(".service-grid");
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

      /*Show no result message*/
      let noResults = document.getElementById("no-results");
      if (!found && query.trim() !== "") {
        if (!noResults) {
          noResults = document.createElement("p");
          noResults.id = "no-results";
          noResults.textContent =
            "No services forund. Try a different search term.";
          noResults.style.textAlign = "center";
          noResults.style.padding = "40px";
          noResults.style.fontSize = "1.2rem";
          noResults.style.color = "#43302e";
          noResults.style.fontFamily = "Playfair Display, serif";
          const main = document.querySelector("main");
          if (main) main.appendChild(noResult);
        }

        noResults.style.display = "block";
      } else if (noResults) {
        noResults.style.dislay = "none";
      }
    }

    searchInput.addEventListener("input", function () {
      performSearch(this.value);
    });

    searchInput.addEventListener("click", function () {
      performSearch(searchInput.value);
    });

    searchInput.addEventListener("keypress", function (e) {
      if (e.key === "Enter") {
        performSearch(this.value);
      }
    });
  }

  /*DYNAMIC CONTENT LOADING*/

  function loadDynamicContent() {
    /*Simulate loading additional content dynamically*/
    const serviceGrids = document.querySelectorAll(".services-grid");

    /*Add "Load More" button*/
    const loadMoreBtn = document.createElement("button");
    loadMoreBtn.textContent = "Load More Services";
    loadMoreBtn.className = "btn";
    loadMoreBtn.style.display = "block";
    loadMoreBtn.style.margin = "30px auto";

    loadMoreBtn.addEventListener("click", function () {
      /*Simulate loading new content*/
      const newItem = document.createElement("div");
      newItem.className = "service-item";
      newItem.style.animation = "fadeIn 0.5s ease";

      /*Add fade-in animation*/
      const style = document.createElement("style");
      style.textContent = `
                @keyframes fadeIn{
                from{ opacity: 0; transform: translateY(20px); }
                to { opacity: 1; transform: translateY(0); }
            }`;

      document.head.appendChild(style);

      newItem.innerHTML = `
            <img src="..Assets/Images/braided_back.jpg" alt="new-service" width="200" height="250" style="border-radius:10px;box-shadow:0 5px 15px black;transition:all 0.9s ease;">
            
            <p>Premium Style</p>
                <button class="btn-prod">R450</button>
                `;

      /*Add to last grid*/
      const lastGrid = serviceGrids[serviceGrids.length - 1];
      if (lastGrid) {
        lastGrid.appendChild(newItem);
        this.textContent = "More ervices Loaded!";
        this.disabled = true;
        this.style.opacity = "0.5";
        this.style.cursor = "not-allowed";
      }
    });

    const main = document.querySelector("main");
    if (main) {
      /*Insert load more button before footer*/
      const footer = document.querySelector("main");
      if (footer) {
        main.insertBefore(loadMoreBtn, footer);
      }
    }
  }

  /*FORM FUNCTIONALITY (enquiry.html)*/

  function initEnquiryForm() {
    const enquiryForm = document.getElementById("enquiry-form");
    if (!enquiryForm) return;

    enquiryForm.addEventListener("submit", function (e) {
      e.preventDefault();

      /*Get form values*/
      const name = document.getElementById("name")?.value.trim() || "";
      const email = document.getElementById("email")?.value.trim() || "";
      const phone = document.getElementById("phone")?.value.trim() || "";
      const service = document.getElementById("service")?.value.trim() || "";
      const message = document.getElementById("message")?.value.trim() || "";

      /*Validation*/
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

      /*Show errors or process*/
      const errorContainer =
        document.getElementById("formErrors") || createErrorContainer();

      if (errors.lentgh > 0) {
        errorContainer.innerHTML = errors
          .map(
            (err) =>
              `<div style="color:#fff1b5; pading: 8px; margin: 5px 0; background: #fff1b5; border-radius: 5px;"> ${err}</div>`,
          )
          .join("");
        erroContainer.style.dsplay = "block";
        return;
      }

      errorContainer.style.display = "none";

      /*Process enquiry - shw response*/
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

      const price = servicePices[service] || 0;
      const serviceName =
        document.querySelector(`#service option[value="${service}"]`)
          ?.textContent || service;

      responseContainer.innerHTML = `<div style="background:#c1dbe8;padding:20px;border-radius:10px;color:#43302e;margin-top:15px;animation:fadeIn 0.5s ease;">
                    <h3 style="font-family:'Playfair Display',serif;margin-bottom:10px;"> Enquiry Received!</h3>
                    <p><strong>Thank you, ${name}!</strong></p>
                    <p>Service: ${serviceName}</p>
                    <p>Price: R${price}</p>
                    <p>Availability: In stock and ready for booking.</p>
                    <p style="margin-top:10px;">We will contact you at ${email} or ${phone} within 24 hours.</p>
                    <button onclick="this.parentElement.style.display='none'" style="margin-top:15px;padding:8px 20px;border:none;border-radius:20px;background:#43302e;color:#fff1b5;cursor:pointer;">
                        Close
                    </button>
                </div>`;

      responseContainer.style.display = "block";

      /*Reset form*/
      enquirForm.reset();
    });
  }

  /*CONTACT FORM (contact_us.html)*/

  
}
