export type AuthStackParamList = {
  Login: undefined;
  Signup: undefined;
  ForgotPassword: { email?: string } | undefined;
};

export type MainTabParamList = {
  Home: undefined;
  Profile: undefined;
  Rank: undefined;
  Settings: undefined;
};
