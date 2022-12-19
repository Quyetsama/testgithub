import React, { useEffect, useState } from "react";
import "../../assets/css/login.css"
import { Link } from 'react-router-dom';
import authLayout from "../../hoc/authLayout";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { doLogin } from "../../redux/actions/auth.action";
import { useNavigate } from "react-router-dom";

const LoginPage = ({history}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {isLogin} = useSelector(state => state.auth);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (isLogin) {
      navigate("/");
    }
  }, [isLogin]);

  const handleLogin = () => {
    dispatch(doLogin({email, password}));
  }

  return <>
    <div className="login-form">
      <div className="d-flex align-items-center my-4">
        <h1 className="text-center fw-normal mb-0 me-3">Sign In</h1>
      </div>
      {/* <!-- Email input --> */}
      <div className="form-outline mb-4">
        <label className="form-label" htmlFor="form3Example3">Email address</label>
        <input type="email" id="form3Example3" className="form-control form-control-lg"
          placeholder="Enter a valid email address" defaultValue={email} onChange={e => setEmail(e.target.value)} />
      </div>

      {/* <!-- Password input --> */}
      <div className="form-outline mb-3">
        <label className="form-label" htmlFor="form3Example4">Password</label>
        <input type="password" id="form3Example4" className="form-control form-control-lg"
          placeholder="Enter password" defaultValue={password} onChange={e => setPassword(e.target.value)} />
      </div>

      <div className="text-center text-lg-start mt-4 pt-2">
        <Button disabled={!email || !password} className="btn btn-primary btn-lg" onClick={handleLogin}>Login</Button>
      </div>
    </div>
  </>
}

export default authLayout(LoginPage);