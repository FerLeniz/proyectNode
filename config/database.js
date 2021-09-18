const mongoose=require('mongoose')

mongoose.connect(process.env.MONGO)
.then(()=> console.log('database connected!'))
.catch((error) => console.log(error))