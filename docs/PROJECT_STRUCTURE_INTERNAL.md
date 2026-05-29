# Atlas Tours Project Structure Internal Guide

This file is for the project creators only. It explains how the final React Native project is organized, what each file does, and how the pieces connect.

## Root Files

### `index.js`

Expo entry file.

It imports `App` from `App.jsx` and registers it with Expo through `registerRootComponent`.

Connection:

- `index.js` starts the app.
- `App.jsx` contains the actual provider and navigation setup.

### `App.jsx`

Top-level React component.

It wraps the app with:

- Redux `Provider`
- `ThemeProvider`
- `RootNavigator`
- Expo `StatusBar`

Connection:

- Imports Redux store from `src/store/store.js`.
- Imports theme provider from `src/context/ThemeContext.jsx`.
- Imports navigation root from `src/navigation/RootNavigator.jsx`.

### `app.json`

Expo configuration file.

Controls:

- App name
- App slug
- Version
- Orientation
- Icons
- Splash screen
- Web favicon

Connection:

- Used by Expo CLI when running or exporting the app.

### `package.json`

Dependency and script file.

Important scripts:

- `npm start`
- `npm run android`
- `npm run ios`
- `npm run web`

Important dependencies:

- Expo
- React
- React Native
- React Navigation
- Redux Toolkit
- React Redux
- Firebase

Connection:

- Defines packages used by all source files.

### `.env`

Local Firebase configuration file.

It is not meant to be shared publicly.

Expected variables:

- `EXPO_PUBLIC_FIREBASE_API_KEY`
- `EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN`
- `EXPO_PUBLIC_FIREBASE_PROJECT_ID`
- `EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET`
- `EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
- `EXPO_PUBLIC_FIREBASE_APP_ID`

Connection:

- Read by `src/firebase/firebaseConfig.js`.

### `.env.example`

Template for required Firebase environment variables.

Connection:

- Helps teammates create their own `.env`.

### `.gitignore`

Lists files and folders Git should ignore.

Examples:

- `node_modules/`
- `.expo/`
- `dist/`
- local env files

Connection:

- Keeps generated files and dependencies out of version control.

## `assets/`

Stores static image assets used by the app.

### `assets/images/tours/`

Tour card and hero images.

Used by:

- `src/data/toursData.js`
- `src/components/tours/TourCard.jsx`
- `src/screens/TourDetailScreen.jsx`
- `src/screens/CartScreen.jsx`
- `src/screens/OrderConfirmationScreen.jsx`

### `assets/images/gallery/`

Tour detail gallery images.

Used by:

- `src/data/toursData.js`
- `src/screens/TourDetailScreen.jsx`

### `assets/images/destinations/`

Destination images.

Used by:

- `src/data/toursData.js`
- `src/components/tours/DestinationCard.jsx`
- `src/screens/HomeScreen.jsx`

### `assets/images/tabs/`

Bottom tab icon images.

Files:

- `home.png`
- `tours.png`
- `contact.png`

Used by:

- `src/navigation/TabNavigator.jsx`

## `src/navigation/`

Contains all navigation setup.

### `RootNavigator.jsx`

Creates the single `NavigationContainer`.

Connection:

- Imported by `App.jsx`.
- Renders `AppStackNavigator`.

Why it exists:

- Keeps the navigation container in one place.

### `AppStackNavigator.jsx`

Creates the main stack navigator.

Stack screens:

- `MainTabs`
- `TourDetail`
- `Cart`
- `OrderConfirmation`

Connection:

- Imports `TabNavigator`.
- Imports `TourDetailScreen`.
- Imports `CartScreen`.
- Imports `OrderConfirmationScreen`.

Why it exists:

- Lets tab screens open detail and checkout screens above the tab layout.

### `TabNavigator.jsx`

Creates bottom tab navigation.

Tabs:

- Home
- Tours
- Contact

Connection:

- Imports `HomeScreen`.
- Imports `ToursScreen`.
- Imports `ContactScreen`.
- Imports tab icons from `assets/images/tabs/`.
- Used by `AppStackNavigator`.

Why it exists:

- Gives the app a simple mobile navigation bar.

## `src/screens/`

Contains full app screens.

### `HomeScreen.jsx`

Landing screen.

Shows:

- Header
- Hero
- Featured tours
- Top destinations
- Testimonials
- Contact call-to-action
- Footer

Data flow:

- Calls `getFeaturedTours()`.
- Calls `getDestinations()`.
- Calls `getHomeReviews()`.
- All three come from `src/firebase/atlasFirebaseApi.js`.

Navigation:

- Can open Tours tab.
- Can open Contact tab.
- Can open Tour Detail through the stack.

Key components used:

- `ScreenHeader`
- `ScreenHero`
- `TourCard`
- `DestinationCard`
- `TestimonialCard`
- `AppFooter`

### `ToursScreen.jsx`

Tour browsing screen.

Shows:

- Header
- Hero
- Tour type filter buttons
- Destination/title search
- Min price field
- Max price field
- Tour list
- Footer

Data flow:

- Calls `getTours(appliedFilters)` from Firebase API.
- Filtering is applied in the API helper after Firestore data is loaded.

Navigation:

- Opens `TourDetail` with a tour slug.

Key components used:

- `TourCard`
- `AppInput`
- `AppButton`
- `AppFooter`

### `TourDetailScreen.jsx`

Single tour detail screen.

Shows:

- Tour hero image
- Badge
- Title
- Location
- Duration
- Price
- Overview
- Gallery
- Booking card
- Itinerary
- Highlights
- Reviews

Data flow:

- Receives `slug` from navigation route params.
- Calls `getTourBySlug(slug)`.
- Calls `getDepartureDates(slug)`.
- Calls `getTourReviews(slug)`.

State:

- Selected departure date
- Traveler count
- Loaded tour details
- Reviews
- Error message

Redux connection:

- Dispatches `addCartItem()` from `cartSlice.js`.

Navigation:

- Navigates to `Cart` after adding a tour.

### `ContactScreen.jsx`

Contact and support screen.

Shows:

- Header
- Hero
- Contact form
- Contact information
- FAQ list
- Footer

Data flow:

- Calls `createContactMessage()` from Firebase API.
- Saves contact messages to Firestore collection `contact_messages`.

State:

- Full name
- Email
- Phone
- Subject
- Message
- Saving flag

Key components used:

- `FAQItem`
- `AppInput`
- `AppButton`
- `AppFooter`

### `CartScreen.jsx`

Checkout screen.

Shows:

- Cart header
- Order summary
- Cart item cards
- Quantity controls
- Customer form
- Phone field with fixed `+92`
- Pakistan-only country option
- Pakistani city options
- Payment method buttons
- Confirm Booking button

Data flow:

- Reads cart state with `useSelector`.
- Saves orders through `createOrder()` from Firebase API.

Redux connection:

- Dispatches `removeCartItem()`.
- Dispatches `updateCartItemTravelers()`.
- Dispatches `setCheckoutDetails()` after saving an order.

Navigation:

- Navigates to `OrderConfirmation` after successful booking.
- Can navigate back to Tours.

### `OrderConfirmationScreen.jsx`

Final confirmation screen.

Shows:

- Confirmation header
- Order number
- Confirmed badge
- Customer details
- Booked tours
- Total amount
- Next steps

Data flow:

- Receives `orderNumber` from navigation route params.
- Falls back to `lastOrderNumber` from Redux if needed.
- Calls `getOrderByNumber(orderNumber)` from Firebase API.

Navigation:

- Can go back to Home.
- Can go back to Tours.

## `src/firebase/`

Contains Firebase setup and database functions.

### `firebaseConfig.js`

Initializes Firebase.

Exports:

- `firebaseConfig`
- `isFirebaseConfigured`
- `firebaseApp`
- `firestoreDb`
- `firebaseSetupMessage`

Connection:

- Reads Firebase values from `.env`.
- Used by `atlasFirebaseApi.js`.

### `atlasFirebaseApi.js`

Central Firebase data layer.

This is the only app API/data access layer.

Main exports:

- `seedFirestoreIfNeeded`
- `getTours`
- `getFeaturedTours`
- `getDestinations`
- `getTourBySlug`
- `getDepartureDates`
- `getTourReviews`
- `getHomeReviews`
- `createOrder`
- `getOrderByNumber`
- `createContactMessage`

Important helper behavior:

- Seeds Firestore with local tour data.
- Hydrates tours with local image references.
- Builds order numbers.
- Saves orders and order items.
- Saves contact messages.

Firestore collections used:

- `app_meta`
- `tours`
- `orders`
- `order_items`
- `contact_messages`

Connection:

- Used by Home, Tours, Tour Detail, Contact, Cart, and Order Confirmation screens.

## `src/store/`

Contains Redux setup.

### `store.js`

Creates the Redux store.

Connection:

- Imported by `App.jsx`.
- Uses `cartSlice.reducer`.

### `cartSlice.js`

Defines cart state and reducers.

State:

- `items`
- `addedToCart`
- `customerInfo`
- `paymentMethod`
- `lastOrderNumber`

Reducers:

- `addCartItem`
- `updateCartItemTravelers`
- `removeCartItem`
- `dismissAddedToCart`
- `setCheckoutDetails`

Connection:

- Used by `TourDetailScreen.jsx`.
- Used by `CartScreen.jsx`.
- Used by `OrderConfirmationScreen.jsx`.

## `src/context/`

Contains shared Context API values.

### `ThemeContext.jsx`

Provides simple shared branding and support data.

Values:

- `brandName`
- `supportPhone`
- `supportEmail`
- `footerLinks`

Connection:

- Used across screens and UI components.

## `src/data/`

Contains local seed/reference data used by the app.

### `toursData.js`

Stores app-ready tour data and image helpers.

Exports:

- `toursData`
- `tourDepartureDates`
- `tourReviews`
- `destinationTitles`
- `formatPrice`
- `getTourImageSource`
- `getTourGallerySources`

Connection:

- Used by Firebase API to seed Firestore.
- Used to map Firestore image names back to local image assets.
- Used by Cart and Confirmation screens for image and price formatting.

Why it still exists:

- Firebase stores simple image names, while React Native needs local `require()` image references.
- This file bridges Firestore data and bundled app assets.

### `faqData.js`

Stores FAQ questions and answers.

Connection:

- Used by `ContactScreen.jsx`.
- Rendered through `FAQItem.jsx`.

### `testimonialsData.js`

Legacy/simple testimonial data.

Connection:

- Kept for app-ready data reference.
- The final Home screen primarily uses reviews loaded through Firebase.

## `src/components/ui/`

Reusable UI building blocks.

### `AppScreen.jsx`

Screen wrapper.

Handles:

- Safe area
- Optional scroll view
- Background color
- Consistent screen layout

Used by:

- All screens.

### `AppCard.jsx`

Reusable card wrapper.

Handles:

- White surface
- Rounded corners
- Border
- Shadow/elevation

Used by:

- Home cards
- Tour cards
- Contact sections
- Cart sections
- Confirmation sections

### `AppButton.jsx`

Reusable button.

Supports:

- Primary variant
- Secondary variant
- Custom styles
- Custom text styles

Used by:

- All screens with actions.

### `AppInput.jsx`

Reusable labeled text input.

Supports:

- Labels
- Placeholders
- Multiline input
- Native TextInput props

Used by:

- Tours filters
- Contact form
- Cart checkout form
- Tour detail traveler input

### `AppBadge.jsx`

Reusable small label badge.

Used for:

- Tour type
- Day labels
- Confirmed status

### `ScreenHeader.jsx`

Top screen header with brand name and page label.

Used by:

- Main screens and confirmation screen.

### `ScreenHero.jsx`

Reusable purple hero section.

Used by:

- Home
- Tours
- Contact

### `SectionTitle.jsx`

Reusable section heading component.

Supports:

- Eyebrow text
- Title
- Subtitle

Used throughout the app.

### `AppFooter.jsx`

Reusable footer section.

Uses:

- Theme context brand and footer text.

## `src/components/tours/`

Tour-specific reusable components.

### `TourCard.jsx`

Displays one tour in a card.

Shows:

- Image
- Badge
- Title
- Location
- Duration
- Price
- View Details button

Connection:

- Used by Home and Tours screens.
- Receives a hydrated tour object from Firebase API.

### `DestinationCard.jsx`

Displays a destination image card.

Shows:

- Destination image
- Overlay
- Title
- Location

Connection:

- Used by Home screen.
- Receives destination objects from `getDestinations()`.

## `src/components/home/`

Home-specific reusable components.

### `TestimonialCard.jsx`

Displays traveler review/testimonial content.

Shows:

- Initials avatar
- Name
- Location
- Star rating
- Quote
- Trip title

Connection:

- Used by Home screen.
- Receives review items from `getHomeReviews()`.

## `src/components/contact/`

Contact-specific reusable components.

### `FAQItem.jsx`

Displays a single FAQ item.

Shows:

- Question
- Answer

Connection:

- Used by Contact screen.
- Receives data from `faqData.js`.

## `src/styles/`

Shared style constants.

### `colors.js`

Central color palette.

Used by:

- Screens
- Components
- Tab navigator

### `spacing.js`

Central spacing scale.

Used by:

- Screens
- Components

## Data Flow Summary

### Tour browsing flow

```text
HomeScreen / ToursScreen
  -> atlasFirebaseApi.js
  -> Firestore tours collection
  -> hydrate with toursData image helpers
  -> TourCard / DestinationCard / TestimonialCard
```

### Tour detail and cart flow

```text
TourCard press
  -> navigation to TourDetail with slug
  -> getTourBySlug()
  -> user selects date and travelers
  -> addCartItem()
  -> CartScreen reads Redux state
```

### Checkout flow

```text
CartScreen
  -> createOrder()
  -> Firestore orders collection
  -> Firestore order_items collection
  -> setCheckoutDetails()
  -> OrderConfirmationScreen
  -> getOrderByNumber()
```

### Contact flow

```text
ContactScreen
  -> createContactMessage()
  -> Firestore contact_messages collection
```

## Navigation Flow Summary

```text
App.jsx
  -> RootNavigator
  -> AppStackNavigator
  -> MainTabs
      -> Home
      -> Tours
      -> Contact
  -> TourDetail
  -> Cart
  -> OrderConfirmation
```

## Creator Notes

- Do not add Expo Router unless the project is intentionally converted.
- Do not re-add drawer navigation unless the UI requirement changes.
- Keep Firebase functions centralized in `src/firebase/atlasFirebaseApi.js`.
- Keep shared cart state in Redux.
- Keep branding/support values in Context.
- Keep actual app images in `assets/images/`.
- Avoid using reference screenshots as app assets.
- For production, Firestore rules must be restricted and customer data should be protected.

