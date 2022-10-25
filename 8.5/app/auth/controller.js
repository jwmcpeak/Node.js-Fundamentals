export const showLogin = (req, res) => res.render('auth/login', {title: 'Login', layout: 'plain'});

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