import {view} from './view.js';

export const showLogin = (req, res) => res.send(view('loginForm'));

export function authenticate(req, res) {
    const { email, password } = req.body;

    if (!email || !password) {
        res.redirect('/login');
        return;
    }

    if (email.toLowerCase() === 'admin@admin.com' && password === 'password') {
        req.session.user = {
            email,
            isAuthenticated: true
        };

        res.redirect('/guitars');
    } else {
        res.redirect('/login');
    }
}

export function checkAuth(req, res, next) {
    let isAuthenticated = req.session.user && req.session.user.isAuthenticated;

    if (isAuthenticated) {
        next();
    } else {
        res.redirect('/login');
    }
}

export function logout(req, res) {
    req.session.destroy();

    res.redirect('/');
}