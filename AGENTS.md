<!-- BEGIN:expo-react-native-agent-rules -->
# Expo and React Native change fast

This project uses Expo and React Native. Expo SDK versions, templates, package install commands, navigation setup, and app entry behavior may differ from older examples or training data.

Before changing Expo setup, navigation setup, package versions, Babel/Metro config, app entry files, or SDK-related code, check the official docs first:

1. Expo Docs: https://docs.expo.dev/
2. create-expo-app Docs: https://docs.expo.dev/more/create-expo/
3. Expo Navigation Docs: https://docs.expo.dev/develop/app-navigation/
4. React Navigation Docs: https://reactnavigation.org/docs/getting-started/

Project-specific rule:

This project intentionally uses the Expo blank template with manual React Navigation for course requirements.

Do not switch this project to Expo Router.

Do not create an `app/(tabs)` structure unless the user explicitly asks.

Do not change `package.json` main entry unless the user explicitly asks.
<!-- END:expo-react-native-agent-rules -->

# Atlas Tours Agent Instructions

Atlas Tours is a React Native mobile app built with Expo.

The app is based on an existing Laravel, Blade, and Tailwind customer-facing website. The goal is to create a clean mobile version of the customer-facing Atlas Tours experience.

This file contains guardrails only. Detailed implementation choices, exact tasks, file plans, UI decisions, and phase-specific instructions should come from the user's prompts and the project docs.

---

## Required Reading

Before making major changes, read:

1. `docs/PROJECT_BRIEF.md`
2. `docs/TASKS.md`
3. `docs/DESIGN_NOTES.md`
4. `docs/WEB_APP_REFERENCE.md`

When working on UI, also review:

```text
docs/references/screenshots/
```

When working with tour data, also review:

```text
docs/references/data/tours-reference.json
```

Do not edit documentation files unless the user explicitly asks.

---

## Project Setup Guardrails

This project uses:

1. Expo blank template
2. JavaScript / JSX
3. Manual React Navigation
4. `App.jsx` or `App.js` as the main app component
5. `index.js` as the entry file
6. `src/` for app code
7. `docs/` for project documentation and references
8. `assets/` for actual app images

Do not:

1. Convert the project to TypeScript unless explicitly requested.
2. Convert the project to Expo Router unless explicitly requested.
3. Create an `app/(tabs)` folder unless explicitly requested.
4. Change `package.json` main entry unless explicitly requested.
5. Modify `index.js` unless explicitly requested.

---

## Current App Scope

Build only the customer-facing mobile app.

Included screens:

1. Home
2. Tours
3. Tour Detail
4. Contact
5. Cart / Checkout
6. Order Confirmation

Do not build:

1. Admin panel
2. Login
3. Register
4. User accounts
5. Real payment
6. Real backend connection
7. SQLite connection
8. Push notifications
9. Real map integration

---

## Workflow Rules

Work in small steps.

Before editing, explain:

1. Current phase
2. Files you plan to create or modify
3. What you plan to change
4. Any package install needed

After editing, summarize:

1. What changed
2. Which files changed
3. How to test it
4. Any known limitations

Do not make unrelated changes.

Do not silently restructure the project.

Detailed UI and implementation decisions should be handled in the user's specific prompt for that phase, not guessed from this file.

---

## Documentation Rule

Do not edit any `.md` files unless explicitly requested.

This includes:

1. `AGENTS.md`
2. `docs/PROJECT_BRIEF.md`
3. `docs/TASKS.md`
4. `docs/DESIGN_NOTES.md`
5. `docs/WEB_APP_REFERENCE.md`

The user will manually manage `TASKS.md`.

If a documentation file seems outdated, mention it to the user instead of editing it.

---

## Git Rule

Do not run Git commands unless explicitly requested.

This includes:

1. `git add`
2. `git commit`
3. `git push`
4. `git pull`
5. `git reset`
6. `git rebase`
7. `git checkout`
8. `git switch`
9. `git merge`
10. `git branch`

The user controls commits, branches, pushes, merges, and version history.

You may suggest a commit message, but do not run Git commands unless asked.

---

## Package Rule

Do not install packages unless explicitly approved.

Before adding a package, explain:

1. Package name
2. Why it is needed
3. Where it will be used
4. Simpler alternative, if any
5. Whether it adds beginner complexity

Do not add backend, database, auth, payment, map, animation, or UI library packages unless the user specifically approves.

---

## Navigation Guardrails

Use manual React Navigation.

Use navigation naturally for the course concepts:

1. Bottom tabs for main screens
2. Drawer for app menu
3. Stack navigation for detail and confirmation screens

Use `NavigationContainer` only once.

Keep navigation files inside:

```text
src/navigation/
```

Keep screens inside:

```text
src/screens/
```

Do not use Expo Router.

Do not create fake auth navigation.

---

## UI Guardrails

Use the website screenshots as inspiration, not strict pixel-perfect mockups.

Follow the general Atlas Tours visual direction:

1. Purple and indigo branding
2. Clean white cards
3. Rounded corners
4. Soft shadows
5. Travel images
6. Simple category badges
7. Mobile-friendly vertical layouts
8. Clean forms
9. Clear buttons

Do not overengineer the UI.

Do not make every section overly custom.

Do not copy desktop grids exactly.

The agent has creative room to make clean mobile UI decisions inside the current task scope.

---

## Reference Screenshot Rule

Reference screenshots live in:

```text
docs/references/screenshots/
```

They are for visual reference only.

Do not:

1. Move them
2. Rename them
3. Delete them
4. Modify them
5. Use them as app assets
6. Import them into the app UI

Actual app images should go in:

```text
assets/images/
assets/images/tours/
```

---

## Data and Image Guardrails

Reference tour data may live in:

```text
docs/references/data/tours-reference.json
```

Use it only as reference.

App-ready static data should live in:

```text
src/data/
```

Do not use `127.0.0.1` image URLs in the mobile app.

Do not connect the React Native app directly to the Laravel database.

Do not connect the React Native app directly to SQLite.

---

## Component Guardrails

Use reusable components where they help.

Do not create too many tiny components too early.

Suggested component folders may include:

```text
src/components/ui/
src/components/home/
src/components/tours/
src/components/contact/
src/components/cart/
```

Keep components readable and beginner-friendly.

---

## State Management Guardrails

Use local state first where it makes sense.

Use Context API only for simple shared app-level state.

Use Redux later for cart or booking state if the current phase requires it.

Do not add Redux too early unless the user asks for that phase.

Do not make everything global state.

---

## Testing Rule

After meaningful code changes, provide test steps.

Common command:

```bash
npx expo start
```

At minimum, check:

1. App launches
2. Navigation works
3. Screens render
4. Buttons do not crash
5. Forms accept input
6. Lists render correctly

---


## Final Rule

Keep the app simple, clean, and course-friendly.

The goal is a polished static mobile frontend inspired by the Atlas Tours website, not a full production travel platform.
