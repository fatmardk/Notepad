import React, { useEffect, useState } from "react";
import { FaWindowClose } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { deleteNot } from "../features/data/dataSlice";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import { green, yellow, red } from '@mui/material/colors';
import CloseIcon from '@mui/icons-material/Close';

function Not({ not }) {
  const [oncelikText, setOncelikText] = useState("");
  const [oncelikAvatar, setOncelikAvatar] = useState("");
  const [oncelikRenk, setOncelikRenk] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    switch (not.oncelik) {
      case 1:
        setOncelikText("Az Öncelikli");
        setOncelikAvatar("AÖ");
        setOncelikRenk(green[800]);
        break;
      case 2:
        setOncelikText("Öncelikli");
        setOncelikAvatar("Ö");
        setOncelikRenk(yellow[800]);
        break;
      case 3:
        setOncelikText("Çok Öncelikli");
        setOncelikAvatar("ÇÖ");
        setOncelikRenk(red[800]);
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
    <Card variant="outlined" sx={{ maxWidth: 400, margin: 2 }}>
      <CardContent>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Avatar sx={{ bgcolor: oncelikRenk }}>
            {oncelikAvatar}
          </Avatar>
          <Typography variant="h6">
            {new Date(not.createdAt).toLocaleString("tr-TR")}
          </Typography>
          <IconButton onClick={() => onDelete(not._id)} size="small" color="error">
            <CloseIcon/>
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
