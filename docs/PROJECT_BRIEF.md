# Atlas Tours React Native Project Brief

This document defines the current project scope, screen plan, and likely folder structure for the Atlas Tours React Native mobile app.

This plan is editable. If the project changes, update this file before asking an AI coding agent to make larger code changes.

---

## Project Summary

Atlas Tours is a React Native mobile app based on an existing Laravel, Blade, and Tailwind website.

The goal is to create a clean mobile version of the customer-facing website while naturally demonstrating React Native course concepts.

The app should use the existing website screenshots as visual reference, but the mobile app should be adapted properly for mobile screens instead of copying the desktop layout exactly.

---

## Current Development Goal

The current goal is to build a clean static React Native frontend first.

This means:

- Use static sample content
- Build screens and navigation first
- Use reusable components
- Keep the app easy to understand
- Keep the UI visually inspired by the Laravel website
- Avoid adding unnecessary features too early

---

## Included Customer-Facing Screens

The React Native app should include these customer-facing screens:

1. `HomeScreen`
2. `ToursScreen`
3. `TourDetailScreen`
4. `ContactScreen`
5. `CartScreen`
6. `OrderConfirmationScreen`

These screens are based on the website screenshots stored in:

```text
docs/references/screenshots/
```

The screenshots are described in:

```text
docs/WEB_APP_REFERENCE.md
```

The design direction is described in:

```text
docs/DESIGN_NOTES.md
```

---

## Excluded From Current Scope

The following are not part of the current mobile app scope:

- Admin panel
- Staff dashboard
- Real login system
- Real payment gateway
- Real backend connection
- Complex animations
- Push notifications
- Real map integration
- Unnecessary extra pages

These may be considered later only if required.

---

## Screen Purpose

### HomeScreen

The landing screen for the app.

Likely sections:

- Hero section
- Featured tours
- Top destinations
- Traveler testimonials
- Call-to-action section

Purpose:

- Introduce Atlas Tours
- Show popular tours
- Let users navigate to all tours or details

---

### ToursScreen

The tour browsing screen.

Likely sections:

- Page header
- Tour type filters
- Search input
- Price filters
- Tour list

Purpose:

- Display available tours
- Demonstrate list rendering
- Allow simple filtering
- Navigate to tour details

---

### TourDetailScreen

The detail screen for a selected tour.

Likely sections:

- Tour hero image
- Tour title and badge
- Location, duration, and price
- Overview
- Photo gallery
- Itinerary
- Tour highlights
- Booking card
- Add to Cart button

Purpose:

- Show full tour information
- Demonstrate stack navigation
- Allow user to add a tour to cart

---

### ContactScreen

The contact and support screen.

Likely sections:

- Page header
- Contact form
- Contact information
- Location card
- Quick links
- FAQ section

Purpose:

- Let users contact Atlas Tours
- Demonstrate form inputs and validation
- Show company contact information

---

### CartScreen

The checkout-style screen for selected tours.

Likely sections:

- Shopping cart header
- Customer information form
- Order summary
- Tour item preview
- Quantity controls
- Payment method options
- Confirm Booking button

Purpose:

- Let the user review a selected tour
- Demonstrate shared state and form state
- Navigate to order confirmation

---

### OrderConfirmationScreen

The final booking confirmation screen.

Likely sections:

- Confirmation card
- Fake order number
- Confirmed badge
- Customer information
- Tour details
- Total amount
- What's Next section

Purpose:

- Show a completed booking summary
- Complete the customer flow

---

## Navigation Plan

The app should demonstrate Stack, Tab, and Drawer navigation naturally.

Recommended structure:

```text
RootNavigator
  DrawerNavigator
    TabNavigator
      HomeStackNavigator
        HomeScreen
        TourDetailScreen

      ToursStackNavigator
        ToursScreen
        TourDetailScreen

      ContactScreen

    CartStackNavigator
      CartScreen
      OrderConfirmationScreen
```

### Bottom Tabs

Use bottom tabs for the main customer screens:

- Home
- Tours
- Contact

### Drawer

Use drawer navigation for broader app access:

- Home
- Tours
- Contact
- Cart

### Stack

Use stack navigation for:

- Opening TourDetailScreen from HomeScreen or ToursScreen
- Opening OrderConfirmationScreen from CartScreen

---

## Course Concept Mapping

The app should naturally demonstrate the course concepts.

### Stack Navigation

Used for:

- Tour list to tour detail
- Cart to order confirmation

### Tab Navigation

Used for:

- Home
- Tours
- Contact

### Drawer Navigation

Used for:

- Home
- Tours
- Contact
- Cart

### Props

Used in reusable components such as:

- TourCard
- DestinationCard
- TestimonialCard
- FAQItem
- CartItem

### Hooks

Used for:

- Contact form inputs
- Tour filters
- Cart form inputs
- Simple screen state

### Lists

Used for:

- Tour list
- Destination list
- Testimonials
- FAQ items
- Itinerary items

### Context API

Can be used for:

- Theme values
- App branding values
- Simple app settings

### Redux

Can be used for:

- Cart items
- Selected tour
- Quantity
- Booking summary

---

## Suggested Folder Structure

This is the suggested folder structure. It can be adjusted if needed.

```text
src/
  navigation/
    RootNavigator.jsx
    DrawerNavigator.jsx
    TabNavigator.jsx
    HomeStackNavigator.jsx
    ToursStackNavigator.jsx
    CartStackNavigator.jsx

  screens/
    HomeScreen.jsx
    ToursScreen.jsx
    TourDetailScreen.jsx
    ContactScreen.jsx
    CartScreen.jsx
    OrderConfirmationScreen.jsx

  components/
    ui/
      AppScreen.jsx
      AppCard.jsx
      AppButton.jsx
      AppInput.jsx
      AppBadge.jsx
      SectionTitle.jsx

    home/
      HeroSection.jsx
      FeaturedTours.jsx
      DestinationSection.jsx
      TestimonialCard.jsx
      CallToActionSection.jsx

    tours/
      TourCard.jsx
      TourFilterBar.jsx
      DestinationCard.jsx
      TourGallery.jsx
      ItineraryList.jsx
      HighlightList.jsx

    contact/
      ContactForm.jsx
      ContactInfoCard.jsx
      FAQItem.jsx
      QuickLinksCard.jsx

    cart/
      CartItem.jsx
      OrderSummary.jsx
      CheckoutForm.jsx

  data/
    toursData.js
    testimonialsData.js
    faqData.js

  context/
    ThemeContext.jsx

  store/
    store.js
    cartSlice.js
    toursSlice.js

  styles/
    colors.js
    spacing.js
```

---

## Documentation Files

Recommended project docs:

```text
docs/
  DESIGN_NOTES.md
  WEB_APP_REFERENCE.md
  PROJECT_BRIEF.md
  TASKS.md
  references/
    screenshots/
      home/
      tours/
      tour-detail/
      contact/
      cart/
      order-confirmation/
```

---

## Reference Screenshot Rule

Reference screenshots are stored in:

```text
docs/references/screenshots/
```

They are for visual reference only.

Do not use these screenshots as app assets.

Do not edit, crop, rename, delete, or move reference screenshots unless explicitly requested.

---

## General Build Rule

Before the agent edits files, it should:

1. Read `AGENTS.md`
2. Read `docs/PROJECT_BRIEF.md`
3. Read `docs/DESIGN_NOTES.md`
4. Read `docs/WEB_APP_REFERENCE.md`
5. Read `docs/TASKS.md`
6. List the files it plans to create or modify
7. Wait for approval if the change is large

The user controls Git, commits, branches, and merges.
