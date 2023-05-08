import decode from 'jwt-decode';

class AuthService {
    getProfile() {
        return decode(this.getToken());
    }
    loggedIn() {
        const token = this.getToken();
        //use type coersion to check if token is NOT undefined and the token is not expired
        return !!token && !this.isTokenExpired(token);
    }

    isTokenExpired(token) {
        try {
            const decoded = decode(token);
            if(decoded.exp < Date.now() / 1000) {
                return true;
            }
            else
            {
                return false;
            }
        }
        catch (err) {
            return false;
        }
    }

    getToken() {
        return localStorage.getItem('id_token');
    }

    login(idToken) {
        localStorage.setItem('id_token',idToken);
        
    }
    logout() {
        localStorage.removeItem('id_token');
        window.location.refresh();
    }
}
export default new AuthService();