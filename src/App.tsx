import { BrowserRouter } from 'react-router-dom'
import ScrollToTop from '@components/scrollToTop'
import ThemeProvider from '@store/theme.store/theme.provider';
import RoutesControl from '@routes/RoutesControl';
function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <ScrollToTop />
        <RoutesControl />
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
