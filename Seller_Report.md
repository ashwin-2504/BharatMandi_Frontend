# Seller Features Report

_BharatMandi Native App_

## Overview

This report outlines the current state of Seller-focused features in the React Native application. Based on project priorities, these features are structured by their **Implementation Readiness**.

## Priority 1: Immediate Implementation (Pre-Authentication)

These features do not depend on User Context and are designated to be implemented next moving forward.

### 1. Seller Dashboard

- **Non-Functional "View All" Buttons:** The "View All Products" and "View All Orders" buttons render when lists exceed 5 items, but neither button has an `onPress` handler. They currently do nothing when tapped.
- **Missing Navigation:** There are no dedicated screens built yet for viewing the full list of a seller's products or orders (e.g., `SellerProductsScreen`, `SellerOrdersScreen`). These need to be implemented.

### 2. Add Product Flow

- **Missing Image Picker:** The "Image URL" field in `AddProductScreen` is a simple text input requiring the user to manually paste a URL. This needs to be replaced with a native image picker (`expo-image-picker`) that temporarily stores or manages images before auth is added.
- **Basic Validation:** Form validation manually checks if fields are truthy but lacks thorough typing validation (e.g., ensuring price is a valid positive float before submission).

### 3. Order Management

- **No Order Status Updates:** Sellers can view their recent orders via the `OrderItem` component, but there is no functionality for a seller to click into an order and update its status (e.g., changing from `PENDING` to `SHIPPED` or `DELIVERED`). An `OrderDetailsScreen` for sellers with status mutation capabilities should be built next.

## Priority 2: Deferred Implementation (Post-Authentication)

These features rely heavily on User Context and are designated to be implemented at the very last stage of application development.

### 1. Authentication & User Context

- **No Actual Auth Flow:** The `Login` and `Register` screens mock the authentication process without securely logging the user in or saving sessions.
- **Hardcoded Seller ID:** `SellerDashboard` and `AddProductScreen` use a hardcoded identifier (`"seller_123"`) for fetching data and creating products. This must be dynamically pulled from the authenticated user's session later.
- **Unsecured API:** `apiService.js` lacks Bearer tokens or session headers to authenticate backend actions securely.

## Recommendations for Next Steps

1. **Create Dedicated List Screens:** Build `SellerProductsList` and `SellerOrdersList` screens and connect them to the dashboard's "View All" buttons.
2. **Add Image Picker to Product Flow:** Integrate `expo-image-picker` into the Add Product screen.
3. **Build Order Details Screen:** Create a seller-specific order view that allows merchants to update fulfillment statuses.
4. **Deferred Queue:** Keep actual Supabase Auth integration, session management, and dynamic `sellerId` passing securely queued for the final phase of development.
