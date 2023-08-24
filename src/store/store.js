import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/dist/query'
import dashboardSlice from '../service/dashboardSlice'
import UserSlice from '../service/UserSlice'

export const store = configureStore({
  reducer: {
    dashboard: dashboardSlice,
    user: UserSlice
  },
})

setupListeners(store.dispatch)