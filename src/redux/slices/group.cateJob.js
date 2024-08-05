import { createSlice } from "@reduxjs/toolkit";
import { property, reduce, size, values } from "lodash";
import { dispatch } from "../store";
import { getCateJobListAPI } from "../../service/group.cateJob.service";

const initialState = {
    isLoading: false,
    error: null,
    totalElements: 0,
    totalPages: 0,
    numberOfElements: 0,
    cateJobs: [],
    cateJob: null,
    search: {
        page: 0,
        size: 10,
        value: '',
        orders: [
            {
                order: 'desc',
                property: 'id',
            },
        ],
    },
};
const slice = createSlice({
    name: 'mediaCateJob',
    initialState,
    reducers: {
        startLoading(state) {
            state.isLoading = true;
            state.error = null;
        },
        hasError(state, action) {
            state.isLoading = false;
            state.error = action.payload;

        },
        setCateJobs(state, action) {
            state.isLoading = false;
            const response = action.payload;
            state.cateJobs = response.data;
            state.totalElements = response.totalElements;
            state.totalPages = response.totalPages;
            state.numberOfElements = response.numberOfElements;
        },
        setCateJob(state, action) {
            state.isLoading = false;
            const response = action.payload;
            state.cateJob = response.data;
        },
        setCateJobSearch(state, action) {
            state.isLoading = false;
            state.cateJob = action.payload;
        },
    },
});

//reducer
export default slice.reducer;
//actions
export const { setCateJobSearch } = slice.actions;

export function getCateJobs() {
    return async (dispatch) => {
        dispatch(slice.actions.startLoading());

        const resp = await getCateJobListAPI();

        if (resp.code === '200') dispatch(slice.actions.setCateJobs(resp))
        else dispatch(slice.actions.hasError(resp));
    };
}

export function getCategory(id) {
    return async (dispatch) => {
        dispatch(slice.actions.startLoading());

        const resp = await getCateJobListAPI(id);
        if (resp.code === '200') dispatch(slice.actions.setCateJob(resp));
        else dispatch(slice.actions.hasError(resp));
    }
}