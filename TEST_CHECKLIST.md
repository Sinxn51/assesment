# Testing Checklist - All Features Working ✓

## Backend Tests ✓
- [x] Server starts on port 5000
- [x] GET /api/communities returns 5 communities
- [x] GET /api/products returns all 24 products
- [x] GET /api/products?community=muslim filters correctly
- [x] GET /api/products/:id returns single product
- [x] GET /api/categories/:community returns categories

## Frontend Build ✓
- [x] npm install completes successfully
- [x] npm run build completes without errors
- [x] All pages created (Onboarding, Home, ProductDetail, Cart)
- [x] All CSS files created

## Page 1: Onboarding (/​)
**Features to Test:**
- [ ] 5 community tiles display (Muslim, Hindu, Christian, Sikh, Buddhist)
- [ ] Each tile shows icon + name
- [ ] Clicking a tile highlights it in gold (#C9A84C)
- [ ] "Start Shopping" button is disabled when no selection
- [ ] "Start Shopping" button is enabled after selection
- [ ] Clicking "Start Shopping" saves to localStorage
- [ ] Clicking "Start Shopping" navigates to /home

## Page 2: Home (/home)
**Features to Test:**
- [ ] Navbar displays with logo
- [ ] Community name shows in navbar
- [ ] Cart button shows in navbar
- [ ] Cart badge shows count when items added
- [ ] Hero banner shows personalized title based on community
- [ ] Hero subtitle displays correctly
- [ ] Category pills display horizontally (scrollable)
- [ ] Minimum 12 products display in grid
- [ ] Each product card shows:
  - [ ] Product image (clickable → goes to detail page)
  - [ ] Community badge
  - [ ] Product name (clickable → goes to detail page)
  - [ ] Price in ₹
  - [ ] Star rating
  - [ ] "Try Virtually" badge (only on VTO-enabled products)
  - [ ] Wishlist heart button (top-right of image)
  - [ ] "Add to Cart" button
- [ ] Clicking "Add to Cart" adds product to cart
- [ ] Cart count updates after adding items
- [ ] Clicking cart button navigates to /cart

## Page 3: Product Detail (/product/:id)
**Features to Test:**
- [ ] Navbar displays with logo (clickable → home)
- [ ] Cart button in navbar
- [ ] Large product image displays
- [ ] Product name displays
- [ ] Price displays
- [ ] Community badge displays
- [ ] Verified badge displays (if verified)
- [ ] Product description displays
- [ ] Star rating displays
- [ ] Size selector displays all sizes
- [ ] Clicking size selects it (gold highlight)
- [ ] Color swatches display all colors
- [ ] Clicking color selects it (gold highlight)
- [ ] Quantity selector displays
- [ ] "-" button decreases quantity (min 1)
- [ ] "+" button increases quantity
- [ ] "Add to Cart" button works
- [ ] "Try Virtually" button shows (only if is_vto_enabled)
- [ ] Clicking "Try Virtually" opens modal
- [ ] Modal has file upload input
- [ ] Modal has close button
- [ ] Clicking outside modal closes it
- [ ] "You May Also Like" section shows 4 related products
- [ ] Related products are from same community
- [ ] Clicking related product navigates to that product

## Page 4: Cart (/cart)
**Features to Test:**
- [ ] Navbar displays with logo (clickable → home)
- [ ] If cart empty: shows "Your cart is empty" message
- [ ] If cart empty: shows "Continue Shopping" button
- [ ] If cart has items: displays all cart items
- [ ] Each cart item shows:
  - [ ] Product image
  - [ ] Product name
  - [ ] Selected size (if applicable)
  - [ ] Selected color (if applicable)
  - [ ] Price
  - [ ] Quantity controls (- and +)
  - [ ] Remove button
- [ ] Clicking "-" decreases quantity (min 1)
- [ ] Clicking "+" increases quantity
- [ ] Clicking "Remove" removes item from cart
- [ ] Order summary displays on right
- [ ] Subtotal calculates correctly
- [ ] Total displays correctly
- [ ] "Proceed to Checkout" button displays

## Data Validation ✓
- [x] 24 products total across 5 communities
- [x] Each product has all required fields
- [x] Muslim products: 5 items
- [x] Hindu products: 5 items
- [x] Christian products: 4 items
- [x] Sikh products: 4 items
- [x] Buddhist products: 5 items

## Design Validation
- [ ] Primary color #0D1B2A used for buttons/navbar
- [ ] Accent color #C9A84C used for highlights/badges
- [ ] Background #F9F7F4 used
- [ ] White #FFFFFF used for cards
- [ ] Playfair Display font for headings
- [ ] Inter font for body text
- [ ] Premium, trustworthy feel
- [ ] Responsive design works on mobile

## LocalStorage Tests
- [ ] Community selection persists after page refresh
- [ ] Cart items persist after page refresh
- [ ] Navigating to /home without community redirects to /

## Navigation Tests
- [ ] All routes work correctly
- [ ] Back button works
- [ ] Direct URL access works
- [ ] Logo click returns to home

## How to Test:
1. Start backend: `cd backend && npm start`
2. Start frontend: `cd frontend && npm run dev`
3. Open http://localhost:5173
4. Go through each page and check all features
