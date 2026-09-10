# Common Business Website Features Implementation Prompt

## Objective

Analyze the existing website and identify all common features that may be required for a professional, secure, modern and production ready business website.

Do not immediately implement every feature.

First, analyze the existing website and generate a complete selectable checkbox list of all available features.

The user must be able to select the required features from the checkbox list.

IMPORTANT:

Only implement the features selected by the user.

Do not implement unselected features.

Do not change existing website content, branding, business information, design language or functionality unless it is necessary for implementing a selected feature.

---

# STEP 1: Existing Website Audit

Before making any changes:

1. Analyze the complete existing website.
2. Identify the current pages.
3. Identify the current navigation.
4. Identify the existing header and footer.
5. Identify existing forms.
6. Identify existing authentication.
7. Identify existing payment functionality.
8. Identify existing integrations.
9. Identify existing policies.
10. Identify existing third party services.
11. Identify existing responsive behavior.
12. Identify existing technical infrastructure.

Do not duplicate features that already exist and are working correctly.

If a feature already exists, show it as:

[x] Already Available

If a feature is missing, show it as:

[ ] Not Available

If a feature exists but needs improvement, show:

[ ] Needs Improvement

---

# STEP 2: FEATURE SELECTION CHECKLIST

After auditing the website, generate a checkbox based feature selection list.

Group the features into categories.

Example:

## A. Website Appearance and UI

[ ] Light Mode

[ ] Dark Mode

[ ] System Theme Detection

[ ] Theme Toggle

[ ] Responsive Design

[ ] Mobile Navigation

[ ] Tablet Optimization

[ ] Desktop Optimization

[ ] Sticky Header

[ ] Back to Top Button

[ ] Loading Screen

[ ] Page Loading Indicator

[ ] Smooth Scrolling

[ ] Scroll Progress Indicator

[ ] Breadcrumb Navigation

[ ] Accessibility Improvements

---

## B. Branding and Website Identity

[ ] Favicon

[ ] Apple Touch Icon

[ ] Web App Manifest

[ ] Browser Theme Color

[ ] Company Logo

[ ] Logo Responsive Version

[ ] Social Sharing Image

[ ] Open Graph Image

[ ] Brand Metadata

[ ] Organization Schema

[ ] Website Schema

---

## C. Header and Navigation

[ ] Desktop Menu

[ ] Mobile Menu

[ ] Mega Menu

[ ] Dropdown Menu

[ ] Sticky Header

[ ] Transparent Header

[ ] Header on Scroll

[ ] Login Button

[ ] Register Button

[ ] User Profile Menu

[ ] Language Selector

[ ] Currency Selector

[ ] Search Function

[ ] CTA Button

[ ] Contact Button

---

## D. Footer

[ ] Multi Column Footer

[ ] Company Information

[ ] Quick Links

[ ] Services Links

[ ] Product Links

[ ] Contact Information

[ ] Phone Number

[ ] Email Address

[ ] Business Address

[ ] Google Maps Link

[ ] Social Media Links

[ ] Privacy Policy

[ ] Terms and Conditions

[ ] Refund and Cancellation Policy

[ ] Shipping Policy where applicable

[ ] Cookie Policy

[ ] Security Policy

[ ] Disclaimer

[ ] Accessibility Statement

[ ] Copyright Notice

[ ] Sitemap Link

[ ] Newsletter Subscription

---

## E. Legal and Policy Pages

[ ] Privacy Policy

[ ] Terms and Conditions

[ ] Terms of Service

[ ] Refund Policy

[ ] Cancellation Policy

[ ] Payment Policy

[ ] Shipping Policy

[ ] Return Policy

[ ] Cookie Policy

[ ] Security Policy

[ ] Disclaimer

[ ] Data Processing Policy

[ ] Acceptable Use Policy

[ ] User Agreement

Important:

Do not automatically generate legally binding claims.

If policy content is missing, create the page structure and clearly identify areas that require business specific or legal review.

Do not invent legal certifications or regulatory compliance.

---

# F. Authentication and User Account

[ ] Login

[ ] Logout

[ ] Registration

[ ] Forgot Password

[ ] Reset Password

[ ] Email Verification

[ ] Mobile OTP Verification

[ ] Two Factor Authentication

[ ] Google Login

[ ] Microsoft Login

[ ] Apple Login

[ ] User Profile

[ ] Edit Profile

[ ] Change Password

[ ] Account Settings

[ ] Delete Account

[ ] Account Deactivation

[ ] Session Management

[ ] Remember Me

[ ] Login Activity

[ ] Device Management

[ ] Role Based Access

[ ] Admin Login

[ ] User Dashboard

---

# G. Payment and E Commerce

Only show these features if the website actually requires payments.

[ ] Payment Gateway

[ ] Razorpay

[ ] Stripe

[ ] PayPal

[ ] Cashfree

[ ] PayU

[ ] UPI Payment

[ ] Credit Card Payment

[ ] Debit Card Payment

[ ] Net Banking

[ ] Wallet Payment

[ ] International Payment

[ ] Subscription Payment

[ ] Recurring Payment

[ ] One Time Payment

[ ] Payment Confirmation

[ ] Payment Failure Handling

[ ] Payment Retry

[ ] Payment History

[ ] Invoice Generation

[ ] Download Invoice

[ ] Email Invoice

[ ] Refund Request

[ ] Refund Status

[ ] Coupon Code

[ ] Discount Code

[ ] Tax / GST Calculation

[ ] Cart

[ ] Checkout

[ ] Order History

[ ] Order Status

[ ] Transaction ID Tracking

Important:

Do not activate or configure a real payment gateway without the required credentials and user approval.

Use environment variables for all API keys and secret credentials.

Never expose payment secrets in frontend code.

---

# H. Contact and Lead Generation

[ ] Contact Form

[ ] Inquiry Form

[ ] Lead Form

[ ] Quote Request

[ ] Callback Request

[ ] Book Appointment

[ ] Consultation Request

[ ] Newsletter Subscription

[ ] Email Subscription

[ ] WhatsApp Contact

[ ] WhatsApp Floating Button

[ ] Click to Call

[ ] Click to Email

[ ] Contact Form Validation

[ ] Spam Protection

[ ] CAPTCHA

[ ] reCAPTCHA

[ ] Cloudflare Turnstile

[ ] Honeypot Protection

[ ] Lead Email Notification

[ ] Auto Reply Email

[ ] CRM Integration

[ ] Lead Database

---

# I. Google and Location Features

[ ] Google Maps

[ ] Google Maps Embed

[ ] Multiple Office Locations

[ ] Location Marker

[ ] Get Directions

[ ] Business Address

[ ] Google Business Profile Link

[ ] LocalBusiness Schema

[ ] Opening Hours

[ ] Contact Information

[ ] WhatsApp Location Sharing

Do not display a fake location.

Do not create fake business locations.

---

# J. Social Media Integration

[ ] Facebook

[ ] Instagram

[ ] LinkedIn

[ ] YouTube

[ ] X

[ ] WhatsApp

[ ] Telegram

[ ] Social Sharing

[ ] Social Follow Buttons

[ ] Social Media Feed

[ ] Open Graph

[ ] Twitter/X Cards

[ ] WhatsApp Link Preview

---

# K. Communication

[ ] Contact Email

[ ] Transactional Email

[ ] SMTP Configuration

[ ] Email Templates

[ ] Welcome Email

[ ] Verification Email

[ ] Password Reset Email

[ ] Payment Confirmation Email

[ ] Invoice Email

[ ] Contact Form Notification

[ ] Admin Notification

[ ] Newsletter

[ ] WhatsApp Notification

[ ] SMS Notification

[ ] OTP

[ ] Push Notifications

---

# L. Cookie and Privacy

[ ] Cookie Consent Banner

[ ] Cookie Preferences

[ ] Necessary Cookies

[ ] Analytics Cookies

[ ] Marketing Cookies

[ ] Cookie Management

[ ] Privacy Preference Center

[ ] Do Not Sell / Share option where legally applicable

[ ] Consent Logging

Do not collect unnecessary personal information.

Do not enable marketing tracking without appropriate consent where required.

---

# M. Analytics and Tracking

[ ] Google Analytics 4

[ ] Google Tag Manager

[ ] Google Search Console Verification

[ ] Microsoft Clarity

[ ] Meta Pixel

[ ] LinkedIn Insight Tag

[ ] Conversion Tracking

[ ] Form Submission Tracking

[ ] Button Click Tracking

[ ] Phone Click Tracking

[ ] WhatsApp Click Tracking

[ ] Payment Conversion Tracking

[ ] User Journey Tracking

Do not add duplicate analytics scripts.

Do not expose analytics credentials.

---

# N. SEO Related Common Features

[ ] Dynamic Page Title

[ ] Meta Description

[ ] Canonical URL

[ ] XML Sitemap

[ ] Robots.txt

[ ] Open Graph

[ ] Twitter/X Metadata

[ ] Schema Markup

[ ] Organization Schema

[ ] LocalBusiness Schema

[ ] WebSite Schema

[ ] WebPage Schema

[ ] Breadcrumb Schema

[ ] Service Schema

[ ] Product Schema

[ ] FAQ Schema where applicable

[ ] Image ALT Attributes

[ ] SEO Friendly URLs

[ ] Internal Linking

[ ] Breadcrumb Navigation

[ ] 404 SEO Page

[ ] Redirect Management

---

# O. AEO / AIO / GEO

[ ] Answer Engine Optimization

[ ] AI Search Optimization

[ ] Generative Engine Optimization

[ ] Entity Optimization

[ ] Semantic HTML

[ ] Structured Content

[ ] Organization Entity Signals

[ ] Service Entity Signals

[ ] Location Entity Signals

[ ] AI Friendly Metadata

[ ] Structured Data

[ ] Knowledge Graph Friendly Structure

Do not create artificial or misleading information for AI search engines.

---

# P. Security

[ ] HTTPS Verification

[ ] Security Headers

[ ] Content Security Policy

[ ] HSTS

[ ] X Content Type Options

[ ] Referrer Policy

[ ] Permissions Policy

[ ] Secure Cookies

[ ] CSRF Protection

[ ] XSS Protection

[ ] SQL Injection Protection

[ ] Rate Limiting

[ ] Brute Force Protection

[ ] Login Attempt Limiting

[ ] API Authentication

[ ] API Authorization

[ ] Input Validation

[ ] Output Sanitization

[ ] File Upload Security

[ ] Malware File Protection

[ ] Secure Password Hashing

[ ] Session Security

[ ] Admin Security

[ ] Security Logging

[ ] Error Handling

Do not expose sensitive server errors to users.

Never expose API keys, database credentials or secret tokens in frontend code.

---

# Q. Performance

[ ] Image Optimization

[ ] WebP

[ ] AVIF

[ ] Lazy Loading

[ ] Responsive Images

[ ] CSS Optimization

[ ] JavaScript Optimization

[ ] Code Splitting

[ ] Browser Caching

[ ] Server Caching

[ ] CDN

[ ] Compression

[ ] Font Optimization

[ ] Preload Critical Resources

[ ] Remove Unused CSS

[ ] Remove Unused JavaScript

[ ] Core Web Vitals Optimization

[ ] LCP Optimization

[ ] CLS Optimization

[ ] INP Optimization

---

# R. Error and System Pages

[ ] Custom 404 Page

[ ] 403 Page

[ ] 500 Error Page

[ ] Maintenance Page

[ ] Offline Page

[ ] Network Error Handling

[ ] API Error Handling

[ ] Payment Error Handling

[ ] Form Error Handling

[ ] Friendly Error Messages

---

# S. Forms

[ ] Form Validation

[ ] Required Field Validation

[ ] Email Validation

[ ] Phone Validation

[ ] Password Strength Validation

[ ] File Upload

[ ] File Type Validation

[ ] File Size Validation

[ ] Spam Protection

[ ] CAPTCHA

[ ] Success Message

[ ] Error Message

[ ] Form Submission Tracking

[ ] Email Notification

[ ] Database Storage

[ ] CRM Integration

---

# T. File and Document Features

[ ] File Upload

[ ] File Download

[ ] PDF Download

[ ] Invoice Download

[ ] Document Preview

[ ] Image Preview

[ ] Secure File Access

[ ] Private Documents

[ ] Document Expiry

[ ] File Size Restrictions

[ ] Allowed File Type Restrictions

---

# U. Search and Discovery

[ ] Website Search

[ ] Search Suggestions

[ ] Search Results Page

[ ] Search Filters

[ ] Category Filters

[ ] Product Filters

[ ] Service Filters

[ ] Search Pagination

[ ] No Results Handling

---

# V. Blog and Content

Only implement if the website has or requires content publishing.

[ ] Blog

[ ] Categories

[ ] Tags

[ ] Author Pages

[ ] Related Articles

[ ] Search

[ ] Pagination

[ ] Article Schema

[ ] Author Schema

[ ] Social Sharing

[ ] Reading Time

[ ] Table of Contents

[ ] RSS Feed

---

# W. Multi Language and Localization

[ ] Multi Language

[ ] Language Selector

[ ] Translation Management

[ ] hreflang

[ ] Localized URLs

[ ] Localized Metadata

[ ] Currency Selector

[ ] Time Zone

[ ] Date Format

[ ] Number Format

Only implement multilingual functionality if required.

---

# X. Admin and Management

[ ] Admin Dashboard

[ ] User Management

[ ] Role Management

[ ] Permission Management

[ ] Content Management

[ ] Form Submission Management

[ ] Lead Management

[ ] Order Management

[ ] Payment Management

[ ] Invoice Management

[ ] Notification Management

[ ] Analytics Dashboard

[ ] Activity Logs

[ ] Audit Logs

[ ] System Settings

---

# Y. Business Integrations

[ ] CRM

[ ] ERP

[ ] WhatsApp API

[ ] SMS Gateway

[ ] Email Service

[ ] Payment Gateway

[ ] Google Maps

[ ] Google Analytics

[ ] Google Search Console

[ ] Meta Pixel

[ ] Calendar Integration

[ ] Appointment System

[ ] Cloud Storage

[ ] Webhooks

[ ] REST API

[ ] Third Party API Integration

---

# Z. Backup and Reliability

[ ] Database Backup

[ ] Automated Backup

[ ] File Backup

[ ] Backup Retention

[ ] Restore Procedure

[ ] Error Logging

[ ] Application Monitoring

[ ] Uptime Monitoring

[ ] Database Monitoring

[ ] API Monitoring

---

# STEP 3: USER SELECTION

After generating the complete checkbox list, STOP.

Do not implement anything yet.

Wait for the user to select the required features.

The user may select individual features or entire categories.

Example:

Selected:

[x] Dark Mode

[x] Favicon

[x] Mobile Menu

[x] Privacy Policy

[x] Terms and Conditions

[x] Google Maps

[x] Razorpay

[x] Login

[x] Forgot Password

[x] Contact Form

[x] WhatsApp

[x] Google Analytics

The user may also say:

"Implement all selected features."

Only then begin implementation.

---

# STEP 4: Implementation Rules

Once the user selects the features:

1. Implement only selected features.
2. Do not implement unselected features.
3. Do not change unrelated website functionality.
4. Do not redesign the website.
5. Do not change the existing brand identity.
6. Do not rewrite existing business content.
7. Reuse existing components wherever possible.
8. Follow the existing technology stack.
9. Maintain responsive behavior.
10. Maintain accessibility.
11. Maintain SEO.
12. Maintain performance.
13. Maintain security.

Before creating a new component, check whether an existing component can be reused.

Avoid unnecessary dependencies.

---

# STEP 5: Feature Dependency Check

Before implementation, identify dependencies.

For example:

Payment Gateway may require:

• Checkout

• Payment success page

• Payment failure page

• Payment verification

• Transaction storage

• Invoice

• Refund handling

Authentication may require:

• Login

• Registration

• Forgot password

• Reset password

• Session management

Google Maps may require:

• Google Maps API key

Analytics may require:

• Tracking ID

Email may require:

• SMTP or email service credentials

Show these dependencies before implementation.

If credentials are required, create secure environment variable placeholders.

Do not invent credentials.

---

# STEP 6: Configuration and Environment Variables

All sensitive configuration must use environment variables.

Examples:

DATABASE_URL

GOOGLE_MAPS_API_KEY

RAZORPAY_KEY_ID

RAZORPAY_KEY_SECRET

STRIPE_SECRET_KEY

SMTP_HOST

SMTP_USER

SMTP_PASSWORD

GOOGLE_CLIENT_ID

GOOGLE_CLIENT_SECRET

Never hardcode secrets into frontend code.

Never commit secrets into the repository.

Provide a clear `.env.example` structure where appropriate.

---

# STEP 7: Testing

After implementation, test every selected feature.

Check:

• Desktop

• Mobile

• Tablet

• Chrome

• Firefox

• Safari where applicable

• Forms

• Authentication

• Payments

• Navigation

• Footer

• Policies

• Google Maps

• Emails

• API integrations

• Error handling

• Security

• SEO

• Performance

Do not mark a feature as completed until it has been tested.

---

# STEP 8: Final Feature Report

After implementation provide:

## Implemented Features

List every selected and successfully implemented feature.

## Already Existing

List features that were already available.

## Not Selected

List features intentionally not implemented.

## Requires Configuration

List features that require:

• API keys

• Credentials

• Domain configuration

• DNS configuration

• Payment gateway activation

• SMTP configuration

• Google services configuration

## Testing Status

For each selected feature show:

Feature

Status

Test Result

Notes

---

# FINAL RULE

This prompt must work as a reusable common feature framework for different business websites.

The workflow must always be:

AUDIT → CHECKBOX FEATURE LIST → USER SELECTION → DEPENDENCY CHECK → IMPLEMENT SELECTED FEATURES ONLY → TEST → FINAL REPORT

Never assume that every common feature is required.

Never implement features before the user selects them.

Never change existing business content unless the user specifically requests it.

Never expose secrets.

Never create fake business information.

Never create fake reviews, locations, certifications, policies or legal claims.

Preserve the existing website's design language and business identity while adding the selected functionality.