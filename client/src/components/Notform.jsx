import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
// import dataService from '../features/data/dataSevice';
import { createNot } from '../features/data/dataSlice';

const NotForm = () => {
  const [baslik, setBaslik] = useState('')
  const [aciklama, setAciklama] = useState('')
  const [oncelik, setOncelik] = useState(1)

  const dispatch = useDispatch();

  const onSubmit = (e) => {
    e.preventDefault();

    dispatch(createNot({baslik,aciklama,oncelik}))

    

    // console.log(baslik,aciklama,oncelik);
    setBaslik('')
    setAciklama('')
    setOncelik(1)
    
  }

  return (
    <section className='form'>
      <form onSubmit={onSubmit}>
        <div className='form-group'>
          <label htmlFor="baslik">Not Başlık:</label>
          <input 
            type="text" 
            id='baslik' 
            name='baslik' 
            value={baslik} 
            onChange={(e) => setBaslik(e.target.value)} 
          />
        </div>
        <div className='form-group'>
          <label htmlFor="aciklama">Not Açıklama:</label>
          <input 
            type="text" 
            id='aciklama' 
            name='aciklama' 
            value={aciklama} 
            onChange={(e) => setAciklama(e.target.value)} 
          />
        </div>
        <div className='form-group'>
          <label htmlFor="oncelik">Not Öncelik:</label>
          <select 
            id="oncelik" 
            name="oncelik" 
            onChange={(e) => setOncelik(e.target.value)} 
            value={oncelik}
          >
            <option value="1">Az Öncelikli</option>
            <option value="2">Öncelikli</option>
            <option value="3">Çok Öncelikli</option>
          </select>
        </div>
        <div className='form-group'>
          <button type='submit' className='btn btn-block btn-add'>Not Ekle</button>
        </div>
      </form>
    </section>
  );
};

export default NotForm;
