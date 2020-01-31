import React, { useEffect } from 'react';
import { Table, Divider, Tag } from 'antd';
import styled from 'styled-components';

const Wrapper = styled.div`
  width: 86%;
  margin: 0 auto;
  & .ant-table-placeholder {
    z-index: 0;
  }
  table {
    th,
    td {
      text-align: center;
    }
  }
  button {
    padding: 4px 7px;
    border-radius: 5px;
    &:hover {
      box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.85);
    }
  }
  & .editBtn {
    background-color: #ff8c00;
  }
  & .deleteBtn {
    background-color: #ff4500;
  }
  .ant-table {
    display: block;

    @media screen and (max-width: 600px) {
      & span {
        font-size: 16px;
      }
      & button {
        margin: 15px 8vw;
      }
      &-thead > tr,
      &-tbody > tr {
        th,
        td {
          &:first-of-type {
            padding-top: 16px;
          }

          &:last-of-type {
            padding-bottom: 16px;
          }
        }

        > th,
        > td {
          display: block;
          width: auto !important;
          border: none;
          padding: 0 1rem;
          font-size: 1.1rem;

          &:last-child {
            border-bottom: 1px solid #eee;
          }
        }
      }
    }
    @media screen and (max-width: 360px) {
      span,
      tr td,
      tr td span {
        font-size: 12px;
      }
      button {
        font-size: 12px;
        margin: 10px 5vw;
      }
    }
  }
`;
export const EmplTable = ({
  employees,
  deleteEmployee,
  currPage,
  startsWith,
  wasDeleted,
  colors,
  totalEmployees,
  getEmployees,
  getEmployeesCount,
  openEditEmplModal,
  setEditableEmployee,
  changeCurrPage,
  setColor
}) => {
  useEffect(() => {
    getEmployeesCount(startsWith);
    getEmployees(currPage, 4, startsWith).then(res => {
      res.data.map(empl => setColor(empl.dpID.name));
    });
  }, [startsWith, currPage]);
  useEffect(() => {
    if (employees.length === 0 && wasDeleted) {
      changeCurrPage(currPage - 1);
    } else if (wasDeleted) {
      getEmployees(currPage, 4, startsWith);
    }
  }, [wasDeleted]);
  const columns = [
    {
      title: 'ID',
      dataIndex: 'ID',
      key: 'ID',
      width: '25%',
      render: ID => <span>{ID}</span>
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      width: '15%'
    },
    {
      title: 'Active',
      dataIndex: 'active',
      key: 'active',
      width: '15%'
    },
    {
      title: 'Department',
      key: 'department',
      dataIndex: 'department',
      width: '15%',
      render: department => {
        return (
          <Tag style={{ background: colors[department], color: '#fff' }} key={department}>
            {department.toUpperCase()}
          </Tag>
        );
      }
    },
    {
      title: 'Action',
      key: 'action',
      width: '42%',
      render: (text, record) => (
        <span>
          <button
            className='editBtn'
            onClick={() => {
              openEditEmplModal();
              setEditableEmployee(record.ID);
            }}
          >
            Edit
          </button>
          <Divider type='vertical' />
          <button
            className='deleteBtn'
            onClick={() => {
              deleteEmployee(record.ID);
            }}
          >
            Delete
          </button>
        </span>
      )
    }
  ];
  const data = employees.map(emp => {
    return {
      key: emp.id,
      ID: emp.id,
      name: emp.name,
      active: emp.active,
      department: emp.dpID.name
    };
  });
  return (
    <Wrapper>
      <Table
        columns={columns}
        dataSource={data}
        align='right'
        pagination={{
          current: currPage,
          total: totalEmployees,
          pageSize: 4,
          simple: true,
          onChange: page => changeCurrPage(page)
        }}
      />
    </Wrapper>
  );
};
