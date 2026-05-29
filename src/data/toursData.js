const tourImageSources = {
  'coast.jpg': require('../../assets/images/tours/coast.jpg'),
  'dubai.jpg': require('../../assets/images/tours/dubai.jpg'),
  'europe.jpg': require('../../assets/images/tours/europe.jpg'),
  'japan.jpg': require('../../assets/images/tours/japan.jpg'),
  'lahore.jpg': require('../../assets/images/tours/lahore.jpg'),
  'pakistan.jpg': require('../../assets/images/tours/pakistan.jpg'),
  'swat.jpg': require('../../assets/images/tours/swat.jpg'),
  'thailand.jpg': require('../../assets/images/tours/thailand.jpg'),
};

const galleryImageSources = {
  'coastal-pakistan-escape': [
    require('../../assets/images/gallery/coast-1.jpg'),
    require('../../assets/images/gallery/coast-2.jpg'),
    require('../../assets/images/gallery/coast-3.jpg'),
    require('../../assets/images/gallery/coast-4.jpg'),
  ],
  'discover-japan': [
    require('../../assets/images/gallery/japan-1.jpg'),
    require('../../assets/images/gallery/japan-2.jpg'),
    require('../../assets/images/gallery/japan-3.jpg'),
    require('../../assets/images/gallery/japan-4.jpg'),
  ],
  'dubai-extravaganza': [
    require('../../assets/images/gallery/dubai-1.jpg'),
    require('../../assets/images/gallery/dubai-2.jpg'),
    require('../../assets/images/gallery/dubai-3.jpg'),
    require('../../assets/images/gallery/dubai-4.jpg'),
  ],
  'european-highlights': [
    require('../../assets/images/gallery/europe-1.jpg'),
    require('../../assets/images/gallery/europe-2.jpg'),
    require('../../assets/images/gallery/europe-3.jpg'),
    require('../../assets/images/gallery/europe-4.jpg'),
  ],
  'lahore-heritage-tour': [
    require('../../assets/images/gallery/lahore-1.jpg'),
    require('../../assets/images/gallery/lahore-2.jpg'),
    require('../../assets/images/gallery/lahore-3.jpg'),
    require('../../assets/images/gallery/lahore-4.jpg'),
  ],
  'northern-pakistan': [
    require('../../assets/images/gallery/pakistan-1.jpg'),
    require('../../assets/images/gallery/pakistan-2.jpg'),
    require('../../assets/images/gallery/pakistan-3.jpg'),
    require('../../assets/images/gallery/pakistan-4.jpg'),
  ],
  'swat-valley-discovery': [
    require('../../assets/images/gallery/swat-1.jpg'),
    require('../../assets/images/gallery/swat-2.jpg'),
    require('../../assets/images/gallery/swat-3.jpg'),
    require('../../assets/images/gallery/swat-4.jpg'),
  ],
  'thailand-beach-paradise': [
    require('../../assets/images/gallery/thailand-1.jpg'),
    require('../../assets/images/gallery/thailand-2.jpg'),
    require('../../assets/images/gallery/thailand-3.jpg'),
    require('../../assets/images/gallery/thailand-4.jpg'),
  ],
};

const dateOffsetSets = {
  1: [20, 48, 82],
  2: [16, 44, 76],
  3: [35, 70, 105],
  4: [24, 52, 87],
  5: [18, 39, 66],
  6: [12, 29, 50],
  7: [26, 61, 96],
  8: [14, 42, 73],
};

const buildDate = (offsetDays) => {
  const date = new Date();
  date.setDate(date.getDate() + offsetDays);
  return date.toISOString().slice(0, 10);
};

export const toursData = [
  {
    id: 1,
    title: 'Discover Japan',
    slug: 'discover-japan',
    location: 'Tokyo, Kyoto, Osaka',
    duration: '10 Days / 9 Nights',
    price: 18000,
    type: 'international',
    overview:
      'Experience the perfect blend of ancient traditions and modern innovation in Japan. This comprehensive tour takes you through bustling Tokyo, historic Kyoto, and vibrant Osaka.',
    highlights: [
      'Visit iconic Tokyo Tower and Shibuya Crossing',
      'Explore ancient temples in Kyoto',
      'Traditional tea ceremony experience',
      'Mount Fuji day trip',
      'Osaka street food tour',
      'Cherry blossom viewing (seasonal)',
    ],
    featured: true,
    imageName: 'japan.jpg',
  },
  {
    id: 2,
    title: 'Northern Pakistan',
    slug: 'northern-pakistan',
    location: 'Hunza, Skardu, Fairy Meadows',
    duration: '7 Days / 6 Nights',
    price: 899,
    type: 'domestic',
    overview:
      'Embark on an unforgettable journey through the majestic mountains of Northern Pakistan. Experience breathtaking landscapes, warm hospitality, and adventure of a lifetime.',
    highlights: [
      'Visit Hunza Valley and Baltit Fort',
      'Explore Skardu and Shangrila Resort',
      'Trek to Fairy Meadows with Nanga Parbat views',
      'Experience local culture and cuisine',
      'Visit Attabad Lake',
      'Professional mountain guides',
    ],
    featured: true,
    imageName: 'pakistan.jpg',
  },
  {
    id: 3,
    title: 'European Highlights',
    slug: 'european-highlights',
    location: 'Paris, Rome, Barcelona',
    duration: '14 Days / 13 Nights',
    price: 3299,
    type: 'international',
    overview:
      'Discover the best of Europe in this comprehensive tour covering three iconic cities. Experience world-class art, architecture, cuisine, and culture.',
    highlights: [
      'Eiffel Tower and Louvre Museum in Paris',
      'Colosseum and Vatican City in Rome',
      'Sagrada Familia and Park Guell in Barcelona',
      'High-speed train experiences',
      'Guided city tours with local experts',
      'Free time for personal exploration',
    ],
    featured: true,
    imageName: 'europe.jpg',
  },
  {
    id: 4,
    title: 'Thailand Paradise',
    slug: 'thailand-beach-paradise',
    location: 'Phuket, Bangkok, Krabi',
    duration: '8 Days / 7 Nights',
    price: 1799,
    type: 'international',
    overview:
      "Sun-kissed beaches, emerald waters, and buzzing city life. From Bangkok's temples and markets to Phuket's island-hopping and Krabi's limestone cliffs, this is Thailand at its best.",
    highlights: [
      'Grand Palace and Wat Pho in Bangkok',
      'Floating market experience',
      'Phuket island-hopping adventure',
      'Krabi Railay Beach and Ao Nang promenade',
      'Thai cooking class',
      'Evening street food tours',
    ],
    featured: true,
    imageName: 'thailand.jpg',
  },
  {
    id: 5,
    title: 'Dubai Extravaganza',
    slug: 'dubai-extravaganza',
    location: 'Dubai, Abu Dhabi',
    duration: '5 Days / 4 Nights',
    price: 1299,
    type: 'international',
    overview:
      "A showcase of futuristic architecture, desert adventures, and luxury shopping. Discover Dubai's glittering skyline and the cultural gems of Abu Dhabi.",
    highlights: [
      'Burj Khalifa At The Top (non-peak)',
      'Dubai Marina and Palm Jumeirah photo stops',
      'Desert safari with dune bashing and BBQ dinner',
      'Abu Dhabi Sheikh Zayed Grand Mosque',
      'Old Dubai souks and Dubai Creek',
      'Dubai Mall fountain show',
    ],
    featured: false,
    imageName: 'dubai.jpg',
  },
  {
    id: 6,
    title: 'Lahore Heritage Tour',
    slug: 'lahore-heritage-tour',
    location: 'Lahore',
    duration: '3 Days / 2 Nights',
    price: 399,
    type: 'domestic',
    overview:
      'Dive into the cultural capital of Pakistan. Mughal-era monuments, rich cuisine, and vibrant bazaars make Lahore unforgettable.',
    highlights: [
      'Badshahi Mosque and Lahore Fort (Shahi Qila)',
      'Walled City heritage walk and Food Street',
      'Shalimar Gardens and Lahore Museum',
      'Wagah Border flag-lowering ceremony',
      'Anarkali and Liberty market shopping',
    ],
    featured: false,
    imageName: 'lahore.jpg',
  },
  {
    id: 7,
    title: 'Coastal Pakistan Escape',
    slug: 'coastal-pakistan-escape',
    location: 'Karachi, Gwadar, Ormara',
    duration: '5 Days / 4 Nights',
    price: 599,
    type: 'domestic',
    overview:
      "Follow the Makran Coastal Highway to pristine beaches, dramatic cliffs, and starry skies. A laid-back journey across Pakistan's south coast.",
    highlights: [
      'Sunset at Ormara Hammerhead',
      'Kund Malir Beach and Princess of Hope',
      'Gwadar port city viewpoints',
      'Hingol National Park landscapes',
      'Karachi heritage and food tour',
    ],
    featured: false,
    imageName: 'coast.jpg',
  },
  {
    id: 8,
    title: 'Swat Valley Discovery',
    slug: 'swat-valley-discovery',
    location: 'Swat, Kalam, Mahodand',
    duration: '4 Days / 3 Nights',
    price: 499,
    type: 'domestic',
    overview:
      "Lush valleys, rivers, and alpine lakes. Discover Swat's beauty from Mingora to Kalam, with an unforgettable trip to Mahodand Lake (seasonal access).",
    highlights: [
      'Malam Jabba chairlift (seasonal)',
      'Kalam Bazaar and Ushu Forest',
      'Mahodand Lake jeep excursion',
      'Swat Museum and Mingora riverfront',
      'Local trout dinner experience',
    ],
    featured: false,
    imageName: 'swat.jpg',
  },
];

export const tourDepartureDates = toursData.flatMap((tour) =>
  dateOffsetSets[tour.id].map((offset, index) => ({
    id: `${tour.slug}-${index + 1}`,
    tourId: tour.id,
    tourSlug: tour.slug,
    date: buildDate(offset),
    seatsAvailable: 10 + index * 4,
  }))
);

export const tourReviews = [
  {
    id: 1,
    tourSlug: 'discover-japan',
    name: 'Areeba Khan',
    location: 'Lahore',
    rating: 5,
    quote:
      'Atlas Tours made our Japan trip feel organized from day one. The itinerary was packed, but never overwhelming.',
  },
  {
    id: 2,
    tourSlug: 'northern-pakistan',
    name: 'Hamza Ali',
    location: 'Karachi',
    rating: 5,
    quote:
      'Northern Pakistan was the highlight of our summer. The route, hotel choices, and local guidance were all solid.',
  },
  {
    id: 3,
    tourSlug: 'thailand-beach-paradise',
    name: 'Sara Ahmed',
    location: 'Islamabad',
    rating: 5,
    quote:
      'I loved how easy it was to compare destinations and plan around our budget. It felt curated instead of generic.',
  },
  {
    id: 4,
    tourSlug: 'european-highlights',
    name: 'Mariam Shah',
    location: 'Rawalpindi',
    rating: 5,
    quote: 'The Europe tour gave us the big highlights without making the schedule feel confusing.',
  },
  {
    id: 5,
    tourSlug: 'dubai-extravaganza',
    name: 'Usman Raza',
    location: 'Faisalabad',
    rating: 4,
    quote: 'Dubai was smooth, comfortable, and easy to follow from the first pickup to the last day.',
  },
  {
    id: 6,
    tourSlug: 'lahore-heritage-tour',
    name: 'Noor Fatima',
    location: 'Multan',
    rating: 5,
    quote: 'The Lahore heritage route was short, rich, and perfect for a weekend family plan.',
  },
  {
    id: 7,
    tourSlug: 'coastal-pakistan-escape',
    name: 'Bilal Ahmed',
    location: 'Karachi',
    rating: 4,
    quote: 'The coastal trip was relaxed and scenic, with enough time to enjoy each stop.',
  },
  {
    id: 8,
    tourSlug: 'swat-valley-discovery',
    name: 'Hira Malik',
    location: 'Peshawar',
    rating: 5,
    quote: 'Swat Valley felt peaceful, well planned, and very easy to recommend.',
  },
];

export const destinationTitles = {
  'discover-japan': 'Japan',
  'northern-pakistan': 'Northern Pakistan',
  'european-highlights': 'Europe',
  'thailand-beach-paradise': 'Thailand',
};

export const formatPrice = (price) => `$${Number(price).toLocaleString()}`;

export const getTourImageSource = (imageName) => tourImageSources[imageName] ?? tourImageSources['pakistan.jpg'];

export const getTourGallerySources = (slug, imageName) =>
  galleryImageSources[slug] ?? [getTourImageSource(imageName)];

const withImages = (tour) => ({
  ...tour,
  formattedPrice: formatPrice(tour.price),
  images: {
    imageName: tour.imageName,
    thumbnail: getTourImageSource(tour.imageName),
    hero: getTourImageSource(tour.imageName),
    gallery: getTourGallerySources(tour.slug, tour.imageName),
  },
});

export const featuredTours = toursData.filter((tour) => tour.featured).map(withImages);

export const destinationsData = toursData
  .filter((tour) => destinationTitles[tour.slug])
  .map((tour) => ({
    id: tour.slug,
    title: destinationTitles[tour.slug],
    location: tour.location,
    imageName: tour.imageName,
    image: getTourImageSource(tour.imageName),
  }));
