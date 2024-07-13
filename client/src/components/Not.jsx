import React, { useEffect, useState } from "react";
import { FaWindowClose } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { deleteNot } from "../features/data/dataSlice";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

function Not({ not }) {
  const [oncelikText, setOncelikText] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    switch (not.oncelik) {
      case 1:
        setOncelikText("Az Öncelikli");
        break;
      case 2:
        setOncelikText("Öncelikli");
        break;
      case 3:
        setOncelikText("Çok Öncelikli");
        break;
      default:
        setOncelikText("");
        break;
    }
  }, [not.oncelik]);

  const onDelete = (id) => {
    dispatch(deleteNot(id));
  };

  return (
    <Card variant="outlined" sx={{ maxWidth: 345, margin: 2 }}>
      <CardContent>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6">
            {new Date(not.createdAt).toLocaleString("tr-TR")}
          </Typography>
          <IconButton onClick={() => onDelete(not._id)} size="small" color="error">
            <FaWindowClose />
          </IconButton>
        </div>
        <Typography variant="h5" component="div">
          {not.baslik}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {not.aciklama}
        </Typography>
        <Typography variant="body2">
          {oncelikText}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default Not;
