# Buyer Features Report

_BharatMandi Native App_

## Overview

This report outlines the current state of Buyer-focused features in the React Native application, identifying incomplete implementations, hardcoded values, and broken or missing functionalities. Based on project priorities, features are structured by **Implementation Readiness**.

## Priority 1: Immediate Implementation (Pre-Authentication)

These features should be implemented immediately, as they do not depend on User Context/Authentication.

### 1. Buyer Dashboard

- **Empty State Feed:** The Marketplace section displays a static "Discover fresh produce directly from farmers!" empty state. This needs to be implemented readily to display a dynamic feed of recommended or trending products.

### 2. Product Details

- **Add to Cart UI & Functionality:** The cart icon button in the header is completely non-functional. Furthermore, there is no functionality to actually add a quantity of items to the cart. This local functionality must be implemented.
- **Stock Status Logic:** The "low stock" warning logic is statically hardcoded to check for `< 5`. This logic must be improved to reflect more accurate backend thresholds.

### 3. Checkout Flow

- **Quantity Adjustments:** As per the current application, the user cannot increase buying quantity at all. The checkout components must be updated to allow quantity adjustments before finalizing the transaction.
- **Dynamic ONDC Payload Implementation:** The `CheckoutScreen` uses a hardcoded `sessionId` and `flowId`, and the application constructs a custom payload with hardcoded values to submit to the backend in Step 3. These must be replaced with proper dynamic resolution according to the full ONDC flow, ensuring we only pause improvements that are heavily dependent on User Context.

## Priority 2: Deferred Implementation (Post-Authentication)

These features rely heavily on User Context and are designated to be implemented at the very end of application development.

### 1. Authentication & User Context

- **Missing Real Authentication:** The `LoginScreen` and `RegisterScreen` currently only simulate login. Integration with an authentication provider (e.g., Supabase Auth), secure sessions, and API authorization headers will be implemented last.
- **Hardcoded User IDs:** The `BuyerDashboard` uses a hardcoded ID (`const buyerId = "seller_123";`) to fetch statistics. This will be replaced with actual user IDs once Auth is implemented.

### 2. Wishlist Functionality

- **Dashboard Static Feed:** The `statsGrid` displays "Wishlist Items: 0", which is hardcoded.
- **Save to Wishlist:** The heart icon button in the footer of the `ProductDetailScreen` lacks functionality.
- _Note: Both Wishlist-related features will be implemented after User Context is introduced for User-based wishlisting._

### 3. User-Context Checkout Features

- **Profiles and Addresses:** The `shippingInfo` state is initialized with mock data. Although users can edit this in Step 2, fetching saved addresses securely from the user's profile and saving them automatically during checkout is paused until User Context is completed.

## Recommendations for Next Steps

1. **Implement Dynamic Empty State** on the Buyer Dashboard to display a feed of products.
2. **Build Local Cart State** to handle adding/adjusting product quantities.
3. **Enhance Checkout UI** to support quantity adjustments and remove non-User Context hardcoded payloads (like static session/flow IDs and payment/fulfillment static terms).
4. **Deferred Queue:** Keep Auth Provider connection, Context Provider creation, and Wishlist implementation securely queued for the final phase of development.
