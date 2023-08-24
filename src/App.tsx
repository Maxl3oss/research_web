import { BrowserRouter } from 'react-router-dom'
import ScrollToTop from '@components/scrollToTop'
import ThemeProvider from '@store/theme.store/theme.provider';
import RoutesControl from '@routes/routesControl';

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <ScrollToTop />
        <RoutesControl />
        {/* <Routes>
          {routes.map((item: IRoute, key: number) => (
            <Route path={item.path} element={item.element} key={key} />
          ))}
        </Routes> */}
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
