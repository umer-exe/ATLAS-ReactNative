# Atlas Tours React Native App

Atlas Tours is a customer-facing mobile travel booking app built with Expo and React Native. It is a mobile version of the Atlas Tours travel website experience, focused on browsing tours, viewing tour details, adding tours to a cart, completing a booking, viewing an order confirmation, and sending contact messages.

The final app uses Firebase Cloud Firestore as its data layer. It is designed as a clean course-friendly mobile frontend, not a full production travel platform.

## Features

- Home screen with featured tours, destinations, reviews, and call-to-action.
- Tours screen with tour type, destination/title, and price filters.
- Tour detail screen with overview, gallery, itinerary, highlights, reviews, dates, and add-to-cart flow.
- Cart and checkout screen with quantity controls and customer information.
- Fixed `+92` phone number input for Pakistan-based checkout/contact forms.
- Email validation for `.com` addresses such as Gmail, Yahoo, and Hotmail.
- Pakistan-only country selection with Pakistani city options.
- Order confirmation screen that loads saved booking details.
- Contact form that saves messages to Firebase.
- Bottom tab navigation for Home, Tours, and Contact.
- Stack navigation for Tour Detail, Cart, and Order Confirmation.
- Redux Toolkit for cart state.
- Context API for shared brand/support details.
- Firebase Cloud Firestore for tours, orders, order items, and contact messages.

## Tech Stack

- Expo SDK 54
- React Native 0.81
- React 19
- JavaScript / JSX
- React Navigation
- Redux Toolkit
- React Redux
- Firebase JavaScript SDK
- Cloud Firestore

## Project Scope

Included:

- Home
- Tours
- Tour Detail
- Contact
- Cart / Checkout
- Order Confirmation

Not included:

- Admin panel
- Login/register
- User accounts
- Real online payment
- Push notifications
- Maps
- SQLite
- Direct Laravel or backend database connection
- Expo Router

## Fresh Setup On Another Computer

### 1. Install Prerequisites

Install:

- Node.js LTS
- Git
- Expo Go on your phone, if testing on a physical device

Optional:

- Android Studio, if testing on an Android emulator

### 2. Clone The Repository

```bash
git clone https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
cd ATLAS-ReactNative
```

Replace `YOUR_USERNAME` and `YOUR_REPO_NAME` with the actual GitHub repository details.

If the repository already exists on your computer, pull the latest changes:

```bash
git pull origin main
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Create The Firebase Environment File

Copy the example env file:

Windows PowerShell:

```powershell
copy .env.example .env
```

macOS/Linux:

```bash
cp .env.example .env
```

Then open `.env` and fill in the real Firebase values:

```env
EXPO_PUBLIC_FIREBASE_API_KEY=your_api_key
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
EXPO_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
EXPO_PUBLIC_FIREBASE_APP_ID=your_app_id
```

Important:

- `.env` is local and should not be pushed to GitHub.
- `.env.example` should stay in the repo so others know which values are needed.

### 5. Start The App

```bash
npx expo start --clear
```

Scan the QR code with Expo Go.

If Expo Go cannot connect through LAN, use tunnel mode:

```bash
npx expo start --tunnel --clear
```

## Available Commands

Start Expo:

```bash
npm start
```

Start Android:

```bash
npm run android
```

Start iOS:

```bash
npm run ios
```

Start web:

```bash
npm run web
```

Run export/build verification:

```bash
npx expo export --platform web
```

## Firebase Setup

This app uses Firebase Cloud Firestore through the Firebase JavaScript SDK.

Firebase config is loaded from:

```text
src/firebase/firebaseConfig.js
```

Firebase database operations are centralized in:

```text
src/firebase/atlasFirebaseApi.js
```

Firestore collections used:

- `app_meta`
- `tours`
- `orders`
- `order_items`
- `contact_messages`

### Firestore Data Flow

- Tour data is seeded from local static data into Firestore.
- Home, Tours, and Tour Detail screens read tour data from Firestore.
- Cart checkout saves bookings to `orders` and `order_items`.
- Contact form submissions save to `contact_messages`.

### Firestore Rules Note

For testing or classroom demos, Firestore rules must allow the app to read tours and create orders/contact messages.

Do not use open public write rules in a production app. A production-ready version should use authentication, stricter rules, or a backend API.

## Project Structure

```text
ATLAS-ReactNative/
  assets/
    images/
      destinations/
      gallery/
      tabs/
      tours/

  docs/
    FINAL_PROJECT_DOCUMENTATION.md
    FINAL_PROJECT_DOCUMENTATION.docx
    PROJECT_STRUCTURE_INTERNAL.md

  src/
    components/
      contact/
      home/
      tours/
      ui/

    context/
      ThemeContext.jsx

    data/
      faqData.js
      testimonialsData.js
      toursData.js

    firebase/
      atlasFirebaseApi.js
      firebaseConfig.js

    navigation/
      AppStackNavigator.jsx
      RootNavigator.jsx
      TabNavigator.jsx

    screens/
      CartScreen.jsx
      ContactScreen.jsx
      HomeScreen.jsx
      OrderConfirmationScreen.jsx
      TourDetailScreen.jsx
      ToursScreen.jsx

    store/
      cartSlice.js
      store.js

    styles/
      colors.js
      spacing.js

    utils/
      validation.js

  App.jsx
  index.js
  package.json
```

## Main Folder Explanation

### `assets/`

Contains app images:

- Tour images
- Gallery images
- Destination images
- Bottom tab icons

### `src/components/`

Reusable UI and feature components.

Important reusable UI components:

- `AppScreen`
- `AppCard`
- `AppButton`
- `AppInput`
- `PhoneNumberInput`
- `AppBadge`
- `ScreenHeader`
- `ScreenHero`
- `SectionTitle`
- `AppFooter`

### `src/screens/`

Contains full app screens:

- Home
- Tours
- Tour Detail
- Contact
- Cart
- Order Confirmation

### `src/navigation/`

Contains the final navigation setup:

- `RootNavigator.jsx` creates the main `NavigationContainer`.
- `AppStackNavigator.jsx` manages stack screens.
- `TabNavigator.jsx` manages bottom tabs.

Drawer navigation has been removed to keep the UI minimal.

### `src/firebase/`

Contains Firebase setup and Firestore functions.

- `firebaseConfig.js` initializes Firebase.
- `atlasFirebaseApi.js` reads/writes Firestore data.

### `src/store/`

Contains Redux Toolkit setup for cart and checkout state.

### `src/context/`

Contains shared app branding and support information.

### `src/data/`

Contains static app-ready seed data and image mapping helpers.

Even though Firebase is the app data layer, this folder is still used to seed Firestore and map image names to bundled React Native assets.

### `src/utils/`

Contains shared helper logic such as email validation.

## How The App Works

### Tour Flow

```text
Home/Tours screen
  -> Firebase API
  -> Firestore tours collection
  -> hydrated tour objects
  -> Tour cards
  -> Tour Detail screen
```

### Cart Flow

```text
Tour Detail
  -> Add to Cart
  -> Redux cart state
  -> Cart screen
  -> Confirm Booking
  -> Firestore orders/order_items
  -> Order Confirmation
```

### Contact Flow

```text
Contact screen
  -> Validate form
  -> Save message
  -> Firestore contact_messages
```

## Testing Checklist

After setup, test:

- App launches in Expo Go.
- Home loads featured tours and reviews.
- Bottom tabs work.
- Tours filters work.
- Tour Detail opens from tour cards.
- Departure date selection works.
- Traveler input only accepts numbers.
- Add to Cart works.
- Cart quantity controls work.
- Phone field keeps `+92` fixed.
- Email validation rejects invalid email addresses.
- Country is Pakistan only.
- City options display properly.
- Confirm Booking saves an order.
- Order Confirmation loads saved order details.
- Contact form saves a message to Firebase.

## GitHub Workflow

Before pushing:

```bash
npx expo export --platform web
git status
```

Make sure these are not committed:

```text
.env
node_modules/
.expo/
dist/
```

Commit and push:

```bash
git add .
git commit -m "Finalize Atlas Tours React Native app"
git push origin main
```

On another computer:

```bash
git pull origin main
npm install
npx expo start --clear
```

## Documentation

Additional documentation is available in:

```text
docs/
```

Main files:

- `FINAL_PROJECT_DOCUMENTATION.md`
- `FINAL_PROJECT_DOCUMENTATION.docx`
- `PROJECT_STRUCTURE_INTERNAL.md`

The internal structure document is intended for project creators and explains how files connect inside the app.

## Notes

- This is a course-friendly mobile frontend project.
- Firebase is used for app data.
- The app does not include production authentication or payment handling.
- Firestore security rules must be configured separately in Firebase Console.

