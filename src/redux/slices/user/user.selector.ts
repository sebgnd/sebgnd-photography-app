import { RootState } from 'redux/store';

export const selectUserToken = ({ user }: RootState) => user.authorization.token;
