import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ success: false, message: 'Unauthorized' });
  }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.body.user = decoded.id;
        next();
    } catch (error) {
        return res.status(401).json({ success: false, message: 'Unauthorized' });
    }
}
export default authMiddleware;