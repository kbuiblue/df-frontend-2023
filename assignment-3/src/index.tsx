import React from 'react'
import ReactDOM from 'react-dom/client'
import './styles/index.css'
import App from './components/App'
import reportWebVitals from './reportWebVitals'
import { ThemeProvider } from './components/context/ThemeProvider'

const rootElement = document.getElementById('root') as Element | DocumentFragment;

const root = ReactDOM.createRoot(rootElement)
root.render(
    <React.StrictMode>
        <ThemeProvider>
            <App />
        </ThemeProvider>
    </React.StrictMode>,
)
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
