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

- [ ] Create `assets/images/`
- [ ] Create `assets/images/tours/`
- [ ] Add tour thumbnail/card images
- [ ] Add tour detail hero images if different from thumbnails
- [ ] Add gallery images used on Tour Detail screens
- [ ] Add destination images used on Home screen
- [ ] Add placeholder image if needed
- [ ] Use clear file names such as `japan.jpg`, `northern-pakistan.jpg`, `europe.jpg`, `thailand.jpg`, `dubai.jpg`, `lahore.jpg`, `coastal-pakistan.jpg`, `swat.jpg`
- [ ] Confirm app images are not stored inside `docs/references/`
- [ ] Confirm reference screenshots are not used as app images
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
- [ ] Create `src/components/ui/`
- [ ] Create `src/components/home/`
- [ ] Create `src/components/tours/`
- [ ] Create `src/components/contact/`
- [ ] Create `src/components/cart/`
- [ ] Create `src/data/`
- [ ] Create `src/context/`
- [ ] Create `src/store/`
- [ ] Create `src/styles/`
- [ ] Confirm the project still runs
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

- [ ] Install React Navigation native package
- [ ] Install native stack navigator
- [ ] Install bottom tab navigator
- [ ] Install drawer navigator
- [ ] Install required gesture/safe area/screen packages
- [ ] Confirm app still runs after package installation

## Navigation File Tasks

- [ ] Create `src/navigation/RootNavigator.jsx`
- [ ] Create `src/navigation/DrawerNavigator.jsx`
- [ ] Create `src/navigation/TabNavigator.jsx`
- [ ] Create `src/navigation/HomeStackNavigator.jsx`
- [ ] Create `src/navigation/ToursStackNavigator.jsx`
- [ ] Create `src/navigation/CartStackNavigator.jsx`
- [ ] Connect `App.jsx` to `RootNavigator`
- [ ] Use `NavigationContainer` only once
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

- [ ] Review `docs/references/data/tours-reference.json`
- [ ] Review images in `assets/images/tours/`
- [ ] Create `src/data/toursData.js`
- [ ] Convert tour reference data into React Native friendly static data
- [ ] Add local image references or safe image placeholders
- [ ] Include tour title, slug, location, duration, price, type, overview, highlights, and featured status
- [ ] Add gallery image references where available
- [ ] Create `src/data/testimonialsData.js`
- [ ] Create `src/data/faqData.js`
- [ ] Create destination data if needed for Home screen
- [ ] Confirm static data imports correctly
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

- [ ] Create `AppScreen`
- [ ] Create `AppCard`
- [ ] Create `AppButton`
- [ ] Create `AppInput`
- [ ] Create `AppBadge`
- [ ] Create `SectionTitle`
- [ ] Create `TourCard`
- [ ] Create `DestinationCard`
- [ ] Create `TestimonialCard`
- [ ] Create `FAQItem`
- [ ] Create basic style constants if useful
- [ ] Test components on a temporary screen
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

- [ ] Build `HomeScreen`
- [ ] Add hero section
- [ ] Add featured tours section
- [ ] Add destination cards
- [ ] Add testimonials section
- [ ] Add call-to-action section
- [ ] Confirm Home screen looks good on mobile

## Tours Screen Tasks

- [ ] Build `ToursScreen`
- [ ] Add purple screen header
- [ ] Add type filter buttons
- [ ] Add destination search input
- [ ] Add price filter inputs
- [ ] Display tours with `FlatList`
- [ ] Add filtering behavior with local state
- [ ] Confirm tour cards render correctly

## Tour Detail Screen Tasks

- [ ] Build `TourDetailScreen`
- [ ] Add hero image section
- [ ] Add overview section
- [ ] Add gallery section
- [ ] Add itinerary section
- [ ] Add highlights section
- [ ] Add booking card
- [ ] Add Add to Cart button placeholder
- [ ] Confirm navigation from tour cards works

## Contact Screen Tasks

- [ ] Build `ContactScreen`
- [ ] Add purple screen header
- [ ] Add contact form
- [ ] Add contact information card
- [ ] Add location card
- [ ] Add quick links section
- [ ] Add FAQ section
- [ ] Add simple form validation and alert

## Cart Screen Tasks

- [ ] Build `CartScreen`
- [ ] Add cart header
- [ ] Add customer information form
- [ ] Add order summary card
- [ ] Add tour item preview
- [ ] Add quantity controls placeholder
- [ ] Add payment method options
- [ ] Add Confirm Booking button

## Order Confirmation Screen Tasks

- [ ] Build `OrderConfirmationScreen`
- [ ] Add confirmation card
- [ ] Add fake order number
- [ ] Add confirmed badge
- [ ] Add customer information section
- [ ] Add tour details section
- [ ] Add total amount section
- [ ] Add What's Next section

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

- [ ] Review spacing and layout consistency
- [ ] Review card consistency
- [ ] Review button consistency
- [ ] Review text sizes
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
- [ ] Fix visible errors
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
