import React from "react";
import { FaSignInAlt, FaSignOutAlt, FaUser, FaPen } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout, reset } from "../features/auth/authSlice";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/login");
  };

  return (
    <header className="header">
      <div className="logo">
        <h2>NotePad</h2>
      </div>
      <ul>
        {user ? (
          <>
            <li>
              <Link to="/">
                <FaPen />
                Not oluştur
              </Link>
            </li>
            <li onClick={onLogout}>
              <a href=""><FaSignOutAlt />
              Çıkış Yap</a>
              {/* <button  onClick={onLogout}>
                
              </button> */}
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/login">
                <FaSignInAlt />
                Giriş
              </Link>
            </li>
            <li>
              <Link to="/register">
                <FaUser />
                Üye ol
              </Link>
            </li>
          </>
        )}
      </ul>
    </header>
  );
};

export default Header;
