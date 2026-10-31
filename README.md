# kumparan QA Skill Test - Task 2: Playwright website tests (desktop + mobile)

## Run
```bash
npm install
npx playwright install chromium
cp .env.example .env            # (Windows CMD: copy .env.example .env) then fill the QA account
```

## Before the first run: verify locators with codegen
`data-qa-id` is configured as the test-id attribute, so codegen prints `getByTestId('...')` for elements that have it.
```bash
npx playwright codegen https://kumparan.com                    # desktop
npx playwright codegen --device="Pixel 7" https://kumparan.com # mobile
npm run discover:qa-ids                                        # dumps all data-qa-id per page -> discovered-qa-ids.json
```
Then update **tests/web/locators.ts** (selectors) and **tests/web/pages/kumparan.page.ts** (flows: openLogin, login, search, openFirstArticle).

## Commands
```bash
npm run test:desktop
npm run test:mobile
npm run test:web          # both
npm run test:smoke        # @smoke subset
npx playwright test tests/web/search.spec.ts --project=desktop --headed
npx playwright test --ui
npm run report
```

## Layout
| Path | Purpose |
|---|---|
| docs/01-test-cases.md | Task 1: test cases, risks, assumptions, exit criteria |
| docs/02-automation-strategy.md | Task 2: parallel, cleanup, timeouts, retries, flaky handling |
| docs/04-execution-report.md | Execution results / defects (fill in after running) |
| tests/web/locators.ts | All selectors ([data-qa-id] first, role/text fallbacks) |
| tests/web/pages/ | Page object |
| tests/web/fixtures/ | `app` (anonymous) and `authedApp` (logged-in) fixtures, fresh context per test |
| tests/web/auth.setup.ts | Login once per device, saves .auth/*.json |
| tests/web/*.spec.ts | Specs: navigation, search, auth, article-actions |

Without credentials, authenticated tests are skipped (not failed).
