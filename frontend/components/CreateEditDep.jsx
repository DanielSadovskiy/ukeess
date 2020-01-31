import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import styled from 'styled-components';
import { faBan } from '@fortawesome/free-solid-svg-icons';
import { faSave } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { notification } from 'antd';

const openNotificationWithIcon = (type, message) => {
  notification[type]({
    message: type,
    description: message
  });
};

const editModal = {
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
const EditForm = styled.form`
  p {
    text-align: center;
  }
  label {
    width: 100px;
    margin-right: 15px;
  }
  input[type='text'] {
    flex: 1 1 auto;
    height: 24px;
    padding: 0px;
    border: 1px solid #ccc;
    border-radius: 3px;
  }
  & > div {
    margin-top: 20px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }
  & .selectContainer {
    flex: 1 1 auto;
  }
  & .editControlPanel {
    justify-content: center;
  }
  .Select__menu-list {
    max-height: 30px !important;
  }
  button {
    border-radius: 6px;
    padding: 3px 12px;
    margin: 20px;
    & span {
      margin-left: 5px;
    }
  }
  @media screen and (max-width: 930px) {
    font-size: 16px;
  }
`;

export const CreateEditDep = ({
  editDepModalIsOpen,
  createDepModalIsOpen,
  editableDep,
  isFetching,
  closeEditDepModal,
  closeCreateDepModal,
  createDepartment,
  changeCurrPage,
  updateDepartment
}) => {
  const [name, setName] = useState('');
  console.log(name);
  useEffect(() => {
    Modal.setAppElement('body');
    console.log('opened');
  }, []);
  useEffect(() => {
    if (editableDep) {
      const { name } = editableDep;
      setName(name);
    } else {
      setName('');
    }
  }, [editableDep]);
  const reset = () => {
    if (createDepModalIsOpen) {
      setName('');
    } else {
      const { name } = editableDep;
      setName(name);
    }
  };
  const saveEditData = () => {
    if (createDepModalIsOpen) {
      if (!name) {
        openNotificationWithIcon('error', 'Name field cant be empty.');
      } else {
        createDepartment(name.trim()).then(res => {
          if (res.status === 200) {
            closeCreateDepModal();
            setName('');
            changeCurrPage(1);
          } else if (res.status === 403) {
            openNotificationWithIcon('error', res.data.error);
          }
        });
      }
    } else {
      if (!name) {
        openNotificationWithIcon('error', 'Name field cant be empty.');
      } else {
        updateDepartment(editableDep.id, name.trim()).then(res => {
          if (res.status === 200) {
            closeEditDepModal();
          } else if (res.status === 403) {
            openNotificationWithIcon('error', res.data.error);
          }
        });
      }
    }
  };
  const nameChange = e => setName(e.target.value);
  return (
    <Modal
      isOpen={editDepModalIsOpen || createDepModalIsOpen}
      onRequestClose={editDepModalIsOpen ? closeEditDepModal : closeCreateDepModal}
      style={editModal}
      contentLabel='Edit'
    >
      <EditForm>
        <p>
          {(createDepModalIsOpen && 'Add Department') || (editDepModalIsOpen && 'Edit Department')}
        </p>
        <div>
          <label htmlFor=''>Name</label>
          <input type='text' value={name} onChange={nameChange} />
        </div>
        <div className='editControlPanel'>
          <button
            onClick={e => {
              e.preventDefault();
              saveEditData();
            }}
          >
            <FontAwesomeIcon icon={faSave} />
            <span>
              {(isFetching && createDepModalIsOpen && 'Creating...') ||
                (isFetching && editDepModalIsOpen && 'Updating...') ||
                'Save'}
            </span>
          </button>
          <button
            onClick={e => {
              e.preventDefault();
              reset();
            }}
          >
            <FontAwesomeIcon icon={faBan} />
            <span>Reset</span>
          </button>
        </div>
      </EditForm>
    </Modal>
  );
};
