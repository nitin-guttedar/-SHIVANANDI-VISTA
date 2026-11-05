// SHIVANANDI VISTA - Master Verified Hospitality Data

export const PROPERTY_INFO = {
  name: "SHIVANANDI VISTA",
  tagline: "Your Comfort, Our Hospitality",
  address: "No.15, RD Greenwoods, I Phase, Begur, BK Halli Post, Yelahanka Taluk, Bangalore – 562149",
  shortLocation: "Begur, BK Halli Post, Yelahanka Taluk, Bengaluru",
  region: "North Bengaluru, Karnataka, India",
  phone: "+91 99003 14686",
  phoneRaw: "+919900314686",
  whatsapp: "+91 99003 14686",
  whatsappRaw: "919900314686",
  email: "shivanandivista@gmail.com",
  hours: "Open 24 Hours / 7 Days",
  checkInTime: "12:00 PM",
  checkOutTime: "11:00 AM",
  googleMapsEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3885.571424161947!2d77.6256!3d13.1678!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1ec0b2b8e3ad%3A0x8f7d983023e1e921!2sRD%20Greenwoods%2C%20Begur%2C%20Bengaluru%2C%20Karnataka%20562149!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin",
  googleMapsDirectionsUrl: "https://maps.google.com/?q=RD+Greenwoods+Begur+BK+Halli+Yelahanka+Bangalore+562149",
  coordinates: {
    lat: 13.1678,
    lng: 77.6329
  }
};

export const INITIAL_ROOMS = [
  {
    id: "deluxe-vista-suite",
    title: "Deluxe Vista Suite",
    category: "Suites",
    shortDesc: "Spacious premium suite featuring serene green views, plush king-size bedding, and an elegant seating lounge.",
    fullDesc: "Designed for discerning leisure travellers and executives, the Deluxe Vista Suite offers generous space, soothing neutral tones, and expansive windows looking out onto lush North Bengaluru greenery. Enjoy a restful night's sleep in our signature handcrafted king bed and rejuvenate in a luxurious private ensuite.",
    size: "380 sq.ft",
    bed: "1 King Bed",
    capacity: "Up to 3 Guests (2 Adults + 1 Child)",
    pricePerNight: 3499,
    badge: "Most Popular",
    image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1000&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1000&q=80"
    ],
    amenities: [
      "High-speed Optic Fiber Wi-Fi",
      "Individual Split Air Conditioning",
      "43-inch 4K Smart TV",
      "Work Desk & Ergonomic Chair",
      "Premium Ensuite Bathroom with 24/7 Hot Water",
      "Electric Tea & Coffee Kettle",
      "Complimentary Mineral Water",
      "Daily Housekeeping"
    ]
  },
  {
    id: "executive-luxury-room",
    title: "Executive Luxury Room",
    category: "Executive",
    shortDesc: "Refined comfort curated for corporate travellers, professionals, and couples seeking modern elegance.",
    fullDesc: "Our Executive Luxury Rooms combine contemporary interior finishes with essential modern conveniences. Complete with high-speed wireless connectivity, a dedicated work area, climate control, and sound-insulating windows for total peace and restful sleep before your meetings or flights.",
    size: "310 sq.ft",
    bed: "1 Queen Bed or Twin Beds",
    capacity: "Up to 2 Guests",
    pricePerNight: 2899,
    badge: "Business Preferred",
    image: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1000&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1591088398332-8a7791972843?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1000&q=80"
    ],
    amenities: [
      "High-speed Optic Fiber Wi-Fi",
      "Individual Split Air Conditioning",
      "40-inch Smart LED TV",
      "Compact Work Station",
      "Ensuite Bath with Rainfall Shower",
      "Tea / Coffee Maker",
      "Room Telephone & Wakeup Service",
      "Daily Housekeeping"
    ]
  },
  {
    id: "family-premium-cottage",
    title: "Family Premium Room",
    category: "Family",
    shortDesc: "Expansive multi-bed configuration designed to comfortably host families and small group vacations.",
    fullDesc: "Spacious and thoughtfully laid out, the Family Premium Room provides ample room for parents and children or visiting groups. Enjoy combined living space, generous wardrobe storage, and prompt in-room assistance ensuring your family's stay is stress-free and memorable.",
    size: "460 sq.ft",
    bed: "1 King Bed + 1 Queen / Twin Bed",
    capacity: "Up to 4 Guests",
    pricePerNight: 4699,
    badge: "Family Favorite",
    image: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1000&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1000&q=80"
    ],
    amenities: [
      "High-speed Optic Fiber Wi-Fi",
      "Climate Controlled AC",
      "43-inch Smart LED TV",
      "Spacious Wardrobe & Luggage Rack",
      "Private Bathroom with Luxury Toiletries",
      "Intercom & Room Service",
      "Electric Kettle & Refreshments",
      "Crib / Extra Bed Upon Request"
    ]
  },
  {
    id: "transit-comfort-deluxe",
    title: "Transit Comfort Deluxe",
    category: "Transit",
    shortDesc: "Convenient, quiet, and comfortable stay tailored for airport stopovers, layovers, and short business trips.",
    fullDesc: "Conveniently accessible to Kempegowda International Airport and the North Bengaluru highway, our Transit Comfort Deluxe room offers flexible 24/7 check-in, blackout drapery for day sleep, express refreshments, and reliable airport cab assistance.",
    size: "260 sq.ft",
    bed: "1 Queen Bed",
    capacity: "Up to 2 Guests",
    pricePerNight: 2299,
    badge: "Airport Special",
    image: "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1000&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1000&q=80"
    ],
    amenities: [
      "High-speed Wi-Fi",
      "Air Conditioning",
      "32-inch LED TV",
      "Private Bathroom & Hot Water",
      "24/7 Check-in Flexibility",
      "Airport Cab Assistance",
      "Morning Wakeup Calls"
    ]
  }
];

export const AMENITIES_LIST = [
  {
    category: "Accommodation & In-Room Comfort",
    items: [
      { name: "Split Air Conditioning", desc: "Individually controlled climate cooling in all rooms for optimal comfort." },
      { name: "Smart Entertainment", desc: "40\" to 43\" Smart TVs with OTT compatibility and multi-channel satellite access." },
      { name: "Plush Bedding & Linens", desc: "High thread-count cotton linens, hypoallergenic pillows, and posture-friendly mattresses." },
      { name: "Ensuite Bathrooms", desc: "Modern private baths with 24/7 hot water supply and premium bath toiletries." },
      { name: "In-Room Tea & Coffee", desc: "Electric kettle setup with complimentary tea, coffee, creamer, and mineral water." }
    ]
  },
  {
    category: "Guest Support & Front Desk",
    items: [
      { name: "24/7 Reception Desk", desc: "Round-the-clock front desk welcoming late check-ins, early departures, and travel support." },
      { name: "Daily Housekeeping", desc: "Dedicated daily sanitization, bed making, fresh towels, and trash clearance." },
      { name: "Luggage Storage", desc: "Safe keeping for guest luggage before check-in or after check-out." },
      { name: "Express Check-In & Out", desc: "Swift, hassle-free registration and digital bill settlement." }
    ]
  },
  {
    category: "Connectivity & Business Essentials",
    items: [
      { name: "High-Speed Optic Wi-Fi", desc: "Complimentary uninterrupted broadband connectivity covering all rooms and common areas." },
      { name: "Power Backup", desc: "Uninterrupted power generator backup ensuring air conditioning and lighting remain active." },
      { name: "Quiet Work Zones", desc: "Comfortable desks and ergonomic seating designed for remote professionals." }
    ]
  },
  {
    category: "Parking & Travel Assistance",
    items: [
      { name: "On-Site Secured Parking", desc: "Free, spacious parking space for guest vehicles, two-wheelers, and cabs." },
      { name: "Airport Transit Coordination", desc: "Assistance with booking reliable local taxis, airport drop-offs, and pickups." },
      { name: "Local Tour Guidance", desc: "Curated advice and route planning for Nandi Hills, Devanahalli, and Bengaluru sightseeing." }
    ]
  }
];

export const NEARBY_LOCATIONS = [
  {
    name: "Kempegowda International Airport (BLR)",
    category: "Airport Connectivity",
    distance: "Short drive via Airport Road / Devanahalli Corridor",
    desc: "Bengaluru's primary international airport featuring Terminal 1 and the acclaimed garden-themed Terminal 2. SHIVANANDI VISTA provides an ideal stopover location for early flight departures or late arrivals.",
    highlights: ["T1 & T2 International Terminals", "Airport Lounges & Dining", "Duty Free Shopping", "Smooth highway access via BK Halli / Devanahalli road"]
  },
  {
    name: "Yelahanka New Town & Old Town",
    category: "Local Hub",
    distance: "Direct connectivity",
    desc: "A thriving North Bengaluru residential and commercial sector featuring serene lakes, shopping hubs, dining avenues, hospital facilities, and rail connectivity via Yelahanka Junction.",
    highlights: ["Yelahanka Railway Junction", "Allalasandra Lake Park", "RMZ Galleria Mall", "Heritage silk and commercial markets"]
  },
  {
    name: "Devanahalli Heritage & Fort",
    category: "Heritage & Culture",
    distance: "Direct highway access",
    desc: "Historic township renowned as the birthplace of Tipu Sultan and home to the 15th-century stone Devanahalli Fort, offering visitors a glimpse into Karnataka's royal past.",
    highlights: ["Devanahalli Fort", "Tipu Sultan Birthplace Memorial", "Venugopala Swamy Temple", "Devanahalli Pomelo fruit farms"]
  },
  {
    name: "Nandi Hills (Nandidurga)",
    category: "Scenic Getaway",
    distance: "Popular morning & weekend trip",
    desc: "Iconic hill fortress famous for misty sunrise viewpoints, Tipu's Drop, historic temples, and scenic trekking paths. A top destination for early morning drives from our property.",
    highlights: ["Breathtaking Sunrise Viewpoint", "Tipu's Drop & Summer Residence", "Bhoga Nandeeshwara Temple at foothill", "Trekking & Cycling Trails"]
  },
  {
    name: "Hebbal & Manyata Tech Park Corridor",
    category: "Business Hub",
    distance: "Direct North Bengaluru highway route",
    desc: "Prime commercial gateway connecting central Bengaluru with the airport corridor, housing multinational tech campuses, corporate headquarters, and Hebbal Lake.",
    highlights: ["Manyata Embassy Business Park", "Hebbal Lake & Boating", "Columbia Asia / Manipal Hospital", "Airport Expressway flyover"]
  },
  {
    name: "Jakkur Aerodrome & Green Spaces",
    category: "Leisure & Aviation",
    distance: "North Bengaluru belt",
    desc: "Historic flying school and aerodrome offering microman flying experiences, situated near tranquil botanical gardens and weekend leisure spots.",
    highlights: ["Jakkur Flying Club", "Jakkur Lake Walking Trail", "North Bengaluru Agro-tourism farms"]
  }
];

export const INITIAL_BLOG_POSTS = [
  {
    id: "guide-kempegowda-airport-bengaluru",
    slug: "guide-kempegowda-airport-bengaluru",
    title: "Complete Travel Guide to Kempegowda International Airport Bengaluru (BLR)",
    category: "Airport Travel Information",
    date: "November 2, 2026",
    readTime: "6 min read",
    author: "Hospitality Desk",
    image: "https://images.unsplash.com/photo-1542296332-2e4473faf563?auto=format&fit=crop&w=1000&q=80",
    excerpt: "Everything you need to know about navigating BLR Airport Terminal 1 & Terminal 2, transit options, lounges, and choosing comfortable accommodation nearby.",
    metaTitle: "Kempegowda Airport Bengaluru Travel Guide | BLR Terminal 1 & 2 Info",
    metaDesc: "Comprehensive guide to Bengaluru Kempegowda International Airport (BLR). Learn about Terminals 1 & 2, airport transit, lounges, and where to stay nearby in Yelahanka.",
    content: `
### Navigating Bengaluru's World-Class Aviation Hub

Kempegowda International Airport (IATA: BLR), situated in North Bengaluru near Devanahalli, has established itself as one of the finest aviation hubs in Asia. Recognized globally for its sustainable design and the breathtaking garden terminal (Terminal 2), the airport handles hundreds of domestic and international flights around the clock.

For travelers landing late at night or preparing for early dawn departures, choosing accommodation situated within convenient reach of the airport corridor — such as **SHIVANANDI VISTA** in Yelahanka Taluk — ensures a restful night without stressful city traffic.

### Understanding Terminal 1 and Terminal 2

- **Terminal 1 (T1):** Primarily serves extensive domestic airline operations including IndiGo, Akasa Air, and SpiceJet. It features expansive dining avenues, retail outlets, and the 080 Domestic Lounge.
- **Terminal 2 (T2) — The Terminal in a Garden:** An architectural wonder adorned with hanging bamboo plants, natural skylights, and indoor waterfalls. It serves Air India, Vistara, and all international flag carriers.

### Transit and Connectivity Tips

1. **Airport Cabs:** Pre-paid taxi counters (KSTDC, Mega Cabs), Uber, and Ola are organized systematically at dedicated airport pickup zones.
2. **BMTC Vayu Vajra Buses:** Regular air-conditioned Volvo buses connect the airport to key hubs like Hebbal and Yelahanka.
3. **Private Hotel Accommodation:** Travelers with 6 to 18-hour layovers often prefer booking a peaceful room at SHIVANANDI VISTA rather than waiting inside crowded terminal lounges.

### Why Choose SHIVANANDI VISTA for Your Airport Stay?

Located at RD Greenwoods, Begur, BK Halli Post in Yelahanka Taluk, SHIVANANDI VISTA gives guests 24-hour reception assistance, comfortable air-conditioned suites, reliable Wi-Fi, and personalized cab arrangement so your airport journey remains seamless.
    `
  },
  {
    id: "best-places-to-visit-yelahanka-bangalore",
    slug: "best-places-to-visit-yelahanka-bangalore",
    title: "Best Places to Visit Around Yelahanka, Bangalore: A Visitor's Guide",
    category: "Yelahanka Travel Guide",
    date: "October 28, 2026",
    readTime: "5 min read",
    author: "Local Explorer",
    image: "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&w=1000&q=80",
    excerpt: "Discover the heritage, scenic lakes, shopping avenues, and cultural landmarks that make Yelahanka in North Bengaluru a delightful destination.",
    metaTitle: "Best Places to Visit in Yelahanka Bangalore | Local Attractions Guide",
    metaDesc: "Explore top tourist spots, historic lakes, shopping malls, and cultural attractions in and around Yelahanka, North Bengaluru. Stay at SHIVANANDI VISTA.",
    content: `
### Discovering the Charm of Yelahanka

Once a historic principality governed by Kempe Gowda I (the founder of Bengaluru), Yelahanka has gracefully evolved into one of Bengaluru's most sought-after green corridors. With wide tree-lined boulevards, tranquil lakes, and vibrant dining spots, it presents the ideal balance of nature and urban convenience.

### Top Attractions in Yelahanka

#### 1. Allalasandra Lake & Yelahanka Kere
Ideal for morning strolls and bird watching, these restored water bodies feature clean walking perimeters, open-air gym setups, and lush green canopies frequented by migratory pelicans and cormorants.

#### 2. RMZ Galleria Mall
For visitors looking for contemporary shopping, food courts, and cinema entertainment, RMZ Galleria on the main highway offers prominent retail brands and specialty dining.

#### 3. Air Force Station & Yelahanka Heritage
Yelahanka is internationally known for hosting the biennial Aero India defense aviation show. The surrounding military belt preserves deep green open spaces that keep the local climate refreshingly cool.

### Staying at SHIVANANDI VISTA

When exploring Yelahanka and the surrounding Begur / BK Halli region, SHIVANANDI VISTA provides an idyllic hospitality retreat with peaceful rooms and attentive service.
    `
  },
  {
    id: "exploring-devanahalli-travel-guide",
    slug: "exploring-devanahalli-travel-guide",
    title: "Exploring Devanahalli: Heritage, Culture and Attractions",
    category: "Devanahalli Attractions",
    date: "October 20, 2026",
    readTime: "5 min read",
    author: "Heritage Desk",
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1000&q=80",
    excerpt: "Step back in time to explore the stone walls of Devanahalli Fort, Tipu Sultan's birthplace, ancient Dravidian temples, and local countryside orchards.",
    metaTitle: "Devanahalli Travel Guide | Fort, Heritage & Attractions North Bangalore",
    metaDesc: "A complete heritage guide to Devanahalli near Bengaluru. Explore Tipu Sultan's birthplace, Devanahalli Fort, and nearby stay options at SHIVANANDI VISTA.",
    content: `
### The Historic Roots of Devanahalli

Located just north of Yelahanka, Devanahalli is celebrated for its deep historical roots dating back to the 15th century. Before becoming globally recognized for Bengaluru's modern airport, it was a storied fortress town contested by the Vijayanagara feudatories, Hyder Ali, and the British.

### Notable Sights in Devanahalli

- **Devanahalli Stone Fort:** Built in 1501 by Mallabaire Gowda and subsequently fortified by Hyder Ali, this sprawling oval fort spans over 20 acres. Inside, visitors can observe traditional living quarters and heritage carved stonework.
- **Tipu Sultan's Birthplace:** An ASI-protected pillared monument commemorating the birth of the famed ruler of Mysore in 1750.
- **Venugopala Swamy Temple:** One of the oldest temples inside the fort, showcasing intricate Vijayanagara carvings and serene courtyards.
- **The Sweet Devanahalli Pomelo:** Take home the GI-tagged Devanahalli Pomelo (Chakkota), a citrus fruit cultivated by local farmer families for generations.
    `
  },
  {
    id: "where-to-stay-near-bengaluru-airport",
    slug: "where-to-stay-near-bengaluru-airport",
    title: "Where to Stay Near Bengaluru International Airport? An Insider's Guide",
    category: "Hotel & Accommodation Tips",
    date: "October 14, 2026",
    readTime: "7 min read",
    author: "Hospitality Strategist",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1000&q=80",
    excerpt: "How to pick the right hotel near Bangalore Airport: evaluating peace, connectivity, room tariffs, 24/7 service, and avoiding heavy traffic bottlenecks.",
    metaTitle: "Where to Stay Near Bangalore Airport? Best Accommodation Guide",
    metaDesc: "Looking for hotels near Bangalore Kempegowda Airport? Discover essential tips for choosing quiet, high-value accommodation in Yelahanka and BK Halli.",
    content: `
### Balancing Proximity, Peace, and Value

Finding hotel accommodation near Kempegowda International Airport often involves navigating high on-site terminal tariffs or noisy highway motels. Discerning travelers instead select boutique properties in neighboring tranquil belts like Yelahanka Taluk and BK Halli.

### What to Look for in an Airport Stay

1. **24/7 Check-in Flexibility:** Flights arrive at 2:00 AM just as frequently as 2:00 PM. Verify that the front desk is permanently staffed.
2. **Acoustic Peace & Fresh Air:** Avoid loud highway flyovers so you can achieve restorative REM sleep between long flights.
3. **Transparent Direct Pricing:** Direct booking through WhatsApp or phone guarantees the best available tariff without platform service fees.
4. **Reliable Morning Transport:** Ensure the hotel team can assist you with dependable cab arrangements.

**SHIVANANDI VISTA** fulfills all these benchmarks, nestled securely in RD Greenwoods, Begur, BK Halli Post.
    `
  },
  {
    id: "weekend-travel-guide-nandi-hills",
    slug: "weekend-travel-guide-nandi-hills",
    title: "Weekend Travel Guide to Nandi Hills: Sunrise, Trekking & Travel Tips",
    category: "Sightseeing & Nature",
    date: "October 08, 2026",
    readTime: "6 min read",
    author: "Adventure Desk",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1000&q=80",
    excerpt: "Everything you need to plan a memorable morning trip to Nandi Hills: entry timings, sunrise spots, Bhoga Nandeeshwara temple, and breakfast recommendations.",
    metaTitle: "Nandi Hills Weekend Travel Guide | Sunrise Timings & Tips",
    metaDesc: "Plan your trip to Nandi Hills near Bengaluru. Essential tips on sunrise viewing, trekking routes, entry passes, and stay at SHIVANANDI VISTA.",
    content: `
### The Crown of North Bengaluru

Perched at an elevation of 1,478 meters above sea level, Nandi Hills (Nandidurga) is the most beloved sunrise sanctuary for travelers across Karnataka. Starting early from Yelahanka allows you to beat the weekend rush and witness the sea of clouds undulating beneath the hilltop viewpoints.

### Essential Visitor Tips

- **Entry Timings:** The hilltop gates typically open at 6:00 AM. Arrive by 5:15 AM at the base checkpoint to secure parking.
- **Tipu's Drop:** A dramatic 600-meter sheer cliff offering panoramic views of Chikkaballapur plains.
- **Bhoga Nandeeshwara Temple:** Located at the base in Nandi village, this 9th-century Nolamba-Chola architectural masterpiece should not be missed on your return journey.
    `
  },
  {
    id: "exploring-hebbal-jakkur-north-bengaluru",
    slug: "exploring-hebbal-jakkur-north-bengaluru",
    title: "Exploring Hebbal, Jakkur and North Bengaluru: Business & Culture",
    category: "North Bengaluru Destinations",
    date: "September 30, 2026",
    readTime: "5 min read",
    author: "City Correspondent",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1000&q=80",
    excerpt: "A deep dive into the business districts, tech parks, aviation hubs, and green reservoirs shaping Bengaluru's northern economic corridor.",
    metaTitle: "Hebbal & Jakkur Travel Guide | Business & Leisure in North Bengaluru",
    metaDesc: "Discover Manyata Tech Park, Hebbal Lake, and Jakkur Aerodrome. Stay at SHIVANANDI VISTA for business and leisure in North Bengaluru.",
    content: `
### The New Growth Epicenter of Bengaluru

The corridor stretching from Hebbal Flyover through Jakkur and Yelahanka represents Bengaluru's most dynamic modern growth axis. Combining corporate campuses like Manyata Tech Park with scenic lake conservation projects, North Bengaluru attracts business travelers, researchers, and families alike.
    `
  },
  {
    id: "tips-choosing-hotel-accommodation-bangalore",
    slug: "tips-choosing-hotel-accommodation-bangalore",
    title: "7 Tips for Choosing Comfortable Hotel Accommodation in Bangalore",
    category: "Hotel & Accommodation Tips",
    date: "September 22, 2026",
    readTime: "5 min read",
    author: "Travel Editor",
    image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1000&q=80",
    excerpt: "How to evaluate hygiene, verified amenities, location advantages, and authentic customer service when booking hotel stays across Bengaluru.",
    metaTitle: "Tips for Booking Comfortable Hotels in Bangalore | Travel Guide",
    metaDesc: "Expert advice on selecting hotel rooms in Bengaluru. How to assess locations, facilities, Wi-Fi reliability, and direct booking perks.",
    content: `
### Making Smart Travel Decisions

Bengaluru is a bustling metropolis spanning vast distances. Choosing accommodation strategically situated near your travel hubs — such as the airport and North Bengaluru tech zones — saves countless hours in city traffic.
    `
  },
  {
    id: "late-night-early-morning-airport-travel-guide",
    slug: "late-night-early-morning-airport-travel-guide",
    title: "Airport Travel Guide: Planning Late-Night and Early-Morning Journeys",
    category: "Airport Travel Information",
    date: "September 15, 2026",
    readTime: "6 min read",
    author: "Transit Specialist",
    image: "https://images.unsplash.com/photo-1542296332-2e4473faf563?auto=format&fit=crop&w=1000&q=80",
    excerpt: "Stress-free tips for catching redeye flights and handling midnight arrivals at Bangalore Kempegowda Airport with comfort and safety.",
    metaTitle: "Late-Night & Early-Morning BLR Airport Travel Guide | Tips",
    metaDesc: "How to plan red-eye flights and early-morning airport transfers at Kempegowda Airport Bengaluru. Convenient accommodation at SHIVANANDI VISTA.",
    content: `
### Conquering the Red-Eye Flight

Over 40% of international departures from Kempegowda International Airport take place between 11:00 PM and 4:00 AM. Traveling from central or south Bengaluru at odd hours can be exhausting. Booking a day room or overnight suite at SHIVANANDI VISTA allows travelers to rest, refresh, and arrive at the departure gate relaxed.
    `
  }
];

export const FAQS_LIST = [
  {
    q: "Where is SHIVANANDI VISTA located?",
    a: "SHIVANANDI VISTA is situated at No.15, RD Greenwoods, I Phase, Begur, BK Halli Post, Yelahanka Taluk, Bangalore – 562149. It is conveniently situated in North Bengaluru within comfortable driving proximity to Kempegowda International Airport (BLR) and Yelahanka."
  },
  {
    q: "What are your check-in and check-out timings?",
    a: "Our standard check-in time is 12:00 PM and check-out time is 11:00 AM. However, our reception operates 24/7, and flexible or early check-ins / late check-outs can be accommodated upon request subject to room availability."
  },
  {
    q: "How can I enquire or book a room at SHIVANANDI VISTA?",
    a: "You can enquire and reserve directly by calling us at +91 99003 14686, sending an instant WhatsApp message to +91 99003 14686, submitting our online Booking Enquiry form, or emailing shivanandivista@gmail.com."
  },
  {
    q: "Is parking available at the property?",
    a: "Yes, we provide secure and complimentary on-site parking for guest cars, two-wheelers, and cabs."
  },
  {
    q: "Do the rooms have high-speed Wi-Fi and air conditioning?",
    a: "Yes, all our rooms feature individual split air conditioning, complimentary high-speed optic fiber Wi-Fi, 40\"/43\" Smart TVs, and 24/7 hot water supply in attached ensuite bathrooms."
  },
  {
    q: "Can you assist with airport transfers and local taxi bookings?",
    a: "Yes, our front desk team is pleased to assist guests with dependable local cab bookings, airport drop-offs, and pickup arrangements."
  },
  {
    q: "Is SHIVANANDI VISTA suitable for families and corporate visitors?",
    a: "Absolutely. We offer Family Premium rooms, Executive Luxury suites, and Transit Deluxe rooms curated to provide privacy, quiet, and comfort for families, professionals, and holidaymakers."
  }
];

export const GALLERY_IMAGES = [
  {
    title: "Deluxe Suite Living Area",
    category: "Rooms",
    url: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1000&q=80"
  },
  {
    title: "Executive Luxury King Bed",
    category: "Rooms",
    url: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1000&q=80"
  },
  {
    title: "Warm Hospitality Reception",
    category: "Property",
    url: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1000&q=80"
  },
  {
    title: "Serene Greenery & Courtyard",
    category: "Property",
    url: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1000&q=80"
  },
  {
    title: "Modern Ensuite Bath",
    category: "Amenities",
    url: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1000&q=80"
  },
  {
    title: "Coffee & Morning Tea Setup",
    category: "Dining",
    url: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=1000&q=80"
  },
  {
    title: "Transit Comfort Room",
    category: "Rooms",
    url: "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1000&q=80"
  },
  {
    title: "Lush North Bengaluru Landscape",
    category: "Property",
    url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1000&q=80"
  }
];

export const TESTIMONIALS = [
  {
    name: "Rajesh S. & Family",
    origin: "Bengaluru City",
    stayType: "Weekend Leisure Stay",
    rating: 5,
    comment: "A wonderful stay in Yelahanka! Clean, peaceful environment away from the city traffic. The staff was courteous and made our family feel right at home.",
    date: "October 2026"
  },
  {
    name: "Anand Murthy",
    origin: "Hyderabad",
    stayType: "Airport Stopover",
    rating: 5,
    comment: "Found this hotel for an overnight flight connection from BLR airport. The 24/7 check-in and quiet room allowed me to sleep peacefully before my morning flight.",
    date: "October 2026"
  },
  {
    name: "Pooja Hegde",
    origin: "Mumbai",
    stayType: "Business Travel",
    rating: 5,
    comment: "Excellent Wi-Fi, comfortable working desk, and pristine linen. Highly recommended for professionals visiting North Bengaluru and Yelahanka.",
    date: "September 2026"
  }
];
