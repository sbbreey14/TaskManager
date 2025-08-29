import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

// Components
import { TasksApp } from './TaskApp';

// Import CSS
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <TasksApp />
  </StrictMode>,
)
