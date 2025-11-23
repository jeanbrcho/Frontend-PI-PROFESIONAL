export interface IProfile {
  id: string;
  name: string;
  lastname: string;
  dni: string;
  email: string;
  license: string;
  specialty: string;
  iat?: number;
  exp?: number;
}
