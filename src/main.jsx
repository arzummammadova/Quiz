import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './redux/store/store.js'
import { ToastProvider } from 'arzu-toast-modal'
import { ThemeProvider } from './components/theme-provider'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>

    <Provider store={store} >
      <ThemeProvider  defaultTheme="dark" storageKey="vite-ui-theme">
      <ToastProvider>
        <App />

      </ToastProvider>
      </ThemeProvider>

    </Provider>
  </BrowserRouter >
)
