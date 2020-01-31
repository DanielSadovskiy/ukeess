import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import Select from 'react-select';
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
    width: '40%',
    minHeight: '190px',
    minWidth: '280px',
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
    label {
      width: 80px;
      margin-right: 8px;
    }
  }
  @media screen and (max-width: 480px) {
    font-size: 14px;
  }
`;

export const CreateEditEmpl = ({
  departments,
  isFetching,
  editableEmpl,
  editEmplModalIsOpen,
  createEmplModalIsOpen,
  closeEditEmplModal,
  closeCreateEmplModal,
  updateEmployee,
  createEmployee,
  changeCurrPage
}) => {
  const [department, setDepartment] = useState(null);
  const [name, setName] = useState('');
  const [active, setActive] = useState('no');

  useEffect(() => {
    Modal.setAppElement('body');
  }, []);
  useEffect(() => {
    if (editableEmpl) {
      const { dpID, active, name } = editableEmpl;
      setName(name);
      setActive(active);
      setDepartment({ value: dpID.id, label: dpID.name });
    } else {
      setName('');
      setActive('no');
      setDepartment(null);
    }
  }, [editableEmpl]);
  const reset = () => {
    if (createEmplModalIsOpen) {
      setName('');
      setActive('no');
      setDepartment(null);
    } else {
      const { dpID, active, name } = editableEmpl;
      setName(name);
      setActive(active);
      setDepartment({ value: dpID.id, label: dpID.name });
    }
  };
  const saveEditData = () => {
    if (!name) {
      openNotificationWithIcon('error', 'Name field cant be empty!');
    } else if (!department) {
      openNotificationWithIcon('error', 'Department field cant be empty!');
    } else if (createEmplModalIsOpen) {
      createEmployee(name.trim(), active, department.value).then(res => {
        if (res.status === 200) {
          closeCreateEmplModal();
          setName('');
          setActive('no');
          setDepartment(null);
          changeCurrPage(1);
        } else if (res.status === 403) {
          openNotificationWithIcon('error', res.data.error);
        }
      });
    } else {
      updateEmployee(editableEmpl.id, name.trim(), active, department.value).then(res => {
        if (res.status === 200) {
          closeEditEmplModal();
        } else if (res.status === 403) {
          openNotificationWithIcon('error', res.data.error);
        }
      });
    }
  };
  const nameChange = e => setName(e.target.value);
  const depsOptions = departments.map(dep => ({ value: dep.id, label: dep.name }));
  return (
    <Modal
      isOpen={editEmplModalIsOpen || createEmplModalIsOpen}
      onRequestClose={editEmplModalIsOpen ? closeEditEmplModal : closeCreateEmplModal}
      style={editModal}
      contentLabel='Edit'
    >
      <EditForm>
        <p>
          {(createEmplModalIsOpen && 'Add Employee') || (editEmplModalIsOpen && 'Edit Employee')}
        </p>
        <div>
          <label htmlFor=''>Name</label>
          <input type='text' value={name} onChange={nameChange} />
        </div>
        <div>
          <label htmlFor=''>Active</label>
          <input
            type='checkbox'
            checked={active === 'no' ? false : true}
            onChange={e => setActive(e.target.checked === false ? 'no' : 'yes')}
          />
        </div>
        <div>
          <label htmlFor=''>Department</label>
          <div className='selectContainer'>
            <Select
              id='setDepartment'
              value={department}
              maxMenuHeight={100}
              onChange={dep => setDepartment(dep)}
              options={depsOptions}
              placeholder='Choose Department'
            />
          </div>
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
              {(isFetching && createEmplModalIsOpen && 'Creating...') ||
                (isFetching && editEmplModalIsOpen && 'Updating...') ||
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
