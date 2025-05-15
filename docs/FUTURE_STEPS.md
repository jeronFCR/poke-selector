# Future Steps

This document outlines the upcoming steps and improvements planned for the project. These tasks include both technical enhancements and potential architectural decisions that will help us improve scalability, maintainability, and functionality.

## 1. Storybook + Visual Testing with Loki

### Storybook Integration:

We plan to integrate [Storybook](https://storybook.js.org/) to build and showcase UI components in isolation. This will enhance our design system and streamline collaboration between developers and designers.

### Visual Testing with Loki:

Once Storybook is in place, we'll add [Loki](https://github.com/oblador/loki) for visual regression testing. Loki captures component screenshots and compares them to baselines to detect unintended visual changes, helping us catch UI issues early.

## 2. ESLint Dependency to Maintain Code

We'll add [ESLint](https://eslint.org/) to keep the code consistent and easy to read across the whole project. It will help us follow common rules, catch small errors early, and make sure everyone on the team writes code in the same style.

## 3. Dockerization

We'll add a [Docker](https://www.docker.com/) setup to simplify development, testing, and deployment. Containerizing the app will ensure consistency across environments and make it easier to scale the project in production.

## 4. Internationalization

We plan to introduce internationalization (i18n) to support multiple languages in the app. This will make it easier to reach users in different regions and improve accessibility.

## 5. E2E testing

### Cypress implementation:

We'll integrate [Cypress](https://www.cypress.io/) to write end-to-end (E2E) tests and ensure that the app works as expected from the user's perspective.

### E2E Workflow:

We'll define a dedicated CI workflow to run E2E tests daily. This will help us catch regressions early and ensure that critical paths in the app remain functional as we continue development.

---

## Technical Discussions

### Enforcing Code Quality with Husky

We want to introduce [Husky](https://typicode.github.io/husky/) to manage Git hooks and enforce code quality standards. By running checks before commits or pushes, Husky will help prevent regressions and ensure high-quality contributions.

However, since we already run unit tests in pull requests, we should discuss whether adding Husky is really necessary, as we can also use workflows to run other scripts.

### a11y

Accessibility wasn't a focus at the start, so our autocomplete component is still missing some valuable features:

- Users should be able to navigate the suggestion list using the keyboard.
- We need to add more ARIA attributes for better support with assistive technologies.
- Adding a ghost text suggestion (showing the first match) would improve the user experience.
