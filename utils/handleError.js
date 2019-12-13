// Esto es un middleware: app.use(middleware) sin el next para que pare (el return no hace falta con res.json)

const handleError = (res, status, err) => {
    res.status(status).json({
        ok: false,
        err
    });
};

module.exports = { handleError };
