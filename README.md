# Playwright QA Portfolio

A small, self-contained test automation project showing how I structure UI and API tests with **Playwright and TypeScript**, and run them automatically in **CI with GitHub Actions**.

It tests public demo applications only — no client code or data.

## What it demonstrates

- **UI end-to-end tests** against the Playwright TodoMVC demo, using the **Page Object Model** (`pages/TodoPage.ts`)
  - happy paths, filters and counters, an edge case (empty input) and persistence after reload
- **API tests** against the public JSONPlaceholder REST API
  - status codes, response schema checks, query filtering, a POST request and a negative (404) case
- **CI pipeline** (`.github/workflows/playwright.yml`): type check, install the browser, run all tests, and publish the HTML report as an artifact

## Run it locally

```bash
npm ci
npx playwright install chromium
npm test            # all tests
npm run test:ui     # UI tests only
npm run test:api    # API tests only
npm run report      # open the HTML report
```

## Project structure

```
pages/            Page objects
tests/ui/         UI end-to-end tests
tests/api/        API tests
.github/workflows CI pipeline
```

## Author

**Bilal Mustafa** — Senior QA Engineer (test automation, API and data testing)
[LinkedIn](https://www.linkedin.com/in/bilal-mustafa-bb2435440/)
