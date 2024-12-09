const pantries = {}; // Object to store pantries by user ID

export const getPantry = (req, res, next) => {
  try {
    const userId = req.user.id; // Assuming user ID is available in req.user
    const userPantry = pantries[userId] || [];
    res.json(userPantry);
  } catch (error) {
    next(error);
  }
};

export const updatePantry = (req, res, next) => {
  try {
    const userId = req.user.id; // Assuming user ID is available in req.user
    pantries[userId] = req.body;
    res.status(200).send('Pantry updated');
  } catch (error) {
    next(error);
  }
};