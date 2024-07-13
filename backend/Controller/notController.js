const notModel = require('../models/notModel');
const userModel = require('../models/userModel');

const getNotlar = async (req, res) => {
  const notlar = await notModel.find({user:req.user.id}).sort({createdAt:-1})
  res.status(200).json(notlar)
};

const setNotlar = async (req, res) => {
  try {
    if (!req.body.baslik || !req.body.aciklama) {
      res.status(400).json({ mesaj: 'Tüm alanları doldurunuz' });
      return;
    }
    const not = await notModel.create({
      baslik: req.body.baslik,
      aciklama: req.body.aciklama,
      oncelik: req.body.oncelik,
      user:req.user.id
    });
    res.status(200).json(not);
  } catch (error) {
    res.status(500).json({ mesaj: error.message });
  }
};

const updateNotlar = async (req, res) => {
  try {
    const not = await notModel.findById(req.params.id);
    const user = await userModel.findById(req.user.id);

    if (!user) {
      res.status(400);
      throw new Error('User not found');
    }

    if (!not) {
      res.status(400);
      throw new Error('Note not found');
    }

    // Kullanıcı yetkilendirme kontrolü
    if (not.user.toString() !== req.user.id) {
      res.status(401);
      throw new Error('Unauthorized access');
    }

    // Notu güncelle
    const updated = await notModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updated);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};


const deleteNotlar = async (req, res) => {
  try {
    const not = await notModel.findById(req.params.id);
    const user = await userModel.findById(req.user.id);

    if (!user) {
      res.status(400);
      throw new Error('User not found');
    }

    if (!not) {
      res.status(400);
      throw new Error('Note not found');
    }

    // Kullanıcı yetkilendirme kontrolü
    if (not.user.toString() !== req.user.id) {
      res.status(401);
      throw new Error('Unauthorized access');
    }

    await notModel.findByIdAndDelete(req.params.id);
    res.status(200).json({id:req.params.id});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};







module.exports = { getNotlar, setNotlar, updateNotlar,deleteNotlar};
