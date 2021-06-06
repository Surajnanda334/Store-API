const jwt = require('jsonwebtoken')
module.exports =(req,res,next)=>{
  try{
    const token = req.body.token
    console.log(token);
    const decoded = jwt.verify(req.body.token, process.env.secret)
    req.userData=decoded;
    next();
  }catch(error){
    res.json({
      message:"This feature is only available to Admins"
    })
  }
}