export interface claim {
  name: string;
  value: string;
}

export interface userCredentialsRegister {
  email: string;
  password: string;
  phoneNumber: string;
  userName: string
}
export interface userCredentialsLogin {
  email: string;
  password: string;
}

export interface authenticationResponse{
  token: string;
  expiration: Date;
}

export interface userDTO{
  id: string;
  email:string;
  role?: string;
  userName?: string;
  phoneNumber?: string; 
}