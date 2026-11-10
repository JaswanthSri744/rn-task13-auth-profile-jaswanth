
export interface User {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender?: string;
  image?: string;
  phone?: string;
  age?: number;
  address?: {
    address?: string;
    city?: string;
    state?: string;
  };
}

export interface LoginResponse extends User {
  accessToken: string;
  refreshToken: string;
}

export interface AuthSession {
  user: User;
  accessToken: string;
  refreshToken: string;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface ProfileUpdate {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}
