import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getCommunities } from '../api'
import './Onboarding.css'

function Onboarding() {
  const [communities, setCommunities] = useState([])
  const [selected, setSelected] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    getCommunities().then(res => setCommunities(res.data))
  }, [])

  const handleStart = () => {
    if (selected) {
      localStorage.setItem('community', selected)
      navigate('/home')
    }
  }

  return (
    <div className="onboarding">
      <h1>Choose Your Community</h1>
      <p>Select your community to personalize your shopping experience</p>
      
      <div className="community-grid">
        {communities.map(comm => (
          <div
            key={comm.id}
            className={`community-tile ${selected === comm.id ? 'selected' : ''}`}
            onClick={() => setSelected(comm.id)}
          >
            <span className="icon">{comm.icon}</span>
            <span className="name">{comm.name}</span>
          </div>
        ))}
      </div>

      <button 
        className="start-btn" 
        onClick={handleStart}
        disabled={!selected}
      >
        Start Shopping
      </button>
    </div>
  )
}

export default Onboarding
