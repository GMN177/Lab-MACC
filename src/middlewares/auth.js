const { initializeApp, applicationDefault } = require("firebase-admin/app");

const { getAuth } = require("firebase-admin/auth");

const app = initializeApp({
  credential: applicationDefault(),
});

const auth = getAuth(app);

const authMiddleware = async (req, res, next) => {
  if (process.env.SKIP_AUTH) return next();

  if (req.headers.authorization === undefined) {
    return res.sendStatus(401);
  }

  const idToken = req.headers.authorization;

  try {
    const decodedToken = await auth.verifyIdToken(idToken);
    req.user = decodedToken;
    next();
  } catch (err) {
    return res.sendStatus(403);
  }
};

module.exports = authMiddleware;
