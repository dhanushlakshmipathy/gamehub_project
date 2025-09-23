import React from 'react'

function SimpleApp() {
  return (
    <div style={{
      background: '#0d1117',
      color: 'white',
      minHeight: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      fontFamily: 'Arial, sans-serif'
    }}>
      <div style={{
        background: '#1c2128',
        padding: '2rem',
        borderRadius: '8px',
        textAlign: 'center'
      }}>
        <h1>🎮 GameHub is Working!</h1>
        <p style={{color: '#00d735'}}>✅ React is rendering successfully!</p>
      </div>
    </div>
  )
}

export default SimpleApp
