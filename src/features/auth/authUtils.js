const DEMO_EMAIL = "intern@demo.com";
const DEMO_PASSWORD = "intern123";

export function validateCredentials(email, pass) {
    return email === DEMO_EMAIL && pass === DEMO_PASSWORD
}

// Store data according to rememberMe value
export function saveAuthToStorage(data, rememberMe) {
    // if true then it will persist the Auth
    // else clear auth when tab closes
    
    if (rememberMe) {
        localStorage.setItem('auth', JSON.stringify(data))
        sessionStorage.removeItem('auth');
        
    } else {
        sessionStorage.setItem('auth', JSON.stringify(data))
        localStorage.removeItem('auth');
    }
}

// Simply loading Auth Data from Storage 
export function loadAuthFromStorage(email, pass) {
    const localData = localStorage.getItem("auth");
    const sessionData = sessionStorage.getItem("auth");

    return localData || sessionData;
}

// Clearing the Storage i will use it at time of Logout
export function clearAuthStorage(email, pass) {
    localStorage.removeItem("auth");
    sessionStorage.removeItem("auth");
}
