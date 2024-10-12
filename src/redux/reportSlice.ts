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
    const response = await getReport(bookReportId);
    return response.data;
  }
);

export const editReport = createAsyncThunk(
  "reports/updateReport",
  async ({bookReportId, updateData}: {bookReportId:number; updateData: UpdateReportData}) => {
    const response = await updateReport(bookReportId, updateData);
    return response.data;
  }
)

export const removeReport = createAsyncThunk(
  "reports/deleteReport",
  async (bookReportId: number) => {
    const response = await deleteReport(bookReportId);
    return response.data;
  }
)

export const addReport = createAsyncThunk(
  "reports/createReport",
  async (createData: CreateData) => {
    const response = await createReport(createData);
    return response.data;
  }
)

export const loadMyReport = createAsyncThunk(
  "reports/getMyReport",
  async (myBookId: number) => {
    const response = await getMyReport(myBookId);
    return response.data;
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