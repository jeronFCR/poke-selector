# Best Practices for Project Structure

This document describes our project structure and the best practices we use to ensure a clean and scalable codebase.

---

## Project Structure

```plaintext
.github/              # GitHub configuration (workflows, actions, etc.)
docs/                 # md doc files
src/
  ├── app/
  |   ├── components/ # Standalone, reusable UI components
  |   ├── directives/ # Custom, reusable Angular directives
  |   ├── models/     # Shared TypeScript models and interfaces
  |   ├── services/   # API calls and business logic (see #1)
  |   └── utils/      # Shared utility functions and helpers
  ├── environments/   # Env config files
  ├── main.ts         # Application entry point
  ├── styles.less     # Custom utility-first CSS classes (see #2)
  └── variables.less  # Variables (colors, spacing, etc.) for consistent and easy theming (see #2)
```

### 1. Facade Service Pattern. Why & Utility

The Facade pattern allows components to rely on a single service that handles all API interactions and data transformations internally. This approach keeps component code clean, decouples it from backend changes, and centralizes integration logic for easier maintenance.

For example, we use [PokemonService](../src/app/services/api/pokemon.service.ts) to handle all HTTP requests and raw data, and then we use [PokemonWrapperService](../src/app/services/facade/pokemon-wrapper.service.ts) as a facade. The facade transforms and exposes the data in a simple, unified way, so our components only interact with the facade and remain independent from API details or changes.

Guide for future services:

- Create a service for each API or data source (`./services/api`), handling HTTP requests.
- Build a facade service that uses these API services and exposes simple (`./services/facade`), unified methods and state for components.
- Make sure components depend only on the facade, not on the API services.
- If the data source changes (e.g. new Api url with new DTOs), adapt only how ApiService and WrapperService transform and share the data internally, keeping the facade's public interface and the components unchanged.

### 2. Custom Utility-First CSS

We created a custom utility-first CSS system in [styles.less](../src/styles.less) to avoid relying on external libraries, providing reusable classes for fast, consistent styling. All design variables like colors and spacing are defined in [variables.less](../src/variables.less); changing them updates the entire app's look and ensures visual consistency. This approach improves maintainability, speeds development, and keeps full control over the design.

### 3. @poke Path

Using path aliases like @poke enhances code readability and maintainability by allowing you to import modules with short, meaningful paths instead of long relative paths. This simplifies navigation, reduces errors, and keeps your project structure organized-especially as the codebase grows.

Guide for adding new path aliases:

- Open tsconfig.json and add a new entry under the paths property.
- For example, if you add guards to your project, you could use:

```js
"@poke/guards/*": ["app/guards/*"],
```

- You can also create an index.ts file in a folder to re-export all its modules, allowing you to import everything from a single entry point.
