export type FormDataRegister = {
  name: string;
  email: string;
  password: string;
  confirm_password: string;
};

export type FormDataLogin = {
  email: string;
  password: string;
};

export type User = {
  _id?: string;
  token?: string;
  name: string;
  email: string;
  token: string;
};

export type initialAuthState = {
  user: User | null;
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  message: string | unknown;
};

export type InputDate = Date;

export type SelectedDates = {
  startDate: InputDate;
  endDate: InputDate;
};

export type Goal = {
  _id?: string;
  text?: string;
  selectedDates?: SelectedDates;
  createdAt?: string;
};

export type InitialGoalState = {
  goals: Goal[];
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  message: string | unknown;
};
