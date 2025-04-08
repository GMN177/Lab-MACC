import { applicationDefault, initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";

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
    console.log(err.message);
    return res.sendStatus(403);
  }
};

export default authMiddleware;
