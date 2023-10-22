import { configureStore } from '@reduxjs/toolkit'
import authSlice from '@store/auth.store/auth.slice';
import ThemeSlice from '@store/theme.store/theme.slice';
import SearchSlice from '@store/search.store/search.slice';
import NavSlice from '@store/nav.store/nav.slice';

export const store = configureStore({
  reducer: {
    RDauth: authSlice,
    RDtheme: ThemeSlice,
    RDsearch: SearchSlice,
    RDnav: NavSlice,
  },
})

export type IRootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch