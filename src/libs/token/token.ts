import jwt, { JwtPayload } from 'jsonwebtoken';
import ms from 'ms';

export type TokenValidationConfig = {
  /**
   * Check the validation in given time. Uses time format that is
   * transformed in milliseconds with `ms`
   */
  in?: string,
};

export const isTokenValid = (token: string, config?: TokenValidationConfig) => {
  const inTime = ms(config?.in || '0ms');

  const decodedToken = jwt.decode(token) as JwtPayload;

  // `exp` is in minute
  const expirationDate = new Date(decodedToken.exp! * 1000);
  const expirationTimeIn = expirationDate.getTime() + inTime;

  const atTime = new Date(Date.now() + inTime);

  return expirationTimeIn > atTime.getTime();
};
