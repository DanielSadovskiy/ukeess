import React, { useEffect, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import Modal from 'react-modal';
import styled from 'styled-components';
import { notification } from 'antd';

const loginModal = {
  content: {
    top: '25%',
    left: '0',
    width: '50%',
    minHeight: '190px',
    minWidth: '300px',
    right: 'auto',
    bottom: 'auto',
    borderRadius: '10px',
    position: 'relative',
    display: 'block',
    margin: '0 auto'
  },
  overlay: {
    backgroundColor: '#ffefd5dd'
  }
};
const RegisterForm = styled.form`
  h2 {
    text-align: center;
  }
  input {
    width: 100%;
    font-size: 16px;
    padding: 4px 0;
    margin-bottom: 20px;
  }
  button {
    display: block;
    margin: 10px auto 20px;
    width: 200px;
    height: 30px;
    font-size: 18px;
  }
  a {
    text-decoration: none;
    display: block;
    text-align: center;
    &:hover {
      color: red;
    }
  }
`;

const openNotificationWithIcon = (type, message) => {
  notification[type]({
    message: type,
    description: message
  });
};

export const Login = ({ loginAdmin, history }) => {
  const [loginModalIsOpen, toggleLoginModal] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  useEffect(() => {
    if (localStorage.getItem('token')) {
      return <Redirect to='/' />;
    } else {
      toggleLoginModal(true);
      Modal.setAppElement('body');
    }
  }, []);
  const validateEmail = email => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };
  const login = () => {
    if (!validateEmail(email)) {
      openNotificationWithIcon('error', 'Email is not validate');
      return;
    } else if (password.length < 6) {
      openNotificationWithIcon('error', 'Password should contain at least 6 symbols');
      return;
    } else
      loginAdmin(email, password).then(res => {
        if (res.status === 200) {
          openNotificationWithIcon('success', 'Welcome!');
          localStorage.setItem('token', res.data.token);
          history.push('/');
        } else if (res.status === 403) {
          openNotificationWithIcon('error', res.data.error);
        } else {
          console.log('error res', res);
        }
      });
  };
  const valueChange = event => {
    console.log(event.target.name);
    switch (event.target.name) {
      case 'email':
        setEmail(event.target.value);
        break;
      case 'password':
        setPassword(event.target.value);
    }
  };
  console.log(email, password);
  return (
    <div>
      <Modal isOpen={loginModalIsOpen} style={loginModal} contentLabel='Example Modal'>
        <RegisterForm>
          <h2>Login</h2>
          <input placeholder='Email' name='email' type='email' onChange={valueChange} />
          <input placeholder='Password' name='password' type='password' onChange={valueChange} />
          <button
            onClick={e => {
              e.preventDefault();
              login();
            }}
            type='submit'
          >
            Login
          </button>
          <Link to='/register'>have no account?</Link>
        </RegisterForm>
      </Modal>
    </div>
  );
};
