import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { InitialGoalState } from "../../declarations/formData";
import goalService from "./goalService";

const initialState: InitialGoalState = {
  goals: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// create a new goal
export const createGoal = createAsyncThunk(
  "goal/create",
  async (goalData: any, thunkAPI: any) => {
    try {
      const token = thunkAPI.getState().auth.user.token;

      return await goalService.createGoal(goalData, token);
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  },
);

// Get user goals
export const getGoals = createAsyncThunk(
  "goals/getAll",
  async (_, thunkAPI: any) => {
    try {
      const auth = thunkAPI.getState().auth;
      const token = auth?.user?.token as string;

      // console.log("token: ", token)
      if (!token) {
        throw new Error("Token not found");
      }
      return await goalService.getGoals(token);
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  },
);

export const updateGoal = createAsyncThunk(
  "goals/update",
  async (
    { goalId, goalData }: { goalId: string; goalData: any },
    thunkAPI: any,
  ) => {
    try {
      const token = thunkAPI.getState().auth.user.token;

      return await goalService.updateGoal(goalId, goalData, token);
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  },
);

// Delete user goal
export const deleteGoal = createAsyncThunk(
  "goals/delete",
  async (id: string, thunkAPI: any) => {
    try {
      const token = thunkAPI.getState().auth.user.token;

      return await goalService.deleteGoal(id, token);
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  },
);

export const goalSlice = createSlice({
  name: "goal",
  initialState,
  reducers: {
    reset: (state: InitialGoalState) => initialState,
  },
  extraReducers: (builder) => {
    builder

      // create a new goal
      .addCase(createGoal.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createGoal.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.goals.push(action.payload);
      })
      .addCase(createGoal.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // get all goals
      .addCase(getGoals.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getGoals.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.goals = action.payload;
      })
      .addCase(getGoals.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // update a goal
      .addCase(updateGoal.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateGoal.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.goals = state.goals.map((goal: any) =>
          goal._id === action.payload._id ? action.payload : goal,
        );
      })
      .addCase(updateGoal.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // delete a goal
      .addCase(deleteGoal.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteGoal.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.goals = state.goals.filter(
          (goal: any) => goal._id !== action.payload.id,
        );
      })
      .addCase(deleteGoal.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = goalSlice.actions;
export default goalSlice.reducer;
