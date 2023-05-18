import { configureStore } from '@reduxjs/toolkit'
import countSlice from './counter.store/count.slice'
import authSlice from './auth.store/auth.slice';
import ThemeSlice from './theme.store/theme.slice';
import SearchSlice from './search.store/search.slice';

export const store = configureStore({
  reducer: {
    counter: countSlice,
    auth: authSlice,
    theme: ThemeSlice,
    search: SearchSlice,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch