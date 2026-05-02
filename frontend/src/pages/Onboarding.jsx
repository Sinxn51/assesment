import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getCommunities } from '../api'
import './Onboarding.css'

function Onboarding() {
  const [communities, setCommunities] = useState([])
  const [selected, setSelected] = useState('')
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    // Clear stale community on return
    getCommunities()
      .then(res => setCommunities(res.data))
      .finally(() => setLoading(false))
  }, [])

  const handleStart = () => {
    if (selected) {
      localStorage.setItem('community', selected)
      navigate('/home')
    }
  }

  return (
    <div className="onboarding">
      {/* Animated background blobs */}
      <div className="ob-blob ob-blob-1" />
      <div className="ob-blob ob-blob-2" />
      <div className="ob-blob ob-blob-3" />

      <div className="ob-inner">
        <div className="ob-badge">✦ Personalized Shopping</div>
        <h1 className="ob-title">
          Choose Your<br />
          <span className="ob-highlight">Community</span>
        </h1>
        <p className="ob-subtitle">
          Select your community to unlock a curated shopping experience tailored just for you
        </p>

        {loading ? (
          <div className="ob-loader">
            <div className="spinner" />
          </div>
        ) : (
          <div className="community-grid">
            {communities.map((comm, i) => (
              <div
                key={comm.id}
                id={`community-${comm.id}`}
                className={`community-tile ${selected === comm.id ? 'selected' : ''}`}
                onClick={() => setSelected(comm.id)}
                style={{ animationDelay: `${i * 0.08}s` }}
              >
                {selected === comm.id && <div className="tile-glow" />}
                <div className="tile-icon">{comm.icon}</div>
                <span className="tile-name">{comm.name}</span>
                {selected === comm.id && (
                  <div className="tile-check">✓</div>
                )}
              </div>
            ))}
          </div>
        )}

        <button
          id="start-shopping-btn"
          className={`start-btn ${selected ? 'active' : ''}`}
          onClick={handleStart}
          disabled={!selected}
        >
          <span>Start Shopping</span>
          <span className="btn-arrow">→</span>
        </button>
      </div>
    </div>
  )
}

export default Onboarding
