import { Room, Facility, GalleryItem } from '../types';

// Locally generated high-fidelity resort assets
import heroTropical from '../assets/images/resort_hero_tropical_1790867374456.jpg';
import poolImg from '../assets/images/resort_swimming_pool_1790867388792.jpg';
import beachCabanaImg from '../assets/images/resort_beach_cabana_1790867402191.jpg';
import deluxeRoomImg from '../assets/images/resort_deluxe_room_1790867414364.jpg';
import diningPatioImg from '../assets/images/resort_dining_patio_1790867426000.jpg';
import standardRoomImg from '../assets/images/resort_standard_room_1790867480489.jpg';
import familyRoomImg from '../assets/images/resort_family_room_1790867491187.jpg';
import lushGardenImg from '../assets/images/resort_lush_garden_1790867500552.jpg';
import parkingAreaImg from '../assets/images/resort_parking_area_1790867515001.jpg';
import recreationAreaImg from '../assets/images/resort_recreation_area_1790867528055.jpg';
import functionHallImg from '../assets/images/resort_function_hall_1790867540445.jpg';
import sunsetLaUnionImg from '../assets/images/resort_sunset_launion_1790867551571.jpg';
import entranceSignImg from '../assets/images/resort_entrance_sign_1790868462493.jpg';
import welcomeDrinksImg from '../assets/images/resort_welcome_drinks_1790868527598.jpg';

export const RESORT_INFO = {
  name: 'Bikini Valley Resort',
  slogan: 'Relax. Explore. Experience.',
  location: 'Samara, Aringay, La Union, Philippines',
  fullAddress: 'Samara Beachfront Road, Aringay, La Union 2503, Philippines',
  contactNumber: '09539661524',
  telLink: 'tel:09539661524',
  email: 'bikinivalley175@gmail.com',
  mailtoLink: 'mailto:bikinivalley175@gmail.com',
  facebookUrl: 'https://www.facebook.com/profile.php?id=61594790529009',
  instagramUrl: 'https://www.instagram.com/bikinivalley?stkn=MTZ1aXhwMG43bWgxZw==',
  googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Samara,+Aringay,+La+Union,+Philippines',
  googleMapsEmbedUrl: 'https://maps.google.com/maps?q=Samara,+Aringay,+La+Union,+Philippines&t=&z=14&ie=UTF8&iwloc=&output=embed',
  businessHours: {
    general: 'Open 24 hours daily',
    frontDesk: '24 hours',
    checkIn: '2:00 PM',
    checkOut: '12:00 PM',
    inquiries: '8:00 AM – 8:00 PM',
  },
  disclaimer:
    'Academic Project Note: This website was crafted for a college Hospitality Management project. All room rates (PHP) are sample educational rates for simulation and demonstration purposes.',
};

export const RESORT_IMAGES = {
  hero: heroTropical,
  pool: poolImg,
  beachCabana: beachCabanaImg,
  deluxeRoom: deluxeRoomImg,
  dining: diningPatioImg,
  standardRoom: standardRoomImg,
  familyRoom: familyRoomImg,
  garden: lushGardenImg,
  parking: parkingAreaImg,
  recreation: recreationAreaImg,
  functionHall: functionHallImg,
  sunset: sunsetLaUnionImg,
  entranceSign: entranceSignImg,
  welcomeDrinks: welcomeDrinksImg,
};

export const RESORT_VIDEO_SCENES = [
  {
    timestamp: '00:00',
    title: 'Resort Entrance & Grand Welcome',
    description: 'Rustic carved wooden entrance sign framed by coconut palms and white sands of Samara.',
    image: entranceSignImg,
    tag: 'Entrance',
  },
  {
    timestamp: '00:01',
    title: 'Poolside Leisure & Reading',
    description: 'Tranquil afternoon on teak loungers by the crystal-clear freshwater oasis pool.',
    image: poolImg,
    tag: 'Oasis Pool',
  },
  {
    timestamp: '00:02',
    title: 'Samara Beachfront Stroll',
    description: 'Gentle turquoise tides and powdery shorelines along the quiet coast of Aringay.',
    image: beachCabanaImg,
    tag: 'Beach Walk',
  },
  {
    timestamp: '00:03',
    title: 'Warm Hospitality & Refreshments',
    description: 'Attentive resort staff presenting fresh tropical fruit platters and chilled mocktails.',
    image: welcomeDrinksImg,
    tag: 'Hospitality',
  },
  {
    timestamp: '00:04',
    title: 'Golden Sunset over Beachfront Villas',
    description: 'Breathtaking twilight sky as the sun dips into the West Philippine Sea.',
    image: sunsetLaUnionImg,
    tag: 'Sunset',
  },
];

export const ROOMS_DATA: Room[] = [
  {
    id: 'standard-room',
    name: 'Standard Room',
    image: standardRoomImg,
    samplePricePHP: 1500,
    capacityGuests: 2,
    bedConfiguration: '1 Queen Bed or 2 Single Beds',
    roomSize: '22 sq.m',
    view: 'Garden & Courtyard View',
    shortDescription:
      'A cozy, comfortable sanctuary designed for solo travelers or couples seeking a relaxing tropical beach getaway.',
    fullDescription:
      'The Standard Room at Bikini Valley Resort offers a restful haven after a day of beachside leisure in Aringay. Furnished with clean coastal aesthetics, high-speed Wi-Fi, air conditioning, and fresh linens, it combines affordability with quality hospitality.',
    amenities: [
      'Air conditioning',
      'Private bathroom with hot/cold shower',
      'High-speed Wi-Fi',
      '32" Flat-screen television',
      'Complimentary toiletries & towels',
      'Electric kettle with coffee setup',
      'Work/vanity desk & mirror',
      'Daily housekeeping',
    ],
  },
  {
    id: 'deluxe-room',
    name: 'Deluxe Room',
    image: deluxeRoomImg,
    samplePricePHP: 2500,
    capacityGuests: 3,
    bedConfiguration: '1 King Bed + 1 Cozy Daybed',
    roomSize: '32 sq.m',
    view: 'Private Balcony with Coastal View',
    popular: true,
    shortDescription:
      'An upgraded tropical retreat featuring a private balcony to take in the soothing coastal breeze of La Union.',
    fullDescription:
      'Wake up to the sound of gentle waves and palm trees rustling outside. The Deluxe Room features an expansive private balcony, plush king-size bedding, smart television entertainment, mini-fridge, and woven artisanal furniture reflecting local craftsmanship.',
    amenities: [
      'Air conditioning',
      'Private bathroom with rainfall shower',
      'High-speed Wi-Fi',
      '43" Smart TV with streaming capability',
      'Private balcony with patio seating',
      'Mini-refrigerator & drink chiller',
      'Electric kettle with artisan coffee/tea',
      'Plush bathrobes & premium toiletries',
      'Electronic safe box',
    ],
  },
  {
    id: 'family-room',
    name: 'Family Room',
    image: familyRoomImg,
    samplePricePHP: 4000,
    capacityGuests: 6,
    bedConfiguration: '2 Queen Beds + 1 Daybed / Rollaway',
    roomSize: '48 sq.m',
    view: 'Garden & Pool View',
    shortDescription:
      'A generous, sunlit family suite crafted for memorable vacations, group outings, and barkada getaways in Samara.',
    fullDescription:
      'Designed with spacious living areas and flexible bedding arrangements, our Family Room ensures every family member stays comfortable. Enjoy ample floor area, a seating lounge, dual air-conditioning units, and easy access to both the swimming pool and beach trail.',
    amenities: [
      'Dual air conditioning units',
      'Spacious private bathroom with double vanity',
      'High-speed Wi-Fi',
      '50" Smart TV for family movie nights',
      'Spacious sleeping and seating area',
      'Mini-bar & compact refrigerator',
      'Dining nook with electric kettle & mugs',
      'Generous wardrobe and luggage racks',
      'Complimentary extra pillows upon request',
    ],
  },
];

export const FACILITIES_DATA: Facility[] = [
  {
    id: 'swimming-pool',
    title: 'Swimming Pool',
    image: poolImg,
    caption: 'Crystal-clear oasis pool surrounded by swaying palms and sun loungers.',
    shortDescription:
      'Our refreshing freshwater swimming pool is the centerpiece of relaxation at Bikini Valley Resort.',
    fullDescription:
      'Designed with both a 4-foot swimming section and a shallow kiddie wading ledge, our pool offers safe recreation for the whole family. Relax on comfortable wooden sun loungers under white parasols while sipping freshly made tropical coolers.',
    hours: '6:00 AM – 10:00 PM Daily',
    features: ['Adult swim area (4.5 ft depth)', 'Kiddie wading ledge (2 ft)', 'Sun loungers & shaded parasols', 'Poolside towel service'],
  },
  {
    id: 'restaurant',
    title: 'Restaurant',
    image: diningPatioImg,
    caption: 'Open-air coastal dining offering authentic Filipino dishes and fresh seafood.',
    shortDescription:
      'Savor authentic Ilokano specialties, fresh catch from local coastal fishermen, and refreshing fruit shakes.',
    fullDescription:
      'Our open-air restaurant celebrates coastal La Union hospitality. Enjoy fresh Pinakbet, crispy Bagnet, Sinigang na Isda, grilled squid, and chilled mango shakes while ocean breezes drift across your table.',
    hours: '7:00 AM – 9:30 PM Daily (Breakfast, Lunch, Dinner)',
    features: ['Authentic Filipino & Ilokano menu', 'Fresh seafood specials', 'Fresh tropical fruit shakes & bar', 'Al fresco beachfront seating'],
  },
  {
    id: 'garden',
    title: 'Garden',
    image: lushGardenImg,
    caption: 'Lush tropical flora, native flowering shrubs, and quiet stone pathways.',
    shortDescription:
      'A landscaped sanctuary of bougainvillea, indigenous palms, and peaceful shaded sitting nooks.',
    fullDescription:
      'Stroll along stone-paved walkways flanked by native tropical greenery and blossoming floral gardens. It is the perfect place for morning meditation, reading under a bamboo arbor, or snapping memorable holiday photos.',
    hours: 'Open 24 Hours Daily',
    features: ['Stone meditation walkways', 'Native bamboo gazebos', 'Shaded hammock nooks', 'Nighttime lantern illumination'],
  },
  {
    id: 'beach-area',
    title: 'Beach Area',
    image: beachCabanaImg,
    caption: 'Direct steps to the tranquil Samara coastline with private beach cabanas.',
    shortDescription:
      'Unwind on the pristine shores of Aringay with front-row seats to spectacular sunset skies.',
    fullDescription:
      'Unlike overcrowded tourist beaches, the Samara beachfront in Aringay retains its peaceful, authentic coastal charm. Guests enjoy private cabanas, beach loungers, evening bonfires upon request, and calm tides ideal for wading.',
    hours: 'Open 24 Hours (Lifeguard on duty 8:00 AM – 6:00 PM)',
    features: ['Direct beach access', 'Shaded bamboo cabanas', 'Sunset viewing platforms', 'Beach volleyball area'],
  },
  {
    id: 'parking-area',
    title: 'Parking Area',
    image: parkingAreaImg,
    caption: 'Complimentary, secure, and gated on-site guest parking facility.',
    shortDescription:
      'Convenient parking space for private vehicles, family vans, and motorcycles with 24/7 security.',
    fullDescription:
      'Travel with peace of mind. Bikini Valley Resort provides generous, paved on-premise parking spaces protected by gated entry, night lighting, and continuous staff monitoring.',
    hours: 'Open 24 Hours for Checked-in Guests',
    features: ['Complimentary for all guests', 'Fits cars, SUVs, and vans', 'Well-lit with security post', 'Direct luggage drop-off zone'],
  },
  {
    id: 'recreation-area',
    title: 'Recreation Area',
    image: recreationAreaImg,
    caption: 'Open-air activity pavilion with billiards, board games, and leisure seating.',
    shortDescription:
      'A vibrant communal hub designed for friendly games, acoustic music, and vacation camaraderie.',
    fullDescription:
      'Gather with family and friends in our breezy activity pavilion. Challenge each other to billiards, darts, or traditional Filipino board games like Sungka and chess while enjoying music in a relaxed setting.',
    hours: '8:00 AM – 10:00 PM Daily',
    features: ['Standard billiards pool table', 'Darts & board games collection', 'Acoustic guitar corner', 'Lounge seating & charging ports'],
  },
  {
    id: 'function-hall',
    title: 'Function Hall',
    image: functionHallImg,
    caption: 'Multi-purpose event venue for banquets, reunions, seminars, and beach celebrations.',
    shortDescription:
      'A versatile event space accommodating up to 120 guests with audiovisual support and catering packages.',
    fullDescription:
      'Whether hosting a milestone family birthday, alumni reunion, school seminar, or beachside wedding reception, our Function Hall offers flexible configurations, stage lighting, sound system, and tailored catering.',
    hours: 'Available by reservation (8:00 AM – 11:00 PM)',
    features: ['Capacity up to 120 guests', 'Full PA sound system & projector', 'Custom banquet dining setup', 'Air-conditioned or open-breeze modes'],
  },
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'g-hero',
    title: 'Bikini Valley Coastline',
    category: 'beach-pool',
    categoryLabel: 'Beach & Pool',
    image: heroTropical,
    caption: 'Golden afternoon view of the beachfront sanctuary at Bikini Valley Resort in Samara, Aringay.',
    location: 'Beachfront Shoreline',
  },
  {
    id: 'g-pool',
    title: 'Resort Oasis Swimming Pool',
    category: 'beach-pool',
    categoryLabel: 'Beach & Pool',
    image: poolImg,
    caption: 'Sparkling freshwater pool flanked by tropical palms and comfortable relaxation loungers.',
    location: 'Central Pool Deck',
  },
  {
    id: 'g-cabana',
    title: 'Private Beach Gazebo Cabana',
    category: 'beach-pool',
    categoryLabel: 'Beach & Pool',
    image: beachCabanaImg,
    caption: 'Tranquil open-air bamboo cabana with sheer curtains overlooking the tranquil waves.',
    location: 'Samara Beachfront',
  },
  {
    id: 'g-deluxe',
    title: 'Deluxe Room Interior & Balcony',
    category: 'rooms',
    categoryLabel: 'Accommodations',
    image: deluxeRoomImg,
    caption: 'Elegantly appointed bedroom with plush king bed and private sliding glass balcony doors.',
    location: 'Upper Floor Deluxe Wing',
  },
  {
    id: 'g-standard',
    title: 'Standard Room Comfort',
    category: 'rooms',
    categoryLabel: 'Accommodations',
    image: standardRoomImg,
    caption: 'Clean, serene standard accommodation with modern amenities and tropical accents.',
    location: 'Garden Wing',
  },
  {
    id: 'g-family',
    title: 'Family Suite Accommodation',
    category: 'rooms',
    categoryLabel: 'Accommodations',
    image: familyRoomImg,
    caption: 'Spacious sleeping arrangements for up to 6 guests with sitting lounge and entertainment.',
    location: 'Family Villa Wing',
  },
  {
    id: 'g-dining',
    title: 'Al Fresco Seaside Dining',
    category: 'dining-garden',
    categoryLabel: 'Dining & Garden',
    image: diningPatioImg,
    caption: 'Seaside dining patio glowing under woven lanterns with fresh fruit shakes and local fare.',
    location: 'Resort Restaurant',
  },
  {
    id: 'g-garden',
    title: 'Lush Tropical Garden Walkways',
    category: 'dining-garden',
    categoryLabel: 'Dining & Garden',
    image: lushGardenImg,
    caption: 'Winding stone paths enveloped by blooming bougainvillea, native palms, and shaded benches.',
    location: 'Resort Botanical Grounds',
  },
  {
    id: 'g-sunset',
    title: 'La Union Golden Sunset',
    category: 'moments',
    categoryLabel: 'Moments & Sunset',
    image: sunsetLaUnionImg,
    caption: 'Spectacular sunset over the Lingayen Gulf / West Philippine Sea coast from our beach.',
    location: 'Samara Coastline',
  },
  {
    id: 'g-recreation',
    title: 'Activity & Recreation Pavilion',
    category: 'moments',
    categoryLabel: 'Moments & Sunset',
    image: recreationAreaImg,
    caption: 'Billiards and games pavilion where families unwind in the afternoon shade.',
    location: 'Recreation Center',
  },
  {
    id: 'g-function',
    title: 'Celebration Banquet Venue',
    category: 'moments',
    categoryLabel: 'Moments & Sunset',
    image: functionHallImg,
    caption: 'Elegantly decorated banquet function hall prepared for private gatherings and events.',
    location: 'Banquet Hall',
  },
  {
    id: 'g-parking',
    title: 'Gated On-site Parking',
    category: 'moments',
    categoryLabel: 'Moments & Sunset',
    image: parkingAreaImg,
    caption: 'Secure, clean guest parking lot shaded by palm trees with 24/7 staff monitoring.',
    location: 'Resort Entrance Gate',
  },
  {
    id: 'g-entrance',
    title: 'Resort Entrance Signboard',
    category: 'beach-pool',
    categoryLabel: 'Beach & Pool',
    image: entranceSignImg,
    caption: 'Carved wooden entrance sign welcoming guests to Bikini Valley Resort in Samara, Aringay.',
    location: 'Main Beachfront Entrance',
  },
  {
    id: 'g-welcome-drinks',
    title: 'Tropical Welcome Refreshments',
    category: 'dining-garden',
    categoryLabel: 'Dining & Garden',
    image: welcomeDrinksImg,
    caption: 'Fresh tropical fruit platter and signature iced coolers served by our hospitality team.',
    location: 'Patio Dining & Lounge',
  },
];

export const WHY_CHOOSE_US = [
  {
    title: 'Unspoiled Beachfront Serenity',
    description:
      'Escape the noisy crowds. Samara Beach in Aringay offers genuine coastal tranquility with peaceful tides and pristine golden sunsets.',
    highlight: 'Peaceful Coastal Haven',
  },
  {
    title: 'Warm Ilokano Hospitality',
    description:
      'Experience the heartfelt care of our local staff, dedicated to making your stay as relaxing and welcoming as home.',
    highlight: 'Attentive 24/7 Care',
  },
  {
    title: 'Value-Rich Accommodations',
    description:
      'From cozy solo standard rooms to expansive family suites, our rooms offer comfortable air conditioning, hot showers, and Wi-Fi.',
    highlight: 'Affordable Comfort',
  },
  {
    title: 'Delicious Coastal Cuisine',
    description:
      'Savor authentic local favorites and fresh seafood caught by local coastal fishermen, paired with chilled tropical shakes.',
    highlight: 'Fresh Flavors',
  },
];

export const PHOTO_CREDITS = [
  {
    role: 'Visual Assets & Concept',
    detail: 'Generated high-fidelity architectural renders & AI visual assets tailored for Bikini Valley Resort simulation.',
  },
  {
    role: 'Academic Context',
    detail: 'College Hospitality Management Project representation. All photography and simulated rates are for academic presentation.',
  },
];
