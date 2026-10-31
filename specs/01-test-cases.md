# Manual Test Cases - Kumparan Public Website

**Platform:** Desktop Chrome (1280x720) and mobile Chromium Pixel 7 (412x915).
**Priority:** P0 = critical business flow; P1 = important; P2 = optional.
**Severity:** Critical = core service unusable; Major = important feature unusable; Minor = limited impact.
**Scope:** Public browsing only. Login, logout, and account-only features are excluded.

## Test Scenarios

### TC-NAV-01 - Homepage loads

- **Test Data:** `https://kumparan.com/`
- **Test Scenario:** Verify the public homepage loads and displays its main navigation and content.
- **Test Steps:**
	1. Open `https://kumparan.com/`.
	2. Observe the page title, header, and article feed.
- **Priority Level:** P0
- **Severity Level:** Critical
- **Expected Result:** The page loads successfully, the title identifies Kumparan, and the header and at least one article card are visible.

### TC-NAV-02 - Unknown URL

- **Test Data:** `https://kumparan.com/random-404`
- **Test Scenario:** Verify the site handles an unknown public route.
- **Test Steps:**
	1. Open `https://kumparan.com/random-404`.
- **Priority Level:** P1
- **Severity Level:** Minor
- **Expected Result:** A not-found page or message appears; the page is not blank and does not return a server error.

### TC-NAV-03 - Mobile layout

- **Test Data:** Homepage; desktop viewport 1280x720 and mobile viewport 412x915.
- **Test Scenario:** Verify public navigation and content remain usable on a mobile viewport.
- **Test Steps:**
	1. Open the homepage at desktop size.
	2. Resize the viewport to 412x915.
	3. Check the mobile menu and visible page content.
- **Priority Level:** P1
- **Severity Level:** Major
- **Expected Result:** Navigation and content fit the mobile viewport, remain reachable, and do not overlap or create unintended horizontal scrolling.

### TC-SRCH-01 - Search with a valid keyword

- **Test Data:** Search term `jakarta`.
- **Test Scenario:** Verify a common keyword returns public search results.
- **Test Steps:**
	1. Open the homepage.
	2. Enter `jakarta` in the search field.
	3. Submit the search.
- **Priority Level:** P0
- **Severity Level:** Major
- **Expected Result:** The search results page loads and displays results related to the query.

### TC-SRCH-02 - Search with no matching content

- **Test Data:** A unique query such as `qa-no-result-xyz98765`.
- **Test Scenario:** Verify the site handles a search that returns no matches.
- **Test Steps:**
	1. Open the homepage.
	2. Search for `qa-no-result-xyz98765`.
- **Priority Level:** P1
- **Severity Level:** Minor
- **Expected Result:** A clear empty state or no-results message appears without breaking the page.

### TC-ART-01 - Open an article from the homepage

- **Test Data:** The first visible article card; headline may vary.
- **Test Scenario:** Verify a public article opens from the homepage.
- **Test Steps:**
	1. Open the homepage.
	2. Select the first visible article card.
- **Priority Level:** P0
- **Severity Level:** Critical
- **Expected Result:** The browser opens the article page, and the article title and content are visible.

### TC-ACT-01 - Share an article and copy its link

- **Test Data:** The article opened in TC-ART-01.
- **Test Scenario:** Verify the public share menu and copy-link action.
- **Test Steps:**
	1. Open an article.
	2. Select Share.
	3. Select Copy link.
- **Priority Level:** P1
- **Severity Level:** Minor
- **Expected Result:** Share options appear, the article link is copied, and a confirmation is shown. No post or submission is made.
