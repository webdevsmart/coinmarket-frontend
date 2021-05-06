import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import FeatherIcon from 'feather-icons-react';
import { Link, NavLink } from 'react-router-dom';
import { Form, Input, Button } from 'antd';
import {
  GoogleReCaptchaProvider,
  GoogleReCaptcha
} from 'react-google-recaptcha-v3';
import { useDispatch, useSelector } from 'react-redux';
import { FacebookOutlined, TwitterOutlined } from '@ant-design/icons';
import { AuthWrapper } from './style';
import { login } from '../../../../redux/authentication/actionCreator';
import Heading from '../../../../components/heading/heading';

const SignIn = () => {
  const [key, setKey] = useState();
  const dispatch = useDispatch();
  const history = useHistory();
  const isLoading = useSelector(state => state.auth.loading);
  const isLoggedIn = useSelector(state => state.auth.login);
  const [form] = Form.useForm();

  useEffect(() => {
    if (isLoggedIn === true)
      history.push("/");
  }, [isLoggedIn, history])
  
  const handleSubmit = (values) => {
    values.token = key;
    dispatch(login(values));
  };

  const handleVerify = (token) => {
    setKey(token);
  }
  return (
    <AuthWrapper>
      <div className="text-right">
        <Button className="" type="white"><NavLink to="/"><FeatherIcon icon="x" size="20"/></NavLink></Button>
      </div>
      
      <div className="auth-contents">
        <Form name="login" form={form} onFinish={handleSubmit} layout="vertical">
          <Heading as="h3">
            Sign in 
          </Heading>
          <Form.Item
            name="username"
            rules={[{ message: 'Please input your username or Email!', required: true }]}
            initialValue="name"
            label="Username"
          >
            <Input />
          </Form.Item>
          <Form.Item name="password" initialValue="123456" label="Password">
            <Input.Password placeholder="Password" />
          </Form.Item>
          <Form.Item>
          <GoogleReCaptchaProvider reCaptchaKey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI">
            <GoogleReCaptcha onVerify={handleVerify} />
          </GoogleReCaptchaProvider>
            <Button className="btn-signin" htmlType="submit" type="primary" size="large" onSubmit={handleSubmit}>
              {isLoading ? 'Loading...' : 'Sign In'}
            </Button>
          </Form.Item>
          <p className="auth-notice">
            Don&rsquo;t have an account? <NavLink to="register">Sign up now</NavLink>
          </p>
          <p className="form-divider">
            <span>Or</span>
          </p>
          <ul className="social-login">
            <li>
              <Link className="google-signup" to="#">
                <img src={require('../../../../static/img/google.png')} alt="" />
                <span>Sign in with Google</span>
              </Link>
            </li>
            <li>
              <Link className="facebook-sign" to="#">
                <FacebookOutlined />
              </Link>
            </li>
            <li>
              <Link className="twitter-sign" to="#">
                <TwitterOutlined />
              </Link>
            </li>
          </ul>
        </Form>
      </div>
    </AuthWrapper>
  );
};

export default SignIn;
