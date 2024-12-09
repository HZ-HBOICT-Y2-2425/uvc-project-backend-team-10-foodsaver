export async function checkName(req, res, next){
    console.log('I do not know you');
    next();
}

export function errorHandler(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
}