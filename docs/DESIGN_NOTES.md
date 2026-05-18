# Atlas Tours Design Notes

## Purpose

This document defines the UI design direction for the Atlas Tours React Native mobile app.

The app is based on the existing Atlas Tours Laravel web app. The React Native version should feel like the same product, but adapted into a clean mobile experience. The goal is not to copy the desktop website pixel by pixel. The goal is to keep the same brand feeling, colors, card style, and travel booking flow while allowing the UI to be designed naturally for mobile.

These notes are only about UI and visual design. They do not define backend, database, authentication, API, or admin panel work.

---

## Design Goal

The Atlas Tours mobile app should look like a polished travel booking app inspired by the Laravel website.

The UI should be:

- Clean
- Simple
- Mobile friendly
- Travel focused
- Easy to understand
- Visually similar to the website
- Not overengineered
- Not cluttered
- Consistent across screens

The agent may make reasonable UI decisions if they improve the mobile layout. The screenshots should guide the design, not restrict every detail.

---

## Web App Reference

The existing Laravel website screenshots are documented separately in:

```text
docs/WEB_APP_REFERENCE.md
```

Before building or polishing UI screens, the agent should read `docs/WEB_APP_REFERENCE.md` and review the screenshots in:

```text
docs/references/screenshots/
```

`WEB_APP_REFERENCE.md` only describes what appears in the screenshots. It should be used as a visual reference, while this file controls the overall mobile design direction.

---

## Reference Screenshots

Reference screenshots are stored in:

docs/references/screenshots/
  home/
    01-home-hero-featured.png
    02-home-destinations.png
    03-home-testimonials.png

  tours/
    01-tours-header-filters.png
    02-tours-list-top.png
    03-tours-list-bottom.png

  tour-detail/
    01-tour-detail-hero-overview.png
    02-tour-detail-bottom.png

  contact/
    contact-form-info.png
    contact-faq.png

  cart/
    01-cart-checkout.png

  order-confirmation/
    order-confirmation.png

The screenshots show the existing website screens:

- Home page
- Tours page
- Tour detail page
- Contact page
- Cart and checkout page
- Order confirmation page

These screenshots are for visual reference only. Do not use them as app assets. Actual app images should be separate from the reference screenshots.

---

## Overall Visual Style

The existing website uses a modern travel booking style with:

- White navigation area
- Purple and indigo branding
- Large purple hero sections
- White cards
- Rounded corners
- Soft shadows
- Travel images
- Simple badges
- Clean forms
- Light gray page background
- Dark navy footer sections

The React Native app should keep this same direction while simplifying layouts for mobile.

The mobile app should feel like the official Atlas Tours app, not a completely new design.

---

## Creative Room for the Agent

The agent is allowed to make clean mobile UI decisions.

The agent may:

- Adjust spacing to make screens easier to read
- Convert desktop grids into mobile cards
- Use horizontal scrolling where it makes sense
- Simplify sections that feel too crowded
- Reorder small UI pieces for better mobile flow
- Create reusable components when they reduce repetition
- Improve hierarchy, spacing, and readability

The agent should not:

- Change the overall brand direction
- Use random colors outside the Atlas Tours style
- Create unnecessary screens
- Add complex animations
- Add too many third party UI packages
- Overcomplicate the layout
- Make the app look unrelated to the website

When in doubt, make the UI simpler and cleaner.

---

## Color Direction

Use the website purple and indigo style as the main brand direction.

Suggested starting palette:

```js
export const colors = {
  primary: "#4F46E5",
  primaryDark: "#4338CA",
  purple: "#7C3AED",

  background: "#F8FAFC",
  surface: "#FFFFFF",
  softSurface: "#F3F4F6",

  text: "#111827",
  textSoft: "#374151",
  textMuted: "#6B7280",
  textLight: "#FFFFFF",

  border: "#E5E7EB",

  navy: "#0F172A",
  success: "#22C55E",
  info: "#3B82F6",
};
```

Use purple or indigo for:

- Primary buttons
- Active tabs
- Hero sections
- Call to action sections
- Price text
- Selected filters
- Important links

Use white for:

- Cards
- Forms
- Inputs
- Main content blocks

Use light gray for:

- App background
- Section separation
- Empty space around cards

Use dark navy only when a footer style or strong contrast section is needed.

---

## Typography Direction

Use a clean modern sans serif style.

For the first version, use the default React Native system font. Do not add custom font packages unless approved.

Suggested hierarchy:

```js
heroTitle: {
  fontSize: 30,
  fontWeight: "700",
  lineHeight: 38,
}

screenTitle: {
  fontSize: 26,
  fontWeight: "700",
  lineHeight: 34,
}

sectionTitle: {
  fontSize: 22,
  fontWeight: "700",
  lineHeight: 30,
}

cardTitle: {
  fontSize: 17,
  fontWeight: "700",
  lineHeight: 24,
}

body: {
  fontSize: 14,
  fontWeight: "400",
  lineHeight: 22,
}

muted: {
  fontSize: 13,
  fontWeight: "400",
  lineHeight: 20,
}
```

The agent can adjust these slightly if the UI looks better, but typography should stay simple and consistent.

---

## Spacing and Layout

Use mobile first spacing.

Suggested spacing values:

```js
export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  section: 32,
};
```

General rules:

- Use single column layouts by default
- Avoid copying desktop grids directly
- Keep forms stacked vertically
- Keep buttons easy to tap
- Use enough padding so screens do not feel cramped
- Avoid too many nested containers
- Keep visual structure easy to explain

Recommended screen padding:

```js
paddingHorizontal: 16
```

Recommended spacing between major sections:

```js
marginTop: 28,
marginBottom: 20
```

---

## Cards

Cards are a key part of the website UI and should also be used in the mobile app.

Suggested card style:

```js
backgroundColor: "#FFFFFF",
borderRadius: 16,
padding: 16,
shadowColor: "#000",
shadowOffset: { width: 0, height: 4 },
shadowOpacity: 0.08,
shadowRadius: 10,
elevation: 3,
```

Use cards for:

- Tour cards
- Destination cards
- Contact information
- Contact form
- Booking details
- Cart summary
- Order confirmation sections
- FAQ items
- Testimonials

Keep shadows soft. Do not make the cards too heavy.

---

## Buttons

Use only a few consistent button styles.

### Primary Button

Use for main actions:

- View Details
- Apply Filters
- Add to Cart
- Send Message
- Confirm Booking

Suggested style:

```js
backgroundColor: "#4F46E5",
borderRadius: 10,
height: 48,
alignItems: "center",
justifyContent: "center",
```

### Secondary Button

Use for softer actions:

- Contact Us
- Continue Shopping
- International Tours
- Domestic Tours

Suggested style:

```js
backgroundColor: "#FFFFFF",
borderColor: "#4F46E5",
borderWidth: 1,
borderRadius: 10,
height: 48,
```

Do not create many button variations unless they are clearly needed.

---

## Badges

Use badges for small labels like tour type and status.

Suggested badge colors:

```js
international: {
  backgroundColor: "#3B82F6",
  color: "#FFFFFF",
}

domestic: {
  backgroundColor: "#22C55E",
  color: "#FFFFFF",
}

confirmed: {
  backgroundColor: "#DCFCE7",
  color: "#15803D",
}
```

Suggested badge shape:

```js
borderRadius: 999,
paddingHorizontal: 10,
paddingVertical: 4,
```

Badges should be small, readable, and consistent.

---

## Images

Travel images are one of the most important parts of the design.

Use images for:

- Tour cards
- Destination cards
- Tour detail hero section
- Photo gallery

Image rules:

- Tour cards should have a large image at the top
- Destination cards can use image backgrounds with a dark overlay
- Gallery images should have rounded corners
- Do not overload a screen with too many images
- Do not use reference screenshots as app assets

Suggested TourCard image style:

```js
height: 180,
borderTopLeftRadius: 16,
borderTopRightRadius: 16,
```

Suggested detail hero image style:

```js
height: 260,
```

Suggested overlay style:

```js
backgroundColor: "rgba(0,0,0,0.35)",
```

---

## Forms

Forms should look clean and simple, similar to the website but easier to use on mobile.

Use forms on:

- Contact screen
- Cart screen
- Tour detail booking section

Suggested label style:

```js
fontSize: 13,
fontWeight: "600",
color: "#374151",
marginBottom: 6,
```

Suggested input style:

```js
height: 48,
borderWidth: 1,
borderColor: "#D1D5DB",
borderRadius: 8,
paddingHorizontal: 12,
fontSize: 14,
backgroundColor: "#FFFFFF",
```

Suggested multiline input style:

```js
height: 120,
textAlignVertical: "top",
paddingTop: 12,
```

Form rules:

- Stack fields vertically
- Keep inputs full width
- Use clear labels
- Keep validation simple
- Show a simple alert or message after form submission

---

## Navigation UI Direction

The app should visually support the course navigation requirements while still feeling natural.

Use bottom tabs for:

- Home
- Tours
- Contact

Use drawer navigation for:

- Home
- Tours
- Contact
- Cart

Use stack navigation for:

- Tour detail screen
- Order confirmation screen

Tab and drawer styling should stay simple:

- Active item uses purple
- Inactive item uses muted gray
- Labels should be readable
- Do not overdesign the drawer

---

## Screen UI Direction

## Home Screen

The Home screen should be inspired by the website landing page.

Include:

- Hero section
- Featured tours
- Top destinations
- Testimonials
- Call to action section

The hero should use the purple or indigo brand color.

Featured tours should use TourCard components.

Destinations can use image cards with dark overlay.

Testimonials should use simple white cards.

The agent may simplify the screen if it becomes too long or cluttered.

---

## Tours Screen

The Tours screen should be inspired by the website tours page.

Include:

- Purple page header
- Tour type filters
- Destination search input
- Price filters
- Apply Filters button
- Tour list

Use a single column tour list on mobile.

Tour cards should include:

- Image
- Category badge
- Tour title
- Location
- Duration
- Price
- View Details button

---

## Tour Detail Screen

The Tour Detail screen should be inspired by the website single tour page.

Include:

- Large image or hero area
- Category badge
- Tour title
- Location
- Duration
- Price
- Overview
- Photo gallery
- Detailed itinerary
- Tour highlights
- Booking card
- Add to Cart button

The agent can decide the best mobile order, but the screen should be easy to scroll and understand.

---

## Contact Screen

The Contact screen should be inspired by the website contact page.

Include:

- Purple header
- Contact form
- Contact information card
- Location card
- Quick links
- FAQ section

Keep the form simple and stacked.

FAQ items can be simple cards. Expand and collapse behavior is optional.

---

## Cart Screen

The Cart screen should be inspired by the website shopping cart page.

Include:

- Purple header
- Customer information form
- Order summary
- Tour item card
- Quantity controls
- Payment method options
- Confirm Booking button

Keep checkout UI simple. Do not add real payment UI.

---

## Order Confirmation Screen

The confirmation screen should feel clean and trustworthy.

Include:

- Confirmation card
- Order number
- Confirmed badge
- Customer information
- Tour details
- Total amount
- What happens next section

Use a light, clean card layout similar to the website.

---

## Reusable UI Components

Create reusable components only when they keep the code cleaner.

Recommended components:

- AppScreen
- AppCard
- AppButton
- AppInput
- AppBadge
- SectionTitle
- TourCard
- DestinationCard
- TestimonialCard
- FAQItem
- CartItem
- OrderSummary

Do not create too many tiny components too early.

---

## UI Only Scope

This file is only for UI direction.

Do not use this document to define:

- Backend features
- Admin panel features
- Authentication
- Real payment processing
- Real map integration
- API work
- Storage logic

Those topics should be handled in separate planning files if needed.

---

## UI Self Review Checklist

Before finishing a screen, the agent should review the UI with this checklist:

- Does it feel inspired by the Atlas Tours website?
- Is the mobile layout clean and readable?
- Are purple and indigo used consistently?
- Are cards, buttons, and forms consistent?
- Is the screen simple instead of overengineered?
- Are travel images used nicely?
- Are text sizes readable?
- Is there enough spacing?
- Are there unnecessary wrappers or repeated styles?
- Would this be easy to explain in a class presentation?

If the screen feels messy, simplify it.

---

## Final Design Goal

The final mobile app should feel like the official mobile version of Atlas Tours.

It should preserve the website's:

- Purple and indigo branding
- Clean travel booking style
- White cards
- Rounded corners
- Soft shadows
- Travel image focus
- Simple badges
- Clean forms
- Cart and confirmation flow

It does not need to be pixel perfect.

It does need to be clean, consistent, mobile friendly, and clearly connected to the Laravel web app.
