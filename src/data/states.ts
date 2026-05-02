export type Region = "north" | "south" | "east" | "west" | "northeast" | "central";

export interface CulturalItem {
  title: string;
  description: string;
  badge?: string;
  tags?: string[];
  image: string; // gradient string used as visual
}

export interface StateData {
  id: string;
  name: string;
  region: Region;
  capital: string;
  language: string;
  famousFor: string;
  unescoSites: number;
  tagline: string;
  iconicFestival: string;
  signatureDish: string;
  quickFact: string;
  featured?: boolean;
  bannerGradient: string;
  thumbGradient: string;
  image: string;
  festivals: CulturalItem[];
  food: CulturalItem[];
  art: CulturalItem[];
  traditions: CulturalItem[];
  heritage: CulturalItem[];
  trivia: string[];
}

const grad = (a: string, b: string, c?: string) =>
  c
    ? `linear-gradient(135deg, ${a} 0%, ${b} 50%, ${c} 100%)`
    : `linear-gradient(135deg, ${a} 0%, ${b} 100%)`;

export const STATES: Record<string, StateData> = {
  RJ: {
    id: "RJ",
    name: "Rajasthan",
    region: "west",
    capital: "Jaipur",
    language: "Hindi, Rajasthani",
    famousFor: "Forts, Deserts, Royalty",
    unescoSites: 6,
    tagline: "The Land of Kings and Living Legends",
    iconicFestival: "Pushkar Camel Fair",
    signatureDish: "Dal Baati Churma",
    quickFact: "Home to the Thar Desert and centuries-old Rajput forts.",
    featured: true,
    bannerGradient: grad("#f4a261", "#e76f51", "#9d4e15"),
    thumbGradient: grad("#ffd9a8", "#f4a261"),
    image: "https://images.unsplash.com/photo-1477587458883-47145ed94245?w=800",
    festivals: [
      {
        title: "Pushkar Camel Fair",
        description:
          "A vibrant week-long fair drawing thousands of camels, traders and pilgrims to Pushkar Lake.",
        badge: "Annual",
        image: grad("#f4a261", "#e76f51"),
      },
      {
        title: "Teej",
        description:
          "Monsoon festival celebrating Goddess Parvati with swings, henna and emerald-green attire.",
        badge: "Monsoon",
        image: grad("#a7d8a3", "#5a9a55"),
      },
      {
        title: "Gangaur",
        description:
          "An 18-day festival honoring marital love, with elaborately dressed idols paraded through cities.",
        badge: "Spring",
        image: grad("#fcd5ce", "#e29578"),
      },
      {
        title: "Desert Festival",
        description:
          "Held in Jaisalmer's golden dunes — folk music, turban-tying, and moonlit camel rides.",
        badge: "Winter",
        image: grad("#ffe5b4", "#d4a373"),
      },
    ],
    food: [
      {
        title: "Dal Baati Churma",
        description:
          "Hard wheat rolls baked in embers, served with spiced lentils and sweet crumbled wheat.",
        tags: ["Wheat", "Ghee", "Lentils"],
        image: grad("#e9c46a", "#d4a017"),
      },
      {
        title: "Laal Maas",
        description:
          "Fiery mutton curry stained crimson by Mathania chillies — a royal Rajput specialty.",
        tags: ["Mutton", "Chilli", "Yogurt"],
        image: grad("#e76f51", "#a4161a"),
      },
      {
        title: "Ghevar",
        description: "Disc-shaped honeycomb sweet soaked in syrup, traditionally made during Teej.",
        tags: ["Sugar", "Ghee", "Saffron"],
        image: grad("#f4a261", "#fcbf49"),
      },
      {
        title: "Ker Sangri",
        description:
          "Desert beans and berries slow-cooked with spices — a dish born of Thar's scarcity.",
        tags: ["Desert beans", "Spice"],
        image: grad("#bc6c25", "#606c38"),
      },
    ],
    art: [
      {
        title: "Blue Pottery",
        description:
          "Persian-influenced quartz ceramics from Jaipur, glazed in cobalt and turquoise.",
        badge: "GI Tag",
        image: grad("#90e0ef", "#0077b6"),
      },
      {
        title: "Phad Painting",
        description:
          "Long cloth scrolls narrating epic tales of folk deities, painted in mineral colors.",
        badge: "Heritage",
        image: grad("#fcbf49", "#d62828"),
      },
      {
        title: "Bandhani",
        description: "Tie-dye craft creating intricate dotted patterns on silk and cotton.",
        badge: "GI Tag",
        image: grad("#f72585", "#7209b7"),
      },
      {
        title: "Meenakari",
        description: "Enamel artistry on gold and silver, perfected in Jaipur's royal workshops.",
        badge: "Royal",
        image: grad("#ffd60a", "#003566"),
      },
    ],
    traditions: [
      {
        title: "Ghoomar",
        description: "Graceful twirling folk dance performed by women in flowing ghagras.",
        image: grad("#e29578", "#83c5be"),
      },
      {
        title: "Kalbeliya",
        description: "Snake-charmer community's serpentine dance — UNESCO Intangible Heritage.",
        badge: "UNESCO",
        image: grad("#264653", "#2a9d8f"),
      },
      {
        title: "Pagri Tying",
        description:
          "Each region's turban color and fold tells a story of caste, region and occasion.",
        image: grad("#e63946", "#f1faee"),
      },
    ],
    heritage: [
      {
        title: "Amber Fort",
        description: "Hilltop fort of pale yellow sandstone overlooking Maota Lake.",
        badge: "UNESCO",
        image: grad("#e9c46a", "#bc6c25"),
      },
      {
        title: "Mehrangarh Fort",
        description: "Towering 15th-century fort rising 400 feet above Jodhpur's blue city.",
        badge: "UNESCO",
        image: grad("#457b9d", "#1d3557"),
      },
      {
        title: "Jaisalmer Fort",
        description: "Living golden fort where families still reside within ancient walls.",
        badge: "UNESCO",
        image: grad("#fcbf49", "#d4a017"),
      },
    ],
    trivia: [
      "Jaipur was painted pink in 1876 to welcome the Prince of Wales.",
      "The Thar Desert is the most densely populated desert in the world.",
      "Rajasthan has more forts than any other Indian state.",
    ],
  },
  KL: {
    id: "KL",
    name: "Kerala",
    region: "south",
    capital: "Thiruvananthapuram",
    language: "Malayalam",
    famousFor: "Backwaters, Ayurveda, Spices",
    unescoSites: 1,
    tagline: "God's Own Country",
    iconicFestival: "Onam",
    signatureDish: "Sadya",
    quickFact: "A sliver of green coastline laced with palm-fringed backwaters.",
    featured: true,
    bannerGradient: grad("#a7c957", "#386641", "#1a4314"),
    thumbGradient: grad("#bfd8a3", "#6a994e"),
    image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=800",
    festivals: [
      {
        title: "Onam",
        description:
          "Ten-day harvest festival welcoming the legendary King Mahabali, with floral rangolis and feasts.",
        badge: "Harvest",
        image: grad("#bfd8a3", "#6a994e"),
      },
      {
        title: "Thrissur Pooram",
        description:
          "Spectacular temple festival with caparisoned elephants and percussion ensembles.",
        badge: "Temple",
        image: grad("#e76f51", "#a4161a"),
      },
      {
        title: "Vishu",
        description: "Malayali New Year marked by the auspicious Vishukkani arrangement at dawn.",
        badge: "New Year",
        image: grad("#fcbf49", "#f4a261"),
      },
    ],
    food: [
      {
        title: "Sadya",
        description: "A vegetarian feast of 26+ dishes served on a banana leaf during Onam.",
        tags: ["Banana leaf", "Coconut", "Rice"],
        image: grad("#bfd8a3", "#6a994e"),
      },
      {
        title: "Appam with Stew",
        description: "Lacy fermented rice pancakes paired with mild coconut-milk vegetable stew.",
        tags: ["Coconut", "Rice"],
        image: grad("#fefae0", "#e9edc9"),
      },
      {
        title: "Karimeen Pollichathu",
        description: "Pearl spot fish marinated and grilled in banana leaf — backwater specialty.",
        tags: ["Fish", "Banana leaf"],
        image: grad("#606c38", "#283618"),
      },
      {
        title: "Puttu & Kadala",
        description: "Steamed rice cylinders with black chickpea curry — quintessential breakfast.",
        tags: ["Rice", "Coconut"],
        image: grad("#fefae0", "#dda15e"),
      },
    ],
    art: [
      {
        title: "Kathakali",
        description:
          "Classical dance-drama with elaborate green-faced makeup and silent storytelling through mudras.",
        badge: "Classical",
        image: grad("#2a9d8f", "#264653"),
      },
      {
        title: "Mohiniyattam",
        description: "Graceful solo dance form — 'the dance of the enchantress' in white and gold.",
        badge: "Classical",
        image: grad("#fefae0", "#e9c46a"),
      },
      {
        title: "Aranmula Kannadi",
        description: "Mirror crafted from a secret metal alloy — reflects without distortion.",
        badge: "GI Tag",
        image: grad("#dad7cd", "#a3b18a"),
      },
    ],
    traditions: [
      {
        title: "Theyyam",
        description:
          "Ritual dance where performers embody deities in towering crowns and red costumes.",
        image: grad("#d62828", "#9a031e"),
      },
      {
        title: "Vallam Kali",
        description: "Snake boat races — over 100 oarsmen rowing in perfect rhythm to drumbeats.",
        badge: "Sport",
        image: grad("#003566", "#001d3d"),
      },
      {
        title: "Ayurveda",
        description: "5000-year-old healing tradition with Kerala as its modern global capital.",
        badge: "Wellness",
        image: grad("#a3b18a", "#588157"),
      },
    ],
    heritage: [
      {
        title: "Western Ghats",
        description: "UNESCO biodiversity hotspot running along Kerala's eastern spine.",
        badge: "UNESCO",
        image: grad("#588157", "#3a5a40"),
      },
      {
        title: "Padmanabhaswamy Temple",
        description: "Dravidian temple housing the world's richest religious treasure vaults.",
        image: grad("#fcbf49", "#d4a017"),
      },
      {
        title: "Fort Kochi",
        description: "Colonial port-town blending Portuguese, Dutch and British heritage.",
        image: grad("#a8dadc", "#457b9d"),
      },
    ],
    trivia: [
      "Kerala has 100% literacy and the highest life expectancy in India.",
      "Kalaripayattu, the world's oldest martial art, originated here.",
      "The backwaters span 900 km of interconnected lagoons and lakes.",
    ],
  },
  TN: {
    id: "TN",
    name: "Tamil Nadu",
    region: "south",
    capital: "Chennai",
    language: "Tamil",
    famousFor: "Temples, Bharatanatyam, Silk",
    unescoSites: 5,
    tagline: "Where Ancient Stones Still Sing",
    iconicFestival: "Pongal",
    signatureDish: "Idli Sambar",
    quickFact: "Home to the world's oldest continuously spoken classical language.",
    featured: true,
    bannerGradient: grad("#d62828", "#9a031e", "#370617"),
    thumbGradient: grad("#fcd5ce", "#e76f51"),
    image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=800",
    festivals: [
      {
        title: "Pongal",
        description:
          "Four-day harvest festival thanking the sun, with new rice boiled till it overflows.",
        badge: "Harvest",
        image: grad("#fcbf49", "#f77f00"),
      },
      {
        title: "Natyanjali",
        description: "Dancers from across India offer Bharatanatyam at Chidambaram temple.",
        badge: "Temple",
        image: grad("#e63946", "#9a031e"),
      },
      {
        title: "Karthigai Deepam",
        description: "Festival of lights — homes and temples lined with rows of clay diyas.",
        badge: "Lights",
        image: grad("#fcbf49", "#d4a017"),
      },
    ],
    food: [
      {
        title: "Idli Sambar",
        description: "Steamed rice-lentil cakes with tangy lentil broth — the perfect breakfast.",
        tags: ["Rice", "Lentils"],
        image: grad("#fefae0", "#e9edc9"),
      },
      {
        title: "Chettinad Chicken",
        description: "Fiery curry from the Chettiar community, layered with stone-ground spices.",
        tags: ["Chicken", "Spice"],
        image: grad("#bc4749", "#6a040f"),
      },
      {
        title: "Filter Coffee",
        description:
          "Strong decoction coffee frothed with hot milk in stainless steel tumbler-davara.",
        tags: ["Coffee", "Milk"],
        image: grad("#bc6c25", "#283618"),
      },
      {
        title: "Pongal",
        description:
          "Creamy rice-and-lentil dish, savory or sweet, named for the harvest festival.",
        tags: ["Rice", "Lentils"],
        image: grad("#fefae0", "#fcbf49"),
      },
    ],
    art: [
      {
        title: "Bharatanatyam",
        description: "2000-year-old classical dance form with codified poses and storytelling.",
        badge: "Classical",
        image: grad("#e63946", "#9a031e"),
      },
      {
        title: "Tanjore Painting",
        description: "Gold-leaf religious paintings inlaid with semi-precious stones.",
        badge: "GI Tag",
        image: grad("#ffd60a", "#bc6c25"),
      },
      {
        title: "Kanjeevaram Silk",
        description: "Heavy silk sarees woven in Kanchipuram with pure zari borders.",
        badge: "GI Tag",
        image: grad("#e63946", "#fcbf49"),
      },
    ],
    traditions: [
      {
        title: "Kolam",
        description: "Daily geometric rice-flour drawings at thresholds — both art and welcome.",
        image: grad("#dad7cd", "#a3b18a"),
      },
      {
        title: "Jallikattu",
        description: "Ancient bull-taming sport practiced during Pongal in Madurai region.",
        image: grad("#bc6c25", "#6a040f"),
      },
    ],
    heritage: [
      {
        title: "Great Living Chola Temples",
        description: "Three 11th-century Chola masterpieces still in active worship.",
        badge: "UNESCO",
        image: grad("#d4a017", "#bc6c25"),
      },
      {
        title: "Mahabalipuram",
        description: "Shore temples and rock-cut sculptures from the Pallava dynasty.",
        badge: "UNESCO",
        image: grad("#e9c46a", "#a4161a"),
      },
      {
        title: "Meenakshi Temple",
        description: "Madurai's twin-deity temple with 14 gopurams covered in 33,000 sculptures.",
        image: grad("#06d6a0", "#118ab2"),
      },
    ],
    trivia: [
      "Tamil is the only classical language with continuous use for 2000+ years.",
      "Tamil Nadu has more than 33,000 ancient temples.",
      "The state produces the most films in India after Bollywood.",
    ],
  },
  WB: {
    id: "WB",
    name: "West Bengal",
    region: "east",
    capital: "Kolkata",
    language: "Bengali",
    famousFor: "Literature, Sweets, Durga Puja",
    unescoSites: 3,
    tagline: "Where Art is Worship and Worship is Art",
    iconicFestival: "Durga Puja",
    signatureDish: "Macher Jhol",
    quickFact: "The intellectual and artistic heart of eastern India.",
    image: "https://images.unsplash.com/photo-1558431382-27e303142255?w=800",
    bannerGradient: grad("#e63946", "#9d0208", "#3c0a0a"),
    thumbGradient: grad("#ffccd5", "#e63946"),
    festivals: [
      {
        title: "Durga Puja",
        description:
          "UNESCO-listed five-day worship of Goddess Durga with elaborate themed pandals.",
        badge: "UNESCO",
        image: grad("#e63946", "#9a031e"),
      },
      {
        title: "Kali Puja",
        description: "Night-long worship of Goddess Kali, coinciding with Diwali.",
        badge: "Night",
        image: grad("#1d3557", "#000814"),
      },
      {
        title: "Poila Boishakh",
        description: "Bengali New Year — bookshops, sweet shops and temples all welcome the year.",
        badge: "New Year",
        image: grad("#fcbf49", "#f4a261"),
      },
    ],
    food: [
      {
        title: "Macher Jhol",
        description: "Light fish curry with potatoes and tomatoes — Bengali comfort food.",
        tags: ["Fish", "Mustard"],
        image: grad("#e9c46a", "#bc6c25"),
      },
      {
        title: "Roshogolla",
        description: "Spongy cottage-cheese balls in cardamom syrup — Bengal's gift to the world.",
        tags: ["Cheese", "Sugar"],
        image: grad("#fefae0", "#e9edc9"),
      },
      {
        title: "Shukto",
        description: "Mildly bitter mixed-vegetable starter served at the start of Bengali meals.",
        tags: ["Vegetables"],
        image: grad("#a3b18a", "#588157"),
      },
      {
        title: "Kosha Mangsho",
        description: "Slow-cooked spiced mutton — Sunday lunch staple in Bengali homes.",
        tags: ["Mutton", "Onion"],
        image: grad("#6a040f", "#370617"),
      },
    ],
    art: [
      {
        title: "Kantha Embroidery",
        description: "Layered cloth quilted with running stitches forming folk motifs.",
        badge: "GI Tag",
        image: grad("#fcbf49", "#e76f51"),
      },
      {
        title: "Patachitra",
        description: "Scroll paintings narrating mythology, performed by chanting patuas.",
        badge: "Heritage",
        image: grad("#e63946", "#fcbf49"),
      },
      {
        title: "Baul Music",
        description: "Mystic minstrel tradition — UNESCO Intangible Cultural Heritage.",
        badge: "UNESCO",
        image: grad("#e76f51", "#bc6c25"),
      },
    ],
    traditions: [
      {
        title: "Adda",
        description: "The Bengali art of long, meandering conversations over endless cups of tea.",
        image: grad("#bc6c25", "#283618"),
      },
      {
        title: "Rabindra Sangeet",
        description: "2000+ songs composed by Tagore, woven into daily Bengali life.",
        image: grad("#a8dadc", "#457b9d"),
      },
    ],
    heritage: [
      {
        title: "Sundarbans",
        description: "Largest mangrove forest on Earth, home to the Royal Bengal Tiger.",
        badge: "UNESCO",
        image: grad("#588157", "#283618"),
      },
      {
        title: "Darjeeling Himalayan Railway",
        description: "1881 mountain railway climbing to 7,400 feet through tea estates.",
        badge: "UNESCO",
        image: grad("#a3b18a", "#3a5a40"),
      },
      {
        title: "Victoria Memorial",
        description: "White-marble museum in Kolkata blending Mughal and British architecture.",
        image: grad("#fefae0", "#dad7cd"),
      },
    ],
    trivia: [
      "Kolkata was India's capital under the British until 1911.",
      "Bengal has produced 5 Nobel laureates including Tagore.",
      "Durga Puja is now a UNESCO Intangible Cultural Heritage.",
    ],
  },
  PB: {
    id: "PB",
    name: "Punjab",
    region: "north",
    capital: "Chandigarh",
    language: "Punjabi",
    famousFor: "Bhangra, Wheat Fields, Hospitality",
    unescoSites: 0,
    tagline: "The Land of Five Rivers and Boundless Spirit",
    iconicFestival: "Baisakhi",
    signatureDish: "Sarson da Saag",
    quickFact: "The agricultural heartland and birthplace of Sikhism.",
    image: "https://images.unsplash.com/photo-1514222134-b57cbb8ce073?w=800",
    bannerGradient: grad("#fcbf49", "#f77f00", "#d62828"),
    thumbGradient: grad("#ffe5b4", "#fcbf49"),
    festivals: [
      {
        title: "Baisakhi",
        description:
          "Harvest festival and Sikh new year — bhangra in mustard fields under April sun.",
        badge: "Harvest",
        image: grad("#fcbf49", "#f77f00"),
      },
      {
        title: "Lohri",
        description: "Bonfire festival marking winter's end, with peanuts, popcorn and folk songs.",
        badge: "Winter",
        image: grad("#e76f51", "#9a031e"),
      },
      {
        title: "Hola Mohalla",
        description: "Three-day Sikh festival of martial arts demonstrations at Anandpur Sahib.",
        badge: "Martial",
        image: grad("#003566", "#001d3d"),
      },
    ],
    food: [
      {
        title: "Sarson da Saag",
        description: "Slow-cooked mustard greens served with corn-flour roti and white butter.",
        tags: ["Mustard greens", "Butter"],
        image: grad("#a3b18a", "#3a5a40"),
      },
      {
        title: "Butter Chicken",
        description:
          "Punjab's gift to the world — tandoori chicken in a velvety tomato-cream gravy.",
        tags: ["Chicken", "Cream"],
        image: grad("#e76f51", "#a4161a"),
      },
      {
        title: "Chole Bhature",
        description: "Fluffy fried bread with spicy chickpea curry — the ultimate brunch.",
        tags: ["Chickpeas", "Wheat"],
        image: grad("#e9c46a", "#bc6c25"),
      },
      {
        title: "Lassi",
        description: "Thick yogurt drink served sweet or salted, in tall brass glasses.",
        tags: ["Yogurt", "Sugar"],
        image: grad("#fefae0", "#e9edc9"),
      },
    ],
    art: [
      {
        title: "Phulkari",
        description: "Floral embroidery in vivid silk threads on khadi — an heirloom craft.",
        badge: "GI Tag",
        image: grad("#f72585", "#7209b7"),
      },
      {
        title: "Bhangra",
        description: "Energetic harvest dance with dhol drums — now a global dance form.",
        badge: "Folk",
        image: grad("#fcbf49", "#e76f51"),
      },
      {
        title: "Giddha",
        description: "Women's folk dance with witty rhyming couplets called bolis.",
        badge: "Folk",
        image: grad("#f72585", "#bc4749"),
      },
    ],
    traditions: [
      {
        title: "Langar",
        description: "Free community kitchen at every Gurdwara — equality served on a plate.",
        badge: "Sikh",
        image: grad("#fcbf49", "#bc6c25"),
      },
      {
        title: "Pind Life",
        description: "Village life of charpais, buffaloes and tube-wells — still beating strong.",
        image: grad("#a3b18a", "#588157"),
      },
    ],
    heritage: [
      {
        title: "Golden Temple",
        description: "Harmandir Sahib — gilded Sikh shrine surrounded by the sacred Amrit Sarovar.",
        badge: "Sacred",
        image: grad("#fcbf49", "#d4a017"),
      },
      {
        title: "Wagah Border",
        description: "Daily flag-lowering ceremony with theatrical military choreography.",
        image: grad("#e63946", "#9a031e"),
      },
      {
        title: "Jallianwala Bagh",
        description: "1919 memorial commemorating a defining moment of India's freedom struggle.",
        image: grad("#bc6c25", "#6a040f"),
      },
    ],
    trivia: [
      "Punjab feeds India — produces 22% of the country's wheat.",
      "Over 100,000 meals are served free at the Golden Temple every day.",
      "The Bhangra dance originated as celebration after spring harvest.",
    ],
  },
  JK: {
    id: "JK",
    name: "Jammu & Kashmir",
    region: "north",
    capital: "Srinagar / Jammu",
    language: "Kashmiri, Urdu, Dogri",
    famousFor: "Valleys, Lakes, Saffron",
    unescoSites: 0,
    tagline: "Paradise on Earth",
    iconicFestival: "Tulip Festival",
    signatureDish: "Rogan Josh",
    quickFact:
      "Snow peaks, saffron fields and Dal Lake make Jammu & Kashmir one of India's most storied landscapes.",
    featured: true,
    bannerGradient: grad("#6f42c1", "#3a86ff", "#2a9d8f"),
    thumbGradient: grad("#b8c0ff", "#4361ee"),
    image: "https://images.unsplash.com/photo-1643449415972-87d4cfe882a1?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    festivals: [
      {
        title: "Baisakhi",
        description:
          "Spring harvest celebrations across the valleys with songs, prayers and communal joy.",
        badge: "Spring",
        image: grad("#fcbf49", "#f77f00"),
      },
      {
        title: "Hemis Festival",
        description:
          "Masked dances and monastic rituals at Hemis monastery honoring Guru Padmasambhava.",
        badge: "Monastery",
        image: grad("#3a86ff", "#6f42c1"),
      },
      {
        title: "Tulip Festival",
        description:
          "Srinagar's Indira Gandhi Memorial Tulip Garden erupts into one of Asia's largest blooms.",
        badge: "Bloom",
        image: grad("#ffafcc", "#c77dff"),
      },
    ],
    food: [
      {
        title: "Rogan Josh",
        description:
          "Slow-cooked lamb in Kashmiri spices and dried cockscomb flower for a deep crimson curry.",
        tags: ["Lamb", "Spice"],
        image: grad("#9d0208", "#bc4749"),
      },
      {
        title: "Wazwan",
        description:
          "A royal 36-course feast prepared by master chefs called wazas for celebrations.",
        tags: ["Feast", "Celebration"],
        image: grad("#6a040f", "#9a031e"),
      },
      {
        title: "Kahwa",
        description:
          "Saffron green tea steeped with almonds and cardamom, often shared in winter mornings.",
        tags: ["Tea", "Saffron"],
        image: grad("#f4a261", "#e9c46a"),
      },
      {
        title: "Dum Aloo",
        description:
          "Baby potatoes simmered in a rich yogurt-fennel gravy with gentle Kashmiri heat.",
        tags: ["Potato", "Yogurt"],
        image: grad("#dda15e", "#bc6c25"),
      },
    ],
    art: [
      {
        title: "Pashmina Weaving",
        description:
          "The world's finest cashmere wool is handwoven into feather-light shawls and wraps.",
        badge: "Cashmere",
        image: grad("#f8f9fa", "#adb5bd"),
      },
      {
        title: "Kashida Embroidery",
        description:
          "Needle embroidery with floral motifs that blossoms across shawls, cloth and hangings.",
        badge: "Needlework",
        image: grad("#ffcad4", "#ffafcc"),
      },
      {
        title: "Papier Mache",
        description:
          "Lacquered decorative objects painted with delicate floral and geometric patterns.",
        badge: "Craft",
        image: grad("#cdb4db", "#bde0fe"),
      },
      {
        title: "Khatamband",
        description:
          "Geometric interlocking wood ceilings that turn traditional homes into carved masterpieces.",
        badge: "Woodcraft",
        image: grad("#8d6e63", "#5d4037"),
      },
    ],
    traditions: [
      {
        title: "Shikara Rides",
        description:
          "Wooden boat rides across Dal Lake at sunrise, framed by mist and floating gardens.",
        image: grad("#4cc9f0", "#4895ef"),
      },
      {
        title: "Kangri Culture",
        description:
          "A clay firepot carried under the phiran cloak keeps winter evenings warm in the valley.",
        image: grad("#ff7b00", "#d00000"),
      },
      {
        title: "Wanwun",
        description:
          "Traditional Kashmiri wedding songs sung by women to bless the new household.",
        image: grad("#f72585", "#b5179e"),
      },
    ],
    heritage: [
      {
        title: "Dal Lake",
        description:
          "An iconic lake of floating gardens, shikaras and houseboats at the heart of Srinagar.",
        badge: "Iconic",
        image: grad("#4cc9f0", "#3a86ff"),
      },
      {
        title: "Mughal Gardens",
        description:
          "Shalimar Bagh and Nishat Bagh, the 17th-century terraced gardens of royal leisure.",
        badge: "Heritage",
        image: grad("#80ed99", "#57cc99"),
      },
      {
        title: "Gulmarg",
        description:
          "A meadow resort famous for the world's highest gondola and winter ski slopes.",
        badge: "Alpine",
        image: grad("#e0fbfc", "#98c1d9"),
      },
    ],
    trivia: [
      "Kashmir saffron is one of the most prized spices in the world.",
      "Dal Lake changes character with every season, from misty mornings to ice-edged winters.",
      "The valley's crafts are preserved through family-based artisan lineages.",
    ],
  },
  OD: {
    id: "OD",
    name: "Odisha",
    region: "east",
    capital: "Bhubaneswar",
    language: "Odia",
    famousFor: "Temples, Coastlines, Classical Arts",
    unescoSites: 2,
    tagline: "The Soul of Incredible India",
    iconicFestival: "Rath Yatra",
    signatureDish: "Dalma",
    quickFact:
      "Odisha unites temple heritage, living ritual and coastal ecology in one deeply devotional landscape.",
    featured: true,
    bannerGradient: grad("#ff8fab", "#fb8500", "#e63946"),
    thumbGradient: grad("#ffd6a5", "#ffb703"),
    image: "https://images.unsplash.com/photo-1706790574525-d218c4c52b5c?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    festivals: [
      {
        title: "Rath Yatra",
        description:
          "A grand chariot procession of Lord Jagannath that draws millions to Puri every year.",
        badge: "Pilgrimage",
        image: grad("#fb8500", "#e63946"),
      },
      {
        title: "Danda Nata",
        description:
          "An 18-day devotional festival with fasting, fire-walking and ritual performance.",
        badge: "Devotion",
        image: grad("#9d0208", "#6a040f"),
      },
      {
        title: "Konark Dance Festival",
        description:
          "Classical dance performances staged against the sculpted backdrop of the Sun Temple.",
        badge: "Classical",
        image: grad("#f4a261", "#e76f51"),
      },
    ],
    food: [
      {
        title: "Dalma",
        description:
          "Lentils slow-cooked with vegetables and coconut, a staple of temple kitchens.",
        tags: ["Lentils", "Temple food"],
        image: grad("#dda15e", "#bc6c25"),
      },
      {
        title: "Pakhala Bhata",
        description:
          "Fermented water-soaked rice served cool with mustard and curry leaves.",
        tags: ["Rice", "Fermented"],
        image: grad("#a8dadc", "#457b9d"),
      },
      {
        title: "Chenna Poda",
        description:
          "Caramelized baked cottage cheese dessert often called Odisha's original cheesecake.",
        tags: ["Dessert", "Cheese"],
        image: grad("#fefae0", "#f4a261"),
      },
      {
        title: "Macha Besara",
        description:
          "Fish cooked in mustard and poppy seed gravy with a bright coastal tang.",
        tags: ["Fish", "Mustard"],
        image: grad("#ffb4a2", "#e5989b"),
      },
    ],
    art: [
      {
        title: "Pattachitra",
        description:
          "Intricate cloth paintings depicting Jagannath mythology and temple stories.",
        badge: "Heritage",
        image: grad("#d62828", "#f77f00"),
      },
      {
        title: "Dhokra",
        description:
          "Lost-wax tribal brass casting that is among India's oldest metal crafts.",
        badge: "Metalcraft",
        image: grad("#bc6c25", "#6a040f"),
      },
      {
        title: "Applique Work",
        description:
          "Colorful fabric cutouts stitched into canopies, umbrellas and decorative panels.",
        badge: "Textile",
        image: grad("#ffafcc", "#cdb4db"),
      },
      {
        title: "Gotipua Dance",
        description:
          "Young boys dressed as women perform acrobatic devotional dance traditions.",
        badge: "Devotional",
        image: grad("#8ecae6", "#219ebc"),
      },
    ],
    traditions: [
      {
        title: "Jagannath Worship",
        description:
          "The living deity culture of Puri, where ritual and public festival merge.",
        image: grad("#ffb703", "#fb8500"),
      },
      {
        title: "Sand Art",
        description:
          "Puri beach has produced world-class sand sculptors whose art travels globally.",
        image: grad("#e9c46a", "#f4a261"),
      },
    ],
    heritage: [
      {
        title: "Konark Sun Temple",
        description:
          "A 13th-century chariot-shaped UNESCO temple dedicated to Surya, the sun god.",
        badge: "UNESCO",
        image: grad("#f4a261", "#e76f51"),
      },
      {
        title: "Jagannath Temple Puri",
        description: "One of Hinduism's four sacred dhams and the spiritual center of Puri.",
        badge: "Dhams",
        image: grad("#ffb703", "#fb8500"),
      },
      {
        title: "Chilika Lake",
        description:
          "Asia's largest brackish water lagoon and a refuge for Irrawaddy dolphins.",
        badge: "Lagoon",
        image: grad("#8ecae6", "#219ebc"),
      },
    ],
    trivia: [
      "Odisha's temple architecture gave India the iconic Rekha and Pidha styles.",
      "Chilika is a critical wintering ground for migratory birds.",
      "Puri's rituals center on the chariots of the annual Rath Yatra.",
    ],
  },
  ML: {
    id: "ML",
    name: "Meghalaya",
    region: "northeast",
    capital: "Shillong",
    language: "Khasi, Garo, English",
    famousFor: "Clouds, Rain, Living Root Bridges",
    unescoSites: 0,
    tagline: "The Abode of Clouds",
    iconicFestival: "Nongkrem Dance Festival",
    signatureDish: "Jadoh",
    quickFact:
      "Meghalaya's rain-soaked hills are home to a matrilineal society and some of the wettest places on Earth.",
    featured: true,
    bannerGradient: grad("#4f8cff", "#3a86ff", "#80ed99"),
    thumbGradient: grad("#caffbf", "#52b788"),
    image: "https://images.unsplash.com/photo-1695827724182-742453f1ed59?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    festivals: [
      {
        title: "Nongkrem Dance Festival",
        description:
          "A Khasi thanksgiving harvest festival with ceremonial dance and traditional dress.",
        badge: "Khasi",
        image: grad("#80ed99", "#52b788"),
      },
      {
        title: "Wangala Festival",
        description:
          "The Garo tribe's 100-drum harvest festival honoring the Sun god and seasonal bounty.",
        badge: "Garo",
        image: grad("#ffb703", "#fb8500"),
      },
      {
        title: "Shad Suk Mynsiem",
        description:
          "A spring festival of gratitude and renewal performed in full traditional dress.",
        badge: "Spring",
        image: grad("#caf0f8", "#90e0ef"),
      },
    ],
    food: [
      {
        title: "Jadoh",
        description:
          "Khasi red rice cooked with pork and bay leaves, a beloved everyday staple.",
        tags: ["Rice", "Pork"],
        image: grad("#bc4749", "#6a040f"),
      },
      {
        title: "Dohneiiong",
        description:
          "Pork simmered in a thick black sesame seed gravy with deep earthy flavor.",
        tags: ["Pork", "Sesame"],
        image: grad("#2b2d42", "#8d99ae"),
      },
      {
        title: "Nakham Bitchi",
        description:
          "Dried fish soup with green chilies, especially loved in the Garo hills.",
        tags: ["Fish", "Soup"],
        image: grad("#3a86ff", "#4895ef"),
      },
      {
        title: "Tungrymbai",
        description:
          "Fermented soybean preparation served as a pungent side dish with rice meals.",
        tags: ["Fermented", "Soybean"],
        image: grad("#588157", "#3a5a40"),
      },
    ],
    art: [
      {
        title: "Bamboo Craft",
        description:
          "Intricate baskets, furniture and musical instruments woven from local bamboo.",
        badge: "Craft",
        image: grad("#a3b18a", "#588157"),
      },
      {
        title: "Cane Weaving",
        description:
          "Traditional Khasi bags called Knup are woven to protect against heavy rain.",
        badge: "Utility",
        image: grad("#d4a373", "#bc6c25"),
      },
      {
        title: "Thma Um Skum",
        description:
          "Stone balancing practiced as an ancient Khasi tradition and meditative skill.",
        badge: "Tradition",
        image: grad("#adb5bd", "#6c757d"),
      },
      {
        title: "Traditional Weaving",
        description:
          "Garo and Khasi women weave striped cotton textiles with distinctive regional motifs.",
        badge: "Textile",
        image: grad("#ffafcc", "#bde0fe"),
      },
    ],
    traditions: [
      {
        title: "Matrilineal Society",
        description:
          "Property and lineage pass through women, making Meghalaya one of the world's rare matrilineal cultures.",
        image: grad("#ffcad4", "#cdb4db"),
      },
      {
        title: "Living Root Bridges",
        description:
          "Rubber tree roots are trained over decades to create natural bridges across streams.",
        image: grad("#80ed99", "#40916c"),
      },
    ],
    heritage: [
      {
        title: "Living Root Bridges of Cherrapunji",
        description:
          "Remarkable double-decker root bridges and a UNESCO tentative-list landscape.",
        badge: "Tentative",
        image: grad("#52b788", "#2d6a4f"),
      },
      {
        title: "Mawsynram",
        description:
          "Known as the wettest place on Earth with record-breaking annual rainfall.",
        badge: "Rainfall",
        image: grad("#4cc9f0", "#4361ee"),
      },
      {
        title: "Dawki River",
        description:
          "A crystal-clear river where boats appear to float in air above the water.",
        badge: "Clearwater",
        image: grad("#caf0f8", "#90e0ef"),
      },
    ],
    trivia: [
      "The Khasi maternal clan system is one of the most studied in South Asia.",
      "Meghalaya's living root bridges are still being extended by village communities.",
      "Rainfall shapes everything here, from food preservation to architecture.",
    ],
  },
  AS: {
    id: "AS",
    name: "Assam",
    region: "northeast",
    capital: "Dispur",
    language: "Assamese",
    famousFor: "Tea, Rhinos, River Islands",
    unescoSites: 1,
    tagline: "The Land of Red River and Blue Hills",
    iconicFestival: "Bihu",
    signatureDish: "Assam Laksa",
    quickFact:
      "Assam's identity flows from its rivers, tea gardens, monasteries and a rich living folk culture.",
    featured: true,
    bannerGradient: grad("#ffb703", "#fb8500", "#2a9d8f"),
    thumbGradient: grad("#ffd166", "#e9c46a"),
    image: "https://images.unsplash.com/photo-1597074866923-dc0589150358?w=800",
    festivals: [
      {
        title: "Bihu",
        description:
          "A trio of seasonal festivals - Rongali, Kongali and Bhogali - celebrating Assamese life.",
        badge: "Seasonal",
        image: grad("#f4a261", "#e76f51"),
      },
      {
        title: "Ambubachi Mela",
        description:
          "An annual fertility festival at Kamakhya Temple drawing pilgrims from across India.",
        badge: "Pilgrimage",
        image: grad("#9d0208", "#6a040f"),
      },
      {
        title: "Dehing Patkai Festival",
        description:
          "A celebration of Assam's rainforests, indigenous cultures and biodiversity.",
        badge: "Forest",
        image: grad("#52b788", "#2d6a4f"),
      },
    ],
    food: [
      {
        title: "Assam Laksa",
        description:
          "Rice noodle soup with a tangy fish broth that balances smoke, citrus and spice.",
        tags: ["Noodles", "Fish"],
        image: grad("#8ecae6", "#219ebc"),
      },
      {
        title: "Masor Tenga",
        description:
          "Sour fish curry finished with tomatoes and elephant apple for a clean sharp finish.",
        tags: ["Fish", "Sour"],
        image: grad("#e76f51", "#bc4749"),
      },
      {
        title: "Duck Meat Curry",
        description:
          "Slow-cooked duck with ash gourd, a festive Bihu dish with deep rural roots.",
        tags: ["Duck", "Festival"],
        image: grad("#6c757d", "#343a40"),
      },
      {
        title: "Pitha",
        description:
          "Rice cakes steamed, fried or roasted during Bihu and other seasonal gatherings.",
        tags: ["Rice", "Sweet"],
        image: grad("#fefae0", "#fcbf49"),
      },
    ],
    art: [
      {
        title: "Bihu Dance",
        description:
          "Energetic folk dance with rapid hand and hip movements and vibrant costumes.",
        badge: "Folk",
        image: grad("#ffafcc", "#ff758f"),
      },
      {
        title: "Sattriya",
        description:
          "Classical dance from Vaishnavite monasteries and one of India's eight classical forms.",
        badge: "Classical",
        image: grad("#f1faee", "#a8dadc"),
      },
      {
        title: "Mask Making",
        description:
          "Giant papier mache masks from Majuli island used in ritual and performance traditions.",
        badge: "Majuli",
        image: grad("#cdb4db", "#9d4edd"),
      },
      {
        title: "Muga Silk Weaving",
        description:
          "Golden silk found only in Assam, prized for its sheen and GI-tagged legacy.",
        badge: "GI Tag",
        image: grad("#ffd166", "#fcbf49"),
      },
    ],
    traditions: [
      {
        title: "Sattra Culture",
        description:
          "Vaishnavite monastery life that has preserved art, music and literature for centuries.",
        image: grad("#a8dadc", "#457b9d"),
      },
      {
        title: "Majuli Island",
        description:
          "The world's largest river island and a renowned seat of Assamese culture.",
        image: grad("#80ed99", "#40916c"),
      },
      {
        title: "Jaapi",
        description:
          "A bamboo and tokou palm hat that has become a symbol of Assamese identity.",
        image: grad("#f4a261", "#bc6c25"),
      },
    ],
    heritage: [
      {
        title: "Kaziranga National Park",
        description:
          "UNESCO-listed park protecting the majority of the world's one-horned rhinoceroses.",
        badge: "UNESCO",
        image: grad("#52b788", "#2d6a4f"),
      },
      {
        title: "Majuli River Island",
        description:
          "The world's largest inhabited river island and a cradle of Assamese ecology and culture.",
        badge: "River Island",
        image: grad("#4cc9f0", "#4895ef"),
      },
      {
        title: "Kamakhya Temple",
        description:
          "A powerful Shakti shrine atop Nilachal Hill and a focal point of pilgrimage.",
        badge: "Shakti",
        image: grad("#9d0208", "#6a040f"),
      },
    ],
    trivia: [
      "Assam tea is prized for its malty character and bright color.",
      "Majuli's monasteries continue to shape dance, music and manuscripts.",
      "The state is a gateway to India's eastern Himalayas and Brahmaputra valley.",
    ],
  },
  MP: {
    id: "MP",
    name: "Madhya Pradesh",
    region: "central",
    capital: "Bhopal",
    language: "Hindi",
    famousFor: "Temples, Forests, Tribal Heritage",
    unescoSites: 3,
    tagline: "The Heart of Incredible India",
    iconicFestival: "Khajuraho Dance Festival",
    signatureDish: "Poha Jalebi",
    quickFact:
      "Madhya Pradesh sits at India's center, linking great river systems, tiger reserves and medieval temples.",
    featured: true,
    bannerGradient: grad("#f4a261", "#e76f51", "#9d0208"),
    thumbGradient: grad("#ffd6a5", "#f4a261"),
    image: "https://images.unsplash.com/photo-1606298855672-3efb63017be8?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    festivals: [
      {
        title: "Khajuraho Dance Festival",
        description:
          "A week of classical dance against the magnificent backdrop of medieval temples.",
        badge: "Classical",
        image: grad("#bc6c25", "#6a040f"),
      },
      {
        title: "Lokrang Festival",
        description:
          "A Bhopal celebration of tribal folk arts, music and living regional traditions.",
        badge: "Folk",
        image: grad("#52b788", "#2d6a4f"),
      },
      {
        title: "Tansen Music Festival",
        description:
          "Classical music at Gwalior honoring the legacy of legendary musician Tansen.",
        badge: "Music",
        image: grad("#8ecae6", "#4361ee"),
      },
    ],
    food: [
      {
        title: "Bhutte Ka Kees",
        description:
          "Grated corn cooked with milk and spices, a beloved Indore street-side delicacy.",
        tags: ["Corn", "Milk"],
        image: grad("#ffd166", "#f4a261"),
      },
      {
        title: "Dal Bafla",
        description:
          "Baked wheat cakes dipped in ghee and paired with spiced lentils for a hearty meal.",
        tags: ["Wheat", "Ghee"],
        image: grad("#e9c46a", "#bc6c25"),
      },
      {
        title: "Poha Jalebi",
        description:
          "Flattened rice with crispy syrup spirals - the iconic breakfast pairing of the state.",
        tags: ["Breakfast", "Sweet"],
        image: grad("#fcbf49", "#e76f51"),
      },
      {
        title: "Rogan Josh Malwa Style",
        description:
          "Lamb prepared with a Malwa-region spice blend and rich, lingering heat.",
        tags: ["Lamb", "Spice"],
        image: grad("#9d0208", "#6a040f"),
      },
    ],
    art: [
      {
        title: "Gond Painting",
        description:
          "Tribal art filled with dots and lines depicting nature spirits and living forests.",
        badge: "Tribal",
        image: grad("#80ed99", "#40916c"),
      },
      {
        title: "Bagh Print",
        description:
          "Natural dye block printing from Bagh village known for deep reds and blacks.",
        badge: "Handblock",
        image: grad("#bc4749", "#6a040f"),
      },
      {
        title: "Chanderi Weaving",
        description:
          "Sheer silk-cotton sarees with gold zari borders woven in the Chanderi tradition.",
        badge: "Textile",
        image: grad("#fefae0", "#e9c46a"),
      },
      {
        title: "Dhokra of Bastar",
        description:
          "Lost-wax metal casting carried on by tribal communities in the Bastar region.",
        badge: "Metalcraft",
        image: grad("#bc6c25", "#6a040f"),
      },
    ],
    traditions: [
      {
        title: "Tribal Heritage",
        description:
          "A large tribal population preserves Gond, Bhil and Baiga languages, arts and rituals.",
        image: grad("#ffafcc", "#cdb4db"),
      },
      {
        title: "Narmada Parikrama",
        description:
          "A walking pilgrimage along the entire length of the sacred Narmada river.",
        image: grad("#4cc9f0", "#4895ef"),
      },
    ],
    heritage: [
      {
        title: "Khajuraho Temples",
        description:
          "UNESCO-listed 10th-century temples renowned for their intricate sculptures.",
        badge: "UNESCO",
        image: grad("#f4a261", "#e76f51"),
      },
      {
        title: "Sanchi Stupa",
        description:
          "Ashoka's ancient stone Buddhist monument and one of India's oldest surviving structures.",
        badge: "UNESCO",
        image: grad("#a8dadc", "#457b9d"),
      },
      {
        title: "Bandhavgarh National Park",
        description:
          "A tiger reserve with one of the highest densities of Bengal tigers in the world.",
        badge: "Wildlife",
        image: grad("#80ed99", "#2d6a4f"),
      },
    ],
    trivia: [
      "Madhya Pradesh is home to several major tiger reserves including Bandhavgarh and Kanha.",
      "The state sits at the crossroads of multiple river basins and trade routes.",
      "Its temples and tribal art make it both a spiritual and artistic center.",
    ],
  },
  MH: {
    id: "MH",
    name: "Maharashtra",
    region: "west",
    capital: "Mumbai",
    language: "Marathi",
    famousFor: "Cinema, Coasts, Forts",
    unescoSites: 3,
    tagline: "Unlimited Possibilities",
    iconicFestival: "Ganesh Chaturthi",
    signatureDish: "Vada Pav",
    quickFact:
      "Maharashtra combines a giant urban economy with deep devotional, theatrical and coastal traditions.",
    featured: true,
    bannerGradient: grad("#e76f51", "#d62828", "#6a040f"),
    thumbGradient: grad("#ffafcc", "#ff758f"),
    image: "https://images.unsplash.com/photo-1660145416818-b9a2b1a1f193?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    festivals: [
      {
        title: "Ganesh Chaturthi",
        description:
          "A 10-day festival of massive Ganesh idols, public processions and heartfelt farewells.",
        badge: "Major",
        image: grad("#f4a261", "#e76f51"),
      },
      {
        title: "Gudi Padwa",
        description:
          "Maharashtrian New Year marked by the hoisting of decorated gudis outside homes.",
        badge: "New Year",
        image: grad("#80ed99", "#40916c"),
      },
      {
        title: "Narali Purnima",
        description:
          "Coconut offerings to the sea mark the end of monsoon and the start of fishing season.",
        badge: "Coastal",
        image: grad("#caf0f8", "#48cae4"),
      },
    ],
    food: [
      {
        title: "Vada Pav",
        description:
          "A spiced potato fritter in a bread bun - Mumbai's indispensable street food.",
        tags: ["Street food", "Potato"],
        image: grad("#f4a261", "#bc6c25"),
      },
      {
        title: "Puran Poli",
        description:
          "Sweet flatbread stuffed with lentil and jaggery filling, served at festivals.",
        tags: ["Sweet", "Festival"],
        image: grad("#ffd166", "#fcbf49"),
      },
      {
        title: "Kolhapuri Chicken",
        description:
          "Fiery red curry from Kolhapur prepared with a powerful multi-spice masala.",
        tags: ["Chicken", "Spice"],
        image: grad("#d62828", "#9a031e"),
      },
      {
        title: "Modak",
        description:
          "Steamed rice dumplings with coconut-jaggery filling and Lord Ganesh's favorite sweet.",
        tags: ["Sweet", "Rice"],
        image: grad("#fefae0", "#e9edc9"),
      },
    ],
    art: [
      {
        title: "Warli Painting",
        description:
          "Tribal white geometric art on mud walls, now celebrated around the world.",
        badge: "Tribal",
        image: grad("#f8f9fa", "#adb5bd"),
      },
      {
        title: "Paithani Weaving",
        description:
          "Silk sarees with peacock motifs woven in Paithan since ancient times.",
        badge: "Silk",
        image: grad("#9d4edd", "#7b2cbf"),
      },
      {
        title: "Lavani",
        description:
          "Fast-tempo folk dance with powerful expression and rhythmic poetry.",
        badge: "Dance",
        image: grad("#f72585", "#b5179e"),
      },
      {
        title: "Tamasha",
        description:
          "Traditional folk theatre blending music, dance and comedy in village and urban spaces.",
        badge: "Theatre",
        image: grad("#ffb703", "#fb8500"),
      },
    ],
    traditions: [
      {
        title: "Wari Pilgrimage",
        description:
          "Millions walk barefoot to Pandharpur singing abhangas in one of India's great pilgrimages.",
        image: grad("#80ed99", "#2d6a4f"),
      },
      {
        title: "Powada",
        description:
          "Ballad tradition narrating the tales of Shivaji and Maratha valor.",
        image: grad("#f4a261", "#bc6c25"),
      },
    ],
    heritage: [
      {
        title: "Ajanta Caves",
        description:
          "UNESCO Buddhist cave paintings and sculptures carved into a horseshoe-shaped cliff.",
        badge: "UNESCO",
        image: grad("#e9c46a", "#bc6c25"),
      },
      {
        title: "Ellora Caves",
        description:
          "UNESCO Hindu, Buddhist and Jain shrines carved from a single rock face.",
        badge: "UNESCO",
        image: grad("#8ecae6", "#219ebc"),
      },
      {
        title: "Chhatrapati Shivaji Terminus",
        description:
          "A Victorian Gothic railway station in Mumbai and a symbol of colonial-era ambition.",
        badge: "UNESCO",
        image: grad("#fefae0", "#dad7cd"),
      },
    ],
    trivia: [
      "Maharashtra is India's wealthiest state and home to Bollywood.",
      "Its coastal and Deccan landscapes make the state culturally very diverse.",
      "The Wari pilgrimage has continued for centuries with remarkable consistency.",
    ],
  },
  TG: {
    id: "TG",
    name: "Telangana",
    region: "south",
    capital: "Hyderabad",
    language: "Telugu, Urdu",
    famousFor: "Biryani, Forts, Bangle Markets",
    unescoSites: 1,
    tagline: "The Land of Kohinoor",
    iconicFestival: "Bathukamma",
    signatureDish: "Hyderabadi Biryani",
    quickFact:
      "Telangana blends Telugu heartland traditions with the legacy of the Nizams and the city of Hyderabad.",
    featured: true,
    bannerGradient: grad("#8d99ae", "#6c757d", "#343a40"),
    thumbGradient: grad("#adb5bd", "#6c757d"),
    image: "https://images.unsplash.com/photo-1621909321963-2276c9660298?q=80&w=1517&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    festivals: [
      {
        title: "Bathukamma",
        description:
          "A flower festival where women stack blossoms into towers and float them in lakes.",
        badge: "Flower",
        image: grad("#ffafcc", "#cdb4db"),
      },
      {
        title: "Bonalu",
        description:
          "Goddess worship with pot-balancing processions and rhythmic drumming in Hyderabad.",
        badge: "Goddess",
        image: grad("#fb8500", "#d62828"),
      },
      {
        title: "Sammakka Saralamma Jatara",
        description:
          "A two-yearly tribal festival regarded as one of the largest in the world.",
        badge: "Tribal",
        image: grad("#52b788", "#2d6a4f"),
      },
    ],
    food: [
      {
        title: "Hyderabadi Biryani",
        description:
          "Dum-cooked rice with saffron, caramelized onions and layered meat or vegetables.",
        tags: ["Rice", "Dum"],
        image: grad("#f4a261", "#e76f51"),
      },
      {
        title: "Haleem",
        description:
          "Slow-cooked wheat and mutton porridge especially famous during Ramadan.",
        tags: ["Mutton", "Ramadan"],
        image: grad("#6c757d", "#343a40"),
      },
      {
        title: "Mirchi Ka Salan",
        description:
          "Green chilli curry in a peanut-sesame gravy served with biryani.",
        tags: ["Chilli", "Peanut"],
        image: grad("#40916c", "#2d6a4f"),
      },
      {
        title: "Qubani Ka Meetha",
        description:
          "Apricot dessert topped with cream and a wedding staple in Hyderabadi cuisine.",
        tags: ["Dessert", "Apricot"],
        image: grad("#ffd166", "#f4a261"),
      },
    ],
    art: [
      {
        title: "Bidriware",
        description:
          "Black zinc alloy inlaid with silver, a craft associated with royal courts and Bidar.",
        badge: "Inlay",
        image: grad("#2b2d42", "#8d99ae"),
      },
      {
        title: "Pochampally Ikat",
        description:
          "Geometric double-ikat silk weaving recognized for its precision and GI tag.",
        badge: "GI Tag",
        image: grad("#f72585", "#7209b7"),
      },
      {
        title: "Nirmal Paintings",
        description:
          "Soft wood paintings from Nirmal district with floral and courtly motifs.",
        badge: "Painting",
        image: grad("#ffafcc", "#bde0fe"),
      },
      {
        title: "Perini Shivatandavam",
        description:
          "An ancient warrior dance revived from Kakatiya temple sculptures.",
        badge: "Dance",
        image: grad("#e63946", "#9a031e"),
      },
    ],
    traditions: [
      {
        title: "Nizami Culture",
        description:
          "Hyderabad's unique blend of Telugu, Persian and Mughal traditions still shapes daily life.",
        image: grad("#ffafcc", "#cdb4db"),
      },
      {
        title: "Charminar Laad Bazaar",
        description:
          "A centuries-old bangle market that thrives around the city's iconic monument.",
        image: grad("#ffd166", "#fb8500"),
      },
    ],
    heritage: [
      {
        title: "Charminar",
        description:
          "A 1591 mosque-monument that remains the symbol of Hyderabad.",
        badge: "Iconic",
        image: grad("#8d99ae", "#343a40"),
      },
      {
        title: "Golconda Fort",
        description:
          "A medieval diamond-trading fortress known for acoustic wonders and expansive ramparts.",
        badge: "Fort",
        image: grad("#6c757d", "#495057"),
      },
      {
        title: "Ramappa Temple",
        description:
          "A UNESCO-listed Kakatiya temple built on a floating sand foundation.",
        badge: "UNESCO",
        image: grad("#f4a261", "#bc6c25"),
      },
    ],
    trivia: [
      "Hyderabad is famous worldwide for biryani, pearls and historic bazaars.",
      "The Kakatiya and Nizam legacies coexist in Telangana's architecture and cuisine.",
      "Bathukamma is one of the most visually distinctive flower festivals in India.",
    ],
  },
};

export const STATE_LIST = Object.values(STATES);

export const REGIONS: { id: Region | "all"; label: string }[] = [
  { id: "all", label: "All India" },
  { id: "north", label: "North" },
  { id: "south", label: "South" },
  { id: "east", label: "East" },
  { id: "west", label: "West" },
  { id: "northeast", label: "Northeast" },
  { id: "central", label: "Central" },
];

export const REGION_FILL: Record<Region, string> = {
  north: "oklch(0.92 0.06 60)",
  south: "oklch(0.92 0.06 145)",
  east: "oklch(0.92 0.06 350)",
  west: "oklch(0.92 0.06 30)",
  northeast: "oklch(0.92 0.06 230)",
  central: "oklch(0.92 0.05 85)",
};
