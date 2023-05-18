import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ScrollToTop from './components/scrollToTop'
import routes from './routes';
import ThemeProvider from './store/theme.store/theme.provider';

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <ThemeProvider>
        <Routes>
          {routes.map((item: any, key: any) => {
            return (
              <Route path={item.path} element={item.element} key={key} />
            );
          })}
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  )
}

export default App
