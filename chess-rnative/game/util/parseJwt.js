import jwt_decode from 'jwt-decode';

export default function parseJwt (token) {
    return jwt_decode(token);
};