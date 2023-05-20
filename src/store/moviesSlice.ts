import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Video {
    id: string;
    key: string;
    name: string;
    site: string;
}

interface MoviesState {
    value: any[]; // Змініть тип на відповідний, залежно від структури даних, яку очікується
    videos: Record<number, Video[]>;
}

const initialState: MoviesState = {
    value: [],
    videos: {},
};

const moviesSlice = createSlice({
    name: 'movies',
    initialState,
    reducers: {
        setReduxMovies: (state, action: PayloadAction<any>) => {
            state.value = action.payload;
        },
        setVideos: (state, action: PayloadAction<{ movieId: number; videos: Video[] }>) => {
            const { movieId, videos } = action.payload;
            state.videos[movieId] = videos;
        },
    },
});

export const { setReduxMovies, setVideos } = moviesSlice.actions;

export default moviesSlice.reducer;