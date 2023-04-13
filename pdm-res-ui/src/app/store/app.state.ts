import { CollegeState } from "../maintenance/state/college.state/college.state";
import { collegeReducer } from "../maintenance/state/college.state/college.state.reducer";

export interface AppState {
  colleges: CollegeState
}

export const appReducer = {
  colleges: collegeReducer
}