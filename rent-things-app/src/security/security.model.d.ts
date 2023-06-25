export interface claim {
  name: string;
  value: string;
}
export interface userCredentialsRegister {
  userName: string;
  email?: string;
  phoneNumber: string;
  password: string;
}
export interface userCredentialsLogin {
  userName: string;
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

export interface userInfoDTO{
  id: string;
  email:string;
  userName: string;
  phoneNumber: string; 
}

