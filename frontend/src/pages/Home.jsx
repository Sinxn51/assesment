import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { getProducts, getCategories, getCommunities } from '../api'
import './Home.css'

// ── Toast helper ──────────────────────────────────────────────
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

function Home() {
  const [products, setProducts]       = useState([])
  const [categories, setCategories]   = useState([])
  const [communityData, setCommunityData] = useState(null)
  const [cart, setCart]               = useState([])
  const [wishlist, setWishlist]       = useState(() => JSON.parse(localStorage.getItem('wishlist') || '[]'))
  const [activeCategory, setActiveCategory] = useState('all')
  const [search, setSearch]           = useState('')
  const [sortBy, setSortBy]           = useState('default')
  const [loading, setLoading]         = useState(true)
  const navigate  = useNavigate()
  const { toasts, show } = useToast()

  const community = localStorage.getItem('community')

  useEffect(() => {
    if (!community) { navigate('/'); return }

    Promise.all([
      getProducts(community),
      getCategories(community),
      getCommunities()
    ]).then(([prodRes, catRes, commRes]) => {
      setProducts(prodRes.data)
      setCategories(catRes.data)
      const comm = commRes.data.find(c => c.id === community)
      setCommunityData(comm)
    }).finally(() => setLoading(false))

    setCart(JSON.parse(localStorage.getItem('cart') || '[]'))
  }, [community, navigate])

  // ── Wishlist toggle ──────────────────────────────────────────
  const toggleWishlist = (product, e) => {
    e.stopPropagation()
    const isIn = wishlist.includes(product.id)
    const next  = isIn ? wishlist.filter(id => id !== product.id) : [...wishlist, product.id]
    setWishlist(next)
    localStorage.setItem('wishlist', JSON.stringify(next))
    show(isIn ? 'Removed from wishlist' : 'Added to wishlist ♥', isIn ? 'info' : 'success')
  }

  // ── Add to cart ──────────────────────────────────────────────
  const addToCart = (product, e) => {
    e.stopPropagation()
    const newCart = [...cart, { ...product, quantity: 1 }]
    setCart(newCart)
    localStorage.setItem('cart', JSON.stringify(newCart))
    show(`${product.name} added to cart!`)
  }

  // ── Filter + search + sort ────────────────────────────────────
  const visible = products
    .filter(p => activeCategory === 'all' || p.category === activeCategory)
    .filter(p => p.name.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === 'price-asc')  return a.price - b.price
      if (sortBy === 'price-desc') return b.price - a.price
      if (sortBy === 'rating')     return b.rating - a.rating
      return 0
    })

  const cartCount = cart.length

  return (
    <div className="home">
      {/* Toast container */}
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
            {communityData && (
              <span className="community-label">
                {communityData.icon} {communityData.name}
              </span>
            )}
            <button id="nav-cart-btn" className="cart-btn" onClick={() => navigate('/cart')}>
              🛒 Cart {cartCount > 0 && <span className="badge">{cartCount}</span>}
            </button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      {communityData && (
        <div className="hero">
          <div className="hero-inner">
            <p className="hero-eyebrow">✦ Curated for you</p>
            <h1>{communityData.hero?.title || `Welcome to ${communityData.name}`}</h1>
            <p>{communityData.hero?.subtitle || 'Explore products handpicked for your community'}</p>
          </div>
        </div>
      )}

      {/* Toolbar: search + sort */}
      <div className="toolbar">
        <div className="toolbar-inner">
          <div className="search-wrap">
            <span className="search-icon">🔍</span>
            <input
              id="product-search"
              type="text"
              className="search-input"
              placeholder="Search products…"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            {search && (
              <button className="search-clear" onClick={() => setSearch('')}>✕</button>
            )}
          </div>
          <select
            id="sort-select"
            className="sort-select"
            value={sortBy}
            onChange={e => setSortBy(e.target.value)}
          >
            <option value="default">Sort: Default</option>
            <option value="price-asc">Price: Low → High</option>
            <option value="price-desc">Price: High → Low</option>
            <option value="rating">Top Rated</option>
          </select>
        </div>
      </div>

      {/* Category pills */}
      <div className="categories-wrap">
        <div className="categories">
          <button
            id="cat-all"
            className={`category-pill ${activeCategory === 'all' ? 'active' : ''}`}
            onClick={() => setActiveCategory('all')}
          >
            All
          </button>
          {categories.map(cat => (
            <button
              key={cat.id}
              id={`cat-${cat.id}`}
              className={`category-pill ${activeCategory === cat.id ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat.id)}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Product grid */}
      {loading ? (
        <div className="grid-loader">
          {[...Array(6)].map((_, i) => <div key={i} className="skeleton-card" />)}
        </div>
      ) : visible.length === 0 ? (
        <div className="no-results">
          <span>🔎</span>
          <p>No products found</p>
          <button onClick={() => { setSearch(''); setActiveCategory('all') }}>Clear filters</button>
        </div>
      ) : (
        <div className="products">
          {visible.map(product => (
            <div
              key={product.id}
              id={`product-card-${product.id}`}
              className="product-card"
              onClick={() => navigate(`/product/${product.id}`)}
            >
              <div className="product-image-wrapper">
                <img src={product.image} alt={product.name} loading="lazy" />
                <button
                  id={`wishlist-${product.id}`}
                  className={`wishlist-btn ${wishlist.includes(product.id) ? 'wishlisted' : ''}`}
                  onClick={e => toggleWishlist(product, e)}
                  title={wishlist.includes(product.id) ? 'Remove from wishlist' : 'Add to wishlist'}
                >
                  {wishlist.includes(product.id) ? '♥' : '♡'}
                </button>
                {product.badge && <div className="img-badge">{product.badge}</div>}
                {product.is_vto_enabled && <div className="vto-chip">✦ Try On</div>}
              </div>
              <div className="product-info">
                <div className="price-rating">
                  <span className="price">₹{product.price}</span>
                  <span className="rating">⭐ {product.rating}</span>
                </div>
                <h3>{product.name}</h3>
                <button
                  id={`add-cart-${product.id}`}
                  className="add-cart-btn"
                  onClick={e => addToCart(product, e)}
                >
                  + Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Home
