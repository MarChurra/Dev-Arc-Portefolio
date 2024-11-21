import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/globalStyles.css'
import FullpageWrapper from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <FullpageWrapper />
  </StrictMode>,
)
