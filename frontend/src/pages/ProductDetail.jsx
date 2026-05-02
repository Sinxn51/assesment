import { useState, useEffect, useCallback } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getProduct, getProducts } from '../api'
import './ProductDetail.css'

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

function ProductDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { toasts, show } = useToast()

  const [product, setProduct]           = useState(null)
  const [related, setRelated]           = useState([])
  const [selectedSize, setSelectedSize] = useState('')
  const [selectedColor, setSelectedColor] = useState('')
  const [quantity, setQuantity]         = useState(1)
  const [showVTO, setShowVTO]           = useState(false)
  const [vtoFile, setVtoFile]           = useState(null)
  const [vtoPreview, setVtoPreview]     = useState(null)
  const [vtoLoading, setVtoLoading]     = useState(false)
  const [vtoResult, setVtoResult]       = useState(false)
  const [wishlist, setWishlist]         = useState(() => JSON.parse(localStorage.getItem('wishlist') || '[]'))

  const cartCount = JSON.parse(localStorage.getItem('cart') || '[]').length

  useEffect(() => {
    setProduct(null)
    setVtoFile(null); setVtoPreview(null); setVtoResult(false)
    getProduct(id).then(res => {
      const p = res.data
      setProduct(p)
      setSelectedSize(p.sizes?.[0] || '')
      setSelectedColor(p.colors?.[0] || '')
      getProducts(p.community).then(r => {
        setRelated(r.data.filter(x => x.id !== p.id).slice(0, 4))
      })
    })
  }, [id])

  // ── Add to cart ──────────────────────────────────────────────
  const addToCart = () => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]')
    cart.push({ ...product, selectedSize, selectedColor, quantity })
    localStorage.setItem('cart', JSON.stringify(cart))
    show(`Added to cart! (Qty: ${quantity})`)
  }

  // ── Wishlist ─────────────────────────────────────────────────
  const toggleWishlist = () => {
    const isIn = wishlist.includes(product.id)
    const next  = isIn ? wishlist.filter(id => id !== product.id) : [...wishlist, product.id]
    setWishlist(next)
    localStorage.setItem('wishlist', JSON.stringify(next))
    show(isIn ? 'Removed from wishlist' : 'Saved to wishlist ♥', isIn ? 'info' : 'success')
  }

  // ── VTO file pick ─────────────────────────────────────────────
  const handleVtoFile = (e) => {
    const file = e.target.files[0]
    if (!file) return
    setVtoFile(file)
    setVtoPreview(URL.createObjectURL(file))
    setVtoResult(false)
  }

  // ── VTO simulate ──────────────────────────────────────────────
  const simulateVTO = () => {
    if (!vtoFile) return
    setVtoLoading(true)
    setTimeout(() => {
      setVtoLoading(false)
      setVtoResult(true)
      show('Virtual try-on complete!', 'success')
    }, 2200)
  }

  const closeVTO = () => {
    setShowVTO(false)
    setVtoFile(null)
    setVtoPreview(null)
    setVtoResult(false)
    setVtoLoading(false)
  }

  if (!product) return (
    <div className="pd-loading">
      <div className="spinner" />
      <p>Loading product…</p>
    </div>
  )

  const isWishlisted = wishlist.includes(product.id)

  return (
    <div className="product-detail">
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
          <div className="nav-right">
            <button id="pd-back-btn" className="back-link" onClick={() => navigate('/home')}>
              ← Back
            </button>
            <button id="pd-cart-btn" className="cart-btn" onClick={() => navigate('/cart')}>
              🛒 Cart {cartCount > 0 && <span className="badge">{cartCount}</span>}
            </button>
          </div>
        </div>
      </nav>

      {/* Detail content */}
      <div className="detail-content">
        {/* Left: Image */}
        <div className="detail-left">
          <div className="detail-img-wrap">
            <img src={product.image} alt={product.name} />
            {product.badge && <div className="detail-img-badge">{product.badge}</div>}
          </div>
        </div>

        {/* Right: Info */}
        <div className="detail-right">
          <div className="detail-top-row">
            <div className="detail-tags">
              {product.badge && <span className="badge-small">{product.badge}</span>}
              {product.is_verified && <span className="verified">✓ Verified</span>}
            </div>
            <button
              id="pd-wishlist-btn"
              className={`wishlist-lg ${isWishlisted ? 'wishlisted' : ''}`}
              onClick={toggleWishlist}
              title={isWishlisted ? 'Remove from wishlist' : 'Save to wishlist'}
            >
              {isWishlisted ? '♥' : '♡'}
            </button>
          </div>

          <h1>{product.name}</h1>
          <p className="description">{product.description}</p>

          <div className="detail-price-row">
            <div className="price-large">₹{product.price}</div>
            <div className="detail-rating">⭐ {product.rating} / 5</div>
          </div>

          {/* Size selector */}
          {product.sizes?.length > 0 && (
            <div className="selector">
              <label>Size: <strong>{selectedSize}</strong></label>
              <div className="options">
                {product.sizes.map(size => (
                  <button
                    key={size}
                    id={`size-${size}`}
                    className={`opt-btn ${selectedSize === size ? 'selected' : ''}`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Color selector */}
          {product.colors?.length > 0 && (
            <div className="selector">
              <label>Color: <strong>{selectedColor}</strong></label>
              <div className="options">
                {product.colors.map(color => (
                  <button
                    key={color}
                    id={`color-${color}`}
                    className={`opt-btn ${selectedColor === color ? 'selected' : ''}`}
                    onClick={() => setSelectedColor(color)}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity */}
          <div className="selector">
            <label>Quantity</label>
            <div className="quantity">
              <button
                id="qty-minus"
                className="qty-btn"
                onClick={() => setQuantity(q => Math.max(1, q - 1))}
              >−</button>
              <span id="qty-display">{quantity}</span>
              <button
                id="qty-plus"
                className="qty-btn"
                onClick={() => setQuantity(q => q + 1)}
              >+</button>
            </div>
          </div>

          {/* Action buttons */}
          <div className="action-btns">
            <button id="add-to-cart-btn" className="add-cart-btn-large" onClick={addToCart}>
              🛒 Add to Cart
            </button>

            {product.is_vto_enabled && (
              <button id="vto-btn" className="vto-btn" onClick={() => setShowVTO(true)}>
                ✦ Try Virtually
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Related products */}
      {related.length > 0 && (
        <div className="related">
          <h2>You May Also Like</h2>
          <div className="related-grid">
            {related.map(p => (
              <div
                key={p.id}
                id={`related-${p.id}`}
                className="related-card"
                onClick={() => navigate(`/product/${p.id}`)}
              >
                <div className="related-img">
                  <img src={p.image} alt={p.name} />
                </div>
                <div className="related-info">
                  <h3>{p.name}</h3>
                  <span>₹{p.price}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* VTO Modal */}
      {showVTO && (
        <div className="modal" onClick={closeVTO}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={closeVTO}>✕</button>
            <h2>Virtual Try-On</h2>
            <p className="modal-sub">Upload a photo to see how this product looks on you</p>

            <div className="vto-body">
              {!vtoPreview ? (
                <label className="vto-upload-area" htmlFor="vto-file-input">
                  <span className="vto-upload-icon">📷</span>
                  <span>Click to upload your photo</span>
                  <span className="vto-hint">JPG, PNG supported</span>
                  <input
                    id="vto-file-input"
                    type="file"
                    accept="image/*"
                    onChange={handleVtoFile}
                    style={{ display: 'none' }}
                  />
                </label>
              ) : (
                <div className="vto-preview-wrap">
                  <div className="vto-preview-images">
                    <div className="vto-img-panel">
                      <p>Your Photo</p>
                      <img src={vtoPreview} alt="your photo" className="vto-img" />
                    </div>
                    <div className="vto-divider">+</div>
                    <div className="vto-img-panel">
                      <p>Product</p>
                      <img src={product.image} alt="product" className="vto-img" />
                    </div>
                    {vtoResult && (
                      <>
                        <div className="vto-divider">→</div>
                        <div className="vto-img-panel result">
                          <p>Result ✨</p>
                          <div className="vto-result-sim">
                            <img src={vtoPreview} alt="result" className="vto-img" />
                            <img src={product.image} alt="overlay" className="vto-overlay" />
                          </div>
                        </div>
                      </>
                    )}
                  </div>

                  {vtoLoading && (
                    <div className="vto-loading-bar">
                      <div className="vto-progress" />
                      <span>Processing…</span>
                    </div>
                  )}

                  <div className="vto-actions">
                    <button className="vto-reset" onClick={() => { setVtoFile(null); setVtoPreview(null); setVtoResult(false) }}>
                      Change Photo
                    </button>
                    {!vtoResult && !vtoLoading && (
                      <button className="vto-try-btn" onClick={simulateVTO}>
                        ✦ Try On
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ProductDetail
