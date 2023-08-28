import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/dist/query'
import dashboardSlice from '../service/dashboardSlice'
import UserSlice from '../service/UserSlice'
import dashboardPhoneSlice from '../service/dashboardPhoneSlice'
import phoneSlice from '../service/phoneSlice'
import ftcSlice from '../service/ftcSlice'

export const store = configureStore({
  reducer: {
    user: UserSlice,
    dashboard: dashboardSlice,
    dashboardPhones: dashboardPhoneSlice,
    phones: phoneSlice,
    ftc: ftcSlice
  },
})

setupListeners(store.dispatch)