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
