import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from './storeTypes'

// Use throughout your app instead of plain `useDispatch` and `useSelector`


// Infer the `RootState` and `AppDispatch` types from the store itself
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()