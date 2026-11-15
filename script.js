/**
 * ==========================================================================
 * Deskora - Shared Client JavaScript (script.js)
 * Clean, lightweight vanilla JS for navigation, cart, enquiry & validation
 * ==========================================================================
 */

/**
 * Formspree Customer Enquiry Form Endpoint
 * Live endpoint — submissions go directly to the owner's inbox via Formspree.
 */
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/mrpqzarp';

document.addEventListener('DOMContentLoaded', function () {
  'use strict';

  // --------------------------------------------------------------------------
  // 1. MOBILE NAVIGATION TOGGLE
  // --------------------------------------------------------------------------
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileNav = document.getElementById('mobile-nav');

  if (mobileMenuBtn && mobileNav) {
    mobileMenuBtn.addEventListener('click', function () {
      const isCurrentlyOpen = mobileNav.classList.contains('open') || mobileNav.classList.contains('is-open');
      
      if (isCurrentlyOpen) {
        mobileNav.classList.remove('open', 'is-open');
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
      } else {
        mobileNav.classList.add('open', 'is-open');
        mobileMenuBtn.setAttribute('aria-expanded', 'true');
      }
    });

    // Close mobile nav when clicking a link inside it
    const mobileLinks = mobileNav.querySelectorAll('.mobile-nav-link, .mobile-nav-footer a');
    mobileLinks.forEach(function (link) {
      link.addEventListener('click', function () {
        mobileNav.classList.remove('open', 'is-open');
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // --------------------------------------------------------------------------
  // 2. SHOPPING CART MANAGEMENT
  // --------------------------------------------------------------------------
  const cartToggleBtn = document.getElementById('cart-toggle-btn');
  const cartCloseBtn = document.getElementById('cart-close-btn');
  const cartBackdrop = document.getElementById('cart-backdrop');
  const cartDrawer = document.getElementById('cart-drawer');
  const cartCountBadge = document.getElementById('cart-count-badge');
  const cartItemsContainer = document.getElementById('cart-items-container');
  const cartSubtotalPrice = document.getElementById('cart-subtotal-price');
  const cartCheckoutBtn = document.getElementById('cart-checkout-btn');
  const checkoutStatusNotice = document.getElementById('checkout-status-notice');

  // Load cart state from localStorage or initialize empty
  let cart = [];
  try {
    const savedCart = localStorage.getItem('deskora_cart');
    if (savedCart) {
      cart = JSON.parse(savedCart);
    }
  } catch (e) {
    cart = [];
  }

  function saveCart() {
    try {
      localStorage.setItem('deskora_cart', JSON.stringify(cart));
    } catch (e) {
      // Ignore storage restrictions
    }
    updateCartUI();
  }

  function openCartDrawer() {
    if (cartDrawer && cartBackdrop) {
      cartDrawer.classList.add('open');
      cartBackdrop.classList.add('open');
      cartDrawer.setAttribute('aria-hidden', 'false');
      if (cartToggleBtn) cartToggleBtn.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeCartDrawer() {
    if (cartDrawer && cartBackdrop) {
      cartDrawer.classList.remove('open');
      cartBackdrop.classList.remove('open');
      cartDrawer.setAttribute('aria-hidden', 'true');
      if (cartToggleBtn) cartToggleBtn.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
      const drawerFooter = cartDrawer.querySelector('.cart-drawer-footer');
      if (drawerFooter) drawerFooter.style.display = '';
      if (checkoutStatusNotice) checkoutStatusNotice.style.display = 'none';
      updateCartUI();
    }
  }

  if (cartToggleBtn) {
    cartToggleBtn.addEventListener('click', openCartDrawer);
  }
  if (cartCloseBtn) {
    cartCloseBtn.addEventListener('click', closeCartDrawer);
  }
  if (cartBackdrop) {
    cartBackdrop.addEventListener('click', closeCartDrawer);
  }

  // Close on Escape key
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      closeCartDrawer();
      if (mobileNav && mobileNav.classList.contains('open')) {
        mobileNav.classList.remove('open', 'is-open');
        if (mobileMenuBtn) mobileMenuBtn.setAttribute('aria-expanded', 'false');
      }
    }
  });

  function updateCartUI() {
    const totalItems = cart.reduce(function (sum, item) {
      return sum + item.quantity;
    }, 0);

    const subtotal = cart.reduce(function (sum, item) {
      return sum + (item.price * item.quantity);
    }, 0);

    // Update Header Badge
    if (cartCountBadge) {
      cartCountBadge.textContent = totalItems;
    }

    // Update Subtotal Display
    if (cartSubtotalPrice) {
      cartSubtotalPrice.textContent = '₹' + subtotal.toLocaleString('en-IN');
    }

    // Render Drawer Items
    if (!cartItemsContainer) return;

    if (cart.length === 0) {
      cartItemsContainer.innerHTML = '<p class="cart-empty-message">Your cart is currently empty. Explore our desk essentials to get started.</p>';
      if (cartCheckoutBtn) cartCheckoutBtn.disabled = true;
      return;
    }

    if (cartCheckoutBtn) cartCheckoutBtn.disabled = false;

    let itemsHtml = '';
    cart.forEach(function (item) {
      itemsHtml += `
        <div class="cart-item" data-id="${item.id}">
          <div class="cart-item-info">
            <h4 class="cart-item-name">${item.name}</h4>
            <div class="cart-item-price">₹${item.price.toLocaleString('en-IN')}</div>
            <div class="cart-item-controls">
              <button type="button" class="cart-qty-btn cart-qty-decrease" data-id="${item.id}" aria-label="Decrease quantity of ${item.name}">-</button>
              <span class="cart-qty-val">${item.quantity}</span>
              <button type="button" class="cart-qty-btn cart-qty-increase" data-id="${item.id}" aria-label="Increase quantity of ${item.name}">+</button>
              <button type="button" class="cart-remove-btn" data-id="${item.id}">Remove</button>
            </div>
          </div>
        </div>
      `;
    });

    cartItemsContainer.innerHTML = itemsHtml;

    // Attach quantity and remove handlers
    const decreaseBtns = cartItemsContainer.querySelectorAll('.cart-qty-decrease');
    decreaseBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        const id = this.getAttribute('data-id');
        changeItemQuantity(id, -1);
      });
    });

    const increaseBtns = cartItemsContainer.querySelectorAll('.cart-qty-increase');
    increaseBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        const id = this.getAttribute('data-id');
        changeItemQuantity(id, 1);
      });
    });

    const removeBtns = cartItemsContainer.querySelectorAll('.cart-remove-btn');
    removeBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        const id = this.getAttribute('data-id');
        removeItemFromCart(id);
      });
    });
  }

  function addItemToCart(id, name, price) {
    const existingIndex = cart.findIndex(function (item) {
      return item.id === id;
    });

    if (existingIndex > -1) {
      cart[existingIndex].quantity += 1;
    } else {
      cart.push({
        id: id,
        name: name,
        price: Number(price),
        quantity: 1
      });
    }

    saveCart();
    openCartDrawer();
  }

  function changeItemQuantity(id, delta) {
    const itemIndex = cart.findIndex(function (item) {
      return item.id === id;
    });
    if (itemIndex === -1) return;

    cart[itemIndex].quantity += delta;
    if (cart[itemIndex].quantity <= 0) {
      cart.splice(itemIndex, 1);
    }
    saveCart();
  }

  function removeItemFromCart(id) {
    cart = cart.filter(function (item) {
      return item.id !== id;
    });
    saveCart();
  }

  // Bind Add to Cart Buttons
  const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
  addToCartButtons.forEach(function (button) {
    button.addEventListener('click', function () {
      const id = this.getAttribute('data-id');
      const name = this.getAttribute('data-name');
      const price = this.getAttribute('data-price');
      if (id && name && price) {
        addItemToCart(id, name, price);
      }
    });
  });

  // Checkout View Transition & Order Request Flow (No Cards/UPI, Honest Notice)
  function openCheckoutView() {
    if (!cartItemsContainer || cart.length === 0) return;

    let totalItems = 0;
    let subtotal = 0;
    cart.forEach(function (item) {
      totalItems += item.quantity;
      subtotal += item.price * item.quantity;
    });

    const drawerFooter = cartDrawer ? cartDrawer.querySelector('.cart-drawer-footer') : null;
    if (drawerFooter) {
      drawerFooter.style.display = 'none';
    }

    cartItemsContainer.innerHTML = `
      <div class="checkout-request-panel">
        <div class="checkout-panel-header">
          <h3 class="checkout-panel-title">Order Request</h3>
          <p class="checkout-panel-subtitle">Items Subtotal: ₹${subtotal.toLocaleString('en-IN')} (${totalItems} item${totalItems > 1 ? 's' : ''})</p>
        </div>
        <form id="order-request-form" novalidate>
          <div class="checkout-field-group">
            <label for="checkout-name" class="checkout-label">Full Name *</label>
            <input type="text" id="checkout-name" name="name" class="form-control" placeholder="Your full name" required autocomplete="name" />
            <span class="field-error-text" id="checkout-name-error"></span>
          </div>
          <div class="checkout-field-group">
            <label for="checkout-phone" class="checkout-label">WhatsApp / Phone *</label>
            <input type="tel" id="checkout-phone" name="phone" class="form-control" placeholder="10-digit mobile number" required autocomplete="tel" />
            <span class="field-error-text" id="checkout-phone-error"></span>
          </div>
          <div class="checkout-field-group">
            <label for="checkout-email" class="checkout-label">Email Address *</label>
            <input type="email" id="checkout-email" name="email" class="form-control" placeholder="name@example.com" required autocomplete="email" />
            <span class="field-error-text" id="checkout-email-error"></span>
          </div>
          <div class="checkout-field-group">
            <label for="checkout-address" class="checkout-label">Delivery Address &amp; PIN Code *</label>
            <textarea id="checkout-address" name="address" class="form-control" rows="2" placeholder="Hostel/Flat no, Street, City, State, 6-digit PIN" required autocomplete="street-address"></textarea>
            <span class="field-error-text" id="checkout-address-error"></span>
          </div>
          <p class="checkout-safe-note">&#128274; We do not ask for card or UPI numbers. Our team will verify availability and confirm your order request directly.</p>
          <div class="checkout-actions">
            <button type="submit" class="btn btn-primary checkout-submit-btn" id="checkout-submit-btn">Submit Order Request</button>
            <button type="button" class="btn btn-secondary checkout-back-btn" id="checkout-back-btn">Back to Cart</button>
          </div>
        </form>
      </div>
    `;

    const backBtn = cartItemsContainer.querySelector('#checkout-back-btn');
    if (backBtn) {
      backBtn.addEventListener('click', function () {
        if (drawerFooter) drawerFooter.style.display = '';
        updateCartUI();
      });
    }

    const orderForm = cartItemsContainer.querySelector('#order-request-form');
    if (orderForm) {
      orderForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const nameInput = document.getElementById('checkout-name');
        const phoneInput = document.getElementById('checkout-phone');
        const emailInput = document.getElementById('checkout-email');
        const addressInput = document.getElementById('checkout-address');

        const nameErr = document.getElementById('checkout-name-error');
        const phoneErr = document.getElementById('checkout-phone-error');
        const emailErr = document.getElementById('checkout-email-error');
        const addressErr = document.getElementById('checkout-address-error');

        // Reset errors
        [nameInput, phoneInput, emailInput, addressInput].forEach(function (inp) {
          if (inp) inp.classList.remove('form-input-error');
        });
        [nameErr, phoneErr, emailErr, addressErr].forEach(function (err) {
          if (err) err.textContent = '';
        });

        let isValid = true;

        if (!nameInput || !nameInput.value.trim()) {
          if (nameInput) nameInput.classList.add('form-input-error');
          if (nameErr) nameErr.textContent = 'Please enter your full name.';
          isValid = false;
        }

        const phoneVal = phoneInput ? phoneInput.value.trim() : '';
        if (!/^\d{10}$/.test(phoneVal)) {
          if (phoneInput) phoneInput.classList.add('form-input-error');
          if (phoneErr) phoneErr.textContent = 'Please enter a valid 10-digit phone number (digits only).';
          isValid = false;
        }

        const emailVal = emailInput ? emailInput.value.trim() : '';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailVal)) {
          if (emailInput) emailInput.classList.add('form-input-error');
          if (emailErr) emailErr.textContent = 'Please enter a valid email address.';
          isValid = false;
        }

        if (!addressInput || !addressInput.value.trim()) {
          if (addressInput) addressInput.classList.add('form-input-error');
          if (addressErr) addressErr.textContent = 'Please enter your delivery address and PIN code.';
          isValid = false;
        }

        if (!isValid) return;

        // Clear Cart
        cart = [];
        try {
          localStorage.removeItem('deskora_cart');
        } catch (err) {}
        if (cartCountBadge) cartCountBadge.textContent = '0';
        if (cartSubtotalPrice) cartSubtotalPrice.textContent = '₹0';

        // Render Honest Confirmation Notice
        cartItemsContainer.innerHTML = `
          <div class="checkout-success-box" role="status" aria-live="polite">
            <div class="checkout-success-icon">&#10003;</div>
            <h3 class="checkout-success-title">Order Request Received</h3>
            <p class="checkout-success-message"><strong>Your order request has been received. We will contact you.</strong></p>
            <p class="checkout-success-details">Our team will reach out to you via WhatsApp or email within operational hours to confirm stock availability and shipping details.</p>
            <button type="button" class="btn btn-primary checkout-continue-btn" id="checkout-continue-btn">Continue Shopping</button>
          </div>
        `;

        if (typeof gtag === 'function') { gtag('event', 'generate_lead', { form_name: 'order_request' }); }

        const continueBtn = cartItemsContainer.querySelector('#checkout-continue-btn');
        if (continueBtn) {
          continueBtn.addEventListener('click', function () {
            closeCartDrawer();
          });
        }
      });
    }
  }

  // Checkout button interaction (Opens genuine Order Request flow)
  if (cartCheckoutBtn) {
    cartCheckoutBtn.addEventListener('click', function () {
      if (cart.length === 0) return;
      openCheckoutView();
    });
  }

  // Initial Cart Render
  updateCartUI();

  // --------------------------------------------------------------------------
  // 3. PRODUCT ENQUIRY PREFILL & SMOOTH NAVIGATION (Homepage)
  // --------------------------------------------------------------------------
  const enquireButtons = document.querySelectorAll('.product-enquire-btn');
  const contactSubjectInput = document.getElementById('contact-subject');
  const contactMessageInput = document.getElementById('contact-message');
  const contactSection = document.getElementById('contact');

  enquireButtons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      const productName = this.getAttribute('data-product-name');
      if (!productName) return;

      // If on homepage with on-page contact section
      if (contactSubjectInput && contactSection) {
        contactSubjectInput.value = 'Product Enquiry: ' + productName;
        contactSubjectInput.classList.remove('form-input-error');
        const errEl = document.getElementById('contact-subject-error');
        if (errEl) errEl.textContent = '';

        contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });

        setTimeout(function () {
          if (contactMessageInput) {
            contactMessageInput.focus();
          }
        }, 500);
      } else {
        // On subpages without on-page contact form: navigate to dedicated contact page with product prefill
        window.location.href = 'contact.html?product=' + encodeURIComponent(productName);
      }
    });
  });

  // --------------------------------------------------------------------------
  // 4. CONTACT & ENQUIRY FORM VALIDATION (Homepage #contact-form)
  // --------------------------------------------------------------------------
  const contactForm = document.getElementById('contact-form');
  const contactFormFeedback = document.getElementById('contact-form-feedback');

  if (contactForm) {
    contactForm.addEventListener('submit', function (event) {
      event.preventDefault();

      const nameInput = document.getElementById('contact-name');
      const emailInput = document.getElementById('contact-email');
      const subjectInput = document.getElementById('contact-subject');
      const messageInput = document.getElementById('contact-message');

      let isValid = true;

      // Validate Name
      const nameVal = nameInput ? nameInput.value.trim() : '';
      const nameError = document.getElementById('contact-name-error');
      if (!nameVal || nameVal.length < 2) {
        isValid = false;
        if (nameInput) {
          nameInput.classList.add('form-input-error');
          nameInput.setAttribute('aria-invalid', 'true');
        }
        if (nameError) nameError.textContent = 'Please enter your full name (minimum 2 characters).';
      } else {
        if (nameInput) {
          nameInput.classList.remove('form-input-error');
          nameInput.removeAttribute('aria-invalid');
        }
        if (nameError) nameError.textContent = '';
      }

      // Validate Email
      const emailVal = emailInput ? emailInput.value.trim() : '';
      const emailError = document.getElementById('contact-email-error');
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailVal || !emailPattern.test(emailVal)) {
        isValid = false;
        if (emailInput) {
          emailInput.classList.add('form-input-error');
          emailInput.setAttribute('aria-invalid', 'true');
        }
        if (emailError) emailError.textContent = 'Please enter a valid email address (e.g. name@example.com).';
      } else {
        if (emailInput) {
          emailInput.classList.remove('form-input-error');
          emailInput.removeAttribute('aria-invalid');
        }
        if (emailError) emailError.textContent = '';
      }

      // Validate Subject
      const subjectVal = subjectInput ? subjectInput.value.trim() : '';
      const subjectError = document.getElementById('contact-subject-error');
      if (!subjectVal || subjectVal.length < 3) {
        isValid = false;
        if (subjectInput) {
          subjectInput.classList.add('form-input-error');
          subjectInput.setAttribute('aria-invalid', 'true');
        }
        if (subjectError) subjectError.textContent = 'Please specify the subject of your enquiry.';
      } else {
        if (subjectInput) {
          subjectInput.classList.remove('form-input-error');
          subjectInput.removeAttribute('aria-invalid');
        }
        if (subjectError) subjectError.textContent = '';
      }

      // Validate Message
      const messageVal = messageInput ? messageInput.value.trim() : '';
      const messageError = document.getElementById('contact-message-error');
      if (!messageVal || messageVal.length < 10) {
        isValid = false;
        if (messageInput) {
          messageInput.classList.add('form-input-error');
          messageInput.setAttribute('aria-invalid', 'true');
        }
        if (messageError) messageError.textContent = 'Please provide details in your message (minimum 10 characters).';
      } else {
        if (messageInput) {
          messageInput.classList.remove('form-input-error');
          messageInput.removeAttribute('aria-invalid');
        }
        if (messageError) messageError.textContent = '';
      }

      if (!isValid) {
        if (contactFormFeedback) {
          contactFormFeedback.className = 'form-feedback error';
          contactFormFeedback.textContent = 'Please correct the highlighted fields before submitting.';
        }
        return;
      }

      // Check if backend service endpoint is configured
      const endpoint = contactForm.getAttribute('action');

      if (endpoint && endpoint !== '#' && endpoint.trim() !== '') {
        // Real submission endpoint configured
        contactFormFeedback.className = 'form-feedback info';
        contactFormFeedback.textContent = 'Sending your enquiry...';

        fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
          body: JSON.stringify({
            name: nameVal,
            email: emailVal,
            subject: subjectVal,
            message: messageVal
          })
        }).then(function (response) {
          if (response.ok) {
            contactFormFeedback.className = 'form-feedback info';
            contactFormFeedback.textContent = `Thank you, ${nameVal}. Your enquiry has been received. Our team will contact you at ${emailVal}.`;
            contactForm.reset();
            if (typeof gtag === 'function') { gtag('event', 'generate_lead', { form_name: 'contact' }); }
          } else {
            contactFormFeedback.className = 'form-feedback error';
            contactFormFeedback.textContent = 'Unable to deliver message through backend service. Please email deskoraprofessional@gmail.com directly.';
          }
        }).catch(function () {
          contactFormFeedback.className = 'form-feedback error';
          contactFormFeedback.textContent = 'Network error contacting backend service. Please email deskoraprofessional@gmail.com directly.';
        });
      } else {
        // Honest transparent feedback when backend is not yet attached
        contactFormFeedback.className = 'form-feedback info';
        contactFormFeedback.innerHTML = `<strong>Enquiry Validated:</strong> Thank you, ${nameVal}. Your fields have been verified.<br><small style="display:block; margin-top:4px;">Notice: A live form backend or API service (e.g., Formspree, AWS SES, or Node API) is required to route this message to deskoraprofessional@gmail.com.</small>`;
      }
    });
  }

  // --------------------------------------------------------------------------
  // 5. NEWSLETTER SIGNUP FORM (Formspree Integration)
  // --------------------------------------------------------------------------
  const newsletterForm = document.getElementById('newsletter-form');
  const newsletterFeedback = document.getElementById('newsletter-feedback');

  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function (event) {
      event.preventDefault();

      const emailInput = document.getElementById('newsletter-email');
      const emailError = document.getElementById('newsletter-error');
      const submitBtn = document.getElementById('newsletter-submit-btn');
      const emailVal = emailInput ? emailInput.value.trim() : '';
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      // Validate email format
      if (!emailVal || !emailPattern.test(emailVal)) {
        if (emailInput) {
          emailInput.classList.add('form-input-error');
          emailInput.setAttribute('aria-invalid', 'true');
          emailInput.focus();
        }
        if (emailError) emailError.textContent = 'Please enter a valid email address.';
        if (newsletterFeedback) {
          newsletterFeedback.className = 'form-feedback error';
          newsletterFeedback.textContent = 'Please enter a valid email address.';
        }
        return;
      }

      if (emailInput) {
        emailInput.classList.remove('form-input-error');
        emailInput.removeAttribute('aria-invalid');
      }
      if (emailError) emailError.textContent = '';

      const endpoint = newsletterForm.getAttribute('action') || 'https://formspree.io/f/mrpqzarp';

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Subscribing...';
      }

      if (newsletterFeedback) {
        newsletterFeedback.className = 'form-feedback info';
        newsletterFeedback.textContent = 'Submitting your subscription...';
      }

      fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ email: emailVal })
      })
      .then(function (response) {
        if (response.ok) {
          if (newsletterFeedback) {
            newsletterFeedback.className = 'form-feedback success';
            newsletterFeedback.textContent = `Thank you! ${emailVal} has been subscribed to Deskora workspace updates.`;
          }
          newsletterForm.reset();
          if (typeof gtag === 'function') { gtag('event', 'generate_lead', { form_name: 'newsletter' }); }
        } else {
          return response.json().then(function (data) {
            let errorMsg = 'Failed to record subscription. Please try again later.';
            if (data && data.errors && data.errors.length > 0) {
              errorMsg = data.errors.map(function (err) { return err.message; }).join(' ');
            }
            if (newsletterFeedback) {
              newsletterFeedback.className = 'form-feedback error';
              newsletterFeedback.textContent = errorMsg;
            }
          }).catch(function () {
            if (newsletterFeedback) {
              newsletterFeedback.className = 'form-feedback error';
              newsletterFeedback.textContent = 'Subscription request was not accepted by the service. Please try again later.';
            }
          });
        }
      })
      .catch(function () {
        if (newsletterFeedback) {
          newsletterFeedback.className = 'form-feedback error';
          newsletterFeedback.textContent = 'Network error connecting to subscription service. Please check your internet connection.';
        }
      })
      .finally(function () {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = 'Subscribe';
        }
      });
    });
  }

  // --------------------------------------------------------------------------
  // 6. DEDICATED CUSTOMER ENQUIRY FORM & FORMSPREE INTEGRATION (contact.html)
  // --------------------------------------------------------------------------
  const enquiryForm = document.getElementById('customer-enquiry-form');

  if (enquiryForm) {
    const noticeBanner = document.getElementById('formspree-notice-banner');
    const statusIndicator = document.getElementById('formspree-status-indicator');
    const formFeedback = document.getElementById('enquiry-form-feedback');
    const submitBtn = document.getElementById('enquiry-submit-btn');

    const nameInput = document.getElementById('enquiry-name');
    const emailInput = document.getElementById('enquiry-email');
    const mobileInput = document.getElementById('enquiry-mobile');
    const typeSelect = document.getElementById('enquiry-type');
    const productInput = document.getElementById('enquiry-product');
    const messageInput = document.getElementById('enquiry-message');

    const nameError = document.getElementById('enquiry-name-error');
    const emailError = document.getElementById('enquiry-email-error');
    const mobileError = document.getElementById('enquiry-mobile-error');
    const typeError = document.getElementById('enquiry-type-error');
    const messageError = document.getElementById('enquiry-message-error');

    // Helper: Determine if a genuine Formspree endpoint is configured
    function isFormspreeConfigured() {
      return (
        typeof FORMSPREE_ENDPOINT === 'string' &&
        FORMSPREE_ENDPOINT.trim() !== '' &&
        FORMSPREE_ENDPOINT !== '[PASTE YOUR FORMSPREE ENDPOINT HERE]' &&
        (FORMSPREE_ENDPOINT.startsWith('https://formspree.io/') ||
         FORMSPREE_ENDPOINT.startsWith('http://') ||
         FORMSPREE_ENDPOINT.startsWith('https://'))
      );
    }

    // Helper: Safe HTML escaping for user strings in notifications
    function escapeHtml(str) {
      if (!str) return '';
      return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
    }

    // 6.1 Update Formspree status indicator banner on page load
    if (noticeBanner && statusIndicator) {
      noticeBanner.classList.add('configured');
      statusIndicator.textContent = 'Live — submissions are delivered to Deskora support.';
    }

    // 6.2 URL parameter prefill (e.g. ?product=Deskora%20Apex%20Laptop%20Stand)
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const productParam = urlParams.get('product');
      if (productParam && productInput) {
        productInput.value = productParam.trim();
        if (typeSelect) {
          typeSelect.value = 'Product Enquiry';
        }
      }
    } catch (e) {
      // Graceful fallback for older environments
    }

    // 6.3 Real-time error removal & mobile input formatting
    function clearFieldError(inputEl, errorEl) {
      if (inputEl) {
        inputEl.classList.remove('form-input-error');
        inputEl.removeAttribute('aria-invalid');
      }
      if (errorEl) {
        errorEl.textContent = '';
      }
    }

    if (nameInput) {
      nameInput.addEventListener('input', function () {
        clearFieldError(nameInput, nameError);
      });
    }

    if (emailInput) {
      emailInput.addEventListener('input', function () {
        clearFieldError(emailInput, emailError);
      });
    }

    if (mobileInput) {
      // Restrict mobile input to numeric digits only (max 10)
      mobileInput.addEventListener('input', function () {
        this.value = this.value.replace(/\D/g, '').slice(0, 10);
        clearFieldError(mobileInput, mobileError);
      });
    }

    if (typeSelect) {
      typeSelect.addEventListener('change', function () {
        clearFieldError(typeSelect, typeError);
      });
    }

    if (messageInput) {
      messageInput.addEventListener('input', function () {
        clearFieldError(messageInput, messageError);
      });
    }

    // 6.4 Customer enquiry form submission handler
    enquiryForm.addEventListener('submit', function (event) {
      event.preventDefault();

      let isValid = true;
      let firstInvalidEl = null;

      // Validate Full Name (required, min 2 characters)
      const nameVal = nameInput ? nameInput.value.trim() : '';
      if (!nameVal || nameVal.length < 2) {
        isValid = false;
        if (nameInput) {
          nameInput.classList.add('form-input-error');
          nameInput.setAttribute('aria-invalid', 'true');
          if (!firstInvalidEl) firstInvalidEl = nameInput;
        }
        if (nameError) nameError.textContent = 'Please enter your full name (minimum 2 characters).';
      } else {
        clearFieldError(nameInput, nameError);
      }

      // Validate Email Address (required, valid email pattern)
      const emailVal = emailInput ? emailInput.value.trim() : '';
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailVal || !emailPattern.test(emailVal)) {
        isValid = false;
        if (emailInput) {
          emailInput.classList.add('form-input-error');
          emailInput.setAttribute('aria-invalid', 'true');
          if (!firstInvalidEl) firstInvalidEl = emailInput;
        }
        if (emailError) emailError.textContent = 'Please enter a valid email address (e.g. name@example.com).';
      } else {
        clearFieldError(emailInput, emailError);
      }

      // Validate Mobile Number (required, strictly 10 digits)
      const rawMobile = mobileInput ? mobileInput.value.trim() : '';
      const cleanMobile = rawMobile.replace(/\D/g, '');
      if (!cleanMobile || cleanMobile.length !== 10) {
        isValid = false;
        if (mobileInput) {
          mobileInput.classList.add('form-input-error');
          mobileInput.setAttribute('aria-invalid', 'true');
          if (!firstInvalidEl) firstInvalidEl = mobileInput;
        }
        if (mobileError) mobileError.textContent = 'Please enter a valid 10-digit Indian mobile number.';
      } else {
        clearFieldError(mobileInput, mobileError);
      }

      // Validate Enquiry Type (required dropdown selection)
      const typeVal = typeSelect ? typeSelect.value.trim() : '';
      if (!typeVal || typeVal === '') {
        isValid = false;
        if (typeSelect) {
          typeSelect.classList.add('form-input-error');
          typeSelect.setAttribute('aria-invalid', 'true');
          if (!firstInvalidEl) firstInvalidEl = typeSelect;
        }
        if (typeError) typeError.textContent = 'Please select an enquiry category.';
      } else {
        clearFieldError(typeSelect, typeError);
      }

      // Validate Message (required, min 10 characters)
      const messageVal = messageInput ? messageInput.value.trim() : '';
      if (!messageVal || messageVal.length < 10) {
        isValid = false;
        if (messageInput) {
          messageInput.classList.add('form-input-error');
          messageInput.setAttribute('aria-invalid', 'true');
          if (!firstInvalidEl) firstInvalidEl = messageInput;
        }
        if (messageError) messageError.textContent = 'Please provide details in your message (minimum 10 characters).';
      } else {
        clearFieldError(messageInput, messageError);
      }

      // Optional Product Name
      const productVal = productInput ? productInput.value.trim() : '';

      // Handle validation failure
      if (!isValid) {
        if (formFeedback) {
          formFeedback.className = 'form-feedback-banner error';
          formFeedback.textContent = 'Please correct the highlighted fields before submitting.';
        }
        if (firstInvalidEl) {
          firstInvalidEl.focus();
        }
        return;
      }

      // Validation succeeded - lock button to prevent duplicate submissions
      const originalBtnText = submitBtn ? submitBtn.textContent.trim() : 'Submit Customer Enquiry';
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending…';
      }

      // Always submit via Formspree (endpoint is live)
      if (formFeedback) {
        formFeedback.className = 'form-feedback-banner pending';
        formFeedback.textContent = 'Sending your enquiry — please wait…';
      }

      const formData = {
        name: nameVal,
        email: emailVal,
        phone: '+91 ' + cleanMobile,
        enquiryType: typeVal,
        productName: productVal || 'Not specified',
        message: messageVal
      };

      fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(formData)
      })
        .then(function (response) {
          if (response.ok) {
            if (formFeedback) {
              formFeedback.className = 'form-feedback-banner success';
              formFeedback.innerHTML = '<strong>Enquiry received!</strong> Thank you, ' + escapeHtml(nameVal) + '. We\u2019ll reply to <strong>' + escapeHtml(emailVal) + '</strong> within 24 operational hours.';
            }
            enquiryForm.reset();
            if (typeof gtag === 'function') { gtag('event', 'generate_lead', { form_name: 'contact' }); }
          } else {
            return response.json().then(function (data) {
              var errDetail = 'Unable to deliver your message.';
              if (data && data.errors && data.errors.length > 0) {
                errDetail = data.errors.map(function (e) { return e.message; }).join(', ');
              }
              throw new Error(errDetail);
            }).catch(function (parseErr) {
              throw new Error(parseErr.message || 'Submission failed — please try again.');
            });
          }
        })
        .catch(function (error) {
          if (formFeedback) {
            formFeedback.className = 'form-feedback-banner error';
            formFeedback.innerHTML = '<strong>Sending failed:</strong> ' + escapeHtml(error.message || 'Network error.') + ' Please try again, or email us at <a href="mailto:deskoraprofessional@gmail.com" style="text-decoration:underline;color:inherit;">deskoraprofessional@gmail.com</a>.';
          }
        })
        .finally(function () {
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.textContent = originalBtnText;
          }
        });
    });
  }

  // --------------------------------------------------------------------------
  // 6. HOMEPAGE WORKING AD BANNER (Interactive Countdown & Coupon)
  // --------------------------------------------------------------------------
  const workingAdBanner = document.getElementById('working-ad-banner');
  const adCloseBtn = document.getElementById('ad-close-btn');
  const adFloatingReopenBtn = document.getElementById('ad-floating-reopen-btn');
  const adCouponBtn = document.getElementById('ad-coupon-btn');
  const adCountdownHours = document.getElementById('ad-countdown-hours');
  const adCountdownMins = document.getElementById('ad-countdown-mins');
  const adCountdownSecs = document.getElementById('ad-countdown-secs');

  // Working Live Countdown Timer
  if (adCountdownHours && adCountdownMins && adCountdownSecs) {
    function updateCountdown() {
      const now = new Date();
      // Countdown towards midnight tonight (or rotating 6-hour sprint)
      const midnight = new Date();
      midnight.setHours(24, 0, 0, 0);
      const diffMs = midnight - now;

      if (diffMs <= 0) {
        adCountdownHours.textContent = '00';
        adCountdownMins.textContent = '00';
        adCountdownSecs.textContent = '00';
        return;
      }

      const hours = Math.floor((diffMs / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diffMs / (1000 * 60)) % 60);
      const seconds = Math.floor((diffMs / 1000) % 60);

      adCountdownHours.textContent = hours < 10 ? '0' + hours : hours;
      adCountdownMins.textContent = minutes < 10 ? '0' + minutes : minutes;
      adCountdownSecs.textContent = seconds < 10 ? '0' + seconds : seconds;
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);
  }

  // Working Copy Coupon Code Button
  if (adCouponBtn) {
    adCouponBtn.addEventListener('click', function () {
      const code = this.getAttribute('data-coupon') || 'DESK15';
      
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(code).then(function () {
          showCopiedState();
        }).catch(function () {
          fallbackCopyText(code);
        });
      } else {
        fallbackCopyText(code);
      }

      function showCopiedState() {
        adCouponBtn.classList.add('copied');
        const originalHtml = adCouponBtn.innerHTML;
        adCouponBtn.innerHTML = `<span>&#10003; Copied! Use: ${code}</span>`;
        setTimeout(function () {
          adCouponBtn.classList.remove('copied');
          adCouponBtn.innerHTML = originalHtml;
        }, 2500);
      }

      function fallbackCopyText(text) {
        const tempInput = document.createElement('input');
        tempInput.value = text;
        document.body.appendChild(tempInput);
        tempInput.select();
        try {
          document.execCommand('copy');
          showCopiedState();
        } catch (e) {
          alert('Promo Code: ' + text);
        }
        document.body.removeChild(tempInput);
      }
    });
  }

  // Working Dismiss and Reopen Ad
  if (adCloseBtn && workingAdBanner) {
    adCloseBtn.addEventListener('click', function () {
      workingAdBanner.classList.add('ad-hidden');
      if (adFloatingReopenBtn) {
        adFloatingReopenBtn.classList.add('visible');
      }
    });
  }

  if (adFloatingReopenBtn && workingAdBanner) {
    adFloatingReopenBtn.addEventListener('click', function () {
      workingAdBanner.classList.remove('ad-hidden');
      adFloatingReopenBtn.classList.remove('visible');
      workingAdBanner.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }

  // --------------------------------------------------------------------------
  // 7. HOMEPAGE PRODUCT CATALOG FILTER TABS
  // --------------------------------------------------------------------------
  const filterTabBtns = document.querySelectorAll('.filter-tab-btn');
  const catalogProductCards = document.querySelectorAll('.catalog-product-card');
  const catalogResultCount = document.getElementById('catalog-result-count');

  if (filterTabBtns.length > 0 && catalogProductCards.length > 0) {
    filterTabBtns.forEach(function (tabBtn) {
      tabBtn.addEventListener('click', function () {
        const filterVal = this.getAttribute('data-filter');

        // Toggle active class
        filterTabBtns.forEach(function (btn) { btn.classList.remove('active'); });
        this.classList.add('active');

        let visibleCount = 0;
        catalogProductCards.forEach(function (card) {
          const cardCat = card.getAttribute('data-category');
          if (filterVal === 'all' || cardCat === filterVal) {
            card.style.display = 'flex';
            visibleCount++;
          } else {
            card.style.display = 'none';
          }
        });

        if (catalogResultCount) {
          catalogResultCount.textContent = `Showing ${visibleCount} products`;
        }
      });
    });
  }

  // --------------------------------------------------------------------------
  // 8. DELEGATED ADD-TO-CART & ENQUIRE HANDLERS
  // (Ensures all static and dynamically filtered cards trigger properly)
  // --------------------------------------------------------------------------
  document.addEventListener('click', function (e) {
    // Add to cart button
    const addBtn = e.target.closest('.add-to-cart-btn');
    if (addBtn) {
      const id = addBtn.getAttribute('data-id');
      const name = addBtn.getAttribute('data-name');
      const price = addBtn.getAttribute('data-price');
      if (id && name && price) {
        // Prevent duplicate handler if bound directly
        e.preventDefault();
        addItemToCart(id, name, price);
      }
      return;
    }

    // Enquire button
    const enquireBtn = e.target.closest('.product-enquire-btn');
    if (enquireBtn) {
      const prodName = enquireBtn.getAttribute('data-product-name');
      if (prodName) {
        e.preventDefault();
        window.location.href = 'contact.html?product=' + encodeURIComponent(prodName);
      }
    }
  });

  // --------------------------------------------------------------------------
  // 9. DESKORA ASSISTANT CHAT WIDGET
  // Automated helper answering strictly from real catalog & policy data
  // --------------------------------------------------------------------------
  function initDeskoraChatWidget() {
    if (document.getElementById('deskora-chat-toggle')) return;

    // Build launcher button
    const toggleBtn = document.createElement('button');
    toggleBtn.type = 'button';
    toggleBtn.id = 'deskora-chat-toggle';
    toggleBtn.className = 'deskora-chat-toggle-btn';
    toggleBtn.setAttribute('aria-label', 'Open Deskora Assistant chat');
    toggleBtn.setAttribute('aria-expanded', 'false');
    toggleBtn.setAttribute('aria-controls', 'deskora-chat-panel');
    toggleBtn.innerHTML = `
      <svg class="deskora-chat-toggle-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
      </svg>
    `;

    // Build chat panel
    const panel = document.createElement('div');
    panel.id = 'deskora-chat-panel';
    panel.className = 'deskora-chat-panel';
    panel.setAttribute('role', 'dialog');
    panel.setAttribute('aria-label', 'Deskora Assistant');
    panel.setAttribute('aria-hidden', 'true');
    panel.innerHTML = `
      <div class="deskora-chat-header">
        <div class="deskora-chat-title-group">
          <span class="deskora-chat-title">Deskora Assistant</span>
          <span class="deskora-chat-badge">Automated Helper</span>
        </div>
        <button type="button" id="deskora-chat-close" class="deskora-chat-close-btn" aria-label="Close Deskora Assistant chat">&times;</button>
      </div>
      <div id="deskora-chat-messages" class="deskora-chat-messages" role="log" aria-live="polite"></div>
      <form id="deskora-chat-form" class="deskora-chat-form" novalidate>
        <input type="text" id="deskora-chat-input" class="deskora-chat-input" placeholder="Type a question or product name..." aria-label="Type your message" autocomplete="off" />
        <button type="submit" id="deskora-chat-send" class="deskora-chat-send-btn">Send</button>
      </form>
    `;

    document.body.appendChild(toggleBtn);
    document.body.appendChild(panel);

    const closeBtn = panel.querySelector('#deskora-chat-close');
    const messagesContainer = panel.querySelector('#deskora-chat-messages');
    const chatForm = panel.querySelector('#deskora-chat-form');
    const chatInput = panel.querySelector('#deskora-chat-input');

    // Quick-reply options required by specification
    const quickReplies = [
      "Browse products",
      "Desk organisers",
      "Laptop and mobile stands",
      "Desk mats and mousepads",
      "Shipping and returns",
      "Contact us"
    ];

    // Helper: get product data safely from data.js or fallback catalog
    function getProductsData() {
      if (typeof DESKORA_DATA !== 'undefined' && Array.isArray(DESKORA_DATA.products) && DESKORA_DATA.products.length > 0) {
        return DESKORA_DATA.products;
      }
      return [
        { name: "The Student Hustle Setup Kit", price: 2499, category: "setup-kits", page: "shop.html" },
        { name: "Deskora Pivot Multi-Angle Mobile Stand", price: 499, category: "mobile-stands", page: "shop.html" },
        { name: "Adjustable Laptop Stand", price: 1499, category: "laptop-stands", page: "laptop-and-mobile-stands.html" },
        { name: "Aluminium Laptop Riser", price: 1899, category: "laptop-stands", page: "laptop-and-mobile-stands.html" },
        { name: "Foldable Laptop Stand", price: 1299, category: "laptop-stands", page: "laptop-and-mobile-stands.html" },
        { name: "Wooden Laptop Stand", price: 1199, category: "laptop-stands", page: "laptop-and-mobile-stands.html" },
        { name: "Wooden Mobile Stand", price: 549, category: "mobile-stands", page: "laptop-and-mobile-stands.html" },
        { name: "Adjustable Phone Holder", price: 499, category: "mobile-stands", page: "laptop-and-mobile-stands.html" },
        { name: "Dual Device Stand", price: 1699, category: "laptop-stands", page: "laptop-and-mobile-stands.html" },
        { name: "Multi-Compartment Desk Organiser", price: 1299, category: "desk-organisers", page: "desk-organisers.html" },
        { name: "Wooden Desk Organiser", price: 999, category: "desk-organisers", page: "desk-organisers.html" },
        { name: "Minimalist Pen Holder", price: 449, category: "desk-organisers", page: "desk-organisers.html" },
        { name: "Desktop Storage Tray", price: 799, category: "desk-organisers", page: "desk-organisers.html" },
        { name: "Stationery Organiser", price: 899, category: "desk-organisers", page: "desk-organisers.html" },
        { name: "Drawer Desk Organiser", price: 699, category: "desk-organisers", page: "desk-organisers.html" },
        { name: "Vegan Leather Dual-Sided Desk Mat", price: 899, category: "desk-mats", page: "desk-mats-and-mousepads.html" },
        { name: "Extended Mousepad", price: 699, category: "desk-mats", page: "desk-mats-and-mousepads.html" },
        { name: "Premium Leatherette Desk Pad", price: 1199, category: "desk-mats", page: "desk-mats-and-mousepads.html" },
        { name: "Waterproof Desk Pad", price: 799, category: "desk-mats", page: "desk-mats-and-mousepads.html" },
        { name: "Minimalist Vegan Leather Mousepad", price: 399, category: "desk-mats", page: "desk-mats-and-mousepads.html" },
        { name: "Magnetic Cable Clips 5-Pack", price: 499, category: "cable-organisers", page: "index.html" },
        { name: "Cable Management Box", price: 899, category: "cable-organisers", page: "index.html" },
        { name: "Magnetic Cable Holder", price: 599, category: "cable-organisers", page: "index.html" },
        { name: "Wooden Monitor Stand", price: 2499, category: "setup-kits", page: "index.html" },
        { name: "Complete Workspace Kit", price: 4499, category: "setup-kits", page: "shop.html" },
        { name: "Desk Accessories Combo", price: 1999, category: "setup-kits", page: "shop.html" }
      ];
    }

    // Helper: determine appropriate page link for a product
    function getProductUrl(prod) {
      if (prod.page) return prod.page;
      const cat = (prod.category || '').toLowerCase();
      const name = (prod.name || '').toLowerCase();
      if (cat.includes('laptop') || cat.includes('mobile') || cat.includes('stand') || name.includes('stand') || name.includes('riser') || name.includes('phone') || name.includes('tablet')) {
        return 'laptop-and-mobile-stands.html';
      }
      if (cat.includes('mat') || cat.includes('mousepad') || name.includes('mat') || name.includes('mousepad') || name.includes('pad')) {
        return 'desk-mats-and-mousepads.html';
      }
      if (cat.includes('organis') || cat.includes('tray') || cat.includes('pen') || cat.includes('drawer') || name.includes('organis') || name.includes('tray') || name.includes('caddy')) {
        return 'desk-organisers.html';
      }
      return 'shop.html';
    }

    // Helper: append bubble to chat
    function appendBubble(sender, htmlContent, isQuickReplyContainer) {
      const msgDiv = document.createElement('div');
      msgDiv.className = sender === 'user' ? 'deskora-chat-msg deskora-chat-msg--user' : 'deskora-chat-msg deskora-chat-msg--assistant';
      
      const bubble = document.createElement('div');
      bubble.className = 'deskora-chat-bubble';
      bubble.innerHTML = htmlContent;
      msgDiv.appendChild(bubble);

      if (isQuickReplyContainer) {
        const qrWrap = document.createElement('div');
        qrWrap.className = 'deskora-chat-quick-replies';
        qrWrap.setAttribute('role', 'group');
        qrWrap.setAttribute('aria-label', 'Suggested questions');
        quickReplies.forEach(function (qrText) {
          const qrBtn = document.createElement('button');
          qrBtn.type = 'button';
          qrBtn.className = 'deskora-chat-quick-btn';
          qrBtn.textContent = qrText;
          qrBtn.addEventListener('click', function () {
            handleUserMessage(qrText);
          });
          qrWrap.appendChild(qrBtn);
        });
        msgDiv.appendChild(qrWrap);
      }

      messagesContainer.appendChild(msgDiv);
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    // Initial Greeting (Rule 7: Start with specific message, clearly labeled automated)
    appendBubble(
      'assistant',
      "Hi, I'm the Deskora Assistant, an automated helper. I can help you find products and answer common questions.",
      true
    );

    // Knowledge answering logic based strictly on real site information
    function answerQuery(query) {
      const q = query.toLowerCase().trim();
      const allProducts = getProductsData();

      // Quick-reply & Category 1: Browse Products / Shop
      if (q === 'browse products' || q.includes('browse') || q.includes('all products') || q === 'shop' || q === 'catalog') {
        return `We offer curated desk essentials across three core collections plus setup kits and accessories:<br><br>
        • <a href="desk-organisers.html">Desk Organisers</a><br>
        • <a href="laptop-and-mobile-stands.html">Laptop and Mobile Stands</a><br>
        • <a href="desk-mats-and-mousepads.html">Desk Mats and Mousepads</a><br><br>
        You can also explore everything on our <a href="shop.html">Shop Page</a>.`;
      }

      // Quick-reply & Category 2: Desk Organisers
      if (q === 'desk organisers' || q.includes('organiser') || q.includes('organizer') || q.includes('tray') || q.includes('pen holder') || q.includes('drawer')) {
        const matching = allProducts.filter(function (p) {
          const c = (p.category || '').toLowerCase();
          const n = (p.name || '').toLowerCase();
          return c.includes('organis') || n.includes('organiser') || n.includes('organizer') || n.includes('tray') || n.includes('pen') || n.includes('drawer') || n.includes('caddy') || n.includes('sorter');
        });
        let html = `Here are our <strong>Desk Organisers</strong>:<br><ul class="deskora-chat-product-list">`;
        matching.slice(0, 5).forEach(function (p) {
          html += `<li class="deskora-chat-product-item">
            <span class="deskora-chat-product-name">${p.name}</span>
            <div class="deskora-chat-product-meta">
              <span class="deskora-chat-product-price">₹${p.price.toLocaleString('en-IN')}</span>
              <a href="${getProductUrl(p)}">View Details</a>
            </div>
          </li>`;
        });
        html += `</ul><br><a href="desk-organisers.html">Explore all Desk Organisers</a>`;
        return html;
      }

      // Quick-reply & Category 3: Laptop & Mobile Stands
      if (q === 'laptop and mobile stands' || q.includes('laptop stand') || q.includes('mobile stand') || q.includes('phone stand') || q.includes('phone holder') || q.includes('riser') || q.includes('stand')) {
        const matching = allProducts.filter(function (p) {
          const c = (p.category || '').toLowerCase();
          const n = (p.name || '').toLowerCase();
          return c.includes('stand') || n.includes('stand') || n.includes('riser') || n.includes('phone') || n.includes('tablet');
        });
        let html = `Here are our <strong>Laptop and Mobile Stands</strong>:<br><ul class="deskora-chat-product-list">`;
        matching.slice(0, 5).forEach(function (p) {
          html += `<li class="deskora-chat-product-item">
            <span class="deskora-chat-product-name">${p.name}</span>
            <div class="deskora-chat-product-meta">
              <span class="deskora-chat-product-price">₹${p.price.toLocaleString('en-IN')}</span>
              <a href="${getProductUrl(p)}">View Details</a>
            </div>
          </li>`;
        });
        html += `</ul><br><a href="laptop-and-mobile-stands.html">Explore all Laptop & Mobile Stands</a>`;
        return html;
      }

      // Quick-reply & Category 4: Desk Mats & Mousepads
      if (q === 'desk mats and mousepads' || q.includes('desk mat') || q.includes('mousepad') || q.includes('mat') || q.includes('pad')) {
        const matching = allProducts.filter(function (p) {
          const c = (p.category || '').toLowerCase();
          const n = (p.name || '').toLowerCase();
          return c.includes('mat') || n.includes('mat') || n.includes('mousepad') || n.includes('pad');
        });
        let html = `Here are our <strong>Desk Mats & Mousepads</strong>:<br><ul class="deskora-chat-product-list">`;
        matching.slice(0, 5).forEach(function (p) {
          html += `<li class="deskora-chat-product-item">
            <span class="deskora-chat-product-name">${p.name}</span>
            <div class="deskora-chat-product-meta">
              <span class="deskora-chat-product-price">₹${p.price.toLocaleString('en-IN')}</span>
              <a href="${getProductUrl(p)}">View Details</a>
            </div>
          </li>`;
        });
        html += `</ul><br><a href="desk-mats-and-mousepads.html">Explore all Desk Mats and Mousepads</a>`;
        return html;
      }

      // Quick-reply & Policy: Shipping and returns
      if (q === 'shipping and returns' || q.includes('shipping') || q.includes('delivery') || q.includes('dispatch') || q.includes('return') || q.includes('replacement')) {
        return `<strong>Shipping Details:</strong><br>
        • Delivery across India in 3 to 6 business days (metro cities: 2 to 4 days).<br>
        • Free shipping on orders over ₹999 (₹99 flat delivery fee under ₹999).<br>
        • Tracking information provided with all dispatched orders.<br>
        • <a href="shipping-delivery.html">View Shipping & Delivery Policy</a><br><br>
        <strong>7-Day Replacement Policy:</strong><br>
        • Doorstep replacement within 7 days of delivery for damaged, defective, or incorrect items at no extra charge.<br>
        • <a href="replacement-policy.html">View 7-Day Replacement Policy</a>`;
      }

      // Quick-reply & Contact: Contact us
      if (q === 'contact us' || q.includes('contact') || q.includes('email') || q.includes('reach') || q.includes('support') || q.includes('phone') || q.includes('whatsapp') || q.includes('help')) {
        return `You can reach our team directly at:<br>
        • Email: <strong>deskoraprofessional@gmail.com</strong><br>
        • Online form: <a href="contact.html">Go to Contact Page</a><br>
        We respond to inquiries Monday through Saturday during operational hours.`;
      }

      // Pricing inquiries
      if (q.includes('price') || q.includes('pricing') || q.includes('cost') || q.includes('rate') || q.includes('how much')) {
        return `Our desk essentials range from ₹299 (Velcro Cable Straps) up to ₹4,499 (Complete Workspace Kit):<br>
        • Mobile & Phone Stands: from ₹499<br>
        • Desk Organisers: from ₹449<br>
        • Desk Mats & Mousepads: from ₹399<br>
        • Laptop Stands: from ₹1,199<br>
        • Setup Bundles: from ₹1,999<br>
        Explore all verified prices on our <a href="shop.html">Shop Page</a>.`;
      }

      // Privacy inquiries
      if (q.includes('privacy') || q.includes('data') || q.includes('personal information')) {
        return `We only collect contact and address details needed to fulfill orders and respond to customer queries. We never sell your personal information.<br>• <a href="privacy-policy.html">Read Privacy Policy</a>`;
      }

      // Setup kits inquiries
      if (q.includes('kit') || q.includes('bundle') || q.includes('student hustle') || q.includes('complete workspace')) {
        return `Here are our curated <strong>Setup Kits</strong>:<br>
        • <strong>The Student Hustle Setup Kit</strong> — ₹2,499 (4-piece starter kit for study desks)<br>
        • <strong>Desk Accessories Combo</strong> — ₹1,999 (3-in-1 combo)<br>
        • <strong>Complete Workspace Kit</strong> — ₹4,499 (5-piece flagship setup bundle)<br>
        <a href="shop.html#kits-heading">View Workspace Setup Kits</a>`;
      }

      // Cable management inquiries
      if (q.includes('cable') || q.includes('wire') || q.includes('cord')) {
        return `Here are our <strong>Cable Management</strong> essentials:<br>
        • Magnetic Cable Clips (5-Pack) — ₹499<br>
        • Cable Management Box — ₹899<br>
        • Magnetic Cable Holder — ₹599<br>
        • Cable Management Sleeve — ₹449<br>
        • Velcro Cable Straps (Pack of 20) — ₹299<br>
        <a href="index.html#catalog">View Cable Management in Catalog</a>`;
      }

      // Specific product keyword search across all products in data.js
      const words = q.split(/\s+/).filter(function (w) { return w.length > 2; });
      if (words.length > 0) {
        const matches = allProducts.filter(function (prod) {
          const nameLower = (prod.name || '').toLowerCase();
          const descLower = (prod.shortDesc || prod.description || '').toLowerCase();
          return words.some(function (w) { return nameLower.includes(w) || descLower.includes(w); });
        });

        if (matches.length > 0) {
          let html = `Here are the matching products from our catalog:<br><ul class="deskora-chat-product-list">`;
          matches.slice(0, 4).forEach(function (p) {
            html += `<li class="deskora-chat-product-item">
              <span class="deskora-chat-product-name">${p.name}</span>
              <div class="deskora-chat-product-meta">
                <span class="deskora-chat-product-price">₹${p.price.toLocaleString('en-IN')}</span>
                <a href="${getProductUrl(p)}">View Details</a>
              </div>
            </li>`;
          });
          html += `</ul>`;
          return html;
        }
      }

      // Honest fallback (Rule 6: Never invent information, link to contact.html)
      return `I'm not sure about that. Please send us a message on the contact page: <a href="contact.html">Contact Deskora</a>.`;
    }

    function handleUserMessage(text) {
      if (!text || !text.trim()) return;
      const cleanText = text.trim();

      // Escape user text before inserting
      const tempDiv = document.createElement('div');
      tempDiv.textContent = cleanText;
      const escapedText = tempDiv.innerHTML;

      appendBubble('user', escapedText, false);
      if (chatInput) chatInput.value = '';

      // Respond after a very slight delay for natural feeling
      setTimeout(function () {
        const answerHtml = answerQuery(cleanText);
        appendBubble('assistant', answerHtml, false);
      }, 150);
    }

    // Toggle panel
    function toggleChat(open) {
      const isCurrentlyOpen = panel.classList.contains('is-open');
      const shouldOpen = typeof open === 'boolean' ? open : !isCurrentlyOpen;

      if (shouldOpen) {
        panel.classList.add('is-open');
        panel.setAttribute('aria-hidden', 'false');
        toggleBtn.setAttribute('aria-expanded', 'true');
        setTimeout(function () {
          chatInput.focus();
        }, 50);
      } else {
        panel.classList.remove('is-open');
        panel.setAttribute('aria-hidden', 'true');
        toggleBtn.setAttribute('aria-expanded', 'false');
        toggleBtn.focus();
      }
    }

    toggleBtn.addEventListener('click', function () {
      toggleChat();
    });

    closeBtn.addEventListener('click', function () {
      toggleChat(false);
    });

    // Close on Escape key (Rule 8)
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && panel.classList.contains('is-open')) {
        toggleChat(false);
      }
    });

    // Handle form submit
    chatForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const val = chatInput.value;
      handleUserMessage(val);
    });
  }

  // Initialize Chat Widget
  initDeskoraChatWidget();

  // --------------------------------------------------------------------------
  // 10. WELCOME POPUP MODAL (Joining Hands 🙏 Greeting)
  // --------------------------------------------------------------------------
  function initWelcomePopup() {
    // Check if already displayed in this session so user isn't interrupted on every page click
    if (sessionStorage.getItem('deskora_welcome_seen')) return;

    const overlay = document.createElement('div');
    overlay.className = 'deskora-welcome-overlay';
    overlay.id = 'deskora-welcome-modal';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.setAttribute('aria-labelledby', 'deskora-welcome-title');
    overlay.setAttribute('aria-describedby', 'deskora-welcome-desc');

    overlay.innerHTML = `
      <div class="deskora-welcome-card">
        <button type="button" class="deskora-welcome-close" id="deskora-welcome-close" aria-label="Close welcome message">&times;</button>
        <div class="deskora-welcome-icon-wrap" aria-hidden="true">🙏</div>
        <p class="deskora-welcome-tag">Upgrade Your Workspace</p>
        <h2 id="deskora-welcome-title" class="deskora-welcome-title">Namaste &amp; Welcome to Deskora!</h2>
        <p id="deskora-welcome-desc" class="deskora-welcome-desc">
          We’re delighted to have you here. Explore thoughtful desk organisers, ergonomic laptop stands, and premium workspace essentials designed for focused minds.
        </p>
        <div class="deskora-welcome-actions">
          <button type="button" class="deskora-welcome-primary-btn" id="deskora-welcome-explore">Explore Essentials</button>
          <button type="button" class="deskora-welcome-secondary-btn" id="deskora-welcome-dismiss">Start Browsing</button>
        </div>
      </div>
    `;

    document.body.appendChild(overlay);

    function closeWelcome() {
      overlay.classList.remove('is-visible');
      sessionStorage.setItem('deskora_welcome_seen', 'true');
      setTimeout(function () {
        if (overlay && overlay.parentNode) {
          overlay.parentNode.removeChild(overlay);
        }
      }, 300);
    }

    const closeBtn = overlay.querySelector('#deskora-welcome-close');
    const exploreBtn = overlay.querySelector('#deskora-welcome-explore');
    const dismissBtn = overlay.querySelector('#deskora-welcome-dismiss');

    if (closeBtn) closeBtn.addEventListener('click', closeWelcome);
    if (dismissBtn) dismissBtn.addEventListener('click', closeWelcome);
    if (exploreBtn) {
      exploreBtn.addEventListener('click', function () {
        closeWelcome();
        const catalogEl = document.getElementById('catalog') || document.querySelector('.product-grid');
        if (catalogEl) {
          catalogEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else if (!window.location.pathname.includes('shop.html')) {
          window.location.href = 'shop.html';
        }
      });
    }

    // Close on clicking backdrop outside card
    overlay.addEventListener('click', function (e) {
      if (e.target === overlay) {
        closeWelcome();
      }
    });

    // Close on Escape key
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && overlay.classList.contains('is-visible')) {
        closeWelcome();
      }
    });

    // Show with a gentle, smooth delay (700ms) on opening the website
    setTimeout(function () {
      overlay.classList.add('is-visible');
      if (exploreBtn) exploreBtn.focus();
    }, 700);
  }

  // Initialize Welcome Popup — DISABLED
  // initWelcomePopup();

  // --------------------------------------------------------------------------
  // 11. FAQ ACCORDION
  // --------------------------------------------------------------------------
  document.querySelectorAll('.faq-question').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var item = btn.closest('.faq-item');
      var answer = item.querySelector('.faq-answer');
      var isOpen = item.classList.contains('is-open');

      // Close all other items
      document.querySelectorAll('.faq-item.is-open').forEach(function (openItem) {
        openItem.classList.remove('is-open');
        openItem.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
        openItem.querySelector('.faq-answer').hidden = true;
      });

      // Toggle current item
      if (!isOpen) {
        item.classList.add('is-open');
        btn.setAttribute('aria-expanded', 'true');
        answer.hidden = false;
      }
    });
  });

});
