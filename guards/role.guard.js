const roleGuard = (acceptedRoles) => (req, res, next) => {
    const { user } = req;
    if (!acceptedRoles.includes(user.type)) {
        return res.status(403).json({ error: 'Access Forbidden. Insufficient privileges.' });
    }
    next();
};

export { roleGuard };
