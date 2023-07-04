const jwt = require("jsonwebtoken");

const authen = (req, res, next) => {
    try {
        const token =
            req.body.token || req.query.token || req.headers["x-access-token"];
        if (!token) {
            return res.status(403).json({ message: "Please login" });
        }
        const decode = jwt.verify(token, "thanhvu");
        req.user = decode;
        next();
    }
    catch (err) {
        console.log(err.message);
        res.status(401).json({ message: "Please login" });
    }
}

module.exports = authen;