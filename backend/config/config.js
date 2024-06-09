import dotenv from 'dotenv';
dotenv.config();

export const PORT = process.env.PORT || 5500;
export const mongoDBURL = process.env.MONGODB_URL ;
export const JWTSECRETKEY = process.env.JWT_SECRET_KEY || 'asg7-ahlmoh5-kf5987-sd5f68-ds56d5c3';
export const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || '1737d653dbfa2b370dc1e94c259febcf36889504e5a79ce42c492e4b4eaa16d2f795f863cf7402700842da198f623d48214ee2e90e352b97218f689891de02ae';
export const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET || '8df1f8d96ffd981fdb95de02a6d922fbce546c2a5cb6f604ab21db28cf283ef771fca665b66fe08c0fd242670c6ebe3491674cdb4eefaa0887a0383dacdccf79';