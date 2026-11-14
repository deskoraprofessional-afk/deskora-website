// ==========================================================================
// DESKORA - PRODUCT CATALOG & STORE DATA
// Curated desk essentials for students, creators & professionals across India
// ==========================================================================

const DESKORA_DATA = {
  storeInfo: {
    name: "Deskora",
    tagline: "Curated Desk Essentials for Focused Minds",
    freeShippingThreshold: 999,
    standardShippingFee: 99,
    expressShippingFee: 149,
    currencySymbol: "₹",
    supportEmail: "hello@deskora.in",
    supportWhatsApp: "+91 98765 43210",
    supportHours: "Mon - Sat: 9:00 AM - 8:00 PM IST",
    returnPolicyDays: 7,
    warrantyMonths: 12
  },

  categories: [
    { id: "all", name: "All Essentials", icon: "layout-grid", count: 16 },
    { id: "setup-kits", name: "Curated Setup Kits", icon: "box", count: 4, highlight: true },
    { id: "laptop-stands", name: "Laptop Stands", icon: "laptop", count: 4 },
    { id: "desk-mats", name: "Desk Mats & Pads", icon: "rectangle-horizontal", count: 3 },
    { id: "desk-organisers", name: "Desk Organisers", icon: "archive", count: 3 },
    { id: "mobile-stands", name: "Mobile & Tablet Docks", icon: "smartphone", count: 3 },
    { id: "cable-organisers", name: "Cable Management", icon: "cable", count: 3 },
    { id: "stationery-lighting", name: "Stationery & Lighting", icon: "pen-tool", count: 3 }
  ],

  quickPills: [
    { label: "⭐ Bestsellers", filter: "bestseller" },
    { label: "🎓 Student Picks", filter: "student" },
    { label: "💼 Remote Work", filter: "pro" },
    { label: "✨ Setup Kits (Save up to 35%)", filter: "kits" },
    { label: "⚡ Under ₹999", filter: "under999" }
  ],

  coupons: [
    {
      code: "DESK10",
      discountType: "percent",
      value: 10,
      description: "10% off on your order",
      minOrder: 799
    },
    {
      code: "STUDENT15",
      discountType: "percent",
      value: 15,
      description: "15% Student & MBA Exclusive Discount",
      minOrder: 499
    },
    {
      code: "SETUPKIT",
      discountType: "flat",
      value: 400,
      description: "Flat ₹400 off on Curated Setup Kits",
      minOrder: 1999
    },
    {
      code: "FIRSTDESK",
      discountType: "flat",
      value: 200,
      description: "Flat ₹200 off for first-time buyers",
      minOrder: 1299
    }
  ],

  products: [
    // 1. SETUP KITS (Hero Bundles)
    {
      id: "kit-student-hustle",
      name: "The Student Hustle Setup Kit",
      category: "setup-kits",
      tag: "Best Value for Students",
      badge: "Student Fav",
      price: 2499,
      originalPrice: 3899,
      discount: "36% OFF",
      rating: 4.9,
      reviewCount: 312,
      isBestseller: true,
      isStudentPick: true,
      image: "images/student-hustle-kit.jpg",
      secondaryImage: "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=900&auto=format&fit=crop&q=80",
      shortDesc: "Complete starter workspace kit engineered for college dorms, hostel rooms, and study desks.",
      description: "Everything a student or MBA aspirant needs to eliminate clutter and study with ergonomic posture. Includes our aerospace-grade aluminum foldable laptop stand, a dual-sided vegan leather desk pad, magnetic silicone cable clips (pack of 5), and a minimalist stationery caddy.",
      kitIncludes: [
        "Deskora Ergonomic Foldable Laptop Stand (Silver)",
        "Dual-Sided Vegan Leather Desk Mat (80x40cm - Midnight Black / Camel)",
        "Magnetic Silicone Cable Clips (5-Pack)",
        "Minimalist Matte Pen & Sticky Note Dock"
      ],
      colors: [
        { name: "Obsidian & Tan", hex: "#1e293b", img: "https://images.unsplash.com/photo-1593062096033-9a26b09da705?w=900&auto=format&fit=crop&q=80" },
        { name: "Sage & Grey", hex: "#4b6043", img: "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=900&auto=format&fit=crop&q=80" }
      ],
      specs: {
        "Materials": "Aircraft-Grade Aluminum, Vegan PU Leather, Eco-silicone",
        "Compatibility": "All Laptops 10\" - 16\" (MacBook, Dell, ThinkPad, HP, Asus)",
        "Warranty": "1-Year Deskora Replacement Warranty",
        "Weight Capacity": "Holds up to 10 kg securely",
        "Packaging": "Eco-friendly recyclable Deskora gift box"
      },
      stock: 42
    },
    {
      id: "kit-remote-pro",
      name: "The Remote Pro Executive Setup Kit",
      category: "setup-kits",
      tag: "High-Performance Work",
      badge: "Top Seller",
      price: 4499,
      originalPrice: 6999,
      discount: "35% OFF",
      rating: 4.95,
      reviewCount: 489,
      isBestseller: true,
      isProPick: true,
      image: "images/complete-workspace-kit.jpg",
      secondaryImage: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=900&auto=format&fit=crop&q=80",
      shortDesc: "The ultimate 5-piece workstation setup designed for software engineers, consultants, and remote corporate leaders.",
      description: "Transform your home office into a distraction-free command center. Features our 360° Rotatable Aluminum Laptop Riser, XXL Premium Felt Desk Pad, Auto-Dimming LED Monitor Light Bar, Heavy-Duty Under-Desk Cable Management Channel, and Solid Aluminum Wireless Phone Charging Dock.",
      kitIncludes: [
        "Deskora 360° Heavy-Duty Rotating Aluminum Laptop Riser",
        "XXL Merino Wool Felt Desk Mat (90x45cm)",
        "Deskora Horizon Auto-Dimming LED Monitor Light Bar (USB-C)",
        "Under-Desk Stealth Cable Management Spine",
        "MagSafe-Compatible 15W Fast Wireless Aluminum Dock"
      ],
      colors: [
        { name: "Space Grey Studio", hex: "#334155", img: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=900&auto=format&fit=crop&q=80" },
        { name: "Matte Black Elite", hex: "#0f172a", img: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=900&auto=format&fit=crop&q=80" }
      ],
      specs: {
        "Materials": "Sandblasted CNC Aluminum, Merino Felt, Optical Glass, ABS",
        "Lightbar Power": "5W USB-C Powered, 3000K-6500K color temps",
        "Compatibility": "Universal laptops & external monitors (flat or curved)",
        "Warranty": "1-Year Comprehensive Replacement Warranty",
        "Cable Channel Capacity": "Houses 8+ thick power bricks & cables"
      },
      stock: 28
    },
    {
      id: "kit-creator-minimalist",
      name: "The Creator Minimalist Aesthetic Kit",
      category: "setup-kits",
      tag: "Aesthetic Desk Lookbook",
      badge: "Trending",
      price: 3699,
      originalPrice: 5299,
      discount: "30% OFF",
      rating: 4.88,
      reviewCount: 194,
      isBestseller: false,
      isCreatorPick: true,
      image: "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=900&auto=format&fit=crop&q=80",
      secondaryImage: "https://images.unsplash.com/photo-1593062096033-9a26b09da705?w=900&auto=format&fit=crop&q=80",
      shortDesc: "Curated for UI/UX designers, video editors, YouTubers, and aesthetic workspace enthusiasts.",
      description: "Crafted with warmth and precision. Combines natural sustainable American Walnut wood with matte black aluminum. Includes our Dual-Shelf Monitor & Laptop Riser, Walnut & Brass Pen Tray, Dual-Tone Vegan Leather Mat, and Magnetic Cable Anchor.",
      kitIncludes: [
        "Deskora Walnut & Aluminum Dual-Shelf Riser",
        "Saddle Brown Dual-Sided Desk Pad (80x40cm)",
        "Solid Brass & Walnut Magnetic Stationery Dock",
        "Silicone Cable Anchor Pods (Pack of 3)"
      ],
      colors: [
        { name: "Walnut & Slate", hex: "#5c4033", img: "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=900&auto=format&fit=crop&q=80" }
      ],
      specs: {
        "Materials": "FSC-Certified American Walnut, Cast Brass, PU Vegan Leather",
        "Dimensions": "Shelf: 60 x 20 x 10 cm; Mat: 80 x 40 cm",
        "Warranty": "1-Year Deskora Warranty",
        "Craftsmanship": "Hand-finished organic wood grain with water-resistant beeswax seal"
      },
      stock: 19
    },
    {
      id: "kit-study-essentials",
      name: "The B-School Exam & Study Sprint Kit",
      category: "setup-kits",
      tag: "MBA & Competitive Exam Ready",
      badge: "Student Fav",
      price: 1899,
      originalPrice: 2899,
      discount: "34% OFF",
      rating: 4.85,
      reviewCount: 220,
      isBestseller: false,
      isStudentPick: true,
      image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=900&auto=format&fit=crop&q=80",
      secondaryImage: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=900&auto=format&fit=crop&q=80",
      shortDesc: "Compact, portable workspace kit made for study tables, library marathons, and case study nights.",
      description: "Engineered for students who need quick setup and teardown. Includes a pocket-foldable 6-level adjustable laptop stand, water-resistant compact desk mat, tablet/iPad angle prop stand, and spiral cable tidy ties.",
      kitIncludes: [
        "Deskora Pocket Flex 6-Angle Aluminum Laptop Stand",
        "Waterproof Vegan Leather Study Mat (70x35cm)",
        "Adjustable Tablet & Book Reading Stand",
        "Reusable Velcro Cable Organiser Ties (Pack of 10)"
      ],
      colors: [
        { name: "Arctic Silver", hex: "#cbd5e1", img: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=900&auto=format&fit=crop&q=80" },
        { name: "Midnight Navy", hex: "#1e3a8a", img: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=900&auto=format&fit=crop&q=80" }
      ],
      specs: {
        "Weight": "Stand weighs only 240g, fits into backpack laptop sleeve",
        "Adjustability": "6 height levels from 5.5cm to 15.5cm",
        "Material": "Reinforced Aluminum Alloy & Silicone Grip Pads",
        "Warranty": "1-Year Warranty"
      },
      stock: 55
    },

    // 2. LAPTOP STANDS
    {
      id: "prod-laptop-foldable",
      name: "Deskora Apex Ergonomic Foldable Laptop Stand",
      category: "laptop-stands",
      tag: "Ergonomics Champion",
      badge: "Bestseller",
      price: 1199,
      originalPrice: 1999,
      discount: "40% OFF",
      rating: 4.9,
      reviewCount: 640,
      isBestseller: true,
      isStudentPick: true,
      image: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=900&auto=format&fit=crop&q=80",
      secondaryImage: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=900&auto=format&fit=crop&q=80",
      shortDesc: "Aviation-grade aluminum riser with 7 height adjustments and ventilated open cooling architecture.",
      description: "Say goodbye to chronic neck strain and hunched shoulders during long coding sessions or lecture marathons. The Deskora Apex lifts your laptop screen directly to natural eye level (15° to 45° angle). Folds flat to just 4mm thickness to slip into your college backpack.",
      colors: [
        { name: "Space Grey", hex: "#475569" },
        { name: "Silver Frost", hex: "#cbd5e1" },
        { name: "Matte Black", hex: "#0f172a" }
      ],
      specs: {
        "Material": "Aviation-Grade 6063 Aluminum with Anodized Finish",
        "Adjustment Levels": "7 Adjustable Angles (15° - 45°)",
        "Laptop Support": "Supports 10\" to 17.3\" laptops up to 8 kg",
        "Anti-Slip": "High-density silicone cushions on hooks and base",
        "Portability": "Folds flat; includes free soft velvet carry pouch"
      },
      stock: 85
    },
    {
      id: "prod-laptop-rotatable",
      name: "Deskora Axis 360° Rotating Heavy-Duty Laptop Riser",
      category: "laptop-stands",
      tag: "Pro Dual Hinge",
      badge: "Top Rated",
      price: 1899,
      originalPrice: 2899,
      discount: "34% OFF",
      rating: 4.94,
      reviewCount: 382,
      isBestseller: true,
      isProPick: true,
      image: "images/minimalist-mousepad.jpg",
      secondaryImage: "https://images.unsplash.com/photo-1593062096033-9a26b09da705?w=900&auto=format&fit=crop&q=80",
      shortDesc: "Smooth 360-degree swivel base with infinite dual-axis height and angle adjustment.",
      description: "Perfect for client demos, pairing with colleagues, or switching between sitting and standing. The damped ratchet rotation mechanism gives a satisfying tactile click as it turns. Built like a tank with dual heavy-duty steel tension hinges that never sag.",
      colors: [
        { name: "Space Grey", hex: "#334155" },
        { name: "Matte Black", hex: "#0f172a" }
      ],
      specs: {
        "Rotation": "Full 360° ball-bearing swivel with precision click feedback",
        "Elevation": "Raises laptop up to 21cm off the desk",
        "Cooling": "Precision laser-cut honeycomb cooling vents",
        "Max Load": "Tested up to 10 kg without slippage",
        "Base Stability": "Weighted 1.2kg solid aluminum non-slip base"
      },
      stock: 36
    },
    {
      id: "prod-laptop-vertical-dock",
      name: "Deskora Arch Dual-Slot Vertical Laptop Stand",
      category: "laptop-stands",
      tag: "Clamshell Desk Saver",
      badge: "Space Saver",
      price: 999,
      originalPrice: 1599,
      discount: "37% OFF",
      rating: 4.82,
      reviewCount: 150,
      isBestseller: false,
      isStudentPick: false,
      image: "images/dual-device-stand.jpg",
      secondaryImage: "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=900&auto=format&fit=crop&q=80",
      shortDesc: "Reclaim up to 80% of your desk real estate when using your laptop in clamshell mode with external monitors.",
      description: "Dock your MacBook, ThinkPad, iPad, or books vertically in clean symmetry. Features two adjustable gravity-slot channels with protective silicone lining to prevent scratches. Width adjusts from 14mm to 42mm with included hex tool.",
      colors: [
        { name: "Silver", hex: "#cbd5e1" },
        { name: "Space Grey", hex: "#475569" },
        { name: "Matte Black", hex: "#1e293b" }
      ],
      specs: {
        "Channels": "Dual adjustable slots (14mm - 42mm each)",
        "Material": "Solid Weighted Zinc-Aluminum Alloy",
        "Base": "Full rubberized non-slip bottom pad",
        "Use Case": "MacBook Pro/Air, iPad Pro, Surface, Mechanical Keyboards"
      },
      stock: 44
    },
    {
      id: "prod-monitor-wood-shelf",
      name: "Deskora Grove Solid Walnut Monitor & Laptop Riser",
      category: "laptop-stands",
      tag: "Artisan Woodcraft",
      badge: "Premium",
      price: 2499,
      originalPrice: 3599,
      discount: "30% OFF",
      rating: 4.89,
      reviewCount: 118,
      isBestseller: false,
      isCreatorPick: true,
      image: "images/wooden-monitor-stand.jpg",
      secondaryImage: "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=900&auto=format&fit=crop&q=80",
      shortDesc: "Handcrafted natural American walnut desk riser with integrated keyboard garage and cork feet.",
      description: "Elevate your monitor or laptop to natural posture while creating clean storage underneath for your keyboard, mouse, and notebooks when not in use. Hand-sanded and finished with natural organic oils that showcase the wood grain.",
      colors: [
        { name: "Natural Walnut", hex: "#4a3525" },
        { name: "Nordic Ash", hex: "#d8c4b6" }
      ],
      specs: {
        "Dimensions": "58 cm (L) x 22 cm (W) x 10 cm (H)",
        "Under-Shelf Clearance": "Fits full-size mechanical keyboards up to 52cm",
        "Weight Capacity": "Holds heavy ultra-wide monitors up to 25 kg",
        "Feet": "Protective natural cork pads that protect wooden desk surfaces"
      },
      stock: 22
    },

    // 3. DESK MATS & PADS
    {
      id: "prod-mat-vegan-leather",
      name: "Deskora Dual-Sided Waterproof Vegan Leather Desk Mat",
      category: "desk-mats",
      tag: "Bestselling Desk Base",
      badge: "Bestseller",
      price: 899,
      originalPrice: 1499,
      discount: "40% OFF",
      rating: 4.92,
      reviewCount: 920,
      isBestseller: true,
      isStudentPick: true,
      image: "images/student-hustle-kit.jpg",
      secondaryImage: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=900&auto=format&fit=crop&q=80",
      shortDesc: "Reversible premium PU leather desk blotter. Waterproof, scratch-resistant, and ultra-smooth mouse tracking.",
      description: "The foundational layer of every aesthetic setup. Made from eco-friendly bio-based vegan leather with fine grain texture on both sides. Spilled your chai or cold coffee? Just wipe it clean with a tissue — 100% water and stain repellent. Comes with an matching color strap for easy rollup.",
      colors: [
        { name: "Midnight Black / Warm Camel", hex: "#0f172a" },
        { name: "Forest Sage / Cream Olive", hex: "#3f4e3b" },
        { name: "Navy Blue / Muted Gold", hex: "#1e3a8a" },
        { name: "Storm Grey / Blush Rose", hex: "#64748b" }
      ],
      specs: {
        "Size Options": "Large (80 x 40 cm) / XXL (90 x 45 cm)",
        "Thickness": "2.0 mm plush cushioning for quiet typing & wrist comfort",
        "Material": "Spill-Proof Vegan Microfiber Leather (Dual Sided)",
        "Edge Finish": "Reinforced precision stitched edges that prevent fraying",
        "Included": "Matching vegan leather travel roll-up strap"
      },
      stock: 140
    },
    {
      id: "prod-mat-wool-felt",
      name: "Deskora Merino Wool Minimalist Felt Desk Pad",
      category: "desk-mats",
      tag: "Nordic Acoustic Vibe",
      badge: "Trending",
      price: 1199,
      originalPrice: 1799,
      discount: "33% OFF",
      rating: 4.88,
      reviewCount: 295,
      isBestseller: false,
      isCreatorPick: true,
      image: "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=900&auto=format&fit=crop&q=80",
      secondaryImage: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=900&auto=format&fit=crop&q=80",
      shortDesc: "High-density natural wool blend felt pad with anti-slip rubber micro-dots on the underside.",
      description: "Brings cozy warmth and tactile texture to cold glass or wooden desks. Dampens mechanical keyboard reverberations and absorbs wrist sweat during intense 10-hour work sprints. Features anti-slip textured grip dots that anchor firmly to your desk.",
      colors: [
        { name: "Deep Charcoal Grey", hex: "#334155" },
        { name: "Heather Slate Grey", hex: "#94a3b8" }
      ],
      specs: {
        "Dimensions": "85 cm x 40 cm x 3.5 mm thick",
        "Acoustics": "Reduces keyboard typing clatter by up to 40%",
        "Backing": "Thousands of rubber micro-dots ensure zero slipping",
        "Maintenance": "Lint-resistant weave; brush clean or damp cloth"
      },
      stock: 58
    },
    {
      id: "prod-mousepad-ergonomic",
      name: "Deskora CloudRest Ergonomic Wrist Support Mousepad",
      category: "desk-mats",
      tag: "Orthopedic Comfort",
      badge: "Health Pick",
      price: 549,
      originalPrice: 899,
      discount: "38% OFF",
      rating: 4.81,
      reviewCount: 410,
      isBestseller: false,
      isStudentPick: true,
      image: "images/minimalist-mousepad.jpg",
      secondaryImage: "https://images.unsplash.com/photo-1616353071855-2c045c4458ae?w=900&auto=format&fit=crop&q=80",
      shortDesc: "Slow-rebound memory foam wrist cradle designed to prevent carpal tunnel syndrome.",
      description: "Ergonomically contoured to support your wrist at its natural 8-degree angle of rest. Covered in breathable lycra silk cloth that glides friction-free under any laser or optical mouse sensor.",
      colors: [
        { name: "Matte Black", hex: "#0f172a" },
        { name: "Slate Grey", hex: "#475569" }
      ],
      specs: {
        "Cushioning": "High-density orthopedic memory foam with 5-second slow rebound",
        "Dimensions": "25 x 22 x 2.5 cm wrist contour",
        "Base": "Non-skid polyurethane gel bottom",
        "Fabric": "Washable silky Lycra surface"
      },
      stock: 75
    },

    // 4. DESK ORGANISERS
    {
      id: "prod-org-modular-tray",
      name: "Deskora Matrix 5-Piece Modular Magnetic Desk Tray System",
      category: "desk-organisers",
      tag: "Zero-Clutter Champion",
      badge: "Bestseller",
      price: 1399,
      originalPrice: 2199,
      discount: "36% OFF",
      rating: 4.93,
      reviewCount: 340,
      isBestseller: true,
      isStudentPick: true,
      image: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=900&auto=format&fit=crop&q=80",
      secondaryImage: "https://images.unsplash.com/photo-1593062096033-9a26b09da705?w=900&auto=format&fit=crop&q=80",
      shortDesc: "Interlocking modular trays with hidden neodymium magnets that snap together in any configuration.",
      description: "Finally give your pens, earbuds, flash drives, glasses, paperclips, and keys a dedicated home. Each tray module snaps together seamlessly with embedded edge magnets. Crafted from recycled durable composite polymers with soft felt lining in each compartment.",
      colors: [
        { name: "Matte Slate", hex: "#1e293b" },
        { name: "Off-White Cloud", hex: "#f1f5f9" }
      ],
      specs: {
        "Modules": "5 interchangeable trays (Pen Tray, Sticky Pad, Gadget Hub, Coin Caddy, Wide Catchall)",
        "Magnets": "12 embedded neodymium snap-magnets",
        "Lining": "Precision-cut microfelt noise-dampening interior",
        "Footprint": "Can be arranged linear (long desk) or square (drawer)"
      },
      stock: 48
    },
    {
      id: "prod-org-bamboo-caddy",
      name: "Deskora Zen 3-Tier Eco-Bamboo Desktop Organiser",
      category: "desk-organisers",
      tag: "Natural Organizer",
      badge: "Eco-Friendly",
      price: 1199,
      originalPrice: 1799,
      discount: "33% OFF",
      rating: 4.86,
      reviewCount: 178,
      isBestseller: false,
      isStudentPick: false,
      image: "images/desk-accessories-combo.jpg",
      secondaryImage: "https://images.unsplash.com/photo-1585336261026-7a8d5e16ecff?w=900&auto=format&fit=crop&q=80",
      shortDesc: "3-tier stepped desktop storage tower handcrafted from 100% sustainable Moso bamboo.",
      description: "Organize books, iPad, notebooks, pens, and sticky notes vertically to keep your work surface completely clear. Features a smooth beveled finish with natural moisture-resistant varnish.",
      colors: [
        { name: "Natural Honey Bamboo", hex: "#c49a6c" }
      ],
      specs: {
        "Material": "100% Rapidly Renewable Moso Bamboo",
        "Compartments": "6 specialized slots (vertical mail/tablet slot, dual pen cups, open tray)",
        "Dimensions": "26 cm (L) x 16 cm (W) x 15 cm (H)",
        "Assembly": "Pre-assembled; ready out of the box"
      },
      stock: 31
    },
    {
      id: "prod-org-drawer-caddy",
      name: "Deskora Stealth Under-Desk Slide-Out Hidden Drawer",
      category: "desk-organisers",
      tag: "Invisible Storage",
      badge: "Clever Pick",
      price: 699,
      originalPrice: 1099,
      discount: "36% OFF",
      rating: 4.79,
      reviewCount: 215,
      isBestseller: false,
      isStudentPick: true,
      image: "images/complete-workspace-kit.jpg",
      secondaryImage: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=900&auto=format&fit=crop&q=80",
      shortDesc: "Self-adhesive secret drawer that installs under any desk in 60 seconds with industrial 3M VHB tape.",
      description: "Lacking drawers on your study table or minimalist desk? This stealth slide-out drawer sticks firmly to the underside of your desk. Perfect for hiding your phone during focus sessions, stashing stationery, or keeping flash drives safe.",
      colors: [
        { name: "Matte Charcoal", hex: "#1e293b" },
        { name: "Chalk White", hex: "#f8fafc" }
      ],
      specs: {
        "Installation": "No drilling required; heavy-duty 3M VHB adhesive strips included",
        "Dimensions": "22 x 15.5 x 3.5 cm",
        "Weight Capacity": "Holds up to 3 kg securely",
        "Material": "Reinforced impact-resistant ABS polymer"
      },
      stock: 62
    },

    // 5. MOBILE & TABLET STANDS
    {
      id: "prod-phone-magsafe-dock",
      name: "Deskora Halo 15W Fast Wireless Aluminum Charging Stand",
      category: "mobile-stands",
      tag: "Qi2 & MagSafe Certified",
      badge: "Top Rated",
      price: 1799,
      originalPrice: 2699,
      discount: "33% OFF",
      rating: 4.96,
      reviewCount: 388,
      isBestseller: true,
      isProPick: true,
      image: "https://images.unsplash.com/photo-1585338107529-13afc5f02586?w=900&auto=format&fit=crop&q=80",
      secondaryImage: "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=900&auto=format&fit=crop&q=80",
      shortDesc: "Floating magnetic wireless dock for iPhone, Samsung, and AirPods with 60° tilt viewing angle.",
      description: "Snaps your phone into floating portrait or landscape orientation for hands-free FaceTime calls, video meetings, or iOS StandBy desk clock mode. Solid cast zinc base stays anchored to your desk when detaching your phone with one hand.",
      colors: [
        { name: "Space Grey", hex: "#334155" },
        { name: "Silver", hex: "#cbd5e1" }
      ],
      specs: {
        "Charging Speed": "15W Fast Qi Wireless (Supports MagSafe & Qi-enabled Android)",
        "Base Weight": "320g weighted anti-tip base",
        "Cable Included": "Includes 1.5m braided nylon USB-C to USB-C cable",
        "Safety": "Foreign object detection, thermal temperature control"
      },
      stock: 50
    },
    {
      id: "prod-phone-foldable-metal",
      name: "Deskora Pivot Multi-Angle Aluminum Mobile & Tablet Stand",
      category: "mobile-stands",
      tag: "Everyday Essential",
      badge: "Under ₹600",
      price: 499,
      originalPrice: 899,
      discount: "44% OFF",
      rating: 4.87,
      reviewCount: 780,
      isBestseller: true,
      isStudentPick: true,
      image: "images/pivot-mobile-stand.jpg",
      secondaryImage: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=900&auto=format&fit=crop&q=80",
      shortDesc: "Dual-hinge pocket metal stand for smartphones, iPads, and e-readers. Full 270° angle freedom.",
      description: "An indispensable tool for online lectures, Zoom meetings, or watching study tutorials while taking notes. Thick silicone hooks hold your phone securely even with bulky cases on, with an open cutout for charging cables.",
      colors: [
        { name: "Space Grey", hex: "#475569" },
        { name: "Silver Frost", hex: "#cbd5e1" },
        { name: "Rose Gold", hex: "#e2b6af" }
      ],
      specs: {
        "Compatibility": "Universal 4\" to 12.9\" devices (iPhone, OnePlus, Samsung, iPad Pro)",
        "Dual Hinge": "Adjusts screen height and tilt angle independently",
        "Portability": "Folds 100% flat to slide into jeans pocket",
        "Material": "CNC-machined solid aluminum"
      },
      stock: 120
    },
    {
      id: "prod-phone-wood-amplifier",
      name: "Deskora Sonata Natural Wood Phone Dock & Passive Acoustic Amp",
      category: "mobile-stands",
      tag: "Zero Electricity Sound",
      badge: "Aesthetic",
      price: 649,
      originalPrice: 999,
      discount: "35% OFF",
      rating: 4.78,
      reviewCount: 94,
      isBestseller: false,
      isCreatorPick: true,
      image: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=900&auto=format&fit=crop&q=80",
      secondaryImage: "https://images.unsplash.com/photo-1593062096033-9a26b09da705?w=900&auto=format&fit=crop&q=80",
      shortDesc: "Acoustically carved solid beechwood dock that naturally boosts your phone's speaker volume by +12dB.",
      description: "No batteries, no Bluetooth pairing, zero wires. Carved with a resonant acoustic horn chamber that amplifies phone calls, podcast listening, and lofi study beats naturally.",
      colors: [
        { name: "Natural Beechwood", hex: "#d4a373" }
      ],
      specs: {
        "Acoustic Gain": "Naturally boosts speaker output by ~12 decibels",
        "Material": "100% Solid sustainably sourced Beechwood",
        "Compatibility": "Fits all phones with bottom speakers up to 13mm thick"
      },
      stock: 35
    },

    // 6. CABLE MANAGEMENT
    {
      id: "prod-cable-magnetic-clips",
      name: "Deskora MagDot Magnetic Silicone Cable Clips (Pack of 5)",
      category: "cable-organisers",
      tag: "Never Drop a Cable Again",
      badge: "Bestseller",
      price: 449,
      originalPrice: 799,
      discount: "44% OFF",
      rating: 4.91,
      reviewCount: 810,
      isBestseller: true,
      isStudentPick: true,
      image: "https://images.unsplash.com/photo-1585338107529-13afc5f02586?w=900&auto=format&fit=crop&q=80",
      secondaryImage: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=900&auto=format&fit=crop&q=80",
      shortDesc: "Magnetic silicone clips with a metal desk anchor strip. Keeps charging cords right at your fingertips.",
      description: "Tired of your charging cable falling behind your desk every time you unplug your laptop? The MagDot system snaps your cables into magnetic collar clips that effortlessly dock onto a slim adhesive steel bar installed on your desk edge.",
      colors: [
        { name: "Matte Charcoal Black", hex: "#0f172a" },
        { name: "Minimalist Soft White", hex: "#f1f5f9" }
      ],
      specs: {
        "Package Contents": "5 Magnetic cable clips + 1 Long magnetic steel desk rail + 2 Circular anchor pucks",
        "Cable Compatibility": "Fits USB-C, Lightning, HDMI, Micro-USB, 6mm braided cables",
        "Adhesive": "Residue-free washable 3M acrylic adhesive",
        "Material": "Flexible food-grade silicone + N52 Neodymium magnets"
      },
      stock: 165
    },
    {
      id: "prod-cable-underdesk-tray",
      name: "Deskora Conduit Heavy-Duty Under-Desk Cable Management Channel",
      category: "cable-organisers",
      tag: "Total Cable Concealment",
      badge: "Pro Pick",
      price: 1299,
      originalPrice: 1999,
      discount: "35% OFF",
      rating: 4.94,
      reviewCount: 320,
      isBestseller: false,
      isProPick: true,
      image: "images/complete-workspace-kit.jpg",
      secondaryImage: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=900&auto=format&fit=crop&q=80",
      shortDesc: "No-drill clamp-on steel wire raceway tray that hides heavy surge protectors and power adapters.",
      description: "Clamp it to your desk in 2 minutes without drilling holes into your expensive tabletop. Spacious enough to hold a 6-socket spike buster power strip, bulky laptop power bricks, and monitor cables.",
      colors: [
        { name: "Matte Black Steel", hex: "#0f172a" },
        { name: "Pure White Steel", hex: "#f8fafc" }
      ],
      specs: {
        "Installation": "Tool-free dual rotary C-clamps (fits desks 10mm to 55mm thick)",
        "Dimensions": "42 cm (L) x 15 cm (W) x 16 cm (H)",
        "Weight Capacity": "Rigid carbon steel supports up to 8 kg of power bricks",
        "Ventilation": "Open wire-grid design prevents heat buildup around transformers"
      },
      stock: 45
    },
    {
      id: "prod-cable-zipper-sleeve",
      name: "Deskora Vortex Neoprene Zip Cable Sleeve (2 Meters)",
      category: "cable-organisers",
      tag: "Bundle Cable Snake",
      badge: "Value Pack",
      price: 399,
      originalPrice: 699,
      discount: "43% OFF",
      rating: 4.77,
      reviewCount: 260,
      isBestseller: false,
      isStudentPick: true,
      image: "https://images.unsplash.com/photo-1563884705074-7c8b15f16295?w=900&auto=format&fit=crop&q=80",
      secondaryImage: "https://images.unsplash.com/photo-1585338107529-13afc5f02586?w=900&auto=format&fit=crop&q=80",
      shortDesc: "Heavy-duty flexible neoprene cable sleeve with industrial zipper. Groups up to 10 messy cables into 1 clean tube.",
      description: "Consolidate that bird's nest of monitor cords, desktop PC wires, and printer cables into one clean, sleek conduit. Features cut-out slots so individual cords can branch out exactly where needed.",
      colors: [
        { name: "Reversible Black / White", hex: "#1e293b" }
      ],
      specs: {
        "Length": "200 cm (easily cut to custom length with standard scissors)",
        "Diameter": "35 mm (holds 8-10 standard cables simultaneously)",
        "Material": "Thermal insulating, dust-proof high-grade neoprene",
        "Zipper": "Smooth industrial grade nylon zipper"
      },
      stock: 90
    },

    // 7. STATIONERY & LIGHTING
    {
      id: "prod-light-monitor-bar",
      name: "Deskora Horizon Auto-Dimming LED Monitor ScreenBar Light",
      category: "stationery-lighting",
      tag: "Eye-Care Luminary",
      badge: "Game Changer",
      price: 2499,
      originalPrice: 3999,
      discount: "38% OFF",
      rating: 4.97,
      reviewCount: 512,
      isBestseller: true,
      isProPick: true,
      image: "images/complete-workspace-kit.jpg",
      secondaryImage: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=900&auto=format&fit=crop&q=80",
      shortDesc: "Asymmetric optical monitor light bar. Eliminates screen glare and reduces late-night eye strain.",
      description: "Unlike traditional desk lamps that bounce harsh glare off your monitor screen, Deskora Horizon casts light only downward onto your keyboard and desk mat. Features touch-sensitive controls for color temperature (3000K warm to 6500K daylight) and an ambient sensor that auto-adjusts brightness based on room lighting.",
      colors: [
        { name: "Matte Space Black", hex: "#0f172a" }
      ],
      specs: {
        "Optical Design": "45° Asymmetric optical path (Zero screen reflection/glare)",
        "Color Temp": "3 Presets (3000K Warm, 4200K Neutral, 6500K Cool White) + Stepless dimming",
        "Power": "USB-C Powered (plugs directly into monitor, laptop, or adapter)",
        "Mount": "Weighted counter-balance clamp fits monitors from 1cm to 3.5cm thick",
        "Color Rendering": "High CRI Ra>95 for true color accuracy"
      },
      stock: 38
    },
    {
      id: "prod-pen-brass-dock",
      name: "Deskora Gravity Solid Brass Rollerball Pen & Weighted Dock",
      category: "stationery-lighting",
      tag: "Heirloom Writing Instrument",
      badge: "Signature",
      price: 1199,
      originalPrice: 1799,
      discount: "33% OFF",
      rating: 4.89,
      reviewCount: 164,
      isBestseller: false,
      isCreatorPick: true,
      image: "https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?w=900&auto=format&fit=crop&q=80",
      secondaryImage: "https://images.unsplash.com/photo-1585336261026-7a8d5e16ecff?w=900&auto=format&fit=crop&q=80",
      shortDesc: "Machined from solid raw brass. Self-standing vertical pen dock engineered to write for a lifetime.",
      description: "Balanced perfectly to minimize hand fatigue when signing documents, jotting lecture notes, or journaling. Develops a unique rich patina over time that tells your personal career story. Uses standard Schmidt / Parker G2 refills available everywhere.",
      colors: [
        { name: "Raw Brushed Brass", hex: "#d4af37" },
        { name: "Matte Black Oxide", hex: "#1e293b" }
      ],
      specs: {
        "Pen Weight": "48g perfectly balanced center-of-gravity",
        "Dock Weight": "160g solid anti-tip desk stand",
        "Refill Standard": "Compatible with standard Parker G2 & Schmidt rollerball refills",
        "In the box": "Solid Brass Pen, Weighted Stand, 2x Swiss 0.5mm Black ink refills"
      },
      stock: 29
    },
    {
      id: "prod-stationery-acrylic-caddy",
      name: "Deskora Prism Smoked Acrylic Sticky Note & Card Caddy",
      category: "stationery-lighting",
      tag: "Desk Accent",
      badge: "Under ₹500",
      price: 399,
      originalPrice: 649,
      discount: "38% OFF",
      rating: 4.75,
      reviewCount: 130,
      isBestseller: false,
      isStudentPick: true,
      image: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=900&auto=format&fit=crop&q=80",
      secondaryImage: "https://images.unsplash.com/photo-1593062096033-9a26b09da705?w=900&auto=format&fit=crop&q=80",
      shortDesc: "Architectural smoked acrylic tray with beveled edges for Post-Its, visiting cards, and paperclips.",
      description: "Keep your daily to-do sticky notes and index cards visible and organized. Crafted from optical-grade cast acrylic with polished edges that catch desktop ambient light.",
      colors: [
        { name: "Smoked Obsidian", hex: "#334155" },
        { name: "Crystal Clear", hex: "#e2e8f0" }
      ],
      specs: {
        "Dimensions": "11 x 11 x 3 cm",
        "Fits": "Standard 3x3 inch Post-it pads, visiting cards, USB flash drives",
        "Material": "Heavy 5mm thick optical-grade scratch-resistant cast acrylic"
      },
      stock: 80
    },
    {
      id: "prod-org-wooden",
      name: "Wooden Desk Organiser",
      category: "desk-organisers",
      tag: "Handcrafted Wood",
      badge: "Artisan",
      price: 1299,
      originalPrice: 1899,
      discount: "32% OFF",
      rating: 4.9,
      reviewCount: 210,
      image: "images/desk-accessories-combo.jpg",
      shortDesc: "Solid beechwood multi-tier storage caddy with compartments for pens, notepad, and daily essentials.",
      stock: 40
    },
    {
      id: "prod-org-pen-holder",
      name: "Minimalist Pen Holder",
      category: "desk-organisers",
      tag: "Minimal Desk Accent",
      badge: "Compact",
      price: 499,
      originalPrice: 799,
      discount: "38% OFF",
      rating: 4.8,
      reviewCount: 160,
      image: "https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?w=900&auto=format&fit=crop&q=80",
      shortDesc: "Weighted desktop pen dock with precision non-slip base for signature pens and styluses.",
      stock: 65
    },
    {
      id: "prod-org-storage-tray",
      name: "Desktop Storage Tray",
      category: "desk-organisers",
      tag: "Catchall Tray",
      badge: "Valet",
      price: 799,
      originalPrice: 1199,
      discount: "33% OFF",
      rating: 4.8,
      reviewCount: 145,
      image: "images/desktop-storage-tray.jpg",
      shortDesc: "Catchall valet desktop tray with soft microfelt lining for watches, earphones, and flash drives.",
      stock: 55
    },
    {
      id: "prod-org-stationery",
      name: "Stationery Organiser",
      category: "desk-organisers",
      tag: "Desk Tier",
      badge: "Essential",
      price: 899,
      originalPrice: 1399,
      discount: "36% OFF",
      rating: 4.9,
      reviewCount: 190,
      image: "https://images.unsplash.com/photo-1585336261026-7a8d5e16ecff?w=900&auto=format&fit=crop&q=80",
      shortDesc: "Stepped stationery tower holding notebooks, rulers, Post-It notes, and markers upright.",
      stock: 45
    },
    {
      id: "prod-stand-adjustable",
      name: "Adjustable Laptop Stand",
      category: "laptop-stands",
      tag: "Ergonomics Champion",
      badge: "Pro Pick",
      price: 1499,
      originalPrice: 2299,
      discount: "35% OFF",
      rating: 4.9,
      reviewCount: 380,
      image: "images/minimalist-mousepad.jpg",
      shortDesc: "Dual-hinge heavy-duty riser lifting laptop screens up to 21cm to prevent neck fatigue.",
      stock: 50
    },
    {
      id: "prod-stand-aluminium-riser",
      name: "Aluminium Laptop Riser",
      category: "laptop-stands",
      tag: "Aviation Grade",
      badge: "Cooling",
      price: 1299,
      originalPrice: 1999,
      discount: "35% OFF",
      rating: 4.9,
      reviewCount: 450,
      image: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=900&auto=format&fit=crop&q=80",
      shortDesc: "Solid CNC sandblasted aluminium stand with cooling vents and non-slip silicone pads.",
      stock: 60
    },
    {
      id: "prod-stand-wooden-laptop",
      name: "Wooden Laptop Stand",
      category: "laptop-stands",
      tag: "Curved Woodcraft",
      badge: "Aesthetic",
      price: 1799,
      originalPrice: 2599,
      discount: "31% OFF",
      rating: 4.9,
      reviewCount: 175,
      image: "https://images.unsplash.com/photo-1616628188859-7a11abb6fcc9?w=900&auto=format&fit=crop&q=80",
      shortDesc: "Organic curved wood design providing ergonomic tilt and a natural aesthetic vibe to any desk.",
      stock: 30
    },
    {
      id: "prod-stand-wooden-mobile",
      name: "Wooden Mobile Stand",
      category: "mobile-stands",
      tag: "Handcrafted",
      badge: "Eco-Friendly",
      price: 549,
      originalPrice: 899,
      discount: "39% OFF",
      rating: 4.8,
      reviewCount: 120,
      image: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=900&auto=format&fit=crop&q=80",
      shortDesc: "Handcrafted solid beechwood phone cradle with cable charging slot for vertical and horizontal viewing.",
      stock: 70
    },
    {
      id: "prod-stand-dual-device",
      name: "Dual Device Stand",
      category: "laptop-stands",
      tag: "Space Saver",
      badge: "Dual Slot",
      price: 999,
      originalPrice: 1599,
      discount: "38% OFF",
      rating: 4.8,
      reviewCount: 150,
      image: "images/dual-device-stand.jpg",
      shortDesc: "Vertical gravity-slot dock holding both your laptop and iPad upright to reclaim 80% desk space.",
      stock: 45
    },
    {
      id: "prod-mat-premium",
      name: "Premium Desk Mat",
      category: "desk-mats",
      tag: "Vegan Leather",
      badge: "Bestseller",
      price: 899,
      originalPrice: 1499,
      discount: "40% OFF",
      rating: 4.9,
      reviewCount: 920,
      image: "images/student-hustle-kit.jpg",
      shortDesc: "Dual-sided bio-based vegan leather desk blotter. 100% waterproof, scratch-proof, and reversible.",
      stock: 120
    },
    {
      id: "prod-mat-extended",
      name: "Extended Mousepad",
      category: "desk-mats",
      tag: "XXL Gaming & Work",
      badge: "XXL Size",
      price: 749,
      originalPrice: 1199,
      discount: "38% OFF",
      rating: 4.8,
      reviewCount: 410,
      image: "images/extended-mousepad.jpg",
      shortDesc: "XXL 90x40cm cushioned desk pad with reinforced anti-fray stitched edges for typing and gaming.",
      stock: 85
    },
    {
      id: "prod-mat-leatherette",
      name: "Leatherette Desk Mat",
      category: "desk-mats",
      tag: "Saddle Brown",
      badge: "Executive",
      price: 999,
      originalPrice: 1599,
      discount: "38% OFF",
      rating: 4.9,
      reviewCount: 280,
      image: "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=900&auto=format&fit=crop&q=80",
      shortDesc: "Rich grain leatherette blotter with soft suede underside to protect luxury wooden surfaces.",
      stock: 60
    },
    {
      id: "prod-mat-waterproof",
      name: "Waterproof Desk Pad",
      category: "desk-mats",
      tag: "Spill Proof",
      badge: "Easy Clean",
      price: 849,
      originalPrice: 1399,
      discount: "39% OFF",
      rating: 4.8,
      reviewCount: 330,
      image: "images/waterproof-desk-pad.jpg",
      shortDesc: "Oleophobic & waterproof surface — hot chai and coffee spills wipe off with a single tissue.",
      stock: 90
    },
    {
      id: "prod-mat-minimalist-mousepad",
      name: "Minimalist Mousepad",
      category: "desk-mats",
      tag: "Precision Glide",
      badge: "Compact",
      price: 449,
      originalPrice: 699,
      discount: "36% OFF",
      rating: 4.7,
      reviewCount: 195,
      image: "images/minimalist-mousepad.jpg",
      shortDesc: "Compact round-corner mousepad with smooth tracking cloth and non-skid rubber base.",
      stock: 110
    },
    {
      id: "prod-mat-cork",
      name: "Cork Desk Mat",
      category: "desk-mats",
      tag: "Natural Organic Cork",
      badge: "Eco-Cork",
      price: 1099,
      originalPrice: 1699,
      discount: "35% OFF",
      rating: 4.8,
      reviewCount: 165,
      image: "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?w=900&auto=format&fit=crop&q=80",
      shortDesc: "100% sustainably harvested natural cork desk mat — warm, anti-static, and eco-friendly.",
      stock: 45
    },
    {
      id: "prod-cable-silicone-clips",
      name: "Silicone Cable Clips",
      category: "cable-organisers",
      tag: "Cord Organiser",
      badge: "Must Have",
      price: 449,
      originalPrice: 799,
      discount: "44% OFF",
      rating: 4.9,
      reviewCount: 810,
      image: "https://images.unsplash.com/photo-1585338107529-13afc5f02586?w=900&auto=format&fit=crop&q=80",
      shortDesc: "5-pack food-grade silicone cable collars with steel adhesive desk anchor rail.",
      stock: 150
    },
    {
      id: "prod-cable-box",
      name: "Cable Management Box",
      category: "cable-organisers",
      tag: "Power Strip Conceal",
      badge: "Safety",
      price: 899,
      originalPrice: 1399,
      discount: "36% OFF",
      rating: 4.8,
      reviewCount: 230,
      image: "images/complete-workspace-kit.jpg",
      shortDesc: "Flame-retardant ABS cable organizer box hiding multi-socket power strips and bulky adapters.",
      stock: 55
    },
    {
      id: "prod-acc-wooden-monitor-stand",
      name: "Wooden Monitor Stand",
      category: "laptop-stands",
      tag: "Walnut Dual Shelf",
      badge: "Signature",
      price: 2499,
      originalPrice: 3599,
      discount: "31% OFF",
      rating: 4.9,
      reviewCount: 118,
      image: "images/wooden-monitor-stand.jpg",
      shortDesc: "Solid American walnut desk riser with keyboard garage storage beneath. Holds up to 25kg.",
      stock: 25
    },
    {
      id: "prod-acc-minimalist-lamp",
      name: "Minimalist Desk Lamp",
      category: "stationery-lighting",
      tag: "Eye-Care LED",
      badge: "Architectural",
      price: 2299,
      originalPrice: 3499,
      discount: "34% OFF",
      rating: 4.9,
      reviewCount: 510,
      image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=900&auto=format&fit=crop&q=80",
      shortDesc: "Touch-dimming LED workspace lamp with 3 color temperatures — eliminates eye strain during late work.",
      stock: 35
    },
    {
      id: "prod-acc-headphone-stand",
      name: "Headphone Stand",
      category: "mobile-stands",
      tag: "Weighted Aluminum",
      badge: "Display",
      price: 899,
      originalPrice: 1499,
      discount: "40% OFF",
      rating: 4.8,
      reviewCount: 140,
      image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=900&auto=format&fit=crop&q=80",
      shortDesc: "Solid weighted aluminum stand with soft curved silicone cradle designed to preserve headphone headbands.",
      stock: 45
    },
    {
      id: "prod-acc-accessories-combo",
      name: "Desk Accessories Combo",
      category: "setup-kits",
      tag: "3-in-1 Trio",
      badge: "Bundle Deal",
      price: 1999,
      originalPrice: 2999,
      discount: "33% OFF",
      rating: 4.9,
      reviewCount: 310,
      image: "images/desk-accessories-combo.jpg",
      shortDesc: "Curated 3-in-1 combo: Dual-sided vegan desk mat + foldable phone stand + magnetic cable clips.",
      stock: 50
    },
    {
      id: "prod-acc-complete-kit",
      name: "Complete Workspace Kit",
      category: "setup-kits",
      tag: "Executive 5-Piece",
      badge: "Flagship",
      price: 4499,
      originalPrice: 6999,
      discount: "36% OFF",
      rating: 5.0,
      reviewCount: 489,
      image: "images/complete-workspace-kit.jpg",
      shortDesc: "5-piece flagship bundle: rotating laptop riser, XXL desk pad, monitor lightbar, and cable channels.",
      stock: 25
    }
  ],

  // Interactive Quiz Data
  quiz: {
    title: "Find Your Desk Vibe",
    subtitle: "Answer 3 quick questions to discover your personalized workspace setup & unlock a bonus 15% discount.",
    questions: [
      {
        id: "persona",
        question: "What best describes your daily grind?",
        options: [
          { label: "College / University Student", desc: "Attending lectures, hostel study desk, exam prep marathons", value: "student", icon: "graduation-cap" },
          { label: "MBA / Grad School Scholar", desc: "Case studies, internships, slide decks & financial models", value: "mba", icon: "book-open" },
          { label: "Remote Professional / Software Engineer", desc: "Long hours at desk, dual screens, coding & zoom meetings", value: "remote-pro", icon: "briefcase" },
          { label: "Creator / Freelancer / Designer", desc: "UI/UX, video editing, aesthetics, content creation", value: "creator", icon: "palette" }
        ]
      },
      {
        id: "struggle",
        question: "What is your biggest workspace frustration right now?",
        options: [
          { label: "Messy cords & cables falling everywhere", desc: "Wires tangled around legs and sliding off desk edges", value: "cables", icon: "cable" },
          { label: "Neck & shoulder stiffness from slouching", desc: "Staring down at laptop screen for 8+ hours a day", value: "ergonomics", icon: "activity" },
          { label: "Boring desk aesthetic & visual clutter", desc: "Uninspiring space that makes it hard to focus", value: "aesthetic", icon: "sparkles" },
          { label: "Tiny desk / lack of real estate", desc: "Books, laptop and papers fighting for space", value: "space", icon: "maximize-2" }
        ]
      },
      {
        id: "hardware",
        question: "What hardware setup do you use most?",
        options: [
          { label: "Laptop only (MacBook or Windows)", desc: "Portable setup, move between library and room", value: "laptop-only", icon: "laptop" },
          { label: "Laptop + External Monitor / Dual Displays", desc: "Primary workstation with keyboard and mouse", value: "dual-screen", icon: "monitor" },
          { label: "Laptop + iPad / Notebooks", desc: "Hybrid digital and handwriting workflow", value: "hybrid", icon: "tablet" }
        ]
      }
    ],
    recommendations: {
      "student": {
        kitId: "kit-student-hustle",
        headline: "The Student Hustle Setup Kit",
        reason: "Engineered specifically for hostel rooms and study desks. Gives you proper ergonomic height, protection against chai/coffee spills, and keeps cords locked in place.",
        discountCode: "STUDENT15",
        accessoryIds: ["prod-phone-foldable-metal", "prod-org-drawer-caddy"]
      },
      "mba": {
        kitId: "kit-study-essentials",
        headline: "The B-School Sprint Setup Kit",
        reason: "Optimized for case study reading and multi-tab financial modeling. Lightweight, packable, and ultra-sturdy for library sprints.",
        discountCode: "STUDENT15",
        accessoryIds: ["prod-pen-brass-dock", "prod-mat-vegan-leather"]
      },
      "remote-pro": {
        kitId: "kit-remote-pro",
        headline: "The Remote Pro Executive Kit",
        reason: "Heavy-duty ergonomic support with 360° swivel, eye-care monitor lightbar for late-night deployments, and total under-desk cable concealment.",
        discountCode: "DESK10",
        accessoryIds: ["prod-cable-underdesk-tray", "prod-phone-magsafe-dock"]
      },
      "creator": {
        kitId: "kit-creator-minimalist",
        headline: "The Creator Minimalist Aesthetic Kit",
        reason: "Natural American walnut meets space-grey aluminum. Designed to look breathtaking on camera while keeping your design tools instantly accessible.",
        discountCode: "SETUPKIT",
        accessoryIds: ["prod-light-monitor-bar", "prod-mat-wool-felt"]
      }
    }
  },

  // Customer Reviews & Social Proof
  reviews: [
    {
      id: "rev-1",
      author: "Aarav Sharma",
      role: "MBA Candidate, IIM Bangalore",
      rating: 5,
      date: "3 days ago",
      verified: true,
      productName: "The Student Hustle Setup Kit",
      comment: "Honestly transformed my hostel room desk from a messy dump into an aesthetic study zone. My neck used to hurt after 2 hours of case prep; the aluminum stand completely fixed that. The vegan leather mat is so easy to wipe down. Worth every rupee!",
      location: "Bengaluru, Karnataka",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
    },
    {
      id: "rev-2",
      author: "Pooja Hegde",
      role: "Senior Software Engineer @ FinTech",
      rating: 5,
      date: "1 week ago",
      verified: true,
      productName: "Horizon Auto-Dimming ScreenBar Light",
      comment: "As someone who codes late into the night, this lightbar is a lifesaver. Zero glare on my 27-inch Dell monitor, and my eyes don't feel dry or tired anymore. The touch sensors are super responsive. Premium build quality.",
      location: "Hyderabad, Telangana",
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80"
    },
    {
      id: "rev-3",
      author: "Rohan Varma",
      role: "Freelance UI/UX Designer & YouTuber",
      rating: 5,
      date: "2 weeks ago",
      verified: true,
      productName: "The Creator Minimalist Aesthetic Kit",
      comment: "The walnut finish is authentic and smells wonderful. Everyone asks about my desk setup in my YouTube video comments now! Customer service on WhatsApp was super prompt when I asked about delivery to Pune.",
      location: "Pune, Maharashtra",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80"
    },
    {
      id: "rev-4",
      author: "Ananya Iyer",
      role: "Final Year B.Tech, IIT Madras",
      rating: 5,
      date: "2 weeks ago",
      verified: true,
      productName: "Dual-Sided Vegan Leather Desk Mat",
      comment: "Received it in Chennai within 48 hours via BlueDart. The Forest Sage green color is so calming. Spilled coffee on day 2 and it wiped right off without leaving a single ring. Will definitely buy the cable clips next.",
      location: "Chennai, Tamil Nadu",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80"
    }
  ],

  // FAQs
  faqs: [
    {
      question: "How fast is delivery across India?",
      answer: "We dispatch all orders within 24 business hours from our fulfillment hubs in Bengaluru and NCR. Metro deliveries (Mumbai, Delhi NCR, Bengaluru, Hyderabad, Chennai, Pune) typically arrive within 2 to 3 days. Tier-2 and Tier-3 cities receive delivery within 3 to 5 business days via BlueDart Air and Delhivery Express."
    },
    {
      question: "Do you offer Cash on Delivery (COD)?",
      answer: "Yes! Cash on Delivery is available across 19,000+ PIN codes in India. You can inspect the outer packaging before payment to the courier partner."
    },
    {
      question: "How do I claim the Student / MBA Discount?",
      answer: "We support ambitious students! You can use promo code 'STUDENT15' at checkout for an instant 15% discount. You can also verify your college identity on our Campus Perks page with your student ID or .edu/.ac.in email for lifetime VIP discounts."
    },
    {
      question: "What is your 7-Day Return and 1-Year Warranty policy?",
      answer: "We want you to love your desk. If an item doesn't fit your workspace or arrives with any defect, initiate a return within 7 days for a full refund or free replacement. All Deskora aluminum and electronic accessories come with an unconditional 1-Year Deskora Replacement Warranty."
    },
    {
      question: "Can I get a GST invoice for company or college reimbursement?",
      answer: "Absolutely! During checkout, enter your company or institution name and 15-digit GSTIN number. We will generate an official B2B GST tax invoice with full input tax credit eligibility."
    },
    {
      question: "Are Deskora desk mats easy to clean?",
      answer: "Yes, our vegan leather desk mats are 100% waterproof and stain-resistant. Simply wipe with a damp microfiber cloth or mild soapy water. For our wool felt mats, a standard lint roller or dry soft brush keeps them pristine."
    }
  ],

  // Indian States & Union Territories
  indianStates: [
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chandigarh", "Chhattisgarh",
    "Delhi", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jammu and Kashmir",
    "Jharkhand", "Karnataka", "Kerala", "Ladakh", "Madhya Pradesh", "Maharashtra",
    "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Puducherry",
    "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura",
    "Uttar Pradesh", "Uttarakhand", "West Bengal"
  ]
};

// Make accessible in browser & node
if (typeof module !== 'undefined' && module.exports) {
  module.exports = DESKORA_DATA;
}
