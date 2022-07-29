import { RootState } from 'redux/store';

export const selectUserToken = ({ user }: RootState) => user.authorization.token;
export const selectUserError = ({ user }: RootState) => user.authorization.error;
export const selectUserLoading = ({ user }: RootState) => user.authorization.loading;
