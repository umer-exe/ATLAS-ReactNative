import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  serverTimestamp,
  setDoc,
  writeBatch,
} from 'firebase/firestore';

import {
  destinationTitles,
  formatPrice,
  getTourGallerySources,
  getTourImageSource,
  tourDepartureDates,
  tourReviews,
  toursData,
} from '../data/toursData';
import { firebaseSetupMessage, firestoreDb, isFirebaseConfigured } from './firebaseConfig';

const SEED_VERSION = `atlas-tours-${new Date().toISOString().slice(0, 10)}`;

let seedPromise = null;

const assertFirebaseReady = () => {
  if (!isFirebaseConfigured || !firestoreDb) {
    throw new Error(firebaseSetupMessage);
  }
};

const normalizeNumber = (value) => {
  if (value === '' || value === null || value === undefined) {
    return null;
  }

  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
};

const hydrateTour = (tour) => {
  if (!tour) {
    return null;
  }

  const price = Number(tour.price);
  const imageName = tour.imageName;

  return {
    ...tour,
    price,
    formattedPrice: formatPrice(price),
    images: {
      imageName,
      thumbnail: getTourImageSource(imageName),
      hero: getTourImageSource(imageName),
      gallery: getTourGallerySources(tour.slug, imageName),
    },
  };
};

const hydrateReview = (review, tourTitle) => ({
  id: review.id,
  name: review.name,
  location: review.location,
  rating: review.rating,
  quote: review.quote,
  trip: tourTitle,
});

const sortTours = (a, b) => {
  if (a.featured !== b.featured) {
    return Number(b.featured) - Number(a.featured);
  }

  return Number(a.id) - Number(b.id);
};

export const seedFirestoreIfNeeded = async () => {
  assertFirebaseReady();

  if (!seedPromise) {
    seedPromise = (async () => {
      const metaRef = doc(firestoreDb, 'app_meta', 'seed');
      const metaSnap = await getDoc(metaRef);

      if (metaSnap.exists() && metaSnap.data().version === SEED_VERSION) {
        return;
      }

      const batch = writeBatch(firestoreDb);

      toursData.forEach((tour) => {
        const departureDates = tourDepartureDates
          .filter((date) => date.tourSlug === tour.slug)
          .map(({ id, date, seatsAvailable }) => ({ id, date, seatsAvailable }));
        const reviews = tourReviews
          .filter((review) => review.tourSlug === tour.slug)
          .map(({ id, name, location, rating, quote }) => ({ id, name, location, rating, quote }));

        batch.set(doc(firestoreDb, 'tours', tour.slug), {
          ...tour,
          departureDates,
          reviews,
          updatedAt: serverTimestamp(),
        });
      });

      batch.set(metaRef, {
        version: SEED_VERSION,
        seededAt: serverTimestamp(),
      });

      await batch.commit();
    })();
  }

  return seedPromise;
};

export const getTours = async (filters = {}) => {
  await seedFirestoreIfNeeded();

  const snapshot = await getDocs(collection(firestoreDb, 'tours'));
  let tours = snapshot.docs.map((tourDoc) => hydrateTour(tourDoc.data())).sort(sortTours);

  if (filters.selectedType && filters.selectedType !== 'all') {
    tours = tours.filter((tour) => tour.type === filters.selectedType);
  }

  const searchValue = filters.destinationQuery?.trim().toLowerCase();

  if (searchValue) {
    tours = tours.filter(
      (tour) =>
        tour.title.toLowerCase().includes(searchValue) ||
        tour.location.toLowerCase().includes(searchValue)
    );
  }

  const minPrice = normalizeNumber(filters.minPrice);
  const maxPrice = normalizeNumber(filters.maxPrice);

  if (minPrice !== null) {
    tours = tours.filter((tour) => tour.price >= minPrice);
  }

  if (maxPrice !== null) {
    tours = tours.filter((tour) => tour.price <= maxPrice);
  }

  return tours;
};

export const getFeaturedTours = async () => {
  const tours = await getTours();
  return tours.filter((tour) => tour.featured);
};

export const getDestinations = async () => {
  const tours = await getFeaturedTours();

  return tours.slice(0, 4).map((tour) => ({
    id: tour.slug,
    title: destinationTitles[tour.slug] ?? tour.title,
    location: tour.location,
    imageName: tour.imageName,
    image: getTourImageSource(tour.imageName),
  }));
};

export const getTourBySlug = async (slug) => {
  await seedFirestoreIfNeeded();

  const tourSnap = await getDoc(doc(firestoreDb, 'tours', slug));

  return tourSnap.exists() ? hydrateTour(tourSnap.data()) : null;
};

export const getDepartureDates = async (slug) => {
  const tour = await getTourBySlug(slug);
  return [...(tour?.departureDates ?? [])].sort((a, b) => a.date.localeCompare(b.date));
};

export const getTourReviews = async (slug) => {
  const tour = await getTourBySlug(slug);
  return (tour?.reviews ?? []).map((review) => hydrateReview(review, tour.title));
};

export const getHomeReviews = async () => {
  const tours = await getTours();

  return tours
    .flatMap((tour) => (tour.reviews ?? []).map((review) => hydrateReview(review, tour.title)))
    .slice(0, 5);
};

const buildOrderNumber = () => {
  const timestamp = Date.now().toString().slice(-8);
  const suffix = Math.floor(100 + Math.random() * 900);
  return `AT-${timestamp}-${suffix}`;
};

const hydrateOrder = (order) => ({
  id: order.orderNumber,
  orderNumber: order.orderNumber,
  createdAt: order.createdAtIso,
  totalAmount: Number(order.totalAmount),
  formattedTotal: formatPrice(order.totalAmount),
  paymentMethod: order.paymentMethod,
  customerInfo: order.customerInfo,
  items: (order.items ?? []).map((item) => ({
    ...item,
    image: getTourImageSource(item.imageName),
    unitPrice: Number(item.unitPrice),
    formattedUnitPrice: formatPrice(item.unitPrice),
    lineTotal: Number(item.lineTotal),
    formattedLineTotal: formatPrice(item.lineTotal),
  })),
});

export const createOrder = async ({ customerInfo, paymentMethod, items }) => {
  await seedFirestoreIfNeeded();

  if (!items.length) {
    throw new Error('Cart is empty.');
  }

  const orderNumber = buildOrderNumber();
  const createdAtIso = new Date().toISOString();
  const orderItems = items.map((item, index) => {
    const travelers = Math.max(1, Number(item.travelers) || 1);
    const unitPrice = Number(item.price);

    return {
      id: `${orderNumber}-${index + 1}`,
      orderNumber,
      tourId: item.tourId,
      tourSlug: item.tourSlug,
      title: item.title,
      location: item.location,
      duration: item.duration,
      type: item.type,
      imageName: item.imageName,
      departureDate: item.departureDate,
      travelers,
      unitPrice,
      lineTotal: unitPrice * travelers,
    };
  });
  const totalAmount = orderItems.reduce((sum, item) => sum + item.lineTotal, 0);
  const orderPayload = {
    orderNumber,
    customerInfo: {
      firstName: customerInfo.firstName.trim(),
      lastName: customerInfo.lastName.trim(),
      email: customerInfo.email.trim(),
      phone: customerInfo.phone.trim(),
      address: customerInfo.address.trim(),
      city: customerInfo.city.trim(),
      country: customerInfo.country.trim(),
    },
    paymentMethod,
    totalAmount,
    createdAt: serverTimestamp(),
    createdAtIso,
    items: orderItems,
  };

  const batch = writeBatch(firestoreDb);

  batch.set(doc(firestoreDb, 'orders', orderNumber), orderPayload);
  orderItems.forEach((item) => {
    batch.set(doc(firestoreDb, 'order_items', item.id), {
      ...item,
      createdAt: serverTimestamp(),
      createdAtIso,
    });
  });

  await batch.commit();

  const savedOrder = await getOrderByNumber(orderNumber);

  if (!savedOrder || savedOrder.items.length !== items.length) {
    throw new Error('Order was not saved correctly. Please try again.');
  }

  return { orderId: orderNumber, orderNumber };
};

export const getOrderByNumber = async (orderNumber) => {
  await seedFirestoreIfNeeded();

  const orderSnap = await getDoc(doc(firestoreDb, 'orders', orderNumber));

  return orderSnap.exists() ? hydrateOrder(orderSnap.data()) : null;
};

export const createContactMessage = async ({ fullName, email, phone, subject, message }) => {
  assertFirebaseReady();

  const createdAtIso = new Date().toISOString();
  const contactMessage = {
    fullName: fullName.trim(),
    email: email.trim(),
    phone: phone.trim(),
    subject: subject.trim() || 'General inquiry',
    message: message.trim(),
    status: 'new',
    createdAt: serverTimestamp(),
    createdAtIso,
  };

  const messageRef = await addDoc(collection(firestoreDb, 'contact_messages'), contactMessage);

  return { messageId: messageRef.id };
};
