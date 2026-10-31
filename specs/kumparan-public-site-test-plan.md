# Kumparan Public Website Test Plan

## Application Overview

Explore and validate Kumparan's publicly accessible website while signed out. Coverage focuses on public navigation, topic/news discovery, search, Video Story and Audio Story, responsive behavior, and clear authentication gates. Do not log in, register, submit credentials, or publish content. Content and trending items are dynamic; assert structure and behavior rather than fixed headlines. During exploration, third-party advertising and console warnings/errors appeared, and some content was not fully represented in accessibility snapshots, so avoid brittle assertions on ad content or a zero-console-error requirement.

## Test Scenarios

### 1. Homepage and Public Navigation

**Seed:** `tests/web/seed.spec.ts`

#### 1.1. Homepage renders and top-level navigation works

**File:** `tests/web/kumparan-homepage-navigation.spec.ts`

**Steps:**
  1. Open https://kumparan.com/ at desktop width while signed out.
    - expect: The Kumparan homepage loads with a page title, logo, search field, user actions, and primary navigation.
  2. Open the News category from the primary navigation.
    - expect: The browser navigates to /channel/news and a News heading and public content modules are visible.
  3. Use the site logo or Home control to return to the homepage.
    - expect: The homepage loads without requiring authentication.

#### 1.2. Open a public topic from a channel

**File:** `tests/web/kumparan-topic-page.spec.ts`

**Steps:**
  1. From the News channel, select a visible promoted topic such as Prabowo Lantik Pejabat Baru.
    - expect: The browser opens the corresponding public /topic/ page and displays the topic heading.
  2. Inspect the topic content and available related media controls.
    - expect: Public topic content is visible and any audio/player controls are operable without logging in.
  3. Use browser Back to return to the News channel.
    - expect: The News channel is restored and navigation remains usable.

#### 1.3. Trending discovery page loads

**File:** `tests/web/kumparan-trending.spec.ts`

**Steps:**
  1. Open Trending from the site navigation.
    - expect: The public /trending page loads with a Trending heading and category/navigation controls.
  2. Select an available category or topic filter if present.
    - expect: The selected filter is reflected in the page state or URL and the page remains usable.

#### 1.4. Theme toggle preserves content readability

**File:** `tests/web/kumparan-theme-toggle.spec.ts`

**Steps:**
  1. On the homepage, activate the moon/theme control.
    - expect: The theme changes without hiding or replacing the page content.
  2. Activate the control again and navigate to a public channel.
    - expect: The theme can be switched back and navigation remains readable and functional.

#### 1.5. Decline the notification prompt

**File:** `tests/web/kumparan-notification-prompt.spec.ts`

**Steps:**
  1. If the notification opt-in prompt appears, select TIDAK.
    - expect: The prompt closes and does not block search or navigation. No browser notification permission is granted.

### 2. Search

**Seed:** `tests/web/seed.spec.ts`

#### 2.1. Search suggestions lead to results

**File:** `tests/web/kumparan-search.spec.ts`

**Steps:**
  1. Focus the search field and enter a common term such as Prabowo.
    - expect: Autocomplete suggestions appear and the typed query remains visible.
  2. Select the exact matching suggestion.
    - expect: The URL includes the selected search term, a Hasil Pencarian heading appears, and result-type filters are available.
  3. Select Topik, then another available result type such as Konten or Video Story.
    - expect: The selected result type is reflected in the URL or active state and results remain associated with the query.

#### 2.2. Empty and whitespace-only search

**File:** `tests/web/kumparan-search-empty-query.spec.ts`

**Steps:**
  1. Clear the search field and attempt to submit with an empty value.
    - expect: The site does not navigate to a malformed query route or show a broken page.
  2. Enter only spaces and submit.
    - expect: Whitespace is trimmed or validation prevents an empty search; the page remains stable.

#### 2.3. Search with no matching content

**File:** `tests/web/kumparan-search-no-results.spec.ts`

**Steps:**
  1. Search for a unique nonsense term unlikely to match published content.
    - expect: A clear no-results state or an empty result list is shown without a loading error or unrelated results.
  2. Clear the query and enter a normal term.
    - expect: The user can recover to a normal search flow and suggestions/results are available.

### 3. Public Media and Content

**Seed:** `tests/web/seed.spec.ts`

#### 3.1. Video Story topic filtering

**File:** `tests/web/kumparan-video-story.spec.ts`

**Steps:**
  1. Open /video-story while signed out.
    - expect: The Video Story heading, topic chips, and video cards with titles and durations are visible.
  2. Select a topic chip such as Bolanita.
    - expect: The URL updates to the selected topic route, such as /video-story/bolanita, and matching video content is displayed.
  3. Open a video card and use its available playback controls.
    - expect: The video detail/player opens and controls respond without requiring an account.

#### 3.2. Audio Story playback and summary controls

**File:** `tests/web/kumparan-audio-story.spec.ts`

**Steps:**
  1. Open /audio-story and select a visible audio item.
    - expect: The audio detail page shows its title, duration, summary, and player controls.
  2. Use play/pause, seek, skip, and next/previous controls where available.
    - expect: Playback state and elapsed time update; seeking stays within the track duration and navigation changes the selected track.
  3. Expand the summary and use the copy-link share control.
    - expect: The summary expands and the share action copies or otherwise confirms the current audio-story URL.
  4. Select Baca Selengkapnya.
    - expect: The related public topic page opens.

#### 3.3. Content pagination and carousel controls

**File:** `tests/web/kumparan-homepage-carousel.spec.ts`

**Steps:**
  1. On the homepage or a channel with a carousel, select a different page or use the next control.
    - expect: The visible content changes to the selected carousel page without duplicating or losing the page shell.
  2. Use the previous control or return to the first page.
    - expect: The carousel returns to the expected earlier content and controls remain usable at the first/last boundary.

### 4. Signed-Out and Responsive Behavior

**Seed:** `tests/web/seed.spec.ts`

#### 4.1. Login page validates an empty form without submission

**File:** `tests/web/kumparan-login-gate.spec.ts`

**Steps:**
  1. Select Masuk from the public header.
    - expect: The public /login page opens with email and password fields and sign-in options.
  2. Leave credentials blank and inspect the submit control; do not enter credentials or submit.
    - expect: The submit control remains disabled or validation prevents submission. The test stops without logging in or registering.
  3. Inspect password visibility and recovery affordances without submitting.
    - expect: The password visibility control toggles masking, and Lupa Password points to the recovery flow.

#### 4.2. Authoring remains gated for signed-out visitors

**File:** `tests/web/kumparan-authoring-gate.spec.ts`

**Steps:**
  1. From a public page, select Buat Tulisan while signed out.
    - expect: The site requests sign-in before authoring; no editor is submitted and no content is published.
  2. Return to a public page without selecting Daftar Sekarang or completing authentication.
    - expect: The visitor remains signed out and public browsing continues.

#### 4.3. Mobile layout and touch navigation

**File:** `tests/web/kumparan-mobile-layout.spec.ts`

**Steps:**
  1. Set a mobile viewport around 390x844 and open the homepage.
    - expect: The logo, search, and essential navigation remain reachable; content fits without unintended horizontal overflow or overlapping controls.
  2. Open a channel, search for a term, and open a media item using touch-sized controls.
    - expect: Navigation and content remain usable at the narrow viewport; text and controls do not overlap or become unreachable.
  3. Open the login page from the mobile layout without entering credentials.
    - expect: The form fits the viewport and controls can be reached by scrolling where necessary.
