// ==========================================================================
// DESKORA - APPLICATION CONTROLLER & STATE STORE
// ==========================================================================

const DeskoraApp = {
  // State
  state: {
    cart: [],
    wishlist: new Set(),
    compareList: [],
    appliedCoupon: null,
    selectedCategory: "all",
    activeQuickFilter: null,
    searchQuery: "",
    priceFilter: 7000,
    sortBy: "featured",
    quizStep: 0,
    quizAnswers: {},
    orders: []
  },

  // Initialize
  init() {
    this.loadPersistedState();
    this.setupEventListeners();
    this.renderHeaderBadges();
    this.renderCategoryNav();
    this.renderQuickFilters();
    this.renderHeroHotspots();
    this.renderSetupKits();
    this.renderProducts();
    this.renderReviews();
    this.renderFaqs();
    this.renderIndianStates();
    this.refreshIcons();

    // Check if URL has query parameters
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get("quiz") === "open") {
      this.openQuizModal();
    }
  },

  // Storage Persistence
  loadPersistedState() {
    try {
      const savedCart = localStorage.getItem("deskora_cart");
      if (savedCart) this.state.cart = JSON.parse(savedCart);

      const savedWishlist = localStorage.getItem("deskora_wishlist");
      if (savedWishlist) this.state.wishlist = new Set(JSON.parse(savedWishlist));

      const savedCoupon = localStorage.getItem("deskora_coupon");
      if (savedCoupon) this.state.appliedCoupon = JSON.parse(savedCoupon);

      const savedOrders = localStorage.getItem("deskora_orders");
      if (savedOrders) this.state.orders = JSON.parse(savedOrders);
    } catch (e) {
      console.warn("Storage access restricted or unavailable", e);
    }
  },

  saveState() {
    try {
      localStorage.setItem("deskora_cart", JSON.stringify(this.state.cart));
      localStorage.setItem("deskora_wishlist", JSON.stringify(Array.from(this.state.wishlist)));
      if (this.state.appliedCoupon) {
        localStorage.setItem("deskora_coupon", JSON.stringify(this.state.appliedCoupon));
      } else {
        localStorage.removeItem("deskora_coupon");
      }
      localStorage.setItem("deskora_orders", JSON.stringify(this.state.orders));
    } catch (e) {
      console.warn("Failed saving state", e);
    }
    this.renderHeaderBadges();
    this.renderCompareBar();
  },

  refreshIcons() {
    if (window.lucide) {
      window.lucide.createIcons();
    }
  },

  // Header Counters
  renderHeaderBadges() {
    const cartCountEl = document.getElementById("header-cart-count");
    const wishlistCountEl = document.getElementById("header-wishlist-count");

    const totalCartItems = this.state.cart.reduce((sum, item) => sum + item.quantity, 0);
    if (cartCountEl) {
      cartCountEl.textContent = totalCartItems;
      cartCountEl.classList.toggle("hidden", totalCartItems === 0);
    }

    if (wishlistCountEl) {
      wishlistCountEl.textContent = this.state.wishlist.size;
      wishlistCountEl.classList.toggle("hidden", this.state.wishlist.size === 0);
    }
  },

  // Navigation & Category Filters
  renderCategoryNav() {
    const container = document.getElementById("category-nav-list");
    if (!container) return;

    container.innerHTML = DESKORA_DATA.categories.map(cat => {
      const isActive = this.state.selectedCategory === cat.id;
      return `
        <button 
          onclick="DeskoraApp.selectCategory('${cat.id}')"
          class="px-4 py-2 rounded-full text-xs md:text-sm font-medium whitespace-nowrap transition-all duration-200 flex items-center gap-2 ${
            isActive 
              ? 'bg-slate-900 text-white shadow-sm' 
              : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200/80'
          }">
          <i data-lucide="${cat.icon}" class="w-3.5 h-3.5 ${isActive ? 'text-amber-400' : 'text-slate-500'}"></i>
          <span>${cat.name}</span>
          ${cat.highlight ? '<span class="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></span>' : ''}
        </button>
      `;
    }).join("");
  },

  renderQuickFilters() {
    const container = document.getElementById("quick-filters-container");
    if (!container) return;

    container.innerHTML = DESKORA_DATA.quickPills.map(pill => {
      const isActive = this.state.activeQuickFilter === pill.filter;
      return `
        <button 
          onclick="DeskoraApp.toggleQuickFilter('${pill.filter}')"
          class="px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all duration-150 ${
            isActive 
              ? 'bg-amber-600 text-white ring-2 ring-amber-400' 
              : 'bg-amber-50 text-amber-900 hover:bg-amber-100 border border-amber-200/60'
          }">
          ${pill.label}
        </button>
      `;
    }).join("");
  },

  selectCategory(catId) {
    this.state.selectedCategory = catId;
    this.state.activeQuickFilter = null;
    this.renderCategoryNav();
    this.renderQuickFilters();
    this.renderProducts();
    const section = document.getElementById("catalog-section");
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  },

  toggleQuickFilter(filter) {
    if (this.state.activeQuickFilter === filter) {
      this.state.activeQuickFilter = null;
    } else {
      this.state.activeQuickFilter = filter;
      if (filter === "kits") {
        this.state.selectedCategory = "setup-kits";
      }
    }
    this.renderQuickFilters();
    this.renderCategoryNav();
    this.renderProducts();
  },

  // Hero Section Hotspots
  renderHeroHotspots() {
    const container = document.getElementById("hero-hotspots-container");
    if (!container) return;

    const hotspots = [
      {
        top: "34%",
        left: "48%",
        productId: "prod-laptop-rotatable",
        name: "360° Rotating Laptop Riser",
        price: "₹1,899"
      },
      {
        top: "62%",
        left: "32%",
        productId: "prod-mat-vegan-leather",
        name: "Dual-Sided Desk Mat",
        price: "₹899"
      },
      {
        top: "48%",
        left: "72%",
        productId: "prod-phone-magsafe-dock",
        name: "Wireless Charging Dock",
        price: "₹1,799"
      },
      {
        top: "22%",
        left: "36%",
        productId: "prod-light-monitor-bar",
        name: "Auto-Dimming Lightbar",
        price: "₹2,499"
      }
    ];

    container.innerHTML = hotspots.map(h => `
      <div class="hotspot-pin group" style="top: ${h.top}; left: ${h.left};" onclick="DeskoraApp.openProductQuickView('${h.productId}')">
        <i data-lucide="plus" class="w-3.5 h-3.5 text-amber-700"></i>
        <div class="hotspot-tooltip absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-slate-900/95 text-white text-xs py-1.5 px-3 rounded-lg shadow-xl whitespace-nowrap flex items-center gap-2 border border-slate-700 z-30">
          <span class="font-medium">${h.name}</span>
          <span class="text-amber-400 font-bold">${h.price}</span>
        </div>
      </div>
    `).join("");
  },

  // Setup Kits Section (Hero Bundles)
  renderSetupKits() {
    const container = document.getElementById("setup-kits-grid");
    if (!container) return;

    const kits = DESKORA_DATA.products.filter(p => p.category === "setup-kits");

    container.innerHTML = kits.map(kit => `
      <div class="bg-white rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden group">
        <div class="relative overflow-hidden aspect-[16/10] bg-slate-100">
          <img 
            src="${kit.image}" 
            alt="${kit.name}"
            loading="lazy"
            class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div class="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
            <span class="bg-slate-900/90 backdrop-blur-md text-amber-400 font-bold text-[11px] px-2.5 py-1 rounded-md tracking-wide uppercase">
              ${kit.badge}
            </span>
            <span class="bg-emerald-600 text-white font-semibold text-[11px] px-2.5 py-1 rounded-md">
              ${kit.discount}
            </span>
          </div>

          <button 
            onclick="DeskoraApp.toggleWishlist('${kit.id}')"
            class="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-slate-700 hover:text-red-500 shadow-md transition-colors z-10">
            <i data-lucide="heart" class="w-4 h-4 ${this.state.wishlist.has(kit.id) ? 'fill-red-500 text-red-500' : ''}"></i>
          </button>
        </div>

        <div class="p-6 flex flex-col flex-1">
          <div class="flex items-center gap-2 mb-1.5 text-xs text-amber-700 font-semibold tracking-wide">
            <i data-lucide="sparkles" class="w-3.5 h-3.5"></i>
            <span>${kit.tag}</span>
          </div>

          <h3 class="font-heading font-bold text-lg text-slate-900 group-hover:text-amber-700 transition-colors cursor-pointer" onclick="DeskoraApp.openProductQuickView('${kit.id}')">
            ${kit.name}
          </h3>

          <p class="text-xs text-slate-500 mt-1.5 line-clamp-2 leading-relaxed">
            ${kit.shortDesc}
          </p>

          <!-- Kit Contents Pill list -->
          <div class="mt-4 pt-4 border-t border-slate-100 flex-1">
            <div class="text-[11px] uppercase tracking-wider font-semibold text-slate-400 mb-2 flex items-center gap-1.5">
              <i data-lucide="layers" class="w-3 h-3 text-slate-500"></i>
              What's in the box (${kit.kitIncludes.length} items):
            </div>
            <ul class="space-y-1.5">
              ${kit.kitIncludes.map(item => `
                <li class="text-xs text-slate-600 flex items-start gap-2">
                  <i data-lucide="check-circle" class="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5"></i>
                  <span class="line-clamp-1">${item}</span>
                </li>
              `).join("")}
            </ul>
          </div>

          <!-- Pricing & Action Bar -->
          <div class="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
            <div>
              <div class="flex items-baseline gap-2">
                <span class="text-2xl font-bold font-heading text-slate-900">₹${kit.price.toLocaleString("en-IN")}</span>
                <span class="text-xs text-slate-400 line-through">₹${kit.originalPrice.toLocaleString("en-IN")}</span>
              </div>
              <span class="text-[11px] text-emerald-600 font-medium">Free Express Air Shipping</span>
            </div>

            <button 
              onclick="DeskoraApp.addToCart('${kit.id}')"
              class="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-amber-600 text-white font-medium text-xs md:text-sm flex items-center gap-2 transition-all duration-200 shadow-sm active:scale-95 shrink-0">
              <i data-lucide="shopping-bag" class="w-4 h-4"></i>
              <span>Get Setup Kit</span>
            </button>
          </div>
        </div>
      </div>
    `).join("");
  },

  // Main Products Grid
  renderProducts() {
    const container = document.getElementById("product-grid");
    const countEl = document.getElementById("product-count-label");
    if (!container) return;

    let filtered = DESKORA_DATA.products;

    // Filter by category
    if (this.state.selectedCategory !== "all") {
      filtered = filtered.filter(p => p.category === this.state.selectedCategory);
    }

    // Filter by quick filter
    if (this.state.activeQuickFilter) {
      switch (this.state.activeQuickFilter) {
        case "bestseller":
          filtered = filtered.filter(p => p.isBestseller);
          break;
        case "student":
          filtered = filtered.filter(p => p.isStudentPick);
          break;
        case "pro":
          filtered = filtered.filter(p => p.isProPick);
          break;
        case "kits":
          filtered = filtered.filter(p => p.category === "setup-kits");
          break;
        case "under999":
          filtered = filtered.filter(p => p.price < 999);
          break;
      }
    }

    // Filter by search query
    if (this.state.searchQuery.trim()) {
      const q = this.state.searchQuery.toLowerCase().trim();
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(q) ||
        p.shortDesc.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        (p.specs && Object.values(p.specs).some(v => v.toLowerCase().includes(q)))
      );
    }

    // Filter by price range
    filtered = filtered.filter(p => p.price <= this.state.priceFilter);

    // Sorting
    filtered = [...filtered].sort((a, b) => {
      if (this.state.sortBy === "price-low") return a.price - b.price;
      if (this.state.sortBy === "price-high") return b.price - a.price;
      if (this.state.sortBy === "rating") return b.rating - a.rating;
      return (b.isBestseller ? 1 : 0) - (a.isBestseller ? 1 : 0);
    });

    if (countEl) {
      countEl.textContent = `Showing ${filtered.length} desk essentials`;
    }

    if (filtered.length === 0) {
      container.innerHTML = `
        <div class="col-span-full py-16 text-center bg-white rounded-2xl border border-slate-200">
          <div class="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-slate-400 mb-4">
            <i data-lucide="search-x" class="w-8 h-8"></i>
          </div>
          <h3 class="font-heading font-semibold text-lg text-slate-800">No essentials match your criteria</h3>
          <p class="text-xs text-slate-500 mt-1 max-w-sm mx-auto">Try clearing search filters or adjusting the price slider to discover other options.</p>
          <button 
            onclick="DeskoraApp.resetFilters()"
            class="mt-4 px-5 py-2 rounded-xl bg-slate-900 text-white text-xs font-medium hover:bg-slate-800 transition-colors">
            Reset All Filters
          </button>
        </div>
      `;
      this.refreshIcons();
      return;
    }

    container.innerHTML = filtered.map(prod => {
      const isWishlisted = this.state.wishlist.has(prod.id);
      const isCompared = this.state.compareList.includes(prod.id);

      return `
        <div class="product-card bg-white rounded-2xl border border-slate-200/90 shadow-sm flex flex-col overflow-hidden group">
          <!-- Image Container -->
          <div class="product-image-container relative aspect-[4/3] bg-slate-100 overflow-hidden cursor-pointer" onclick="DeskoraApp.openProductQuickView('${prod.id}')">
            <img 
              src="${prod.image}" 
              alt="${prod.name}"
              loading="lazy"
              class="w-full h-full object-cover"
            />
            
            <!-- Badges -->
            <div class="absolute top-3 left-3 flex flex-col gap-1 z-10">
              ${prod.badge ? `
                <span class="bg-slate-900/90 backdrop-blur-md text-amber-300 font-bold text-[10px] px-2 py-0.5 rounded tracking-wide uppercase">
                  ${prod.badge}
                </span>
              ` : ''}
              ${prod.discount ? `
                <span class="bg-red-500 text-white font-semibold text-[10px] px-2 py-0.5 rounded tracking-wide">
                  ${prod.discount}
                </span>
              ` : ''}
            </div>

            <!-- Top Right Action Icons -->
            <div class="absolute top-3 right-3 flex flex-col gap-1.5 z-10">
              <button 
                onclick="event.stopPropagation(); DeskoraApp.toggleWishlist('${prod.id}')"
                title="Save to Wishlist"
                class="w-8 h-8 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-slate-600 hover:text-red-500 shadow-md transition-colors">
                <i data-lucide="heart" class="w-4 h-4 ${isWishlisted ? 'fill-red-500 text-red-500' : ''}"></i>
              </button>

              <button 
                onclick="event.stopPropagation(); DeskoraApp.toggleCompare('${prod.id}')"
                title="${isCompared ? 'Remove from Compare' : 'Add to Compare'}"
                class="w-8 h-8 rounded-full ${isCompared ? 'bg-amber-600 text-white' : 'bg-white/90 text-slate-600'} backdrop-blur-md flex items-center justify-center hover:bg-amber-500 hover:text-white shadow-md transition-colors">
                <i data-lucide="git-compare" class="w-4 h-4"></i>
              </button>
            </div>

            <!-- Quick View Overlay trigger on hover -->
            <div class="absolute inset-x-0 bottom-3 px-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <button 
                onclick="event.stopPropagation(); DeskoraApp.openProductQuickView('${prod.id}')"
                class="w-full py-2 rounded-xl bg-white/95 backdrop-blur-md text-slate-900 hover:bg-slate-900 hover:text-white text-xs font-semibold shadow-lg transition-colors flex items-center justify-center gap-1.5">
                <i data-lucide="eye" class="w-3.5 h-3.5"></i>
                <span>Quick View & Specs</span>
              </button>
            </div>
          </div>

          <!-- Product Details Body -->
          <div class="p-4 md:p-5 flex flex-col flex-1">
            <div class="flex items-center justify-between text-xs text-slate-400 mb-1">
              <span class="uppercase tracking-wider font-semibold text-[10px] text-amber-700">${prod.tag || 'Desk Essential'}</span>
              <div class="flex items-center gap-1 text-slate-600">
                <i data-lucide="star" class="w-3.5 h-3.5 fill-amber-400 text-amber-400"></i>
                <span class="font-bold text-slate-800 text-[11px]">${prod.rating}</span>
                <span class="text-slate-400 text-[10px]">(${prod.reviewCount})</span>
              </div>
            </div>

            <h4 class="font-heading font-semibold text-sm md:text-base text-slate-900 hover:text-amber-700 transition-colors line-clamp-2 cursor-pointer" onclick="DeskoraApp.openProductQuickView('${prod.id}')">
              ${prod.name}
            </h4>

            <p class="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed flex-1">
              ${prod.shortDesc}
            </p>

            <!-- Color Swatches preview if available -->
            ${prod.colors && prod.colors.length > 1 ? `
              <div class="flex items-center gap-1.5 my-2.5">
                <span class="text-[10px] text-slate-400 font-medium">Finishes:</span>
                ${prod.colors.map(c => `
                  <span class="w-3.5 h-3.5 rounded-full border border-slate-300 shadow-xs" style="background-color: ${c.hex};" title="${c.name}"></span>
                `).join("")}
              </div>
            ` : '<div class="my-1.5"></div>'}

            <!-- Bottom Price & Add to Cart -->
            <div class="pt-3 border-t border-slate-100 flex items-center justify-between gap-2 mt-auto">
              <div>
                <div class="flex items-baseline gap-1.5">
                  <span class="text-lg md:text-xl font-bold font-heading text-slate-900">₹${prod.price.toLocaleString("en-IN")}</span>
                  ${prod.originalPrice ? `<span class="text-[11px] text-slate-400 line-through">₹${prod.originalPrice.toLocaleString("en-IN")}</span>` : ''}
                </div>
              </div>

              <button 
                onclick="DeskoraApp.addToCart('${prod.id}')"
                class="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-amber-600 text-white text-xs font-semibold flex items-center gap-1.5 transition-all duration-150 active:scale-95 shadow-xs">
                <i data-lucide="plus" class="w-3.5 h-3.5"></i>
                <span>Add</span>
              </button>
            </div>
          </div>
        </div>
      `;
    }).join("");

    this.refreshIcons();
  },

  resetFilters() {
    this.state.selectedCategory = "all";
    this.state.activeQuickFilter = null;
    this.state.searchQuery = "";
    this.state.priceFilter = 7000;
    this.state.sortBy = "featured";

    const searchInput = document.getElementById("search-input");
    const mobileSearchInput = document.getElementById("mobile-search-input");
    const priceSlider = document.getElementById("price-slider");
    const sortSelect = document.getElementById("sort-select");

    if (searchInput) searchInput.value = "";
    if (mobileSearchInput) mobileSearchInput.value = "";
    if (priceSlider) priceSlider.value = 7000;
    if (sortSelect) sortSelect.value = "featured";

    this.renderCategoryNav();
    this.renderQuickFilters();
    this.renderProducts();
  },

  // Cart Management
  addToCart(productId, quantity = 1, selectedVariant = null) {
    const product = DESKORA_DATA.products.find(p => p.id === productId);
    if (!product) return;

    const variantName = selectedVariant || (product.colors ? product.colors[0].name : "Standard");
    const cartItemId = `${productId}-${variantName}`;

    const existingIndex = this.state.cart.findIndex(item => item.cartItemId === cartItemId);

    if (existingIndex > -1) {
      this.state.cart[existingIndex].quantity += quantity;
    } else {
      this.state.cart.push({
        cartItemId,
        productId,
        name: product.name,
        price: product.price,
        originalPrice: product.originalPrice,
        image: product.image,
        variant: variantName,
        quantity: quantity
      });
    }

    this.saveState();
    this.showToast(`Added "${product.name}" to cart`, "success", "shopping-bag");
    this.openCartDrawer();
  },

  updateCartQuantity(cartItemId, delta) {
    const itemIndex = this.state.cart.findIndex(i => i.cartItemId === cartItemId);
    if (itemIndex === -1) return;

    this.state.cart[itemIndex].quantity += delta;
    if (this.state.cart[itemIndex].quantity <= 0) {
      this.state.cart.splice(itemIndex, 1);
      this.showToast("Item removed from cart", "info", "trash-2");
    }

    this.saveState();
    this.renderCartDrawer();
  },

  removeFromCart(cartItemId) {
    this.state.cart = this.state.cart.filter(i => i.cartItemId !== cartItemId);
    this.saveState();
    this.renderCartDrawer();
    this.showToast("Removed item", "info", "trash-2");
  },

  calculateCartTotals() {
    const subtotal = this.state.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    let discountAmount = 0;

    if (this.state.appliedCoupon) {
      const c = this.state.appliedCoupon;
      if (subtotal >= (c.minOrder || 0)) {
        if (c.discountType === "percent") {
          discountAmount = Math.round((subtotal * c.value) / 100);
        } else if (c.discountType === "flat") {
          discountAmount = c.value;
        }
      }
    }

    const discountedSubtotal = Math.max(0, subtotal - discountAmount);
    const shippingFee = (subtotal === 0 || discountedSubtotal >= DESKORA_DATA.storeInfo.freeShippingThreshold) 
      ? 0 
      : DESKORA_DATA.storeInfo.standardShippingFee;

    const finalTotal = discountedSubtotal + shippingFee;
    const remainingForFreeShipping = Math.max(0, DESKORA_DATA.storeInfo.freeShippingThreshold - discountedSubtotal);

    return {
      subtotal,
      discountAmount,
      shippingFee,
      finalTotal,
      remainingForFreeShipping
    };
  },

  openCartDrawer() {
    this.renderCartDrawer();
    const backdrop = document.getElementById("cart-drawer-backdrop");
    const panel = document.getElementById("cart-drawer-panel");
    if (backdrop && panel) {
      backdrop.classList.add("active");
      panel.classList.add("active");
      document.body.style.overflow = "hidden";
    }
  },

  closeCartDrawer() {
    const backdrop = document.getElementById("cart-drawer-backdrop");
    const panel = document.getElementById("cart-drawer-panel");
    if (backdrop && panel) {
      backdrop.classList.remove("active");
      panel.classList.remove("active");
      document.body.style.overflow = "";
    }
  },

  renderCartDrawer() {
    const itemsContainer = document.getElementById("cart-items-container");
    const totalsContainer = document.getElementById("cart-totals-container");
    const progressBar = document.getElementById("free-shipping-progress");
    const progressLabel = document.getElementById("free-shipping-label");

    if (!itemsContainer || !totalsContainer) return;

    const { subtotal, discountAmount, shippingFee, finalTotal, remainingForFreeShipping } = this.calculateCartTotals();

    // Free shipping meter
    if (progressBar && progressLabel) {
      const progressPercent = Math.min(100, Math.round(((DESKORA_DATA.storeInfo.freeShippingThreshold - remainingForFreeShipping) / DESKORA_DATA.storeInfo.freeShippingThreshold) * 100));
      progressBar.style.width = `${progressPercent}%`;

      if (subtotal === 0) {
        progressLabel.innerHTML = `Add essentials to unlock <strong>FREE Express Delivery</strong> across India`;
      } else if (remainingForFreeShipping === 0) {
        progressLabel.innerHTML = `🎉 Congratulations! You have unlocked <strong>FREE Express Shipping</strong>!`;
      } else {
        progressLabel.innerHTML = `Add <strong>₹${remainingForFreeShipping}</strong> more to get <strong>FREE Express Shipping</strong>`;
      }
    }

    // Cart items list
    if (this.state.cart.length === 0) {
      itemsContainer.innerHTML = `
        <div class="py-16 text-center">
          <div class="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-slate-400 mb-3">
            <i data-lucide="shopping-bag" class="w-8 h-8"></i>
          </div>
          <p class="font-heading font-semibold text-slate-800 text-base">Your workspace cart is empty</p>
          <p class="text-xs text-slate-500 mt-1 max-w-xs mx-auto">Explore our curated setup kits and desk essentials to build your focus space.</p>
          <button 
            onclick="DeskoraApp.closeCartDrawer(); DeskoraApp.selectCategory('setup-kits')"
            class="mt-5 px-5 py-2.5 rounded-xl bg-slate-900 text-white text-xs font-semibold hover:bg-amber-600 transition-colors">
            Shop Curated Setup Kits
          </button>
        </div>
      `;
      totalsContainer.innerHTML = "";
      this.refreshIcons();
      return;
    }

    itemsContainer.innerHTML = this.state.cart.map(item => `
      <div class="flex items-center gap-3.5 p-3.5 rounded-xl bg-slate-50 border border-slate-200/80">
        <img 
          src="${item.image}" 
          alt="${item.name}" 
          class="w-16 h-16 rounded-lg object-cover bg-white shrink-0"
        />
        <div class="flex-1 min-w-0">
          <h5 class="text-xs font-semibold text-slate-900 line-clamp-1">${item.name}</h5>
          <p class="text-[11px] text-slate-500 mt-0.5">Finish: <span class="font-medium text-slate-700">${item.variant}</span></p>
          
          <div class="flex items-center justify-between mt-2">
            <div class="flex items-center border border-slate-200 rounded-lg bg-white overflow-hidden">
              <button 
                onclick="DeskoraApp.updateCartQuantity('${item.cartItemId}', -1)"
                class="px-2 py-0.5 text-slate-600 hover:bg-slate-100 text-xs font-bold transition-colors">
                -
              </button>
              <span class="px-2 text-xs font-semibold text-slate-800">${item.quantity}</span>
              <button 
                onclick="DeskoraApp.updateCartQuantity('${item.cartItemId}', 1)"
                class="px-2 py-0.5 text-slate-600 hover:bg-slate-100 text-xs font-bold transition-colors">
                +
              </button>
            </div>

            <div class="text-right">
              <span class="text-xs font-bold text-slate-900">₹${(item.price * item.quantity).toLocaleString("en-IN")}</span>
            </div>
          </div>
        </div>

        <button 
          onclick="DeskoraApp.removeFromCart('${item.cartItemId}')"
          class="text-slate-400 hover:text-red-500 p-1 rounded-lg transition-colors"
          title="Remove item">
          <i data-lucide="trash-2" class="w-4 h-4"></i>
        </button>
      </div>
    `).join("");

    // Bill & Coupon breakdown
    totalsContainer.innerHTML = `
      <!-- Coupon Box -->
      <div class="mb-4">
        ${this.state.appliedCoupon ? `
          <div class="flex items-center justify-between p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800">
            <div class="flex items-center gap-1.5 font-medium">
              <i data-lucide="tag" class="w-4 h-4 text-emerald-600"></i>
              <span>Code <strong>${this.state.appliedCoupon.code}</strong> applied (-₹${discountAmount})</span>
            </div>
            <button onclick="DeskoraApp.removeCoupon()" class="text-emerald-700 hover:text-emerald-900 font-bold text-xs underline">
              Remove
            </button>
          </div>
        ` : `
          <div class="flex gap-2">
            <input 
              type="text" 
              id="coupon-code-input"
              placeholder="Promo code (e.g. DESK10, STUDENT15)" 
              class="flex-1 px-3 py-2 rounded-xl border border-slate-200 text-xs uppercase font-medium focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
            <button 
              onclick="DeskoraApp.applyCoupon(document.getElementById('coupon-code-input').value)"
              class="px-4 py-2 rounded-xl bg-slate-800 text-white text-xs font-semibold hover:bg-slate-900 transition-colors">
              Apply
            </button>
          </div>
          <div class="flex flex-wrap gap-1.5 mt-2">
            <button onclick="DeskoraApp.applyCoupon('DESK10')" class="text-[10px] px-2 py-0.5 rounded bg-slate-100 text-slate-700 hover:bg-amber-100 hover:text-amber-800 font-medium">
              Use DESK10 (10% off)
            </button>
            <button onclick="DeskoraApp.applyCoupon('STUDENT15')" class="text-[10px] px-2 py-0.5 rounded bg-slate-100 text-slate-700 hover:bg-amber-100 hover:text-amber-800 font-medium">
              Use STUDENT15 (15% off)
            </button>
          </div>
        `}
      </div>

      <!-- Bill Rows -->
      <div class="space-y-2 text-xs text-slate-600 border-t border-slate-200 pt-3">
        <div class="flex justify-between">
          <span>Item Subtotal</span>
          <span class="font-medium text-slate-900">₹${subtotal.toLocaleString("en-IN")}</span>
        </div>
        ${discountAmount > 0 ? `
          <div class="flex justify-between text-emerald-600 font-medium">
            <span>Coupon Discount</span>
            <span>- ₹${discountAmount.toLocaleString("en-IN")}</span>
          </div>
        ` : ''}
        <div class="flex justify-between">
          <span>GST (18% inclusive)</span>
          <span class="text-slate-400">Included</span>
        </div>
        <div class="flex justify-between">
          <span>Delivery Across India</span>
          <span class="font-medium ${shippingFee === 0 ? 'text-emerald-600 font-semibold' : 'text-slate-900'}">
            ${shippingFee === 0 ? 'FREE Express Air' : '₹' + shippingFee}
          </span>
        </div>
        <div class="flex justify-between text-sm font-bold text-slate-900 pt-2 border-t border-slate-200">
          <span>Total Payable</span>
          <span class="text-base text-amber-800 font-heading">₹${finalTotal.toLocaleString("en-IN")}</span>
        </div>
      </div>

      <!-- Checkout CTA -->
      <button 
        onclick="DeskoraApp.closeCartDrawer(); DeskoraApp.openCheckoutModal()"
        class="w-full mt-4 py-3 rounded-xl bg-slate-900 hover:bg-amber-600 text-white font-medium text-sm flex items-center justify-center gap-2 shadow-lg transition-all duration-200 active:scale-98">
        <i data-lucide="lock" class="w-4 h-4"></i>
        <span>Proceed to Secure Checkout</span>
      </button>

      <div class="mt-3 flex items-center justify-center gap-4 text-[10px] text-slate-400">
        <span class="flex items-center gap-1"><i data-lucide="shield-check" class="w-3.5 h-3.5 text-emerald-500"></i> 100% Safe Checkout</span>
        <span class="flex items-center gap-1"><i data-lucide="truck" class="w-3.5 h-3.5 text-blue-500"></i> Dispatch within 24h</span>
      </div>
    `;

    this.refreshIcons();
  },

  applyCoupon(code) {
    if (!code || !code.trim()) {
      this.showToast("Please enter a valid promo code", "error", "alert-circle");
      return;
    }

    const cleanCode = code.trim().toUpperCase();
    const coupon = DESKORA_DATA.coupons.find(c => c.code === cleanCode);

    if (!coupon) {
      this.showToast("Invalid promo code. Try DESK10 or STUDENT15", "error", "alert-circle");
      return;
    }

    const { subtotal } = this.calculateCartTotals();
    if (subtotal < (coupon.minOrder || 0)) {
      this.showToast(`Minimum order for code ${cleanCode} is ₹${coupon.minOrder}`, "error", "alert-circle");
      return;
    }

    this.state.appliedCoupon = coupon;
    this.saveState();
    this.renderCartDrawer();
    this.showToast(`Code "${cleanCode}" applied! ${coupon.description}`, "success", "check");
  },

  removeCoupon() {
    this.state.appliedCoupon = null;
    this.saveState();
    this.renderCartDrawer();
    this.showToast("Coupon removed", "info", "tag");
  },

  // Wishlist
  toggleWishlist(productId) {
    const product = DESKORA_DATA.products.find(p => p.id === productId);
    if (!product) return;

    if (this.state.wishlist.has(productId)) {
      this.state.wishlist.delete(productId);
      this.showToast(`Removed from your wishlist`, "info", "heart-off");
    } else {
      this.state.wishlist.add(productId);
      this.showToast(`Saved to your wishlist!`, "success", "heart");
    }

    this.saveState();
    this.renderProducts();
    this.renderSetupKits();
    this.renderWishlistModal();
  },

  openWishlistModal() {
    this.renderWishlistModal();
    const modal = document.getElementById("wishlist-modal");
    if (modal) {
      modal.classList.add("active");
      document.body.style.overflow = "hidden";
    }
  },

  closeWishlistModal() {
    const modal = document.getElementById("wishlist-modal");
    if (modal) {
      modal.classList.remove("active");
      document.body.style.overflow = "";
    }
  },

  renderWishlistModal() {
    const container = document.getElementById("wishlist-items-container");
    const countEl = document.getElementById("wishlist-modal-count");
    if (!container) return;

    const wishlistProducts = DESKORA_DATA.products.filter(p => this.state.wishlist.has(p.id));

    if (countEl) {
      countEl.textContent = `(${wishlistProducts.length} items)`;
    }

    if (wishlistProducts.length === 0) {
      container.innerHTML = `
        <div class="py-12 text-center col-span-full">
          <div class="w-14 h-14 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-slate-400 mb-3">
            <i data-lucide="heart" class="w-7 h-7"></i>
          </div>
          <p class="font-heading font-semibold text-slate-800">Your wishlist is empty</p>
          <p class="text-xs text-slate-500 mt-1 max-w-xs mx-auto">Click the heart icon on any product to save your dream desk setup items.</p>
        </div>
      `;
      this.refreshIcons();
      return;
    }

    container.innerHTML = wishlistProducts.map(prod => `
      <div class="flex items-center gap-3.5 p-3 rounded-xl bg-slate-50 border border-slate-200">
        <img src="${prod.image}" alt="${prod.name}" class="w-16 h-16 rounded-lg object-cover bg-white shrink-0" />
        <div class="flex-1 min-w-0">
          <h5 class="text-xs font-semibold text-slate-900 line-clamp-1">${prod.name}</h5>
          <div class="flex items-baseline gap-2 mt-1">
            <span class="text-xs font-bold text-slate-900">₹${prod.price.toLocaleString("en-IN")}</span>
            ${prod.originalPrice ? `<span class="text-[10px] text-slate-400 line-through">₹${prod.originalPrice.toLocaleString("en-IN")}</span>` : ''}
          </div>
          <div class="flex items-center gap-2 mt-2">
            <button 
              onclick="DeskoraApp.addToCart('${prod.id}'); DeskoraApp.toggleWishlist('${prod.id}')"
              class="px-2.5 py-1 rounded-lg bg-slate-900 text-white text-[11px] font-medium hover:bg-amber-600 transition-colors">
              Move to Cart
            </button>
            <button 
              onclick="DeskoraApp.toggleWishlist('${prod.id}')"
              class="text-xs text-slate-400 hover:text-red-500 transition-colors">
              Remove
            </button>
          </div>
        </div>
      </div>
    `).join("");

    this.refreshIcons();
  },

  // Comparison Matrix Feature
  toggleCompare(productId) {
    const idx = this.state.compareList.indexOf(productId);
    if (idx > -1) {
      this.state.compareList.splice(idx, 1);
      this.showToast("Removed from comparison", "info", "git-compare");
    } else {
      if (this.state.compareList.length >= 3) {
        this.showToast("You can compare up to 3 items at a time", "error", "alert-circle");
        return;
      }
      this.state.compareList.push(productId);
      this.showToast("Added to compare matrix", "success", "git-compare");
    }

    this.renderCompareBar();
    this.renderProducts();
  },

  renderCompareBar() {
    const bar = document.getElementById("compare-floating-bar");
    const countBadge = document.getElementById("compare-bar-count");
    if (!bar) return;

    if (this.state.compareList.length > 0) {
      bar.classList.remove("translate-y-28", "opacity-0");
      bar.classList.add("translate-y-0", "opacity-100");
      if (countBadge) countBadge.textContent = this.state.compareList.length;
    } else {
      bar.classList.remove("translate-y-0", "opacity-100");
      bar.classList.add("translate-y-28", "opacity-0");
    }
  },

  clearCompare() {
    this.state.compareList = [];
    this.renderCompareBar();
    this.renderProducts();
    this.closeCompareModal();
  },

  openCompareModal() {
    this.renderCompareModal();
    const modal = document.getElementById("compare-modal");
    if (modal) {
      modal.classList.add("active");
      document.body.style.overflow = "hidden";
    }
  },

  closeCompareModal() {
    const modal = document.getElementById("compare-modal");
    if (modal) {
      modal.classList.remove("active");
      document.body.style.overflow = "";
    }
  },

  renderCompareModal() {
    const container = document.getElementById("compare-modal-content");
    if (!container) return;

    const items = DESKORA_DATA.products.filter(p => this.state.compareList.includes(p.id));

    if (items.length === 0) {
      container.innerHTML = `<p class="text-center py-10 text-slate-500">Select items to compare</p>`;
      return;
    }

    container.innerHTML = `
      <div class="grid grid-cols-${items.length} gap-4 overflow-x-auto min-w-[500px]">
        ${items.map(p => `
          <div class="bg-slate-50 p-4 rounded-xl border border-slate-200 flex flex-col">
            <img src="${p.image}" class="w-full h-36 object-cover rounded-lg bg-white mb-3" />
            <h5 class="font-heading font-semibold text-sm text-slate-900">${p.name}</h5>
            <div class="text-sm font-bold text-slate-900 mt-1">₹${p.price.toLocaleString("en-IN")}</div>
            <div class="text-xs text-amber-700 font-medium">★ ${p.rating} (${p.reviewCount} reviews)</div>

            <div class="mt-4 space-y-2 text-xs text-slate-600 border-t border-slate-200 pt-3 flex-1">
              <div>
                <span class="font-semibold block text-slate-700">Category</span>
                <span>${p.category}</span>
              </div>
              <div>
                <span class="font-semibold block text-slate-700">Tag</span>
                <span>${p.tag}</span>
              </div>
              ${p.specs ? Object.entries(p.specs).slice(0, 4).map(([k, v]) => `
                <div>
                  <span class="font-semibold block text-slate-700">${k}</span>
                  <span class="text-slate-500">${v}</span>
                </div>
              `).join("") : ''}
            </div>

            <div class="mt-4 pt-3 border-t border-slate-200 flex gap-2">
              <button 
                onclick="DeskoraApp.addToCart('${p.id}'); DeskoraApp.closeCompareModal()"
                class="flex-1 py-2 rounded-lg bg-slate-900 text-white text-xs font-semibold hover:bg-amber-600 transition-colors">
                Add to Cart
              </button>
              <button 
                onclick="DeskoraApp.toggleCompare('${p.id}')"
                class="px-2.5 py-2 rounded-lg border border-slate-300 text-slate-600 hover:text-red-500 text-xs">
                ✕
              </button>
            </div>
          </div>
        `).join("")}
      </div>
    `;

    this.refreshIcons();
  },

  // Product Quick View Modal
  openProductQuickView(productId) {
    const product = DESKORA_DATA.products.find(p => p.id === productId);
    if (!product) return;

    const modal = document.getElementById("quickview-modal");
    const container = document.getElementById("quickview-content");
    if (!modal || !container) return;

    let selectedVariant = product.colors ? product.colors[0].name : "Standard";
    let selectedImage = product.image;

    const renderModalContent = () => {
      container.innerHTML = `
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
          <!-- Gallery Section -->
          <div>
            <div class="aspect-square bg-slate-100 rounded-2xl overflow-hidden border border-slate-200">
              <img id="qv-main-image" src="${selectedImage}" alt="${product.name}" class="w-full h-full object-cover transition-all duration-300" />
            </div>

            <div class="flex items-center gap-2 mt-3">
              <button onclick="document.getElementById('qv-main-image').src='${product.image}'" class="w-16 h-16 rounded-xl border-2 border-slate-900 overflow-hidden">
                <img src="${product.image}" class="w-full h-full object-cover" />
              </button>
              ${product.secondaryImage ? `
                <button onclick="document.getElementById('qv-main-image').src='${product.secondaryImage}'" class="w-16 h-16 rounded-xl border border-slate-200 overflow-hidden hover:border-slate-400">
                  <img src="${product.secondaryImage}" class="w-full h-full object-cover" />
                </button>
              ` : ''}
            </div>
          </div>

          <!-- Info Section -->
          <div class="flex flex-col">
            <div class="flex items-center justify-between text-xs text-amber-700 font-semibold mb-1">
              <span>${product.tag || 'Deskora Original'}</span>
              <span class="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-medium">In Stock (${product.stock} units)</span>
            </div>

            <h3 class="font-heading font-bold text-xl text-slate-900">${product.name}</h3>

            <div class="flex items-center gap-2 mt-2">
              <div class="flex text-amber-400">
                <i data-lucide="star" class="w-4 h-4 fill-amber-400"></i>
              </div>
              <span class="text-xs font-bold text-slate-800">${product.rating}</span>
              <span class="text-xs text-slate-400">(${product.reviewCount} customer reviews)</span>
            </div>

            <!-- Price -->
            <div class="flex items-baseline gap-2 mt-3">
              <span class="text-2xl font-bold font-heading text-slate-900">₹${product.price.toLocaleString("en-IN")}</span>
              ${product.originalPrice ? `
                <span class="text-sm text-slate-400 line-through">₹${product.originalPrice.toLocaleString("en-IN")}</span>
                <span class="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">${product.discount}</span>
              ` : ''}
            </div>

            <p class="text-xs text-slate-600 mt-3 leading-relaxed">${product.description}</p>

            <!-- Color / Finish Selector -->
            ${product.colors && product.colors.length > 0 ? `
              <div class="mt-4">
                <div class="text-xs font-semibold text-slate-800 mb-2">Select Finish: <span class="text-amber-700 font-medium" id="qv-selected-variant-name">${selectedVariant}</span></div>
                <div class="flex items-center gap-2">
                  ${product.colors.map(c => `
                    <button 
                      onclick="DeskoraApp.selectQuickViewVariant('${c.name}', '${c.img || product.image}')"
                      class="px-3 py-1.5 rounded-lg border text-xs font-medium flex items-center gap-1.5 transition-all ${
                        selectedVariant === c.name 
                          ? 'border-slate-900 bg-slate-900 text-white' 
                          : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                      }">
                      <span class="w-2.5 h-2.5 rounded-full" style="background-color: ${c.hex}"></span>
                      <span>${c.name}</span>
                    </button>
                  `).join("")}
                </div>
              </div>
            ` : ''}

            <!-- Specs Table -->
            ${product.specs ? `
              <div class="mt-4 p-3 rounded-xl bg-slate-50 border border-slate-200/80 text-xs">
                <div class="font-semibold text-slate-800 mb-1.5 text-[11px] uppercase tracking-wider">Specifications</div>
                <dl class="grid grid-cols-2 gap-x-2 gap-y-1 text-slate-600">
                  ${Object.entries(product.specs).map(([key, val]) => `
                    <div><dt class="font-medium text-slate-700">${key}:</dt><dd class="text-slate-500">${val}</dd></div>
                  `).join("")}
                </dl>
              </div>
            ` : ''}

            <!-- Indian PIN Code checker -->
            <div class="mt-4">
              <div class="text-xs font-semibold text-slate-800 mb-1">Check Express Delivery in India:</div>
              <div class="flex gap-2">
                <input 
                  type="text" 
                  id="pincode-input" 
                  maxlength="6" 
                  placeholder="Enter 6-digit PIN code (e.g. 560001, 110001)"
                  class="flex-1 px-3 py-1.5 rounded-lg border border-slate-200 text-xs focus:ring-2 focus:ring-amber-500 focus:outline-none"
                />
                <button 
                  onclick="DeskoraApp.checkPincode(document.getElementById('pincode-input').value)"
                  class="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs">
                  Check
                </button>
              </div>
              <div id="pincode-result" class="text-xs mt-1 font-medium"></div>
            </div>

            <!-- Action buttons -->
            <div class="mt-6 pt-4 border-t border-slate-200 flex items-center gap-3">
              <button 
                onclick="DeskoraApp.addToCart('${product.id}', 1, '${selectedVariant}'); DeskoraApp.closeProductQuickView()"
                class="flex-1 py-3 rounded-xl bg-slate-900 hover:bg-amber-600 text-white font-medium text-xs md:text-sm flex items-center justify-center gap-2 shadow-md transition-colors">
                <i data-lucide="shopping-bag" class="w-4 h-4"></i>
                <span>Add to Cart • ₹${product.price.toLocaleString("en-IN")}</span>
              </button>

              <button 
                onclick="DeskoraApp.toggleWishlist('${product.id}')"
                class="p-3 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 transition-colors"
                title="Save to Wishlist">
                <i data-lucide="heart" class="w-5 h-5 ${this.state.wishlist.has(product.id) ? 'fill-red-500 text-red-500' : ''}"></i>
              </button>
            </div>
          </div>
        </div>
      `;
      this.refreshIcons();
    };

    this.currentQuickViewProduct = product;
    renderModalContent();

    modal.classList.add("active");
    document.body.style.overflow = "hidden";
  },

  selectQuickViewVariant(variantName, imgUrl) {
    if (!this.currentQuickViewProduct) return;
    const variantEl = document.getElementById("qv-selected-variant-name");
    const mainImg = document.getElementById("qv-main-image");
    if (variantEl) variantEl.textContent = variantName;
    if (mainImg && imgUrl) mainImg.src = imgUrl;
  },

  closeProductQuickView() {
    const modal = document.getElementById("quickview-modal");
    if (modal) {
      modal.classList.remove("active");
      document.body.style.overflow = "";
    }
  },

  checkPincode(pincode) {
    const resultEl = document.getElementById("pincode-result");
    if (!resultEl) return;

    if (!pincode || !/^\d{6}$/.test(pincode.trim())) {
      resultEl.className = "text-xs mt-1 text-red-600 font-medium";
      resultEl.innerHTML = `<i data-lucide="alert-circle" class="w-3.5 h-3.5 inline mr-1"></i> Please enter a valid 6-digit Indian PIN code.`;
      this.refreshIcons();
      return;
    }

    const firstDigit = pincode.trim().charAt(0);
    let cityHint = "Express Serviceable Area";
    let days = "2-3 business days";

    if (firstDigit === "5" || firstDigit === "6") {
      cityHint = "South Hub (Bengaluru / Chennai / Hyderabad)";
      days = "2 days (BlueDart Air)";
    } else if (firstDigit === "1" || firstDigit === "2") {
      cityHint = "North Hub (Delhi NCR / Chandigarh / Jaipur)";
      days = "2-3 days (Air Dispatch)";
    } else if (firstDigit === "4") {
      cityHint = "West Hub (Mumbai / Pune / Ahmedabad)";
      days = "2-3 days (Express Cargo)";
    } else {
      cityHint = "East / Central Region";
      days = "3-4 business days";
    }

    resultEl.className = "text-xs mt-1.5 text-emerald-700 font-medium bg-emerald-50 p-2 rounded-lg border border-emerald-200";
    resultEl.innerHTML = `
      <div class="flex items-center gap-1.5 font-bold">
        <i data-lucide="check-circle-2" class="w-4 h-4 text-emerald-600"></i>
        <span>Delivery available to PIN ${pincode} (${cityHint})</span>
      </div>
      <div class="text-[11px] text-emerald-800 mt-0.5">Estimated Arrival: <strong>${days}</strong>. Cash on Delivery supported!</div>
    `;
    this.refreshIcons();
  },

  // Interactive Quiz ("Find Your Desk Vibe")
  openQuizModal() {
    this.state.quizStep = 0;
    this.state.quizAnswers = {};
    this.renderQuizStep();

    const modal = document.getElementById("quiz-modal");
    if (modal) {
      modal.classList.add("active");
      document.body.style.overflow = "hidden";
    }
  },

  closeQuizModal() {
    const modal = document.getElementById("quiz-modal");
    if (modal) {
      modal.classList.remove("active");
      document.body.style.overflow = "";
    }
  },

  renderQuizStep() {
    const container = document.getElementById("quiz-step-content");
    const progressEl = document.getElementById("quiz-progress-bar");
    if (!container) return;

    const quiz = DESKORA_DATA.quiz;
    const currentStep = this.state.quizStep;

    if (progressEl) {
      const pct = Math.round(((currentStep + 1) / (quiz.questions.length + 1)) * 100);
      progressEl.style.width = `${pct}%`;
    }

    // Step Question
    if (currentStep < quiz.questions.length) {
      const q = quiz.questions[currentStep];
      container.innerHTML = `
        <div class="text-center mb-6">
          <span class="text-[11px] font-bold uppercase tracking-wider text-amber-700 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
            Step ${currentStep + 1} of ${quiz.questions.length}
          </span>
          <h4 class="font-heading font-bold text-lg md:text-xl text-slate-900 mt-3">${q.question}</h4>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
          ${q.options.map(opt => `
            <button 
              onclick="DeskoraApp.answerQuizQuestion('${q.id}', '${opt.value}')"
              class="p-4 rounded-xl border border-slate-200 hover:border-amber-600 hover:bg-amber-50/50 text-left transition-all group flex items-start gap-3">
              <div class="w-8 h-8 rounded-lg bg-slate-100 group-hover:bg-amber-600 group-hover:text-white text-slate-700 flex items-center justify-center shrink-0 transition-colors">
                <i data-lucide="${opt.icon}" class="w-4 h-4"></i>
              </div>
              <div>
                <div class="font-heading font-semibold text-xs text-slate-900 group-hover:text-amber-800">${opt.label}</div>
                <div class="text-[11px] text-slate-500 mt-0.5 leading-tight">${opt.desc}</div>
              </div>
            </button>
          `).join("")}
        </div>
      `;
    } else {
      // Quiz Result Screen
      const persona = this.state.quizAnswers.persona || "student";
      const rec = quiz.recommendations[persona] || quiz.recommendations["student"];
      const kit = DESKORA_DATA.products.find(p => p.id === rec.kitId);

      container.innerHTML = `
        <div class="text-center py-2">
          <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold mb-3">
            <i data-lucide="sparkles" class="w-4 h-4 text-emerald-600"></i>
            <span>Your Recommended Workspace Persona</span>
          </div>

          <h3 class="font-heading font-bold text-xl md:text-2xl text-slate-900">${rec.headline}</h3>
          <p class="text-xs text-slate-600 mt-2 max-w-md mx-auto leading-relaxed">${rec.reason}</p>

          ${kit ? `
            <div class="mt-5 p-4 rounded-2xl bg-slate-50 border border-slate-200 text-left flex flex-col sm:flex-row items-center gap-4">
              <img src="${kit.image}" class="w-28 h-28 rounded-xl object-cover bg-white shrink-0" />
              <div class="flex-1">
                <span class="text-[10px] font-bold text-amber-700 uppercase tracking-wider">${kit.badge}</span>
                <h5 class="font-heading font-bold text-sm text-slate-900">${kit.name}</h5>
                <div class="flex items-baseline gap-2 mt-1">
                  <span class="text-base font-bold text-slate-900">₹${kit.price.toLocaleString("en-IN")}</span>
                  <span class="text-xs text-slate-400 line-through">₹${kit.originalPrice.toLocaleString("en-IN")}</span>
                  <span class="text-xs font-semibold text-emerald-600">${kit.discount}</span>
                </div>
                <div class="text-[11px] text-slate-500 mt-1">Includes ${kit.kitIncludes.length} matching workspace essentials</div>
              </div>
            </div>
          ` : ''}

          <!-- Bonus Coupon Reward -->
          <div class="mt-5 p-3 rounded-xl bg-amber-50 border border-amber-200/80 flex items-center justify-between">
            <div class="text-left">
              <div class="text-xs font-bold text-amber-900">Personalized Quiz Bonus Discount</div>
              <div class="text-[11px] text-amber-700">Use code <code class="font-bold bg-white px-1.5 py-0.5 rounded border border-amber-300 text-slate-900">${rec.discountCode}</code> at checkout</div>
            </div>
            <button 
              onclick="DeskoraApp.applyCoupon('${rec.discountCode}')"
              class="px-3 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold transition-colors">
              Claim Code
            </button>
          </div>

          <div class="mt-6 flex items-center gap-3">
            ${kit ? `
              <button 
                onclick="DeskoraApp.addToCart('${kit.id}'); DeskoraApp.closeQuizModal()"
                class="flex-1 py-3 rounded-xl bg-slate-900 hover:bg-amber-600 text-white font-medium text-xs md:text-sm flex items-center justify-center gap-2 transition-colors shadow-md">
                <i data-lucide="shopping-bag" class="w-4 h-4"></i>
                <span>Add Recommended Setup to Cart</span>
              </button>
            ` : ''}
            <button 
              onclick="DeskoraApp.closeQuizModal()"
              class="px-4 py-3 rounded-xl border border-slate-200 hover:bg-slate-100 text-slate-700 text-xs font-semibold">
              Browse More
            </button>
          </div>
        </div>
      `;
    }

    this.refreshIcons();
  },

  answerQuizQuestion(questionId, value) {
    this.state.quizAnswers[questionId] = value;
    this.state.quizStep++;
    this.renderQuizStep();
  },

  // Checkout Flow
  openCheckoutModal() {
    if (this.state.cart.length === 0) {
      this.showToast("Your cart is empty. Add items first!", "error", "shopping-bag");
      return;
    }

    this.renderCheckoutModal();
    const modal = document.getElementById("checkout-modal");
    if (modal) {
      modal.classList.add("active");
      document.body.style.overflow = "hidden";
    }
  },

  closeCheckoutModal() {
    const modal = document.getElementById("checkout-modal");
    if (modal) {
      modal.classList.remove("active");
      document.body.style.overflow = "";
    }
  },

  renderCheckoutModal() {
    const container = document.getElementById("checkout-modal-content");
    if (!container) return;

    const { subtotal, discountAmount, shippingFee, finalTotal } = this.calculateCartTotals();

    container.innerHTML = `
      <form id="checkout-form" onsubmit="event.preventDefault(); DeskoraApp.processCheckoutOrder();">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <!-- Form Section -->
          <div class="lg:col-span-7 space-y-5">
            <!-- 1. Customer & Shipping Info -->
            <div class="bg-slate-50 p-4 rounded-xl border border-slate-200">
              <div class="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-800 mb-3">
                <i data-lucide="map-pin" class="w-4 h-4 text-amber-600"></i>
                <span>1. Shipping Details (India Delivery)</span>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                <div>
                  <label class="block font-medium text-slate-700 mb-1">Full Name *</label>
                  <input type="text" id="cust-name" required placeholder="e.g. Aryan Patel" class="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500" value="Aryan Patel" />
                </div>
                <div>
                  <label class="block font-medium text-slate-700 mb-1">WhatsApp / Phone *</label>
                  <input type="tel" id="cust-phone" required pattern="[0-9]{10}" placeholder="10-digit mobile number" class="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500" value="9876543210" />
                </div>
                <div class="md:col-span-2">
                  <label class="block font-medium text-slate-700 mb-1">Email for Invoice & Tracking *</label>
                  <input type="email" id="cust-email" required placeholder="name@college.edu or name@gmail.com" class="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500" value="aryan.patel@deskora.demo" />
                </div>
                <div class="md:col-span-2">
                  <label class="block font-medium text-slate-700 mb-1">Hostel / Flat / House No & Street Address *</label>
                  <input type="text" id="cust-address" required placeholder="Room 402, Hostel B / Flat 304, Green Heights" class="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500" value="Flat 402, Maple Residency, HSR Layout Sector 2" />
                </div>
                <div>
                  <label class="block font-medium text-slate-700 mb-1">City *</label>
                  <input type="text" id="cust-city" required placeholder="Bengaluru, Pune, Mumbai" class="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500" value="Bengaluru" />
                </div>
                <div>
                  <label class="block font-medium text-slate-700 mb-1">State *</label>
                  <select id="cust-state" required class="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500">
                    ${DESKORA_DATA.indianStates.map(st => `<option value="${st}" ${st === 'Karnataka' ? 'selected' : ''}>${st}</option>`).join("")}
                  </select>
                </div>
                <div>
                  <label class="block font-medium text-slate-700 mb-1">6-Digit PIN Code *</label>
                  <input type="text" id="cust-pincode" maxlength="6" required pattern="[0-9]{6}" placeholder="560102" class="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500" value="560102" />
                </div>
                <div>
                  <label class="block font-medium text-slate-700 mb-1">Address Type</label>
                  <select id="cust-addr-type" class="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500">
                    <option value="Home">Home / Flat</option>
                    <option value="Hostel">College / University Hostel</option>
                    <option value="Office">Office / Workplace</option>
                  </select>
                </div>
              </div>
            </div>

            <!-- 2. Order Processing Notice (No card or UPI numbers) -->
            <div class="bg-slate-50 p-4 rounded-xl border border-slate-200">
              <div class="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-800 mb-2">
                <i data-lucide="shield-check" class="w-4 h-4 text-emerald-600"></i>
                <span>2. Order Verification Notice</span>
              </div>
              <p class="text-xs text-slate-600 leading-relaxed">
                We do not ask for card or UPI numbers online at this stage. Once you submit this order request, our customer care team will verify stock and contact you directly via WhatsApp or email.
              </p>
            </div>
          </div>

          <!-- Order Summary Section -->
          <div class="lg:col-span-5 flex flex-col justify-between bg-white p-5 rounded-xl border border-slate-200">
            <div>
              <h4 class="font-heading font-bold text-sm text-slate-900 mb-3 flex items-center justify-between">
                <span>Order Summary (${this.state.cart.reduce((s, i) => s + i.quantity, 0)} items)</span>
              </h4>

              <div class="max-h-56 overflow-y-auto space-y-2 pr-1 mb-4">
                ${this.state.cart.map(item => `
                  <div class="flex items-center justify-between text-xs py-1.5 border-b border-slate-100">
                    <div class="flex items-center gap-2 min-w-0">
                      <img src="${item.image}" class="w-9 h-9 rounded object-cover shrink-0" />
                      <div class="truncate">
                        <div class="font-medium text-slate-800 truncate">${item.name}</div>
                        <div class="text-[10px] text-slate-400">${item.variant} × ${item.quantity}</div>
                      </div>
                    </div>
                    <span class="font-semibold text-slate-900 shrink-0 ml-2">₹${(item.price * item.quantity).toLocaleString("en-IN")}</span>
                  </div>
                `).join("")}
              </div>

              <!-- Bill Calculations -->
              <div class="space-y-1.5 text-xs text-slate-600 pt-2 border-t border-slate-200">
                <div class="flex justify-between">
                  <span>Subtotal</span>
                  <span>₹${subtotal.toLocaleString("en-IN")}</span>
                </div>
                ${discountAmount > 0 ? `
                  <div class="flex justify-between text-emerald-600 font-medium">
                    <span>Coupon (${this.state.appliedCoupon.code})</span>
                    <span>- ₹${discountAmount.toLocaleString("en-IN")}</span>
                  </div>
                ` : ''}
                <div class="flex justify-between">
                  <span>Shipping</span>
                  <span class="${shippingFee === 0 ? 'text-emerald-600 font-medium' : ''}">${shippingFee === 0 ? 'FREE' : '₹' + shippingFee}</span>
                </div>
                <div class="flex justify-between text-sm font-bold text-slate-900 pt-2 border-t border-slate-200">
                  <span>Grand Total</span>
                  <span class="text-amber-800 font-heading">₹${finalTotal.toLocaleString("en-IN")}</span>
                </div>
              </div>
            </div>

            <div class="mt-6">
              <button 
                type="submit" 
                class="w-full py-3.5 rounded-xl bg-slate-900 hover:bg-emerald-600 text-white font-medium text-sm flex items-center justify-center gap-2 shadow-lg transition-all duration-200 active:scale-98">
                <i data-lucide="check-circle" class="w-4 h-4"></i>
                <span>Submit Order Request • ₹${finalTotal.toLocaleString("en-IN")}</span>
              </button>

              <div class="mt-3 text-center text-[10px] text-slate-400 flex items-center justify-center gap-3">
                <span class="flex items-center gap-1"><i data-lucide="rotate-ccw" class="w-3 h-3"></i> 7-Day Free Returns</span>
                <span class="flex items-center gap-1"><i data-lucide="award" class="w-3 h-3"></i> 1-Year Warranty</span>
              </div>
            </div>
          </div>
        </div>
      </form>
    `;

    this.refreshIcons();
  },

  processCheckoutOrder() {
    const name = document.getElementById("cust-name")?.value || "Customer";
    const phone = document.getElementById("cust-phone")?.value || "";
    const email = document.getElementById("cust-email")?.value || "";
    const address = document.getElementById("cust-address")?.value || "";
    const city = document.getElementById("cust-city")?.value || "";
    const state = document.getElementById("cust-state")?.value || "";
    const pincode = document.getElementById("cust-pincode")?.value || "";

    const { subtotal, discountAmount, shippingFee, finalTotal } = this.calculateCartTotals();

    const newOrder = {
      date: new Date().toLocaleDateString("en-IN", { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
      customer: { name, phone, email, address, city, state, pincode },
      items: [...this.state.cart],
      subtotal,
      discountAmount,
      shippingFee,
      finalTotal,
      status: "Order Request Received"
    };

    this.state.orders.unshift(newOrder);

    // Empty cart and clear state
    this.state.cart = [];
    this.state.appliedCoupon = null;
    this.saveState();

    this.closeCheckoutModal();
    this.showOrderSuccessModal(newOrder);
  },

  showOrderSuccessModal(order) {
    const modal = document.getElementById("order-success-modal");
    const container = document.getElementById("order-success-content");
    if (!modal || !container) return;

    container.innerHTML = `
      <div id="printable-receipt" class="text-center p-6">
        <div class="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4">
          <i data-lucide="check" class="w-8 h-8"></i>
        </div>

        <span class="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
          Request Acknowledged
        </span>

        <h3 class="font-heading font-bold text-2xl text-slate-900 mt-3">Your order request has been received. We will contact you.</h3>
        <p class="text-xs text-slate-500 mt-2">Thank you, <strong>${order.customer.name}</strong>. Our team will contact you via WhatsApp or email (<strong>${order.customer.phone}</strong>) to verify your items and confirm dispatch.</p>

        <!-- Order Box -->
        <div class="my-5 p-4 rounded-xl bg-slate-50 border border-slate-200 text-left text-xs">
          <div class="py-2.5 border-b border-slate-200 space-y-1.5">
            <span class="text-slate-400 block text-[10px] uppercase font-semibold">Shipping Address:</span>
            <div class="text-slate-700 font-medium">
              ${order.customer.address}, ${order.customer.city}, ${order.customer.state} - ${order.customer.pincode}
            </div>
          </div>

          <!-- Items recap -->
          <div class="pt-2.5 space-y-1">
            <span class="text-slate-400 block text-[10px] uppercase font-semibold">Requested Items:</span>
            ${order.items.map(i => `
              <div class="flex justify-between text-slate-700">
                <span>${i.name} (${i.variant}) × ${i.quantity}</span>
                <span class="font-semibold">₹${(i.price * i.quantity).toLocaleString("en-IN")}</span>
              </div>
            `).join("")}
            <div class="flex justify-between text-sm font-bold text-slate-900 pt-2 border-t border-slate-200 mt-2">
              <span>Estimated Total</span>
              <span class="text-amber-800">₹${order.finalTotal.toLocaleString("en-IN")}</span>
            </div>
          </div>
        </div>

        <div class="p-3 rounded-lg bg-amber-50 border border-amber-200 text-amber-900 text-xs mb-5">
          <span>Note: No payment was charged online. Our customer care will reach out directly to coordinate fulfillment.</span>
        </div>

        <button onclick="DeskoraApp.closeOrderSuccessModal()" class="w-full py-3 bg-slate-900 text-white rounded-xl font-bold text-sm hover:bg-slate-800 transition-colors">
          Continue Browsing
        </button>
      </div>
    `;

    modal.classList.remove("hidden");
    if (window.lucide) {
      window.lucide.createIcons();
    }
  },
            <div class="text-right">
              <span class="text-slate-400 block text-[10px]">ESTIMATED DELIVERY</span>
              <span class="font-semibold text-emerald-700">3-4 Days via BlueDart Air</span>
            </div>
          </div>

          <div class="py-2.5 border-b border-slate-200 space-y-1.5">
            <span class="text-slate-400 block text-[10px] uppercase font-semibold">Shipping Address:</span>
            <div class="text-slate-700 font-medium">
              ${order.customer.address}, ${order.customer.city}, ${order.customer.state} - ${order.customer.pincode}
            </div>
          </div>

          <!-- Items recap -->
          <div class="pt-2.5 space-y-1">
            <span class="text-slate-400 block text-[10px] uppercase font-semibold">Items in Package:</span>
            ${order.items.map(i => `
              <div class="flex justify-between text-slate-700">
                <span>${i.name} (${i.variant}) × ${i.quantity}</span>
                <span class="font-semibold">₹${(i.price * i.quantity).toLocaleString("en-IN")}</span>
              </div>
            `).join("")}
            <div class="flex justify-between text-sm font-bold text-slate-900 pt-2 border-t border-slate-200 mt-2">
              <span>Amount Paid (${order.paymentMethod})</span>
              <span class="text-amber-800">₹${order.finalTotal.toLocaleString("en-IN")}</span>
            </div>
          </div>
        </div>

        <!-- Tracking Timeline simulation -->
        <div class="text-left bg-white p-4 rounded-xl border border-slate-200 mb-5 text-xs">
          <div class="font-semibold text-slate-800 mb-2 flex items-center gap-1.5">
            <i data-lucide="truck" class="w-4 h-4 text-amber-600"></i>
            <span>Live Dispatch Tracking</span>
          </div>
          <div class="space-y-3 pl-2 border-l-2 border-emerald-500 ml-2">
            <div class="relative pl-3">
              <span class="absolute -left-[19px] top-1 w-3 h-3 rounded-full bg-emerald-500 ring-4 ring-white"></span>
              <div class="font-semibold text-emerald-700">Order Confirmed & Payment Verified</div>
              <div class="text-[10px] text-slate-400">Today, just now</div>
            </div>
            <div class="relative pl-3">
              <span class="absolute -left-[19px] top-1 w-3 h-3 rounded-full bg-slate-300 ring-4 ring-white"></span>
              <div class="font-medium text-slate-700">Packing at Bengaluru Fulfillment Center</div>
              <div class="text-[10px] text-slate-400">Within 12 hours</div>
            </div>
            <div class="relative pl-3">
              <span class="absolute -left-[19px] top-1 w-3 h-3 rounded-full bg-slate-300 ring-4 ring-white"></span>
              <div class="font-medium text-slate-500">Handed over to BlueDart Air Courier</div>
              <div class="text-[10px] text-slate-400">Tracking AWB will be messaged</div>
            </div>
          </div>
        </div>

        <!-- Action CTAs -->
        <div class="flex flex-wrap gap-2.5 justify-center">
          <button 
            onclick="window.print()"
            class="px-4 py-2.5 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-semibold flex items-center gap-1.5">
            <i data-lucide="printer" class="w-3.5 h-3.5"></i>
            <span>Print Invoice</span>
          </button>

          <button 
            onclick="DeskoraApp.closeOrderSuccessModal()"
            class="px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold flex items-center gap-1.5 shadow-md">
            <span>Continue Shopping</span>
            <i data-lucide="arrow-right" class="w-3.5 h-3.5"></i>
          </button>
        </div>
      </div>
    `;

    this.refreshIcons();
    modal.classList.add("active");
    document.body.style.overflow = "hidden";
  },

  closeOrderSuccessModal() {
    const modal = document.getElementById("order-success-modal");
    if (modal) {
      modal.classList.remove("active");
      document.body.style.overflow = "";
    }
  },

  triggerConfetti() {
    const colors = ["#d97706", "#059669", "#2563eb", "#dc2626", "#f59e0b"];
    for (let i = 0; i < 40; i++) {
      const el = document.createElement("div");
      el.className = "confetti";
      el.style.left = `${Math.random() * 100}vw`;
      el.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      el.style.animationDelay = `${Math.random() * 0.8}s`;
      document.body.appendChild(el);
      setTimeout(() => el.remove(), 2600);
    }
  },

  // Student & Campus Perks Modal
  openCampusPerksModal() {
    const modal = document.getElementById("campus-modal");
    if (modal) {
      modal.classList.add("active");
      document.body.style.overflow = "hidden";
    }
  },

  closeCampusPerksModal() {
    const modal = document.getElementById("campus-modal");
    if (modal) {
      modal.classList.remove("active");
      document.body.style.overflow = "";
    }
  },

  claimStudentPerk(email) {
    if (!email || !email.includes("@")) {
      this.showToast("Please enter a valid student or college email", "error", "alert-circle");
      return;
    }

    this.applyCoupon("STUDENT15");
    this.closeCampusPerksModal();
    this.showToast("Student verification complete! Code STUDENT15 unlocked.", "success", "graduation-cap");
  },

  // Contact / Support Modal
  openContactModal() {
    const modal = document.getElementById("contact-modal");
    if (modal) {
      modal.classList.add("active");
      document.body.style.overflow = "hidden";
    }
  },

  closeContactModal() {
    const modal = document.getElementById("contact-modal");
    if (modal) {
      modal.classList.remove("active");
      document.body.style.overflow = "";
    }
  },

  submitContactForm(e) {
    e.preventDefault();
    this.showToast("Inquiry received! Our desk specialist will WhatsApp you within 2 hours.", "success", "message-circle");
    this.closeContactModal();
  },

  // Reviews & FAQ Renderers
  renderReviews() {
    const container = document.getElementById("reviews-grid");
    if (!container) return;

    container.innerHTML = DESKORA_DATA.reviews.map(r => `
      <div class="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-xs flex flex-col justify-between">
        <div>
          <div class="flex items-center justify-between mb-3">
            <div class="flex text-amber-400">
              ${Array(r.rating).fill('<i data-lucide="star" class="w-4 h-4 fill-amber-400"></i>').join("")}
            </div>
            <span class="text-[11px] text-slate-400">${r.date}</span>
          </div>

          <p class="text-xs text-slate-600 italic leading-relaxed">"${r.comment}"</p>
        </div>

        <div class="mt-4 pt-4 border-t border-slate-100 flex items-center gap-3">
          <img src="${r.avatar}" alt="${r.author}" class="w-10 h-10 rounded-full object-cover shrink-0" />
          <div class="min-w-0">
            <div class="text-xs font-bold text-slate-900 flex items-center gap-1">
              <span>${r.author}</span>
              ${r.verified ? '<i data-lucide="badge-check" class="w-3.5 h-3.5 text-blue-500" title="Verified Deskora Buyer"></i>' : ''}
            </div>
            <div class="text-[10px] text-slate-500 truncate">${r.role} • ${r.location}</div>
          </div>
        </div>
      </div>
    `).join("");
  },

  renderFaqs() {
    const container = document.getElementById("faq-accordion");
    if (!container) return;

    container.innerHTML = DESKORA_DATA.faqs.map((faq, i) => `
      <div class="bg-white rounded-xl border border-slate-200/90 overflow-hidden">
        <button 
          onclick="DeskoraApp.toggleFaq(${i})"
          class="w-full px-5 py-4 text-left font-heading font-semibold text-xs md:text-sm text-slate-900 flex items-center justify-between gap-4 hover:bg-slate-50 transition-colors">
          <span>${faq.question}</span>
          <i data-lucide="chevron-down" id="faq-icon-${i}" class="w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200"></i>
        </button>
        <div id="faq-answer-${i}" class="hidden px-5 pb-4 text-xs text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
          ${faq.answer}
        </div>
      </div>
    `).join("");
  },

  toggleFaq(index) {
    const ans = document.getElementById(`faq-answer-${index}`);
    const icon = document.getElementById(`faq-icon-${index}`);
    if (ans) {
      const isHidden = ans.classList.contains("hidden");
      ans.classList.toggle("hidden", !isHidden);
      if (icon) icon.classList.toggle("rotate-180", isHidden);
    }
  },

  renderIndianStates() {
    const select = document.getElementById("cust-state");
    if (select) {
      select.innerHTML = DESKORA_DATA.indianStates.map(st => `
        <option value="${st}" ${st === 'Karnataka' ? 'selected' : ''}>${st}</option>
      `).join("");
    }
  },

  // Toast System
  showToast(message, type = "info", iconName = "bell") {
    let container = document.getElementById("toast-container");
    if (!container) {
      container = document.createElement("div");
      container.id = "toast-container";
      document.body.appendChild(container);
    }

    const toast = document.createElement("div");
    toast.className = "toast";

    let iconColor = "text-amber-400";
    if (type === "success") iconColor = "text-emerald-400";
    if (type === "error") iconColor = "text-red-400";

    toast.innerHTML = `
      <i data-lucide="${iconName}" class="w-4 h-4 ${iconColor} shrink-0"></i>
      <span class="flex-1">${message}</span>
    `;

    container.appendChild(toast);
    this.refreshIcons();

    setTimeout(() => toast.classList.add("active"), 10);
    setTimeout(() => {
      toast.classList.remove("active");
      setTimeout(() => toast.remove(), 300);
    }, 3200);
  },

  // Event Listeners setup
  setupEventListeners() {
    // Search inputs
    const searchInput = document.getElementById("search-input");
    const mobileSearchInput = document.getElementById("mobile-search-input");

    const handleSearch = (e) => {
      this.state.searchQuery = e.target.value;
      this.renderProducts();
    };

    if (searchInput) searchInput.addEventListener("input", handleSearch);
    if (mobileSearchInput) mobileSearchInput.addEventListener("input", handleSearch);

    // Price slider
    const priceSlider = document.getElementById("price-slider");
    const priceDisplay = document.getElementById("price-display");
    if (priceSlider) {
      priceSlider.addEventListener("input", (e) => {
        const val = parseInt(e.target.value, 10);
        this.state.priceFilter = val;
        if (priceDisplay) priceDisplay.textContent = `Up to ₹${val.toLocaleString("en-IN")}`;
        this.renderProducts();
      });
    }

    // Sort select
    const sortSelect = document.getElementById("sort-select");
    if (sortSelect) {
      sortSelect.addEventListener("change", (e) => {
        this.state.sortBy = e.target.value;
        this.renderProducts();
      });
    }

    // Close modals on Escape key
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        this.closeCartDrawer();
        this.closeWishlistModal();
        this.closeProductQuickView();
        this.closeCompareModal();
        this.closeQuizModal();
        this.closeCheckoutModal();
        this.closeCampusPerksModal();
        this.closeContactModal();
        this.closeOrderSuccessModal();
      }
    });
  }
};

// Global Exposure & Boot on DOM ready
window.DeskoraApp = DeskoraApp;
document.addEventListener("DOMContentLoaded", () => {
  DeskoraApp.init();
});
