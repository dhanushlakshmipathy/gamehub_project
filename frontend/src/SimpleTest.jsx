import React from 'react'

export default function SimpleTest() {
  return (
    <div style={{ 
      backgroundColor: '#1a1a1a', 
      color: 'white', 
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      fontFamily: 'Arial, sans-serif'
    }}>
      <h1 style={{ fontSize: '3rem', marginBottom: '1rem', color: '#00d735' }}>
        🎮 GameHub Test
      </h1>
      <p style={{ fontSize: '1.5rem', marginBottom: '2rem' }}>
        If you can see this, React is working!
      </p>
      <div style={{
        width: '50px',
        height: '50px',
        border: '4px solid #00d735',
        borderTop: '4px solid transparent',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite'
      }}></div>
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}