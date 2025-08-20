import { auth } from 'express-oauth2-jwt-bearer';

const authMiddleware = auth({
    audience: 'https://BED-api',
    issuerBaseURL: 'https://dev-j0w6usstgvze3uch.eu.auth0.com/',
});

export default authMiddleware;