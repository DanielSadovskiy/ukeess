import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Search from '../containers/Search';
import debounce from 'lodash/debounce';

const HEADER = styled.header`
  padding: 20px 0 80px;
  & > button {
    display: none;
    span {
      display: block;
      height: 4px;
      width: 30px;
      margin-bottom: 4px;
      background-color: #1f9cee;
      border-radius: 3px;
      transform-origin: 0px 0px;
      transition: transform 0.5s cubic-bezier(0.77, 0.2, 0.05, 1);
    }
    &.activeHamb {
      span:first-child {
        transform-origin: 0% 0%;
        transform: rotate(45deg) translate(-3px, -2px);
      }
      span:nth-child(2) {
        transform: scale(0, 0);
      }
      span:last-child {
        transform-origin: 0% 0%;
        transform: rotate(-45deg) translate(-3px, -1px);
      }
    }
  }
  ul {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 86%;
    margin: 0 auto;
    input {
      border: 1px solid #999;
      border-radius: 7px;
      height: 32px;
      margin-right: 8px;
      @media screen and (max-width: 960px) {
        width: 150px;
      }
      @media screen and (max-width: 760px) {
        width: 120px;
        font-size: 16px;
      }
      &::placeholder {
        color: #999;
      }
    }
    &.activeHamb {
      display: block;
      button {
        background: #1f9cee;
      }
    }
    button {
      height: 32px;
      line-height: 32px;
      border-radius: 7px;
      @media screen and (max-width: 960px) {
        font-size: 16px;
      }
      @media screen and (max-width: 760px) {
        font-size: 14px;
      }
      &:hover {
        box-shadow: 0px 0px 7px 0px rgba(0, 0, 0, 0.6);
      }
    }
    @media screen and (max-width: 650px) {
      display: block;
      flex-direction: column;
      position: relative;
      top: -360px;
      transition: top 1s ease, height 0.95s ease 0.05s;
      text-align: center;
      height: 0;
      &.activeHamb {
        top: 0px;
        height: 300px;
      }
      input {
        width: 80%;
        margin: 2px auto;
        padding: 3px 6px;
      }
      button {
        width: 80%;
        margin: 5px auto;
      }
    }
  }
  @media screen and (max-width: 650px) {
    padding: 10px 0;
    & > button {
      display: block;
      margin: 10px 0 10px 1.5%;
      background: transparent;
    }
  }
`;
export const Header = ({
  user,
  Logout,
  clearDataOnLogout,
  openCreateEmplModal,
  openCreateDepModal,
  searchEmplsByName
}) => {
  const [logoutBtnText, setLogoutBtnText] = useState('Loading');
  const [hamburgerIsActive, setHamburger] = useState(false);
  useEffect(() => {
    if (user) setLogoutBtnText(user.name);
  }, [user]);

  const logout = () => {
    localStorage.removeItem('token');
    Logout();
    clearDataOnLogout();
  };
  const activateHamburger = () => {
    setHamburger(!hamburgerIsActive);
    window.addEventListener(
      'resize',
      debounce(() => {
        if (!hamburgerIsActive && window.innerWidth > 650) {
          setHamburger(false);
        }
      }, 200)
    );
  };

  return (
    <HEADER>
      <button
        onClick={() => {
          activateHamburger();
        }}
        className={hamburgerIsActive ? 'activeHamb' : null}
      >
        <span></span>
        <span></span>
        <span></span>
      </button>
      <ul className={hamburgerIsActive ? 'activeHamb' : null}>
        <Link to='/'>
          <button onClick={() => searchEmplsByName('')}>Home</button>
        </Link>
        {window.location.pathname === '/controldep' ? (
          <button onClick={() => openCreateDepModal()}>Add department</button>
        ) : (
          <button onClick={() => openCreateEmplModal()}>Add employee</button>
        )}
        <Link to='/controldep'>
          <button>Control Department</button>
        </Link>
        <Search />
        <Link to='/'>
          <button
            className='logoutBtn'
            onMouseEnter={() => setLogoutBtnText('Logout')}
            onMouseLeave={() => setLogoutBtnText(user.name)}
            onClick={() => logout()}
          >
            {logoutBtnText}
          </button>
        </Link>
      </ul>
    </HEADER>
  );
};
