import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import './Cart.css'

function useToast() {
  const [toasts, setToasts] = useState([])
  const show = useCallback((msg, type = 'success') => {
    const id = Date.now()
    setToasts(t => [...t, { id, msg, type }])
    setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), 3000)
  }, [])
  return { toasts, show }
}

const ICONS = { success: '✓', error: '✕', info: 'ℹ' }

const PROMO_CODES = {
  SAVE10:  { discount: 0.10, label: '10% off' },
  FLAT50:  { discount: 50,   label: '₹50 off', flat: true },
  COMMUNITY20: { discount: 0.20, label: '20% off' },
}

function Cart() {
  const [cart, setCart]           = useState([])
  const [promoInput, setPromoInput] = useState('')
  const [appliedPromo, setAppliedPromo] = useState(null)
  const [promoError, setPromoError]   = useState('')
  const [orderPlaced, setOrderPlaced] = useState(false)
  const navigate  = useNavigate()
  const { toasts, show } = useToast()

  useEffect(() => {
    setCart(JSON.parse(localStorage.getItem('cart') || '[]'))
  }, [])

  // ── Quantity ─────────────────────────────────────────────────
  const updateQuantity = (index, delta) => {
    const newCart = [...cart]
    newCart[index].quantity = Math.max(1, (newCart[index].quantity || 1) + delta)
    setCart(newCart)
    localStorage.setItem('cart', JSON.stringify(newCart))
  }

  // ── Remove ───────────────────────────────────────────────────
  const removeItem = (index) => {
    const name = cart[index].name
    const newCart = cart.filter((_, i) => i !== index)
    setCart(newCart)
    localStorage.setItem('cart', JSON.stringify(newCart))
    show(`${name} removed`, 'info')
  }

  // ── Promo code ───────────────────────────────────────────────
  const applyPromo = () => {
    const code = promoInput.trim().toUpperCase()
    if (!code) { setPromoError('Enter a promo code'); return }
    const promo = PROMO_CODES[code]
    if (!promo) { setPromoError('Invalid promo code'); setAppliedPromo(null); return }
    setAppliedPromo({ code, ...promo })
    setPromoError('')
    show(`Promo applied: ${promo.label}`)
  }

  const removePromo = () => {
    setAppliedPromo(null)
    setPromoInput('')
    show('Promo code removed', 'info')
  }

  // ── Pricing ──────────────────────────────────────────────────
  const subtotal  = cart.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0)
  const shipping  = subtotal > 999 ? 0 : 79
  let discount    = 0
  if (appliedPromo) {
    discount = appliedPromo.flat
      ? Math.min(appliedPromo.discount, subtotal)
      : Math.round(subtotal * appliedPromo.discount)
  }
  const total = Math.max(0, subtotal - discount + shipping)

  // ── Checkout ─────────────────────────────────────────────────
  const handleCheckout = () => {
    setOrderPlaced(true)
    localStorage.removeItem('cart')
    setCart([])
  }

  if (orderPlaced) {
    return (
      <div className="cart-page">
        <nav className="navbar">
          <div className="nav-content">
            <h2 className="logo" onClick={() => navigate('/home')}>ShopCommunity</h2>
          </div>
        </nav>
        <div className="order-success">
          <div className="success-icon">🎉</div>
          <h1>Order Placed!</h1>
          <p>Your order has been placed successfully. You'll receive a confirmation shortly.</p>
          <button id="continue-shopping-success" onClick={() => navigate('/home')}>
            Continue Shopping
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="cart-page">
      {/* Toasts */}
      <div className="toast-container">
        {toasts.map(t => (
          <div key={t.id} className={`toast ${t.type}`}>
            <span className="toast-icon">{ICONS[t.type]}</span>
            <span>{t.msg}</span>
          </div>
        ))}
      </div>

      {/* Navbar */}
      <nav className="navbar">
        <div className="nav-content">
          <h2 className="logo" onClick={() => navigate('/home')}>ShopCommunity</h2>
          <button id="cart-back-btn" className="back-link" onClick={() => navigate('/home')}>
            ← Continue Shopping
          </button>
        </div>
      </nav>

      <div className="cart-content">
        <h1>Shopping Cart {cart.length > 0 && <span className="cart-count-label">({cart.length} items)</span>}</h1>

        {cart.length === 0 ? (
          <div className="empty-cart">
            <span className="empty-icon">🛒</span>
            <p>Your cart is empty</p>
            <button id="empty-cart-shop-btn" onClick={() => navigate('/home')}>
              Browse Products
            </button>
          </div>
        ) : (
          <div className="cart-layout">
            {/* Items */}
            <div className="cart-items">
              {cart.map((item, index) => (
                <div key={index} id={`cart-item-${index}`} className="cart-item">
                  <img src={item.image} alt={item.name} />
                  <div className="item-details">
                    <h3>{item.name}</h3>
                    {item.selectedSize  && <p>Size: <strong>{item.selectedSize}</strong></p>}
                    {item.selectedColor && <p>Color: <strong>{item.selectedColor}</strong></p>}
                    <p className="item-price">₹{item.price * (item.quantity || 1)}</p>
                  </div>
                  <div className="item-actions">
                    <div className="quantity-control">
                      <button
                        id={`qty-minus-${index}`}
                        onClick={() => updateQuantity(index, -1)}
                      >−</button>
                      <span>{item.quantity || 1}</span>
                      <button
                        id={`qty-plus-${index}`}
                        onClick={() => updateQuantity(index, 1)}
                      >+</button>
                    </div>
                    <button
                      id={`remove-${index}`}
                      className="remove-btn"
                      onClick={() => removeItem(index)}
                    >
                      🗑 Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary */}
            <div className="cart-summary">
              <h2>Order Summary</h2>

              {/* Promo code */}
              <div className="promo-section">
                <p className="promo-label">Promo Code</p>
                {appliedPromo ? (
                  <div className="promo-applied">
                    <span>🎟 {appliedPromo.code} — {appliedPromo.label}</span>
                    <button id="remove-promo-btn" className="promo-remove" onClick={removePromo}>✕</button>
                  </div>
                ) : (
                  <div className="promo-input-row">
                    <input
                      id="promo-input"
                      type="text"
                      placeholder="e.g. SAVE10"
                      value={promoInput}
                      onChange={e => { setPromoInput(e.target.value); setPromoError('') }}
                      onKeyDown={e => e.key === 'Enter' && applyPromo()}
                    />
                    <button id="apply-promo-btn" className="promo-apply-btn" onClick={applyPromo}>
                      Apply
                    </button>
                  </div>
                )}
                {promoError && <p className="promo-error">{promoError}</p>}
                {!appliedPromo && (
                  <p className="promo-hint">Try: SAVE10, FLAT50, COMMUNITY20</p>
                )}
              </div>

              <div className="summary-divider" />

              <div className="summary-row">
                <span>Subtotal</span>
                <span>₹{subtotal}</span>
              </div>
              <div className="summary-row">
                <span>Shipping</span>
                <span>{shipping === 0 ? <span className="free-ship">FREE</span> : `₹${shipping}`}</span>
              </div>
              {discount > 0 && (
                <div className="summary-row discount-row">
                  <span>Discount ({appliedPromo.code})</span>
                  <span>− ₹{discount}</span>
                </div>
              )}
              {shipping > 0 && (
                <p className="free-ship-hint">Add ₹{999 - subtotal} more for free shipping</p>
              )}

              <div className="summary-divider" />

              <div className="summary-row total">
                <span>Total</span>
                <span>₹{total}</span>
              </div>

              <button id="checkout-btn" className="checkout-btn" onClick={handleCheckout}>
                Proceed to Checkout →
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Cart
