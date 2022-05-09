import { PanoramaSharp } from "@mui/icons-material";
import { createSlice } from "@reduxjs/toolkit";
import createTableHeader from "../utils/createTableHeader";
import { fetchData, fetchByMultipleCodes } from "./thunks/dataThunk";

const initialState = {
  params: {},
  tabledData: {
    header: [],
    data: [],
  },
  status: "idle",
  dataRdy: false,
  meta: {},
  filters: {
    enable_filters: false,
    sold: { enabled: false, value: false },
    // fa_src: { enabled: false, value: false },
    fa_src: {
      enabled: false,
      active: false,
      keywords: [
        { title: "s" },
        { title: "p" },
        { title: "w" },
        { title: "or" },
        { title: "e" },
      ],
      active_keywords: [],
    },
    reduced: { enabled: false, value: false },
    dataPick: { enabled: false, value: null },
    // new_on_market: { enabled: false, value: false },
    category: {
      enabled: false,
      active: false,
      keywords: [
        { title: "property-for-sale" },
        { title: "commercial-property-to-rent" },
        { title: "property-to-rent" },
        { title: "commercial-property-for-sale" },
      ],
      active_keywords: [],
    },
    matminder: {
      enabled: false,
      active: false,
      keywords: [
        { title: "Full_Planning" },
        { title: "Plot" },
        { title: "Investment" },
        { title: "Empty" },
        { title: "Refurb" },
        { title: "BTL" },
        { title: "HMO" },
        { title: "Retirement" },
        { title: "New_Home" },
        { title: "Tenanted" },
        { title: "Shared_Ownership" },
        { title: "Park_Home" },
        { title: "Listed" },
        { title: "Auction" },
        { title: "Knotweed" },
        { title: "Online_Viewing" },
      ],
      active_keywords: [],
    },
  },
};

export const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    enableFilter(state, { payload }) {
      state.filters[payload.filter].enabled = payload.value;
    },
    setFilter(state, { payload }) {
      state.filters[payload.filter] = payload.value;
    },

    toggleFilters(state) {
      state.filters.enable_filters = !state.filters.enable_filters;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchByMultipleCodes.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchByMultipleCodes.fulfilled, (state, { payload }) => {
        state.status = "idle";
        state.tabledData = {
          headerData: createTableHeader(payload.data),
          data: [...payload.data],
        };
        state.meta = payload.meta;
        state.dataRdy = true;
        state.params = payload.params;
      })
      .addCase(fetchByMultipleCodes.rejected, (state, action) => {
        state.status = "error";
      })
      .addCase(fetchData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchData.fulfilled, (state, { payload }) => {
        state.status = "idle";
        state.data = [...state.data, ...payload.data];
        state.meta = payload.meta;
        state.dataRdy = true;
        state.params = payload.params;
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.status = "error";
      });
  },
});

export const selectData = ({ data: { tabledData } }) => tabledData;
export const selectParams = ({ data }) => data.params;
export const selectMeta = ({ data }) => data.meta;
export const selectAll = ({ data }) => data;
export const selectFilters = ({ data }) => data.filters;

export const selectFilteredData = ({
  data: {
    tabledData: { data, headerData },
    dataRdy,
    filters,
  },
}) => {
  const {
    sold,
    fa_src,
    reduced,
    new_on_market,
    category,
    matminder,
    enable_filters,
  } = filters;
  return {
    dataRdy,
    headerData,
    // data,
    data: !enable_filters
      ? data
      : data.filter((i) => {
          // reduced.enabled ? i.reduced === reduced.value : null;
          // new_on_market.enabled ? i.new_on_market === new_on_market.value : null;
          //
          console.log(
            "fa src: ",
            fa_src.enable && fa_src.active_keywords.map((i) => i.title)
          );
          console.log("fa src i: ", i.fa_src);

          console.log(
            "fa src includes: ",
            fa_src.enable &&
              fa_src.active_keywords.map((i) => i.title).includes(i.fa_src)
          );

          return (
            (sold.enabled ? i.sold === sold.value : true) &&
            (fa_src.enabled && fa_src.active_keywords.length > 0
              ? fa_src.active_keywords.map((i) => i.title).includes(i.fa_src)
              : true) &&
            (matminder.enabled && matminder.active_keywords.length > 0
              ? matminder.active_keywords
                  .map((i) => i.title)
                  .filter((value) => i.keywords.includes(value)).length > 0
              : true) &&
            (category.enabled && category.active_keywords.length > 0
              ? category.active_keywords
                  .map((i) => i.title)
                  .includes(i.category)
              : true)
          );
        }),
  };
};

export const { setFilter, toggleFilters, enableFilter } = dataSlice.actions;

export default dataSlice.reducer;
