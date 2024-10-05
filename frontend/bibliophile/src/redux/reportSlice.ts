import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ReportType, UpdateReportData, CreateData } from "@/types/report.ts";
import { getReport, updateReport, deleteReport, createReport, getMyReport } from "@/api/reports";

const initialState: ReportType = {
  loading: true,
  error: null,
  data: {
    bookReportId: 0,
    content: "",
    bookReportImgUrlList: [],
    createdDate: "",
    lastModifyDate: ""
  }
};

export const loadReport = createAsyncThunk(
  "reports/getReport",
  async (bookReportId: number) => {
    return await getReport(bookReportId);
  }
);

export const editReport = createAsyncThunk(
  "reports/updateReport",
  async ({bookReportId, updateData}: {bookReportId:number; updateData: UpdateReportData}) => {
    return await updateReport(bookReportId, updateData);
  }
)

export const removeReport = createAsyncThunk(
  "reports/deleteReport",
  async (bookReportId: number) => {
    return await deleteReport(bookReportId);;
  }
)

export const addReport = createAsyncThunk(
  "reports/createReport",
  async (createData: CreateData) => {
    return await createReport(createData);
  }
)

export const loadMyReport = createAsyncThunk(
  "reports/getMyReport",
  async (myBookId: number) => {
    return await getMyReport(myBookId);
  }
);

const reportSlice = createSlice({
  name: "report",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadReport.pending, (state) => {
        state.loading = true;
      })
      .addCase(loadReport.fulfilled, (state, action) => {
        state.data = action.payload.data;
        state.loading = false;
      })
      .addCase(loadReport.rejected, (state, action) => {
        state.error = action.error.message || "Report failed";
        state.loading = false;
      })

      .addCase(removeReport.fulfilled, (state) => {
        state.data = {
          bookReportId: 0,
          content: "",
          bookReportImgUrlList: [],
          createdDate: "",
          lastModifyDate: "",
        };
      })
      .addCase(removeReport.rejected, (state, action) => {
        state.error = action.error.message || "Report delete failed";
      })

      .addCase(editReport.fulfilled, (state, action) => {
        const { content, bookReportImgUrl } = action.payload.data;
        state.data = {
          ...state.data,
          content,
          bookReportImgUrlList: bookReportImgUrl,
        };
      })
      .addCase(editReport.rejected, (state, action) => {
        state.error = action.error.message || "Report update failed";
      })

      .addCase(loadMyReport.fulfilled, (state, action) => {
        state.data = action.payload.data;
        state.loading = false;
      })
      .addCase(loadMyReport.rejected, (state, action) => {
        state.error = action.error.message || "Failed to load Report";
        state.loading = false;
      });

  },
});

export const reportReducer = reportSlice.reducer;