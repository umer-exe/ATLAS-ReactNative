# Atlas Tours Final Project Documentation

## Project Overview

Atlas Tours is a customer-facing mobile travel booking app built with Expo and React Native. The app is a mobile adaptation of an existing Atlas Tours website and focuses on the customer journey: browsing tours, viewing tour details, adding a trip to the cart, completing a simple booking form, receiving an order confirmation, and sending contact messages.

The final version is a polished frontend app with Firebase Cloud Firestore used as the data layer. It does not include admin screens, authentication, real payment processing, maps, push notifications, or a Laravel backend connection.

## Final Scope

Included screens:

- Home
- Tours
- Tour Detail
- Contact
- Cart / Checkout
- Order Confirmation

Excluded from final scope:

- Admin panel
- Login and registration
- User accounts
- Real card payment
- Real map integration
- Push notifications
- SQLite
- Direct Laravel database connection
- Expo Router

## Technology Stack

- Expo SDK 54
- React Native 0.81
- React 19
- JavaScript / JSX
- Manual React Navigation
- Redux Toolkit and React Redux
- Context API
- Firebase JavaScript SDK
- Firebase Cloud Firestore

## Project Setup

### Fresh Computer Setup

Use this checklist when setting up the project on another computer.

Prerequisites:

- Install Node.js LTS.
- Install Git.
- Install Expo Go on the test phone if testing on a physical device.
- Have access to the project GitHub repository.
- Have the Firebase `.env` values from the project owner.

If the project is not cloned yet:

```bash
git clone your-github-repository-url
cd ATLAS-ReactNative
```

If the project is already cloned on that computer, pull the latest work before installing or running:

```bash
git pull
```

### Common Local Commands

Install dependencies:

```bash
npm install
```

Create the local Firebase environment file:

```bash
copy .env.example .env
```

On macOS/Linux, use:

```bash
cp .env.example .env
```

Then fill `.env` with the real Firebase values. The `.env` file is local and should not be shared publicly.

Start the app with a clean cache:

```bash
npx expo start --clear
```

If Expo Go cannot connect over LAN, use tunnel mode:

```bash
npx expo start --tunnel --clear
```

Recommended order on a fresh computer:

1. Clone or pull the latest GitHub version.
2. Run `npm install`.
3. Create and fill `.env`.
4. Run `npx expo start --clear`.
5. Open the app in Expo Go.
6. Check Firebase Console after testing bookings and contact messages.

Install dependencies:

```bash
npm install
```

Start the app:

```bash
npx expo start
```

Start with cache reset:

```bash
npx expo start --clear
```

Run a production-style export check:

```bash
npx expo export --platform web
```

## Firebase Setup

The app uses the Firebase JavaScript SDK and reads Firebase configuration from environment variables.

Create a `.env` file in the project root:

```env
EXPO_PUBLIC_FIREBASE_API_KEY=your_api_key
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
EXPO_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
EXPO_PUBLIC_FIREBASE_APP_ID=your_app_id
```

The config is loaded in:

```text
src/firebase/firebaseConfig.js
```

Firebase data operations are centralized in:

```text
src/firebase/atlasFirebaseApi.js
```

## Firestore Collections

The app uses these Firestore collections:

- `app_meta`
- `tours`
- `orders`
- `order_items`
- `contact_messages`

### `app_meta`

Stores seed metadata so tour data is not repeatedly written every time the app loads.

Document:

```text
app_meta/seed
```

Main fields:

- `version`
- `seededAt`

### `tours`

Stores tour packages shown on Home, Tours, and Tour Detail screens.

Each tour document includes:

- `id`
- `slug`
- `title`
- `location`
- `duration`
- `price`
- `type`
- `overview`
- `highlights`
- `featured`
- `imageName`
- `departureDates`
- `reviews`
- `updatedAt`

### `orders`

Stores confirmed customer bookings.

Each order includes:

- `orderNumber`
- `customerInfo`
- `paymentMethod`
- `totalAmount`
- `createdAt`
- `createdAtIso`
- `items`

### `order_items`

Stores individual booked tour items from each order.

Each item includes:

- `id`
- `orderNumber`
- `tourId`
- `tourSlug`
- `title`
- `location`
- `duration`
- `type`
- `departureDate`
- `travelers`
- `unitPrice`
- `lineTotal`

### `contact_messages`

Stores messages submitted from the Contact screen.

Each contact message includes:

- `fullName`
- `email`
- `phone`
- `subject`
- `message`
- `status`
- `createdAt`
- `createdAtIso`

## Firebase Behavior

When the app first reads tour data, `seedFirestoreIfNeeded()` writes the local tour data from `src/data/toursData.js` into Firestore if the current seed version has not already been saved.

After seeding, the app reads tour data from Firestore rather than directly rendering from the static data file.

Booking data is saved to Firestore when the customer confirms a booking from the Cart screen.

Contact messages are saved to Firestore when the customer submits the Contact form.

## Navigation

The final app uses a minimal navigation structure:

```text
RootNavigator
  NavigationContainer
    AppStackNavigator
      MainTabs
        Home
        Tours
        Contact
      TourDetail
      Cart
      OrderConfirmation
```

Bottom tabs are used for the main screens:

- Home
- Tours
- Contact

Stack navigation is used for:

- Tour Detail
- Cart
- Order Confirmation

Drawer navigation was removed from the final version to keep the interface minimal and avoid the swipe drawer opening from the Home screen.

## Screens

### Home Screen

Purpose:

- Introduces Atlas Tours.
- Shows featured tours.
- Shows destination cards.
- Shows traveler reviews.
- Provides a call-to-action to contact Atlas Tours.

Firebase use:

- Reads featured tours.
- Reads destination data derived from tours.
- Reads home reviews derived from tour review data.

### Tours Screen

Purpose:

- Displays all available tours.
- Allows filtering by tour type.
- Allows searching by destination or title.
- Allows min and max price filtering.
- Navigates to Tour Detail.

Firebase use:

- Reads tour documents from Firestore.
- Applies simple filters in the app after fetching tours.

### Tour Detail Screen

Purpose:

- Shows full details for one tour.
- Displays hero image, overview, gallery, itinerary, highlights, reviews, departure dates, and booking controls.
- Allows adding the selected tour to the cart.

Firebase use:

- Reads a tour by slug.
- Reads departure dates from the tour document.
- Reads reviews from the tour document.

### Contact Screen

Purpose:

- Provides a contact form.
- Displays Atlas Tours contact information.
- Shows common FAQ items.

Firebase use:

- Saves submitted contact messages to the `contact_messages` collection.

### Cart Screen

Purpose:

- Displays selected tours.
- Lets the user adjust traveler quantity.
- Collects customer information.
- Restricts phone input to Pakistani numbers using fixed `+92`.
- Restricts country to Pakistan and provides Pakistani city options.
- Lets the user choose Cash on Delivery or Card on Delivery.
- Confirms the booking.

Firebase use:

- Saves the order to `orders`.
- Saves each booked item to `order_items`.

### Order Confirmation Screen

Purpose:

- Shows saved order details.
- Displays customer information, booked tours, totals, and next steps.

Firebase use:

- Reads order details from the `orders` collection by order number.

## State Management

### Redux

Redux is used for cart and checkout state.

File:

```text
src/store/cartSlice.js
```

Redux stores:

- Cart items
- Added-to-cart flag
- Customer information
- Payment method
- Last order number

Redux is used in:

- Tour Detail screen to add items to the cart.
- Cart screen to read and update cart items.
- Order Confirmation screen to access the last order number if needed.

### Context API

Context API is used for shared app branding and support information.

File:

```text
src/context/ThemeContext.jsx
```

Shared values:

- Brand name
- Support phone
- Support email
- Footer links text

## UI Design

The app uses a clean travel booking style inspired by the Atlas Tours website:

- Purple and indigo branding
- White cards
- Rounded corners
- Soft shadows
- Travel images
- Simple badges
- Clear forms
- Mobile-first vertical layouts

Reusable UI components are stored in:

```text
src/components/ui/
```

Main reusable UI components:

- `AppScreen`
- `AppCard`
- `AppButton`
- `AppInput`
- `AppBadge`
- `ScreenHeader`
- `ScreenHero`
- `SectionTitle`
- `AppFooter`

## Assets

App image assets are stored under:

```text
assets/images/
```

Main asset groups:

- `assets/images/tours/`
- `assets/images/gallery/`
- `assets/images/destinations/`
- `assets/images/tabs/`

The bottom tab icons use:

- `assets/images/tabs/home.png`
- `assets/images/tabs/tours.png`
- `assets/images/tabs/contact.png`

## Validation

The app includes simple frontend validation:

- Contact form requires name, email, and message.
- Cart checkout requires cart items.
- Checkout requires first name, last name, email, phone, country, and city.
- Phone input accepts only digits after the fixed `+92` prefix.
- Traveler input accepts numeric values only.
- Add to Cart requires a departure date.

## Testing Checklist

Run:

```bash
npx expo start --clear
```

Check:

- App launches in Expo Go.
- Home screen loads Firebase tours and reviews.
- Bottom tabs navigate between Home, Tours, and Contact.
- Tours filter buttons work.
- Tours search and price filters work.
- Tour cards open Tour Detail.
- Departure date selection works.
- Traveler input accepts only numbers.
- Add to Cart works.
- Cart quantity controls work.
- Checkout form accepts valid input.
- Phone field keeps `+92` fixed.
- Country is Pakistan only.
- City list shows Pakistani cities.
- Confirm Booking saves an order.
- Order Confirmation loads the saved order.
- Contact form saves a message to Firestore.
- Firestore shows `orders`, `order_items`, and `contact_messages`.

## Firestore Rule Note

For classroom/demo testing, Firestore rules must allow the required reads and writes. A production app should not use open public write rules. A production-ready version should use authentication, server validation, or a backend/API layer for sensitive customer data.

## Known Limitations

- No real payment gateway.
- No authentication.
- No admin dashboard.
- No production security rules included.
- No push notifications.
- No live map integration.
- Firestore rules must be configured manually in Firebase Console.
- Tour seed data still originates from local static data for course-friendly setup.

## Final Verification

The project was verified with:

```bash
npx.cmd expo export --platform web
```

The export check confirms that the app bundles successfully.
