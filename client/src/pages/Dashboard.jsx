import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import NotForm from '../components/Notform';
import { getNot, reset } from '../features/data/dataSlice';
import Spinner from '../components/Spinner';
import Not from '../components/Not';
import Grid from "@mui/material/Grid";

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { notlar, isLoading, isError, message } = useSelector((state) => state.notlar);

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    if (!user) {
      navigate('/login');
    } else {
      dispatch(getNot());
    }

    return () => {
      dispatch(reset());
    };
  }, [user, navigate, isError, message, dispatch]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
    <section className='heading'>
      <h1>Merhaba {user && user.user.username}</h1>
      <p>Not ekleyebilir var olan notlarını görebilirsin</p>
    </section>
    <NotForm />
    <section className='content'>
      {notlar.length > 0 ? (
        <Grid container spacing={2} justifyContent="center">
          {notlar.map((not) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={not._id}>
              <Not not={not} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <h3>Henüz not girmediniz...</h3>
      )}
    </section>
  </>
  );
};

export default Dashboard;
