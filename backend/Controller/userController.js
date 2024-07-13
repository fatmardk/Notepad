const userModel = require('../models/userModel');
const { hashedPassword, createToken, comparePassword } = require('../Controller/services/authService');

const registerUser = async (req, res) => {
  try {
    const { username, password, email } = req.body;

    // Gerekli alanların kontrolü
    if (!username || !password || !email) {
      return res.status(400).json({ mesaj: 'Tüm alanları doldurunuz' });
    }

    // Şifrenin hashlenmesi
    const hashedPass = await hashedPassword(password);

    // Kullanıcı oluşturma
    const user = await userModel.create({
      username,
      password: hashedPass,
      email,
    });

    // Token oluşturma
    const token = await createToken(user);

    res.status(200).json({ user, token });
  } catch (error) {
    res.status(500).json({ mesaj: error.message });
  }
};
const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Gelen verilerin doğruluğunu kontrol et
    if (!username || !password) {
      return res.status(400).json({ mesaj: 'Tüm alanları doldurunuz' });
    }

    // Kullanıcıyı bul
    const user = await userModel.findOne({ username });
    if (!user) {
      return res.status(400).json({ mesaj: 'Kullanıcı bulunamadı' });
    }

    // Şifreyi karşılaştır
    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ mesaj: 'Yanlış parola' });
    }

    // Token oluştur
    const token = await createToken(user);

    // Başarılı giriş
    res.status(200).json({ mesaj: 'Login başarılı', user, token });
  } catch (error) {
    // Hata yakalama ve mesaj
    res.status(500).json({ mesaj: 'Sunucu hatası: ' + error.message });
  }
};



const getUser = async (req, res) => {
  try {
    const user = await userModel.findById(req.user.id);
    if (!user) {
      return res.status(400).json({ mesaj: 'Kullanıcı bulunamadı' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ mesaj: error.message });
  }
};
module.exports = { registerUser, loginUser, getUser };
