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
  }
`;
export const DepTable = ({
  departments,
  currPage,
  totalDepartments,
  wasDeleted,
  deleteDepartment,
  changeCurrPage,
  getDepartments,
  getDepartmentsCount,
  openEditDepModal,
  setEditableDepartment
}) => {
  useEffect(() => {
    getDepartmentsCount();
  }, []);
  useEffect(() => {
    getDepartments(currPage, 4);
  }, [currPage]);
  useEffect(() => {
    if (departments.length === 0 && wasDeleted) {
      changeCurrPage(currPage - 1);
    } else if (wasDeleted) {
      getDepartments(currPage, 4);
    }
  }, [wasDeleted]);
  const columns = [
    {
      title: 'ID',
      dataIndex: 'ID',
      key: 'ID',
      render: ID => <span>{ID}</span>
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <span>
          <button
            className='editBtn'
            onClick={() => {
              openEditDepModal();
              setEditableDepartment(record.ID);
            }}
          >
            Edit
          </button>
          <Divider type='vertical' />
          <button
            className='deleteBtn'
            onClick={() => {
              deleteDepartment(record.ID);
            }}
          >
            Delete
          </button>
        </span>
      )
    }
  ];
  const data = departments.map(emp => {
    return {
      key: emp.id,
      ID: emp.id,
      name: emp.name
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
          total: totalDepartments,
          pageSize: 4,
          simple: true,
          onChange: page => changeCurrPage(page)
        }}
      />
    </Wrapper>
  );
};
