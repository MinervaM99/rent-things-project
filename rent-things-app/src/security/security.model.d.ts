export interface claim {
  name: string;
  value: string;
}

export interface userCredentials {
  email: string;
  password: string;
  phoneNumber?: string;
  userName?: string
}

export interface authenticationResponse{
  token: string;
  expiration: Date;
}
