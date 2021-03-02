const products = [
  {
    name: "Apple Watch Series 3 - Space Grey",
    image: "/images/watch.jpg",
    description:
      "Store and stream music, podcasts and audiobooks all on your wrist !! Enjoy all these anytime, anywhere with new additional features like Retina display & optical heat sensor",
    brand: "APPLE",
    category: "Electronics",
    price: 23900,
    countInStock: 7,
    rating: 4.7,
    numReviews: 12,
  },

  {
    name: "Lenovo IdeaPad Flex 5i 10th Gen Intel Core i3",
    image: "/images/lenovo_laptop.jpg",
    description:
      "This isn’t your typical laptop that you carry around—it’s a fashion statement. The IdeaPad™ Flex 5i is built with a new level of attention to detail, making this machine soft and comfortable to the touch with a durable paint that creates a better user-experience and multiple color options, so you can find the one that best fits you.",
    brand: "Lenovo",
    category: "Electronics",
    price: 43990,
    countInStock: 9,
    rating: 3.8,
    numReviews: 7,
  },
  {
    name: "Kindle (10th Gen) with Built-in Light & WiFi",
    image: "/images/kindle.jpg",
    description:
      "Enjoy Kindle with latest features like VoiceView screen reader, available over Bluetooth audio, provides spoken feedback allowing you to navigate your device and read books with text-to-speech (available in English only)",
    brand: "Kindle",
    category: "Electronics",
    price: 7499,
    countInStock: 8,
    rating: 3.5,
    numReviews: 5,
  },

  {
    name: "Cannon EOS 80D DSLR Camera",
    image: "/images/camera.jpg",
    description:
      "Characterized by versatile imaging specs, the Canon EOS 80D further clarifies itself using a pair of robust focusing systems and an intuitive design",
    brand: "Cannon",
    category: "Electronics",
    price: 929.99,
    countInStock: 5,
    rating: 3,
    numReviews: 12,
  },

  {
    name: "Airpods Wireless Bluetooth Headphones",
    image: "/images/airpods.jpg",
    description:
      "Bluetooth technology lets you connect it with compatible devices wirelessly High-quality AAC audio offers immersive listening experience Built-in microphone allows you to take calls while working",
    brand: "Apple",
    category: "Electronics",
    price: 89.99,
    countInStock: 10,
    rating: 4.5,
    numReviews: 12,
  },
  {
    name: "SONY WH-CH710N Wireless Headphone",
    image: "/images/headphone.jpg",
    description:
      "Exhale your worries while inhaling music & enjoy the experience if world class noice cancellation and bass which will comapny you for more than 8 hours.",
    brand: "SONY",
    category: "Electronics",
    price: 6990,
    countInStock: 11,
    rating: 4.4,
    numReviews: 14,
  },
  {
    name: "Sony Playstation 4 Pro White Version",
    image: "/images/playstation.jpg",
    description:
      "The ultimate home entertainment center starts with PlayStation. Whether you are into gaming, HD movies, television, music",
    brand: "Sony",
    category: "Electronics",
    price: 399.99,
    countInStock: 11,
    rating: 5,
    numReviews: 12,
  },
  {
    name: "OnePlus Y Series 108 cm (43 inches) Full HD LED Smart Android TV",
    image: "/images/oneplus_tv.jpg",
    description:
      "Treat your eyes to vivid imagery with a high colour range of 93% DCI-P3 featuring a 20% wider colour gamut—authentic cinematic colour with the OnePlus TV.",
    brand: "One Plus",
    category: "Electronics",
    price: 25999,
    countInStock: 17,
    rating: 3.5,
    numReviews: 6,
  },
  {
    name: "Redgear Blaze 3 Backlit Keyboard",
    image: "/images/keyboard.jpg",
    description:
      "Redgear blaze Metal Body keyboard, Number of keys: - 104 keys,Power consumption: - 40mA – 120mA,Working voltage: - DC 4.5 – 5.3V, Size: - 442(w)x 180(L)x 42(h)mm, Weight: - 964g, Keystrokes :- 10million.",
    brand: "RedGear",
    category: "Electronics",
    price: 1176,
    countInStock: 10,
    rating: 4.2,
    numReviews: 15,
  },
  {
    name: "TP-Link WiFi 6 AX3000 Smart WiFi Router",
    image: "/images/router.jpg",
    description:
      "Powered by Intel Home Wi-Fi WAV654 chipset for a full-featured Wi-Fi 6 AX3000 router, to pair perfectly with new Intel Wi-Fi 6 Gig+ PCs and laptops, allowing numerous bandwidth-intensive tasks to run smoothly at the same time.",
    brand: "TP-Link",
    category: "Electronics",
    price: 7999,
    countInStock: 14,
    rating: 4.1,
    numReviews: 4,
  },
  {
    name: "Amazon Echo Dot 3rd Generation",
    image: "/images/alexa.jpg",
    description:
      "Meet Echo Dot - Our most popular smart speaker with a fabric design. It is our most compact smart speaker that fits perfectly into small space",
    brand: "Amazon",
    category: "Electronics",
    price: 29.99,
    countInStock: 0,
    rating: 4,
    numReviews: 12,
  },
  {
    name: "Canon PIXMA E477 All-in-One Wireless Ink Efficient Colour Printer",
    image: "/images/printer.jpg",
    description:
      "Canon Pixma E477 is an affordable All-In-One Printer with Wi-Fi. This ink efficient printer is designed to give you an affordable wireless printing experience.With a print speed of (A4): up to 4.0ipm (colour) / 8.0ipm (mono) (ISO), this is an ideal printer for home and small office, where the requirement is between 100-300 prints per month.",
    brand: "Canon",
    category: "Electronics",
    price: 51999,
    countInStock: 8,
    rating: 4,
    numReviews: 6,
  },
  {
    name: "iPhone 11 Pro 256GB Memory",
    image: "/images/phone.jpg",
    description:
      "Introducing the iPhone 11 Pro. A transformative triple-camera system that adds tons of capability without complexity. An unprecedented leap in battery life",
    brand: "Apple",
    category: "Electronics",
    price: 599.99,
    countInStock: 7,
    rating: 4.0,
    numReviews: 8,
  },
  {
    name: "Logitech G-Series Gaming Mouse",
    image: "/images/mouse.jpg",
    description:
      "Get a better handle on your games with this Logitech LIGHTSYNC gaming mouse. The six programmable buttons allow customization for a smooth playing experience",
    brand: "Logitech",
    category: "Electronics",
    price: 49.99,
    countInStock: 7,
    rating: 3.5,
    numReviews: 10,
  },
  {
    name: "Mi 10T 5G (Lunar Silver, 6GB RAM, 128GB Storage)",
    image: "/images/mi10t.jpg",
    description:
      "Experience flagship performance with this smartphone’s Qualcomm Snapdragon 865 processor (7nm) with support for 5G. Loaded with a 64 MP triple-rear-camera system and a 20-megapixel front camera.",
    brand: "Xiaomi",
    category: "Electronics",
    price: 32999,
    countInStock: 18,
    rating: 4.1,
    numReviews: 16,
  },
];

export default products;
