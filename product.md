CK HAIR — COMPLETE PREMIUM E-COMMERCE WEBSITE & ADMIN SYSTEM
=============================================================

PROJECT TYPE
------------
Build a complete premium e-commerce website and administration dashboard
for a hair brand called "CK Hair".

CK Hair sells premium hair products including wigs, bundles, closures,
frontals, extensions, ponytails and related hair products.

The website must feel like a REAL premium beauty/fashion brand, not a
generic e-commerce template.

Use the provided reference image as visual inspiration for:
- Clean luxury layout
- Large hero section
- Premium product cards
- Generous whitespace
- Minimal navigation
- Editorial photography
- Elegant typography
- Simple black/white visual language

DO NOT copy the reference brand, logo, text, exact images, or exact layout.

The brand is CK Hair and should have its own visual identity.


=============================================================
1. PRIMARY OBJECTIVES
=============================================================

Build two major experiences:

A. PUBLIC CUSTOMER STOREFRONT
B. SECURE ADMIN DASHBOARD

The customer should be able to:

- Browse products
- Search products
- Filter products
- View product details
- Select product variants
- Add products to cart
- Purchase available products
- Place pre-orders
- Enter delivery/customer information
- Receive CK Hair bank/account payment details
- Submit an order
- Open WhatsApp with a pre-generated order message
- Track order status where applicable

The administrator should be able to:

- Login securely
- Manage products
- Add products
- Edit products
- Disable products
- Enable products
- Manage stock
- Enable/disable pre-orders
- Set preorder fulfillment periods
- Manage orders
- Confirm payments
- Change order statuses
- Mark orders as completed
- Manage customers
- Manage payment account details
- Manage WhatsApp number
- Manage store information
- Manage homepage content
- Enable/disable the entire store
- View analytics
- Manage categories
- Manage featured products
- Manage bestseller products
- Manage promotional banners


=============================================================
2. RECOMMENDED TECHNOLOGY
=============================================================

Use:

Frontend:
- Next.js
- TypeScript
- Tailwind CSS
- React
- Responsive/mobile-first UI

Backend:
- Next.js API routes / Server Actions
- Prisma ORM

Database:
- PostgreSQL or MySQL

Authentication:
- Secure admin authentication
- Protected admin routes
- Password hashing
- Session-based authentication or a secure authentication library

Images:
- Cloudinary, S3-compatible storage, or another configurable image
  storage provider

Architecture must be clean and production-ready.

Do not hardcode business data into components.

All store configuration, products, orders and settings must come from
the database.


=============================================================
3. PROJECT STRUCTURE
=============================================================

Use a structure similar to:

/app
  /(store)
    page.tsx
    shop/
    shop/[category]/
    product/[slug]/
    collections/
    about/
    contact/
    cart/
    checkout/
    order-confirmation/
    preorder/
  
  /admin
    login/
    dashboard/
    products/
    products/new/
    products/[id]/
    categories/
    orders/
    orders/[id]/
    customers/
    analytics/
    homepage/
    store-settings/
    payment-settings/
    settings/

/components
  /store
  /admin
  /ui

/lib
  prisma.ts
  auth.ts
  whatsapp.ts
  orders.ts
  products.ts
  settings.ts

/prisma
  schema.prisma
  seed.ts

/public
  images/


=============================================================
4. BRAND IDENTITY
=============================================================

Brand Name:

CK HAIR

Brand positioning:

Premium hair for women who value quality, confidence and effortless beauty.

Brand personality:

- Elegant
- Premium
- Feminine
- Confident
- Modern
- Sophisticated
- Trustworthy

Suggested brand messaging:

Primary headline:

"LUXURY HAIR. EFFORTLESS CONFIDENCE."

Alternative:

"Elevate Your Beauty."

Supporting text:

"Premium hair crafted to elevate your everyday beauty."

Use refined, editorial typography.

Recommended typography direction:

Headings:
- Elegant modern serif OR sophisticated geometric display font

Body:
- Clean modern sans-serif

Do not use childish, playful or overly decorative fonts.

Use typography with strong hierarchy.


=============================================================
5. COLOR DIRECTION
=============================================================

Primary:

- Ivory / warm white
- Soft white
- Black
- Charcoal

Secondary:

- Nude
- Warm beige
- Champagne
- Very subtle muted gold

Do not overuse gold.

The website should primarily feel black, white and warm neutral.

Use subtle borders and shadows rather than heavy visual effects.


=============================================================
6. GLOBAL UI STYLE
=============================================================

The storefront must look expensive.

Use:

- Large whitespace
- Strong typography
- Editorial images
- Soft shadows
- Minimal borders
- Elegant rounded buttons
- Smooth hover states
- Subtle animations
- Large imagery
- Consistent spacing

Avoid:

- Generic SaaS cards
- Excessive gradients
- Neon colors
- Excessive rounded corners
- Excessive shadows
- Crowded layouts
- Huge unnecessary icons
- Cheap-looking templates

The design should feel similar to a luxury beauty/fashion store.


=============================================================
7. ANNOUNCEMENT BAR
=============================================================

Add an optional announcement bar at the top.

Example:

"FREE DELIVERY ON ORDERS ABOVE ₦500,000"

The announcement bar must be manageable from the admin dashboard.

Admin can:

- Enable
- Disable
- Change text


=============================================================
8. HEADER
=============================================================

Desktop header:

LEFT:
CK HAIR logo

CENTER:
Home
Shop
Collections
About
Contact

RIGHT:
Search icon
Account icon
Shopping bag icon

Header should be sticky.

On scroll:

- Slight background change
- Subtle shadow/border
- Smooth transition

Mobile:

CK HAIR logo
Search
Cart
Menu

Mobile menu:

Home
Shop
Collections
About
Contact
Pre-Order
Account


=============================================================
9. HOMEPAGE HERO
=============================================================

Create a large luxury editorial hero section.

Headline:

"LUXURY HAIR.
EFFORTLESS CONFIDENCE."

Supporting text:

"Premium hair crafted to elevate your everyday beauty."

Buttons:

SHOP COLLECTION

PRE-ORDER

Use a high-quality model/hair image.

Hero should have:

- Large image
- Strong typography
- Generous whitespace
- Elegant CTA
- Responsive mobile layout

Do not make it look like a generic slider.

The hero should immediately communicate that CK Hair is premium.


=============================================================
10. BENEFITS SECTION
=============================================================

Create a 3 or 4 column benefits section.

Example:

PREMIUM QUALITY

"Carefully selected hair for a luxurious finish."

VERSATILE STYLES

"Designed for the looks, moments and occasions that matter."

SECURE ORDERING

"Simple ordering with personalized WhatsApp confirmation."

RELIABLE DELIVERY

"Every order carefully prepared and dispatched."

Use minimal line icons.

On mobile, stack vertically or use a horizontal scroll.


=============================================================
11. SHOP BY CATEGORY
=============================================================

Create a visual category section.

Categories:

- Wigs
- Bundles
- Closures
- Frontals
- Extensions
- Ponytails
- Hair Care
- New Arrivals

Each category should have:

- Image
- Name
- Short description
- View Collection CTA

Images should feel editorial rather than generic stock photography.


=============================================================
12. FEATURED PRODUCTS
=============================================================

Homepage section:

"SHOP THE COLLECTION"

Display selected products.

Product card must include:

- Product image
- Product name
- Price
- Previous price if discounted
- Badge
- Availability
- CTA

Possible badges:

BESTSELLER
NEW
SALE
PRE-ORDER

Buttons:

ADD TO BAG

VIEW PRODUCT


=============================================================
13. DEMO PRODUCTS
=============================================================

Seed the application with realistic demo products.

Create at least 12 products.

Example:

1. CK Signature Body Wave
Price: ₦185,000
Category: Bundles
Badge: BESTSELLER

2. Brazilian Deep Wave
Price: ₦220,000
Category: Bundles

3. Luxury Bone Straight
Price: ₦200,000
Category: Bundles

4. HD Lace Frontal
Price: ₦125,000
Category: Frontals

5. Premium Closure
Price: ₦95,000
Category: Closures

6. Natural Kinky Curly
Price: ₦210,000
Category: Bundles

7. CK Luxury Body Wave Wig
Price: ₦320,000
Category: Wigs
Badge: BESTSELLER

8. Silky Straight Closure Wig
Price: ₦295,000
Category: Wigs

9. Raw Burmese Curly
Price: ₦450,000
Category: Bundles
Availability: PRE-ORDER

10. Natural Black Ponytail
Price: ₦85,000
Category: Ponytails

11. HD Lace 13x4 Frontal
Price: ₦145,000
Category: Frontals

12. Luxury Deep Curl Wig
Price: ₦380,000
Category: Wigs
Availability: PRE-ORDER


=============================================================
14. PRODUCT DATA
=============================================================

Each product should support:

- ID
- Name
- Slug
- Description
- Short description
- Price
- Compare-at price
- SKU
- Category
- Images
- Stock quantity
- Product status
- Hair type
- Texture
- Lengths
- Colors
- Featured
- Bestseller
- New
- Preorder enabled
- Preorder duration
- Created date
- Updated date


=============================================================
15. PRODUCT AVAILABILITY
=============================================================

Products support three major availability states:

IN STOCK

PRE-ORDER

OUT OF STOCK

Additionally, products have an ACTIVE/DISABLED visibility state.

Example:

Product:
CK Luxury Wig

Availability:
PRE-ORDER

Status:
ACTIVE

This means the product is visible and can be ordered,
but the customer understands that it is a preorder.


=============================================================
16. PRODUCT PAGE
=============================================================

Create a premium product details page.

LEFT:

Large image gallery.

RIGHT:

Product name

Badge

Price

Compare-at price

Short description

Availability

Variant selections

Quantity

CTA

Example:

CK Signature Body Wave

₦185,000

★★★★★

Available

Length:
14" 16" 18" 20" 22"

Texture:
Body Wave

Color:
Natural Black

Quantity:

[-] 1 [+]


CTA:

ADD TO BAG


If preorder:

PRE-ORDER NOW


Below:

Description
Hair Details
Care Instructions
Shipping
Returns


=============================================================
17. PRODUCT VARIANTS
=============================================================

Support variants.

Examples:

Length:
14"
16"
18"
20"
22"

Color:
Natural Black
Jet Black
Brown

Texture:
Body Wave
Deep Wave
Straight
Kinky Curly

Variant-specific pricing should be supported where needed.

Variant-specific stock should also be supported where practical.


=============================================================
18. PRE-ORDER SYSTEM
=============================================================

THIS IS A CORE FEATURE.

Products can be configured as preorder products.

Admin can enable:

PRE-ORDER

for any product.

When preorder is enabled, admin must be able to define:

- Estimated fulfillment period
- Optional preorder closing date
- Optional preorder quantity limit
- Optional preorder deposit/full-payment rule

Example:

Estimated fulfillment:

"2–4 weeks"

OR

"14–21 business days"


=============================================================
19. PRE-ORDER CUSTOMER EXPERIENCE
=============================================================

When a customer visits a preorder product:

Show a highly visible label:

PRE-ORDER

Display:

"Available for pre-order"

Then show:

"Estimated fulfillment: 2–4 weeks"

Add explanatory text:

"This item is currently available for pre-order. Your order will be
processed according to the estimated fulfillment timeline."

CTA:

PRE-ORDER NOW


Do not make preorder products look exactly like normal in-stock products.


=============================================================
20. PRE-ORDER CHECKOUT
=============================================================

When a preorder item is added to cart:

The cart must clearly indicate:

PRE-ORDER

Example:

CK Luxury Deep Curl Wig
₦380,000

PRE-ORDER

Estimated fulfillment:
2–4 weeks


At checkout, display a clear notice:

"Please note: This order contains a pre-order item. Fulfillment will
follow the estimated preorder timeline shown above."


Customer must acknowledge the preorder condition before submitting.

Checkbox:

"I understand that this is a pre-order and fulfillment may take the
estimated period stated above."


The customer cannot continue until this is checked.


=============================================================
21. PRE-ORDER ORDER STATUS
=============================================================

Pre-orders need their own lifecycle.

Recommended:

PRE-ORDER PLACED
        ↓
AWAITING PAYMENT
        ↓
PAYMENT CONFIRMED
        ↓
PRE-ORDER PROCESSING
        ↓
STOCK ARRIVED
        ↓
PREPARING ORDER
        ↓
READY FOR DELIVERY
        ↓
SHIPPED
        ↓
COMPLETED


For regular orders:

ORDER PLACED
        ↓
AWAITING PAYMENT
        ↓
PAYMENT CONFIRMED
        ↓
PROCESSING
        ↓
READY FOR DELIVERY
        ↓
SHIPPED
        ↓
COMPLETED


=============================================================
22. IMPORTANT PAYMENT MODEL
=============================================================

DO NOT integrate Paystack or Flutterwave initially.

The client wants customers to pay directly into CK Hair's account.

The system should therefore use:

ORDER → BANK TRANSFER → WHATSAPP CONFIRMATION


This keeps the MVP simple and matches the client's current business
process.

The architecture should still be designed so a payment gateway can be
added later without rebuilding the order system.


=============================================================
23. PAYMENT FLOW
=============================================================

Customer:

1. Selects product
2. Adds product to cart
3. Goes to checkout
4. Enters customer information
5. Reviews order
6. Submits order

System creates the order.

Order status:

AWAITING PAYMENT

Then display payment details.

Example:

PAYMENT INFORMATION

Bank:
GTBank

Account Name:
CK Hair

Account Number:
0123456789

Amount:
₦380,000


Button:

COPY ACCOUNT NUMBER


Instructions:

"Please make payment to the account above and send your payment
confirmation to CK Hair via WhatsApp."

Button:

SEND PAYMENT CONFIRMATION ON WHATSAPP


=============================================================
24. PAYMENT SETTINGS
=============================================================

Payment details MUST NOT be hardcoded.

Admin dashboard must have:

Payment Settings

Fields:

Bank Name
Account Name
Account Number

Payment Instructions

WhatsApp Number

WhatsApp Message Template


Example:

Bank:
GTBank

Account Name:
CK Hair Limited

Account Number:
0123456789

WhatsApp:
2348012345678


If admin changes these values, checkout automatically uses the new
values.


=============================================================
25. ORDER CREATION
=============================================================

When the customer submits checkout:

Generate a unique order number.

Format:

CKH-20260831-001

or:

CKH-260831-001


Store:

Order ID
Customer
Items
Variants
Quantity
Unit price
Total
Order type
Payment status
Order status
Delivery information
Customer notes
Created date


Order type:

REGULAR

or

PRE-ORDER


=============================================================
26. WHATSAPP INTEGRATION
=============================================================

WhatsApp should be an important part of the order workflow.

After order creation, generate a WhatsApp message.

Example:

Hello CK Hair,

I have placed an order.

Order #: CKH-20260831-001

Order Type:
PRE-ORDER

Products:

1x CK Luxury Deep Curl Wig
Length: 20"
Color: Natural Black

Total:
₦380,000

Customer:
Jane Doe

Phone:
080XXXXXXXX

Delivery:
Lekki, Lagos

I have made payment and will send my payment confirmation.

Thank you.


Open WhatsApp using the configured CK Hair WhatsApp number.


=============================================================
27. WHATSAPP BUTTONS
=============================================================

Create WhatsApp CTAs in relevant locations:

- Contact page
- Product page
- Checkout
- Order confirmation
- Admin order page

Admin order page:

CONTACT CUSTOMER ON WHATSAPP


The WhatsApp message should contain the order number and relevant
customer information.


=============================================================
28. ORDER CONFIRMATION
=============================================================

After submitting the order:

Show:

ORDER RECEIVED

"Thank you for shopping with CK Hair."

Order:

#CKH-20260831-001

Status:

AWAITING PAYMENT


Display:

PAYMENT INFORMATION

Bank
Account name
Account number
Amount


Buttons:

COPY ACCOUNT NUMBER

SEND PAYMENT CONFIRMATION ON WHATSAPP

CONTINUE SHOPPING


=============================================================
29. ORDER STATUS SYSTEM
=============================================================

Regular orders:

PENDING
AWAITING PAYMENT
PAYMENT CONFIRMED
PROCESSING
READY FOR DELIVERY
SHIPPED
COMPLETED
CANCELLED


Preorders:

PRE-ORDER PLACED
AWAITING PAYMENT
PAYMENT CONFIRMED
PRE-ORDER PROCESSING
STOCK ARRIVED
PREPARING ORDER
READY FOR DELIVERY
SHIPPED
COMPLETED
CANCELLED


Admin can update the status.

Every status change should be timestamped.


=============================================================
30. PAYMENT STATUS
=============================================================

Keep PAYMENT STATUS separate from ORDER STATUS.

Payment statuses:

UNPAID
PAYMENT_SUBMITTED
PAYMENT_CONFIRMED
PAYMENT_REJECTED
REFUNDED


This is important.

Example:

Order status:
PROCESSING

Payment status:
PAYMENT_CONFIRMED


Do not mix these concepts into a single field.


=============================================================
31. ADMIN DASHBOARD
=============================================================

Create:

/admin/dashboard

Dashboard should look premium but remain highly functional.

Sidebar:

Dashboard

Store
- Store Settings
- Homepage
- Payment Settings

Products
- All Products
- Add Product
- Categories

Orders
- All Orders
- Awaiting Payment
- Processing
- Pre-orders
- Completed

Customers

Analytics

Settings


=============================================================
32. ADMIN DASHBOARD METRICS
=============================================================

Show:

TOTAL SALES
₦4,850,000

TOTAL ORDERS
48

AWAITING PAYMENT
7

PROCESSING
6

PRE-ORDERS
8

COMPLETED
35

PRODUCTS
32

CUSTOMERS
41


Use demo data.

Include percentage/change indicators where appropriate.


=============================================================
33. ADMIN SALES ANALYTICS
=============================================================

Charts:

Revenue

Orders

Top Products

Preorders

Use:

7 days
30 days
12 months


Revenue example:

₦450k
₦720k
₦1.2m
etc.


=============================================================
34. ADMIN PRODUCT MANAGEMENT
=============================================================

All Products page.

Columns:

Image
Product
Category
Price
Stock
Availability
Status
Featured
Updated
Actions


Actions:

Edit
Disable
Enable
Delete


Prefer disabling over deleting.

Historical orders must retain references to products even if the
product is later disabled.


=============================================================
35. ADD PRODUCT
=============================================================

Admin fields:

Product Name

Description

Short Description

Price

Compare-at Price

SKU

Category

Images

Stock Quantity

Hair Type

Texture

Available Lengths

Available Colors

Featured

Bestseller

New Arrival

Pre-order Enabled

Pre-order Duration

Pre-order Closing Date

Product Status


Buttons:

SAVE DRAFT

SAVE & PUBLISH


=============================================================
36. DISABLE PRODUCT
=============================================================

Admin should be able to disable a product.

Disabled products:

- Do not appear publicly
- Cannot be purchased
- Cannot be added to cart
- Remain in admin
- Remain associated with historical orders


Show:

DISABLED


Admin can later:

ENABLE PRODUCT


=============================================================
37. CATEGORY MANAGEMENT
=============================================================

Admin can:

Create category
Edit category
Disable category
Change category image
Change category description

Demo categories:

Wigs
Bundles
Closures
Frontals
Extensions
Ponytails
Hair Care
New Arrivals


=============================================================
38. ORDER MANAGEMENT
=============================================================

Orders table:

Order
Customer
Items
Amount
Payment
Order Type
Status
Date
Actions


Example:

CKH-001
Jane Doe
₦280,000
Confirmed
Regular
Processing


CKH-002
Sarah K
₦420,000
Unpaid
Pre-order
Awaiting Payment


=============================================================
39. ADMIN ORDER DETAILS
=============================================================

When admin opens an order:

Show:

ORDER #CKH-20260831-001

Customer:

Jane Doe

Phone:
080XXXXXXXX

WhatsApp:
080XXXXXXXX

Email:
jane@email.com


Order Items:

CK Luxury Deep Curl Wig
20"
Natural Black
₦380,000
Qty: 1


Subtotal:
₦380,000

Delivery:
₦0 / Pending

Total:
₦380,000


Payment:

Payment Status:
PAYMENT CONFIRMED


Order:

PRE-ORDER PROCESSING


Delivery Address:

Lekki
Lagos
Nigeria


Customer Notes:

Please call before delivery.


Admin Notes:

Supplier confirmed stock arriving Friday.


=============================================================
40. ADMIN ORDER ACTIONS
=============================================================

Buttons:

CONFIRM PAYMENT

MARK PROCESSING

MARK STOCK ARRIVED

MARK READY

MARK SHIPPED

MARK COMPLETED

CANCEL ORDER

CONTACT CUSTOMER ON WHATSAPP


Only show relevant actions based on the current order state.


=============================================================
41. MARK ORDER COMPLETED
=============================================================

Admin must be able to mark an order as completed.

When completed:

Order status:
COMPLETED

Record:

completedAt

completedBy


The order should then appear under:

Completed Orders


=============================================================
42. ORDER TIMELINE
=============================================================

Every order should display a timeline.

Example:

✓ Order Created
31 Aug, 10:30 AM

✓ Payment Confirmed
31 Aug, 11:10 AM

✓ Processing
31 Aug, 12:00 PM

✓ Ready for Delivery
02 Sep, 09:00 AM

○ Shipped

○ Completed


For preorder:

✓ Pre-order Placed
✓ Payment Confirmed
✓ Pre-order Processing
✓ Stock Arrived
○ Preparing Order
○ Shipped
○ Completed


=============================================================
43. CUSTOMER MANAGEMENT
=============================================================

Admin can view customers.

Columns:

Name
Phone
WhatsApp
Email
Orders
Total Spent
Last Order
Status


Customer profile:

Customer information

Order history

Total spent

Number of orders

Pre-orders


=============================================================
44. STORE SETTINGS
=============================================================

Admin should be able to update:

Store Name
Logo
Favicon
Description
Email
Phone
WhatsApp
Address
Instagram
TikTok
Facebook


=============================================================
45. STORE ONLINE/OFFLINE MODE
=============================================================

Admin can control:

STORE STATUS

ONLINE

OFFLINE


When OFFLINE:

Public website should display a premium maintenance/store-closed page.

Example:

"WE'LL BE BACK SOON."

"CK Hair is currently preparing something beautiful.
Please check back shortly."


Admin dashboard must remain accessible.

Do not delete or disable the admin system when store is offline.


=============================================================
46. HOMEPAGE MANAGEMENT
=============================================================

Admin should be able to manage:

Hero title
Hero subtitle
Hero image
Primary CTA
Secondary CTA

Featured products

Categories

Announcement bar

Promotional banner


Example:

Hero:

LUXURY HAIR.
EFFORTLESS CONFIDENCE.


CTA:

SHOP COLLECTION


=============================================================
47. PROMOTIONAL BANNER
=============================================================

Admin can create:

Announcement
Promotion
Sale banner

Example:

"FREE DELIVERY ON ORDERS ABOVE ₦500,000"

Settings:

Text
Enabled
Start date
End date
CTA
CTA link


=============================================================
48. SHOP PAGE
=============================================================

Create:

/shop

Header:

SHOP CK HAIR


Filters:

Category
Price
Hair Type
Texture
Length
Availability


Sort:

Featured
Newest
Best Selling
Price: Low to High
Price: High to Low


Product grid:

Desktop:
4 columns

Tablet:
2–3 columns

Mobile:
2 columns


=============================================================
49. SEARCH
=============================================================

Search products by:

Name
Category
Texture
Hair type
SKU


Search should provide a polished search experience.

Desktop:
Search overlay or search field.

Mobile:
Full-screen search experience.


=============================================================
50. CART
=============================================================

Create a premium cart drawer and cart page.

Cart item:

Image
Name
Variant
Quantity
Price
Remove


Example:

CK Signature Body Wave
20"
Natural Black

₦185,000

[-] 1 [+]


Subtotal:
₦185,000


CTA:

PROCEED TO CHECKOUT


For preorder items, clearly display:

PRE-ORDER


=============================================================
51. CHECKOUT
=============================================================

Checkout sections:

CUSTOMER INFORMATION

Full Name
Email
Phone
WhatsApp Number

DELIVERY INFORMATION

Address
City
State
Additional delivery notes

ORDER SUMMARY

Payment Information


For preorder orders:

Show:

PRE-ORDER NOTICE

"This order contains one or more preorder products."


Require acknowledgement checkbox.


=============================================================
52. DELIVERY
=============================================================

Initially do not build a complex logistics integration.

Store delivery information:

Address
City
State
Country
Delivery fee
Delivery notes


Delivery fee should be configurable.

Admin can optionally update delivery fees later.


=============================================================
53. ABOUT PAGE
=============================================================

Create a premium editorial About page.

Suggested copy:

"At CK Hair, we believe beautiful hair is more than an accessory.
It is confidence, expression and identity.

We curate premium hair pieces designed to help every woman feel
beautiful, confident and effortlessly herself."

Use brand photography.

Do not overfill the page with text.


=============================================================
54. CONTACT PAGE
=============================================================

Include:

Phone
Email
WhatsApp
Social media
Business location if available

Primary CTA:

CHAT WITH CK HAIR ON WHATSAPP


=============================================================
55. SOCIAL MEDIA
=============================================================

Footer/social section:

Instagram
TikTok
Facebook

Use placeholder/demo links initially.

These must be configurable through admin settings.


=============================================================
56. FOOTER
=============================================================

Footer sections:

CK HAIR

"Luxury hair. Effortless confidence."

SHOP

Wigs
Bundles
Closures
Frontals
Extensions

HELP

Contact
Shipping
Returns
FAQs
Care Guide

FOLLOW

Instagram
TikTok
Facebook

NEWSLETTER

"Join the CK Hair community."


=============================================================
57. NEWSLETTER
=============================================================

Add a newsletter signup.

Fields:

Email

Button:

JOIN THE LIST


For MVP, store subscribers in the database.

Model:

NewsletterSubscriber

Fields:

id
email
createdAt
status


=============================================================
58. ADMIN NEWSLETTER
=============================================================

Admin can view newsletter subscribers.

Columns:

Email
Date joined
Status


=============================================================
59. AUTHENTICATION
=============================================================

Admin login:

Email
Password

Protected routes:

/admin/*
except:
/admin/login


Unauthenticated users attempting to access admin should be redirected
to /admin/login.


=============================================================
60. SECURITY
=============================================================

Implement:

- Secure authentication
- Password hashing
- Protected admin routes
- Server-side authorization
- Input validation
- API validation
- Rate limiting where appropriate
- Secure environment variables
- CSRF protection where applicable

Never expose:

- Admin credentials
- Database credentials
- Private API keys
- Server secrets

to the client.


=============================================================
61. DATABASE MODELS
=============================================================

Create relational models similar to:

Admin

User

Customer

Product

ProductImage

ProductVariant

Category

Order

OrderItem

Payment

StoreSettings

PaymentSettings

HomepageSettings

Promotion

NewsletterSubscriber

OrderStatusHistory


=============================================================
62. ORDER MODEL
=============================================================

Order should contain:

id
orderNumber
customerId
type
status
paymentStatus
subtotal
deliveryFee
total
deliveryAddress
city
state
country
customerNotes
adminNotes
createdAt
updatedAt
completedAt


Type:

REGULAR
PREORDER


=============================================================
63. ORDER ITEM MODEL
=============================================================

OrderItem:

id
orderId
productId
productNameSnapshot
variantNameSnapshot
quantity
unitPrice
totalPrice


IMPORTANT:

Store product name and price snapshots in OrderItem.

This ensures old orders remain accurate even if a product's name or price
changes later.


=============================================================
64. PAYMENT MODEL
=============================================================

Payment:

id
orderId
status
amount
reference
notes
confirmedAt
confirmedBy
createdAt


For the current MVP:

Payment is manually confirmed by admin.

Later this model can support:

Paystack
Flutterwave
Stripe
Bank transfer
etc.


=============================================================
65. ORDER HISTORY
=============================================================

Create:

OrderStatusHistory

Fields:

id
orderId
oldStatus
newStatus
changedBy
note
createdAt


Every order status change must create a history record.


=============================================================
66. DEMO DATA
=============================================================

Seed:

12+ products
8 categories
10+ customers
15+ orders

Include:

- Regular orders
- Pre-orders
- Paid orders
- Unpaid orders
- Processing orders
- Completed orders
- Cancelled orders


Dashboard must look populated when first launched.


=============================================================
67. DEMO PAYMENT DATA
=============================================================

Use clearly fake/demo details:

Bank:
GTBank

Account Name:
CK Hair Demo

Account Number:
0123456789

WhatsApp:
2348012345678


Clearly mark these as demo data in development.


=============================================================
68. RESPONSIVE DESIGN
=============================================================

Desktop:
Excellent

Tablet:
Excellent

Mobile:
EXCELLENT

Mobile is extremely important because customers may come from:

Instagram
TikTok
WhatsApp
Facebook

Make product browsing and checkout extremely easy on mobile.


=============================================================
69. MOBILE NAVIGATION
=============================================================

Mobile menu should include:

Home
Shop
Collections
Pre-Order
About
Contact
Account


Use a clean slide-in navigation.

Cart should be easily accessible.


=============================================================
70. ACCESSIBILITY
=============================================================

Implement:

- Proper semantic HTML
- Keyboard navigation
- Accessible buttons
- Alt text
- Form labels
- Good contrast
- Focus states
- Accessible modals


=============================================================
71. SEO
=============================================================

Implement:

Dynamic page titles

Meta descriptions

Open Graph metadata

Product structured data

Category metadata

Clean URLs

SEO-friendly product slugs


Example:

/product/ck-signature-body-wave


=============================================================
72. PERFORMANCE
=============================================================

Optimize:

Images
Fonts
JavaScript
Database queries

Use:

Next.js image optimization

Lazy loading where appropriate

Server components where appropriate

Avoid unnecessary client-side JavaScript.


=============================================================
73. LOADING STATES
=============================================================

Create skeleton loaders for:

Products
Product page
Orders
Dashboard
Customers


=============================================================
74. EMPTY STATES
=============================================================

Create beautiful empty states.

Example:

"No products found."

"No orders yet."

"No customers yet."

"No pre-orders currently."


=============================================================
75. ERROR STATES
=============================================================

Create friendly error states.

Example:

"Something went wrong."

"Please try again."


=============================================================
76. TOAST NOTIFICATIONS
=============================================================

Use toast notifications.

Examples:

"Product added successfully."

"Product updated."

"Product disabled."

"Order status updated."

"Payment confirmed."

"Account number copied."

"Order submitted successfully."


=============================================================
77. ADMIN DESIGN
=============================================================

Admin dashboard should be:

- Clean
- Premium
- Minimal
- Functional

Use:

Sidebar
Top navigation
Cards
Tables
Charts
Modals
Drawers
Dropdowns


Do not make the admin dashboard visually identical to the storefront.

It should share the CK Hair design language but prioritize usability.


=============================================================
78. ADMIN SIDEBAR
=============================================================

Dashboard

STORE
- Homepage
- Store Settings
- Payment Settings

CATALOG
- Products
- Categories

ORDERS
- All Orders
- Awaiting Payment
- Processing
- Pre-orders
- Completed

CUSTOMERS

ANALYTICS

MARKETING
- Promotions
- Newsletter

SETTINGS


=============================================================
79. DASHBOARD QUICK ACTIONS
=============================================================

Include:

+ ADD PRODUCT

VIEW ORDERS

MANAGE PRE-ORDERS

STORE SETTINGS


=============================================================
80. PRE-ORDER ADMIN DASHBOARD
=============================================================

Create a dedicated preorder management page.

Show:

Active Pre-orders

Product

Customer

Order

Amount

Payment status

Fulfillment timeline

Expected arrival

Current status


Example:

CK Luxury Deep Curl Wig

8 pre-orders

₦3,040,000

Expected stock arrival:

15 September 2026


Admin should be able to filter:

- Awaiting payment
- Paid
- Processing
- Stock arrived
- Ready
- Completed


=============================================================
81. PRE-ORDER BATCH MANAGEMENT
=============================================================

Design the system so multiple customers can preorder the same product.

Example:

Product:

CK Luxury Deep Curl Wig

Pre-order batch:

BATCH-001

Expected arrival:

15 September 2026

Orders:

#CKH-001
#CKH-005
#CKH-008
#CKH-011


When stock arrives, admin can mark the batch:

STOCK ARRIVED


Then affected orders can move into:

PREPARING ORDER


This is preferable to managing every preorder completely independently.


=============================================================
82. PRE-ORDER DEADLINE
=============================================================

Admin can optionally set:

Pre-order closes:

10 September 2026


After closing:

Display:

"PRE-ORDER CLOSED"


Customer cannot place new preorders.

Existing preorders remain in the system.


=============================================================
83. PRE-ORDER LIMIT
=============================================================

Optional setting:

Maximum preorder quantity:

20


If reached:

"PRE-ORDER SOLD OUT"


This should be configurable.


=============================================================
84. CUSTOMER ORDER TRACKING
=============================================================

Provide an order confirmation/tracking experience.

Customer can access order information using:

Order number

and optionally:

Phone/email


Display:

Order number

Items

Amount

Payment status

Order status

Timeline


For preorder:

Show:

Estimated fulfillment period


=============================================================
85. CUSTOMER-FACING STATUS
=============================================================

Do not expose complicated internal statuses.

Map internal statuses to friendly customer language.

Example:

PRE-ORDER PROCESSING

Customer sees:

"Your preorder is being prepared."


STOCK ARRIVED

Customer sees:

"Your hair has arrived and your order is being prepared."


READY FOR DELIVERY

Customer sees:

"Your order is ready for delivery."


=============================================================
86. ADMIN STATUS RULES
=============================================================

Prevent invalid status transitions where practical.

For example:

AWAITING PAYMENT
cannot directly become COMPLETED

unless admin explicitly confirms payment and progresses the order.

For preorder:

PRE-ORDER PLACED
→ AWAITING PAYMENT
→ PAYMENT CONFIRMED
→ PRE-ORDER PROCESSING
→ STOCK ARRIVED
→ PREPARING ORDER
→ READY FOR DELIVERY
→ SHIPPED
→ COMPLETED


=============================================================
87. FUTURE PAYMENT GATEWAY SUPPORT
=============================================================

DO NOT implement Paystack/Flutterwave now.

But architecture should make future payment integration easy.

Payment abstraction should allow:

Manual Bank Transfer

Paystack

Flutterwave

Stripe


Future flow:

Customer pays online
→ Payment provider webhook
→ Payment automatically confirmed
→ Order status updated


Current flow:

Customer places order
→ Bank details displayed
→ Customer transfers money
→ WhatsApp confirmation
→ Admin confirms payment manually
→ Order progresses


=============================================================
88. WHATSAPP MESSAGE GENERATION
=============================================================

Create a reusable WhatsApp message generator.

Function concept:

generateOrderWhatsAppMessage(order)


It should dynamically generate:

Order number
Customer name
Products
Variants
Quantity
Total
Order type
Delivery information


For preorder include:

"PRE-ORDER"

and:

"Estimated fulfillment: 2–4 weeks"


Do not hardcode order-specific information.


=============================================================
89. ADMIN SETTINGS
=============================================================

Settings should include:

Store information
Payment information
WhatsApp information
Social media
Delivery
Currency
Preorder settings
Notification settings
Homepage


=============================================================
90. CURRENCY
=============================================================

Default currency:

NGN

Display:

₦185,000

not:

185000 NGN


Currency should still be configurable in admin settings for future use.


=============================================================
91. STORE CURRENCY
=============================================================

Store settings:

Currency:
NGN

Currency symbol:
₦


=============================================================
92. DELIVERY SETTINGS
=============================================================

Admin can configure:

Default delivery fee

Free delivery threshold

Example:

Free delivery above:

₦500,000


Delivery fee:

₦7,500


These settings should automatically affect checkout calculations.


=============================================================
93. PRODUCT CARD BEHAVIOUR
=============================================================

Product cards should:

- Animate subtly on hover
- Show image
- Show secondary image if available
- Show badge
- Show availability
- Show price
- Support add to cart

If product is preorder:

Button:

PRE-ORDER


If out of stock:

Button:

OUT OF STOCK


Disabled.

If normal:

ADD TO BAG


=============================================================
94. PREMIUM MICRO-INTERACTIONS
=============================================================

Use subtle animations:

Page transitions

Button hover

Image zoom

Cart drawer slide

Mobile menu slide

Toast notifications

Dropdown animations

Modal transitions

Do NOT over-animate.


=============================================================
95. HOMEPAGE EDITORIAL SECTION
=============================================================

Create section:

THE CK HAIR EXPERIENCE

Example:

"Hair that feels as good as it looks."

Use a large editorial image alongside text.

CTA:

DISCOVER CK HAIR


=============================================================
96. PREORDER HOMEPAGE SECTION
=============================================================

Create dedicated section:

COMING SOON.
WORTH THE WAIT.

Supporting text:

"Discover our latest premium hair drops before they arrive."

CTA:

EXPLORE PRE-ORDERS


Display selected preorder products.


=============================================================
97. SOCIAL PROOF
=============================================================

Create testimonial section.

Demo testimonials:

"Absolutely beautiful hair. The quality exceeded my expectations."

— Amaka

"I loved how easy the ordering process was. Customer service was
excellent."

— Sarah

"CK Hair has become my go-to for premium wigs."

— Tolu


Clearly treat these as demo content.


=============================================================
98. INSTAGRAM SECTION
=============================================================

Create:

FOLLOW CK HAIR

@ckhair

Display 6 image tiles.

Admin should eventually be able to manage these images.


=============================================================
99. DATABASE SEEDING
=============================================================

Create a proper Prisma seed file.

Running:

npx prisma db seed

should populate:

- Admin demo account
- Store settings
- Payment settings
- Categories
- Products
- Customers
- Orders
- Order items
- Testimonials
- Promotions
- Newsletter subscribers


=============================================================
100. DEMO ADMIN ACCOUNT
=============================================================

Create development/demo credentials.

Example:

Email:
admin@ckhair.com

Password:
ChangeMe123!

Clearly mark as DEMO credentials.

Do not use these credentials in production.


=============================================================
101. ENVIRONMENT VARIABLES
=============================================================

Use:

DATABASE_URL

AUTH_SECRET

NEXT_PUBLIC_APP_URL

WHATSAPP_NUMBER

IMAGE_STORAGE credentials where needed


Do not commit secrets.


=============================================================
102. ERROR HANDLING
=============================================================

Handle:

Product not found

Category not found

Order not found

Invalid checkout

Out of stock

Preorder closed

Preorder limit reached

Store offline

Unauthorized admin access

Database failure


Provide friendly UI messages.


=============================================================
103. BUSINESS RULES
=============================================================

RULE 1:

Disabled products cannot be purchased.

RULE 2:

Out-of-stock products cannot be purchased unless preorder is enabled.

RULE 3:

Preorder products must clearly display preorder status.

RULE 4:

Customer must acknowledge preorder terms.

RULE 5:

Order cannot become COMPLETED while unpaid.

RULE 6:

Admin must manually confirm bank payment.

RULE 7:

Every status change must be logged.

RULE 8:

Historical orders must preserve product name and price snapshots.

RULE 9:

Payment account details must come from admin settings.

RULE 10:

WhatsApp number must come from admin settings.

RULE 11:

Store can be switched OFFLINE by admin.

RULE 12:

Admin dashboard remains accessible when store is offline.


=============================================================
104. ORDER FLOW — REGULAR PRODUCT
=============================================================

Customer:

Browse
↓
Select product
↓
Choose variant
↓
Add to Bag
↓
Checkout
↓
Enter customer information
↓
Review order
↓
Place Order
↓
Order Created
↓
AWAITING PAYMENT
↓
Bank account details displayed
↓
Customer transfers money
↓
Customer clicks WhatsApp
↓
Payment confirmation sent
↓
Admin confirms payment
↓
PAYMENT CONFIRMED
↓
PROCESSING
↓
READY FOR DELIVERY
↓
SHIPPED
↓
COMPLETED


=============================================================
105. ORDER FLOW — PREORDER PRODUCT
=============================================================

Customer:

Browse preorder product
↓
View preorder terms
↓
Select variant
↓
Add to Bag
↓
Checkout
↓
Review preorder notice
↓
Accept preorder terms
↓
Place Pre-order
↓
PRE-ORDER PLACED
↓
AWAITING PAYMENT
↓
Bank account details displayed
↓
Customer transfers money
↓
WhatsApp confirmation
↓
Admin confirms payment
↓
PAYMENT CONFIRMED
↓
PRE-ORDER PROCESSING
↓
STOCK ARRIVES
↓
PREPARING ORDER
↓
READY FOR DELIVERY
↓
SHIPPED
↓
COMPLETED


=============================================================
106. IMPORTANT PREORDER UX
=============================================================

The customer should NEVER accidentally think a preorder product is
available for immediate delivery.

Clearly show:

PRE-ORDER

ESTIMATED FULFILLMENT:
2–4 WEEKS


On cart:

PRE-ORDER ITEM


At checkout:

YOUR ORDER CONTAINS A PRE-ORDER ITEM.


On confirmation:

PRE-ORDER RECEIVED


This should be visually clear but elegant.


=============================================================
107. ADMIN PREORDER ACTION
=============================================================

When supplier stock arrives:

Admin opens:

PRE-ORDERS

Selects relevant product/batch.

Clicks:

STOCK ARRIVED


System identifies all paid preorder orders associated with that
product/batch.

Admin can then move them to:

PREPARING ORDER


Then:

READY FOR DELIVERY


Then:

SHIPPED


Then:

COMPLETED


=============================================================
108. RESPONSIVE ADMIN
=============================================================

Admin dashboard must also work on mobile.

Desktop:

Sidebar + content

Mobile:

Collapsible sidebar

Tables should become responsive cards where appropriate.


=============================================================
109. DESIGN DETAILS
=============================================================

Use consistent:

Border radius
Button heights
Spacing
Typography scale
Icon size
Card spacing
Input styling


Buttons should feel premium.

Primary:

Dark background
Light text

Secondary:

Light/white background
Dark border/text


=============================================================
110. DO NOT CREATE A GENERIC TEMPLATE
=============================================================

The final application should NOT feel like:

- A generic Tailwind template
- A generic Shopify clone
- A generic SaaS dashboard
- A generic African e-commerce website

It should feel like a premium brand website created specifically for:

CK HAIR


=============================================================
111. HOMEPAGE VISUAL HIERARCHY
=============================================================

The homepage should follow approximately:

Announcement Bar

Header

Hero

Brand Benefits

Featured Products

Shop By Category

Editorial Brand Section

Pre-order Collection

Testimonials

Instagram/Social Proof

Newsletter

Footer


=============================================================
112. PRODUCT IMAGE DIRECTION
=============================================================

Use premium demo imagery.

Product images should have:

- Clean backgrounds
- Consistent aspect ratios
- High quality
- Good lighting
- Editorial feel

Do not use random unrelated product photos.

If using placeholder/demo images during development, maintain consistent
visual presentation.


=============================================================
113. ACCESSIBILITY OF PRICE
=============================================================

Prices should be immediately visible.

Example:

₦185,000

If discounted:

₦185,000
₦220,000


Use clear visual hierarchy.


=============================================================
114. ADMIN PRODUCT STATUS
=============================================================

Product status:

DRAFT
ACTIVE
DISABLED


Availability:

IN_STOCK
PREORDER
OUT_OF_STOCK


These are separate concepts.


=============================================================
115. ADMIN ORDER STATUS
=============================================================

Regular:

PENDING
AWAITING_PAYMENT
PAYMENT_CONFIRMED
PROCESSING
READY_FOR_DELIVERY
SHIPPED
COMPLETED
CANCELLED


Preorder:

PREORDER_PLACED
AWAITING_PAYMENT
PAYMENT_CONFIRMED
PREORDER_PROCESSING
STOCK_ARRIVED
PREPARING_ORDER
READY_FOR_DELIVERY
SHIPPED
COMPLETED
CANCELLED


=============================================================
116. PAYMENT STATUS
=============================================================

UNPAID
PAYMENT_SUBMITTED
PAYMENT_CONFIRMED
PAYMENT_REJECTED
REFUNDED


=============================================================
117. IMPORTANT DATA INTEGRITY
=============================================================

When an order is created:

Save the exact:

Product name
Variant
Price
Quantity


inside the OrderItem.

Do NOT rely only on the current Product record.

If product price later changes from:

₦185,000

to:

₦210,000

the old order must still show:

₦185,000


=============================================================
118. FUTURE FEATURES TO KEEP ARCHITECTURE READY FOR
=============================================================

Do not necessarily implement these now, but structure the system so
they can be added later:

- Paystack
- Flutterwave
- Stripe
- Automated email
- WhatsApp Business API
- SMS notifications
- Customer accounts
- Wishlist
- Coupon codes
- Discount campaigns
- Inventory alerts
- Supplier management
- Delivery tracking
- Multiple admins
- Role-based permissions
- Reviews
- Product ratings
- Abandoned cart recovery


=============================================================
119. FINAL QUALITY REQUIREMENTS
=============================================================

The final application must:

- Be fully responsive
- Have no broken links
- Have no placeholder lorem ipsum
- Have realistic demo content
- Have functional cart
- Have functional checkout
- Have functional order creation
- Have functional WhatsApp generation
- Have functional admin login
- Have functional product management
- Have functional order management
- Have functional preorder management
- Have functional store settings
- Have functional payment settings
- Have functional store offline mode
- Have realistic dashboard analytics
- Use proper loading states
- Use proper error states
- Use proper empty states


=============================================================
120. DEVELOPMENT APPROACH
=============================================================

Build this in stages.

PHASE 1:
Set up project architecture, database, authentication and design system.

PHASE 2:
Build public storefront.

PHASE 3:
Build products and product details.

PHASE 4:
Build cart and checkout.

PHASE 5:
Build bank transfer payment information.

PHASE 6:
Build WhatsApp order flow.

PHASE 7:
Build order management.

PHASE 8:
Build preorder system.

PHASE 9:
Build admin dashboard.

PHASE 10:
Build product/category management.

PHASE 11:
Build store/payment/homepage settings.

PHASE 12:
Build analytics.

PHASE 13:
Responsive/mobile optimization.

PHASE 14:
Security, validation, error handling and final polish.


=============================================================
121. FINAL UX PRINCIPLE
=============================================================

The most important business flow is:

DISCOVER
→ BROWSE
→ SELECT
→ ORDER
→ PAY VIA BANK TRANSFER
→ CONFIRM VIA WHATSAPP
→ CK HAIR CONFIRMS PAYMENT
→ CK HAIR FULFILLS ORDER
→ COMPLETED


For preorder:

DISCOVER
→ PRE-ORDER
→ REVIEW FULFILLMENT PERIOD
→ PAY VIA BANK TRANSFER
→ CONFIRM VIA WHATSAPP
→ PAYMENT CONFIRMED
→ WAIT FOR STOCK
→ STOCK ARRIVES
→ CK HAIR PREPARES ORDER
→ SHIPPED
→ COMPLETED


Do not overcomplicate the MVP with unnecessary payment integrations.

The website should make this process extremely clear, trustworthy and
easy for the customer.


=============================================================
122. FINAL DESIGN TARGET
=============================================================

Imagine CK Hair as a premium Nigerian hair/luxury beauty brand.

The customer lands on the homepage and immediately sees:

CK HAIR

LUXURY HAIR.
EFFORTLESS CONFIDENCE.

[SHOP COLLECTION] [PRE-ORDER]

Beautiful editorial hair imagery.

Then:

PREMIUM QUALITY
VERSATILE STYLES
SECURE ORDERING
RELIABLE DELIVERY

Then beautiful products.

Then categories.

Then the CK Hair story.

Then preorder products.

Then social proof.

Then newsletter.

The experience should be elegant, confident, minimal and premium.

The admin dashboard should give the business owner complete control over:

PRODUCTS
ORDERS
PRE-ORDERS
CUSTOMERS
PAYMENT DETAILS
WHATSAPP
STORE SETTINGS
HOMEPAGE
PROMOTIONS
ANALYTICS


Build the application as a production-quality foundation, not merely
a visual mockup.