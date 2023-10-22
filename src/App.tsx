import { BrowserRouter } from 'react-router-dom'
import ScrollToTop from '@components/scrollToTop'
import ThemeProvider from '@store/theme.store/theme.provider';
import RoutesControl from '@routes/RoutesControl';
// add fonts awesome
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';

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
library.add(fab, fas, far);