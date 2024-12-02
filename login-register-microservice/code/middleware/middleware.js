export async function checkName(req, res, next){
    console.log('I do not know you');
    next();
}


export const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) {
        console.log("not authorised");
        return res.status(401).json({ success: false, message: 'Access denied. No token provided.' });
    }
  
    try {
      const verified = jwt.verify(token.split(' ')[1], process.env.JWT_SECRET || 'your_jwt_secret');
      req.user = verified;
      next();
    } catch (error) {
      res.status(403).json({ success: false, message: 'Invalid token.' });
    }
  };
  