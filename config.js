/* ============================================================
   S.S. INDUSTRIES & FABRICATIONS — SITE SETTINGS
   This is the only file you need to edit for day-to-day changes.
   ============================================================ */
const SITE = {
  phones: {
    main:   { wa: "918050451188", show: "+91 80504 51188" },  // all products except ladders
    ladder: { wa: "919742986679", show: "+91 97429 86679" }   // ladder products
  },

  // Gallery: set to true to show the gallery section + nav link.
  gallery: {
    enabled: false,
    images: [
      // { src: "assets/gallery/photo1.jpg", caption: "Sprinkler systems" },
    ]
  },

  /* PRODUCTS
     - visible: false  -> hides a product without deleting it
     - contact: "ladder" -> enquiries go to the ladder number
     - image: "assets/products/name.jpg" (leave "" for a clean placeholder)
     To add a product, copy any block below and change the values. */
  products: [
    { name: "Sprinkler Systems", category: "Irrigation", contact: "main", visible: true, image: "",
      desc: "Precision sprinklers for even water distribution across fields.",
      features: ["Multiple spray patterns", "UV-stabilised plastic", "Easy installation"] },
    { name: "Sickle Handles", category: "Farm Tools", contact: "main", visible: true, image: "",
      desc: "Ergonomic handles that reduce fatigue during long harvests.",
      features: ["Contoured grip", "Lightweight and strong", "Weather resistant"] },
    { name: "Electrical Insulators", category: "Electrical", contact: "main", visible: true, image: "",
      desc: "High-grade plastic insulators for agricultural electrical work.",
      features: ["High dielectric strength", "UV-resistant", "Long service life"] },
    { name: "Fencing Insulators", category: "Fencing", contact: "main", visible: true, image: "",
      desc: "Insulators for electric fencing that keep wires safe and secure.",
      features: ["Prevents leakage", "Corrosion resistant", "Fits all wire gauges"] },
    { name: "PVC Pipe Bends", category: "Plumbing & Irrigation", contact: "main", visible: true, image: "",
      desc: "Virgin PVC bends for irrigation and water management.",
      features: ["45° to 90° angles", "Leak-proof fit", "Virgin PVC"] },
    { name: "Yakshagana Ornaments", category: "Cultural Crafts", contact: "main", visible: true, image: "",
      desc: "Lightweight ornaments that carry Karnataka's Yakshagana tradition.",
      features: ["Traditional designs", "Stage-durable", "Bulk orders accepted"] },
    { name: "Single Pole Ladders", category: "Aluminium Ladders", contact: "ladder", visible: true, image: "",
      desc: "Lightweight aluminium ladders for areca nut and coconut farming.",
      features: ["Aluminium alloy", "Corrosion resistant", "Compact and portable"] },
    { name: "Double Pole Ladders", category: "Aluminium Ladders", contact: "ladder", visible: true, image: "",
      desc: "Sturdy wide-base ladders for orchards and heavy-duty use.",
      features: ["Extra wide base", "Heavy-duty build", "Non-slip steps"] },
    { name: "Ladder Steps & Clips", category: "Ladder Hardware", contact: "ladder", visible: true, image: "",
      desc: "Durable plastic steps and clips for agricultural and industrial use.",
      features: ["Anti-slip surface", "Reinforced plastic", "Universal fit"] }
  ]
};
