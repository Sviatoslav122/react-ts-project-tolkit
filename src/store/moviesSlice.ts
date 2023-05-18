import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface MoviesState {
    value: any[]
}

const initialState: MoviesState = {
    value: []
}

export const moviesSlice = createSlice({
    name: 'movies',
    initialState,
    reducers: {
        setReduxMovies: (state, action: PayloadAction<any>) => {
            state.value = action.payload
        },
    },
})

export const { setReduxMovies } = moviesSlice.actions

export default moviesSlice.reducer