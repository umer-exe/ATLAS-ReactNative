# Navigation Guide (Atlas Tours)

This file explains the current navigation structure and flows in a beginner-friendly way.

## 1. Big picture navigation structure

```
NavigationContainer
  DrawerNavigator
    AppStackNavigator
      MainTabs
        Home
        Tours
        Contact

      TourDetail
      Cart
      OrderConfirmation
```

## 2. Purpose of each navigator

- **DrawerNavigator** is the outer navigation layer for top-level access to main sections.
- **AppStackNavigator** controls the main screen flow and holds stack-only screens.
- **TabNavigator** controls the bottom tabs for Home, Tours, and Contact.
- **TourDetail**, **Cart**, and **OrderConfirmation** are stack screens outside the tabs.

## 3. Drawer behavior

- The drawer is available on **Home**, **Tours**, and **Contact**.
- **Cart** is not shown in the drawer.
- The drawer is **disabled** on **TourDetail**, **Cart**, and **OrderConfirmation**.
- This keeps detail and checkout screens focused.

## 4. Tab behavior

- **Home**, **Tours**, and **Contact** are the bottom tab screens.
- The **Browse Tours** button on Home switches to the **Tours** tab.
- Tabs are used only for the main app sections, not detail or checkout screens.

## 5. Stack behavior

- **TourDetail** is a stack screen.
- **Cart** is a stack screen.
- **OrderConfirmation** is a stack screen.
- Tour cards open **TourDetail** through stack navigation.
- **Add to Cart** opens **Cart**.
- **Confirm Booking** replaces **Cart** with **OrderConfirmation**.

## 6. Important route flows

Home tab  
→ Browse Tours button  
→ Tours tab

Home tab  
→ Featured tour card  
→ TourDetail  
→ Back arrow  
→ Tours tab

Tours tab  
→ Tour card  
→ TourDetail  
→ Back arrow  
→ Tours tab

TourDetail  
→ Add to Cart  
→ Cart

Cart  
→ Confirm Booking  
→ OrderConfirmation

OrderConfirmation  
→ Back to Home  
→ Home tab

OrderConfirmation  
→ Browse Tours  
→ Tours tab

## 7. Why TourDetail goes back to Tours

Home is treated as a landing/promotional page, while Tours is the actual catalog page.  
Because of that, even featured tours opened from Home return to **Tours** when the back arrow is pressed.

## 8. Gesture behavior

- Drawer swipe is disabled on **TourDetail**, **Cart**, and **OrderConfirmation**.
- Stack swipe-back on **TourDetail** is disabled (`gestureEnabled: false`).
- Users should use the visible native back arrow on **TourDetail**.
- This avoids gesture conflict between drawer, stack, and nested tabs.

## 9. Which files control what

- `src/navigation/RootNavigator.jsx` controls the `NavigationContainer`.
- `src/navigation/DrawerNavigator.jsx` controls drawer setup and drawer swipe behavior.
- `src/navigation/AppStackNavigator.jsx` controls MainTabs, TourDetail, Cart, and OrderConfirmation.
- `src/navigation/TabNavigator.jsx` controls Home, Tours, and Contact bottom tabs.
- `src/screens/HomeScreen.jsx` controls Browse Tours and featured tour navigation.
- `src/screens/ToursScreen.jsx` controls catalog tour card navigation.
- `src/screens/TourDetailScreen.jsx` controls Add to Cart navigation.
- `src/screens/CartScreen.jsx` controls checkout and confirmation navigation.
- `src/screens/OrderConfirmationScreen.jsx` controls final buttons back to Home or Tours.

## 10. Simple rules for future development

- Do not create separate HomeStack or ToursStack again unless there is a strong reason.
- Keep TourDetail only once inside AppStackNavigator.
- Keep Cart only once inside AppStackNavigator.
- Do not add Cart to the drawer unless the app design changes.
- Use tabs for main sections.
- Use stack navigation for detail and checkout flows.
- Avoid `getParent()?.getParent()` chains unless absolutely necessary.
- Keep navigation simple because this is a course project.
