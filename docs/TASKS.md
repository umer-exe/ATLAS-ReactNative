# Atlas Tours Build Tasks

This file is the project checklist for the Atlas Tours React Native mobile app.

The agent may read this file for project context, but should not edit it unless explicitly requested.

The user and teammate will manually mark tasks complete after testing and approving the work.

---

# Current Status

Project setup has started.

The app was created with the Expo blank template.

The current goal is to finish documentation, reference setup, and basic folder structure before coding the actual screens.

The first build target is a clean static React Native frontend based on the existing Atlas Tours Laravel website.

Backend admin panel screens are excluded for now.

---

# Phase 1: Setup and Project Rules

## Goal

Create the base React Native project and set up the basic team workflow.

## Rules

- Do not build app screens in this phase.
- Do not install extra packages unless needed and approved.
- Do not connect to Laravel backend.
- Do not add database logic.
- Do not add admin panel screens.
- Do not commit `node_modules`.

## Tasks

- [ ] Create Expo React Native project using blank template
- [ ] Confirm `package.json` exists in the project root
- [ ] Confirm `node_modules` is ignored by Git
- [ ] Confirm app runs with `npx expo start`
- [ ] Initialize Git
- [ ] Create first clean commit
- [ ] Push initial project to GitHub
- [ ] Create `main` branch for stable work
- [ ] Create `dev` branch for development work
- [ ] Commit setup checkpoint

---

# Phase 2: Documentation Setup

## Goal

Create the documentation files that define the app scope, visual direction, references, and development workflow.

## Rules

- Documentation should guide the project without overcomplicating it.
- Design notes should focus only on UI and visual direction.
- Project scope should remain editable as the app develops.
- The agent should not edit documentation unless explicitly requested.

## Tasks

- [x] Create `docs/` folder
- [x] Create `docs/DESIGN_NOTES.md`
- [x] Create `docs/WEB_APP_REFERENCE.md`
- [x] Create `docs/PROJECT_BRIEF.md`
- [x] Create `docs/TASKS.md`
- [x] Later create `AGENTS.md`
- [x] Review documentation for clarity
- [x] Confirm docs are simple enough for teammate and agent to follow
- [x] Commit documentation checkpoint

---

# Phase 3: Reference Setup

## Goal

Add the existing Laravel website reference files so the React Native app can follow the same general visual direction and content structure.

## Rules

- Reference files are for guidance only.
- Do not use reference screenshots as app assets.
- Do not use reference screenshots inside the app UI.
- Do not connect React Native to Laravel.
- Do not connect React Native to SQLite.
- Do not include backend admin panel screenshots in the current app scope.

## Screenshot Reference Tasks

- [x] Create `docs/references/`
- [x] Create `docs/references/screenshots/`
- [x] Create `docs/references/screenshots/home/`
- [x] Add Home page screenshots
- [x] Create `docs/references/screenshots/tours/`
- [x] Add Tours page screenshots
- [x] Create `docs/references/screenshots/tour-detail/`
- [x] Add Tour Detail page screenshots
- [x] Create `docs/references/screenshots/contact/`
- [x] Add Contact page screenshots
- [x] Create `docs/references/screenshots/cart/`
- [x] Add Cart and Checkout screenshot
- [x] Create `docs/references/screenshots/order-confirmation/`
- [x] Add Order Confirmation screenshot
- [x] Confirm screenshot names are clear
- [ ] Confirm screenshots match what is described in `WEB_APP_REFERENCE.md`

## Tour Data Reference Tasks

- [x] Create `docs/references/data/`
- [x] Add Laravel tour data as `docs/references/data/tours-reference.json`
- [x] Confirm tour reference data includes the needed fields
- [x] Keep tour reference data as documentation/reference only
- [x] Do not use raw Laravel data directly in components
- [x] Later convert tour reference data into app-ready static data

## Image Reference and App Asset Tasks

The Laravel website uses tour images for featured tours, tour cards, tour detail hero images, galleries, destinations, and booking summaries.

These images should be added separately from reference screenshots.

- [x] Create `assets/images/`
- [x] Create `assets/images/tours/`
- [ ] Add tour thumbnail/card images
- [ ] Add tour detail hero images if different from thumbnails
- [ ] Add gallery images used on Tour Detail screens
- [ ] Add destination images used on Home screen
- [ ] Add placeholder image if needed
- [ ] Use clear file names such as `japan.jpg`, `northern-pakistan.jpg`, `europe.jpg`, `thailand.jpg`, `dubai.jpg`, `lahore.jpg`, `coastal-pakistan.jpg`, `swat.jpg`
- [x] Confirm app images are not stored inside `docs/references/`
- [x] Confirm reference screenshots are not used as app images
- [ ] Later connect these image files to `src/data/toursData.js`

## Commit

- [ ] Commit reference screenshots, reference data, and image asset folders when ready

---

# Phase 4: Basic Project Structure

## Goal

Create the React Native folder structure before writing full UI code.

## Rules

- Keep the structure simple and beginner friendly.
- Do not create unnecessary auth/login folders because the website has no login.
- Do not build backend or admin panel folders.
- Folder structure can be adjusted later if needed.

## Tasks

- [x] Rename `App.js` to `App.jsx` if desired
- [x] Keep `index.js` unchanged
- [x] Create `src/`
- [x] Create `src/navigation/`
- [x] Create `src/screens/`
- [x] Create `src/components/`
- [x] Create `src/components/ui/`
- [x] Create `src/components/home/`
- [x] Create `src/components/tours/`
- [x] Create `src/components/contact/`
- [x] Create `src/components/cart/`
- [x] Create `src/data/`
- [x] Create `src/context/`
- [x] Create `src/store/`
- [x] Create `src/styles/`
- [x] Confirm the project still runs
- [ ] Commit folder structure checkpoint

---

# Phase 5: Navigation Foundation

## Goal

Add navigation structure that naturally demonstrates the course navigation concepts.

## Rules

- Use manual React Navigation.
- Do not use Expo Router.
- Do not add fake login/auth screens.
- Do not overcomplicate navigation.
- Install packages only after approval.

## Package Tasks

- [x] Install React Navigation native package
- [x] Install native stack navigator
- [x] Install bottom tab navigator
- [x] Install drawer navigator
- [x] Install required gesture/safe area/screen packages
- [x] Confirm app still runs after package installation

## Navigation File Tasks

- [x] Create `src/navigation/RootNavigator.jsx`
- [x] Create `src/navigation/DrawerNavigator.jsx`
- [x] Create `src/navigation/TabNavigator.jsx`
- [x] Create `src/navigation/HomeStackNavigator.jsx`
- [x] Create `src/navigation/ToursStackNavigator.jsx`
- [x] Create `src/navigation/CartStackNavigator.jsx`
- [x] Connect `App.jsx` to `RootNavigator`
- [x] Use `NavigationContainer` only once
- [ ] Confirm drawer navigation works
- [ ] Confirm tab navigation works
- [ ] Confirm stack navigation works
- [ ] Commit navigation foundation

---

# Phase 6: Static App Data

## Goal

Create clean app-ready static data from the reference tour data and image assets.

## Rules

- Use static data only.
- Do not connect to Laravel.
- Do not connect to SQLite.
- Do not use `127.0.0.1` image URLs inside the mobile app.
- Use local app images or safe placeholder images.

## Tasks

- [x] Review `docs/references/data/tours-reference.json`
- [x] Review images in `assets/images/tours/`
- [x] Create `src/data/toursData.js`
- [x] Convert tour reference data into React Native friendly static data
- [x] Add local image references or safe image placeholders
- [x] Include tour title, slug, location, duration, price, type, overview, highlights, and featured status
- [x] Add gallery image references where available
- [x] Create `src/data/testimonialsData.js`
- [x] Create `src/data/faqData.js`
- [x] Create destination data if needed for Home screen
- [x] Confirm static data imports correctly
- [ ] Commit static app data setup

---

# Phase 7: Reusable UI Components

## Goal

Create reusable UI components before building full screens.

## Rules

- Review `docs/DESIGN_NOTES.md` before coding.
- Keep components simple.
- Do not overengineer the UI system.
- Create components only when they reduce repetition.
- Do not build backend behavior.

## Tasks

- [x] Create `AppScreen`
- [x] Create `AppCard`
- [x] Create `AppButton`
- [x] Create `AppInput`
- [x] Create `AppBadge`
- [x] Create `SectionTitle`
- [x] Create `TourCard`
- [x] Create `DestinationCard`
- [x] Create `TestimonialCard`
- [x] Create `FAQItem`
- [x] Create basic style constants if useful
- [x] Test components on a temporary screen
- [ ] Commit reusable UI components

---

# Phase 8: Static Screens

## Goal

Build the main customer-facing screens using static data and reusable components.

## Rules

- Use dummy/static data only.
- Do not connect backend.
- Do not add real payment.
- Do not add admin panel.
- Keep screens mobile friendly and visually inspired by the website.

## Home Screen Tasks

- [x] Build `HomeScreen`
- [x] Add hero section
- [x] Add featured tours section
- [x] Add destination cards
- [x] Add testimonials section
- [x] Add call-to-action section
- [x] Confirm Home screen looks good on mobile

## Tours Screen Tasks

- [x] Build `ToursScreen`
- [x] Add purple screen header
- [x] Add type filter buttons
- [x] Add destination search input
- [x] Add price filter inputs
- [x] Display tours with `FlatList`
- [x] Add filtering behavior with local state
- [x] Confirm tour cards render correctly

## Tour Detail Screen Tasks

- [x] Build `TourDetailScreen`
- [x] Add hero image section
- [x] Add overview section
- [x] Add gallery section
- [x] Add itinerary section
- [x] Add highlights section
- [x] Add booking card
- [x] Add Add to Cart button placeholder
- [x] Confirm navigation from tour cards works

## Contact Screen Tasks

- [x] Build `ContactScreen`
- [x] Add purple screen header
- [x] Add contact form
- [x] Add contact information card
- [x] Add location card
- [x] Add quick links section
- [x] Add FAQ section
- [x] Add simple form validation and alert

## Cart Screen Tasks

- [x] Build `CartScreen`
- [x] Add cart header
- [x] Add customer information form
- [x] Add order summary card
- [x] Add tour item preview
- [x] Add quantity controls placeholder
- [x] Add payment method options
- [x] Add Confirm Booking button

## Order Confirmation Screen Tasks

- [x] Build `OrderConfirmationScreen`
- [x] Add confirmation card
- [x] Add fake order number
- [x] Add confirmed badge
- [x] Add customer information section
- [x] Add tour details section
- [x] Add total amount section
- [x] Add What's Next section

## Commit

- [ ] Commit static screens checkpoint

---

# Phase 9: Cart and Booking Flow

## Goal

Make the booking flow feel realistic while staying frontend only.

## Rules

- No real payment.
- No backend.
- No database.
- Keep the booking flow simple.

## Tasks

- [ ] Add selected tour to cart from Tour Detail screen
- [ ] Show selected tour in Cart screen
- [ ] Allow quantity changes
- [ ] Calculate total price
- [ ] Validate customer information form
- [ ] Navigate from Cart screen to Order Confirmation screen
- [ ] Show booking details on confirmation screen
- [ ] Commit cart and booking flow

---

# Phase 10: Redux and Context API

## Goal

Add required state management concepts for the course.

## Rules

- Use state management naturally.
- Do not add Redux just for random unused examples.
- Keep Context simple.

## Tasks

- [ ] Add Redux Toolkit if approved
- [ ] Create Redux store
- [ ] Create cart slice
- [ ] Store selected tour and quantity in Redux
- [ ] Use `useSelector` in Cart and Confirmation screens
- [ ] Use `useDispatch` from Tour Detail and Cart screens
- [ ] Create Context API provider for theme or app settings
- [ ] Use `useContext` in at least one meaningful place
- [ ] Confirm Redux and Context behavior works
- [ ] Commit Redux and Context API setup

---

# Phase 11: Frontend Polish

## Goal

Clean up the static frontend before submission.

## Tasks

- [x] Review spacing and layout consistency
- [x] Review card consistency
- [x] Review button consistency
- [x] Review text sizes
- [ ] Review image sizing
- [ ] Review mobile usability
- [ ] Test drawer navigation
- [ ] Test tab navigation
- [ ] Test stack navigation
- [ ] Test tour filters
- [ ] Test contact form alert
- [ ] Test cart and confirmation flow
- [ ] Remove unused starter code
- [ ] Run `npx expo start`
- [x] Fix visible errors
- [ ] Commit frontend polish

---

# Phase 12: Final Review and Submission Prep

## Goal

Prepare the app for class submission and presentation.

## Tasks

- [ ] Confirm all required screens work
- [ ] Confirm course concepts are visible
- [ ] Take screenshots for submission/report
- [ ] Prepare short explanation of navigation structure
- [ ] Prepare short explanation of props/hooks/list usage
- [ ] Prepare short explanation of Context API
- [ ] Prepare short explanation of Redux
- [ ] Prepare short explanation that backend/admin panel is intentionally excluded
- [ ] Final commit
- [ ] Push latest branch to GitHub
- [ ] Merge approved work into `dev`
- [ ] Merge final tested work into `main`

---

# Phase 13: Future Features

These are not part of the current static frontend scope.

Possible later features:

- [ ] Connect to Laravel API
- [ ] Add real backend data
- [ ] Add real checkout handling
- [ ] Add local storage
- [ ] Add admin panel mobile screens
- [ ] Add maps
- [ ] Add notifications
- [ ] Add user accounts
- [ ] Add saved bookings
- [ ] Add animation polish
