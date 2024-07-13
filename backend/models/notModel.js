const mongoose = require('mongoose');

const notSchema= mongoose.Schema({
  user:{
    type:mongoose.Schema.Types.ObjectId,
    required:true,
    ref:'User'
  },
  baslik:{
    type:String,
    required:[true, 'Lütfen not başlığı giriniz']
  },
  aciklama:{
    type:String,
    required:[true, 'Lütfen not açıklama giriniz']
  },
  oncelik:{
    type:Number,
  }
},{
  timestamps:true
})

module.exports=mongoose.model('Not',notSchema)