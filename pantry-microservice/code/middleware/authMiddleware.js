
export function authenticateUser(req, res, next) {
  // Dummy authentication for demonstration purposes
  // In a real application, you would verify a token or session
  const userId = req.headers['x-user-id'];
  if (!userId) {
    return res.status(401).send('Unauthorized');
  }
  req.user = { id: userId };
  next();
}