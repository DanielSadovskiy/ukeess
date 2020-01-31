import React, { useEffect, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import Modal from 'react-modal';
import styled from 'styled-components';
import { notification } from 'antd';

const registerModal = {
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
    cursor: pointer;
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
    description: message,
    placement: 'topRight',
    style: {
      zIndex: 9999
    }
  });
};

export const Register = ({ registerAdmin, history }) => {
  const [registerModalIsOpen, toggleRegisterModal] = useState(false);
  const [email, setEmail] = useState('');
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  useEffect(() => {
    if (localStorage.getItem('token')) {
      return <Redirect to='/' />;
    } else {
      toggleRegisterModal(true);
      Modal.setAppElement('body');
    }
  }, []);
  const validateEmail = email => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };
  const register = () => {
    if (!validateEmail(email)) {
      openNotificationWithIcon('error', 'email is not valid');
      return;
    } else if (login.length < 6) {
      openNotificationWithIcon('error', 'Login length should contain at least 6 symbols');
      return;
    } else if (password.length < 6) {
      openNotificationWithIcon('error', 'Password should contain at least 6 symbols');
      return;
    } else if (password !== confirmPassword) {
      openNotificationWithIcon('warning', 'Password and confirm should be equal');
      return;
    } else
      registerAdmin(login, email, password).then(res => {
        if (res.status === 200) {
          openNotificationWithIcon('success', 'You have just registered! ');
          history.push('/login');
        } else if (res.status === 403) {
          alert(res.data.error);
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
      case 'login':
        setLogin(event.target.value);
        break;
      case 'password':
        setPassword(event.target.value);
        break;
      case 'confirm':
        setConfirmPassword(event.target.value);
    }
  };
  console.log(email, login, password, confirmPassword);
  return (
    <div>
      <Modal isOpen={registerModalIsOpen} style={registerModal}>
        <RegisterForm>
          <h2>Register your account</h2>
          <input placeholder='Email' name='email' type='email' onChange={valueChange} />
          <input placeholder='Login' name='login' type='text' onChange={valueChange} />
          <input placeholder='Password' name='password' type='password' onChange={valueChange} />
          <input
            placeholder='Confirm password'
            name='confirm'
            type='password'
            onChange={valueChange}
          />
          <button
            onClick={e => {
              e.preventDefault();
              register();
            }}
            type='submit'
          >
            Register
          </button>
          <Link to='/login'>already have an account?</Link>
        </RegisterForm>
      </Modal>
    </div>
  );
};
