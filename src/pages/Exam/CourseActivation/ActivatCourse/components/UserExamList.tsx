import {  exam, updateExam,removeExam,addExam } from '@/services/exam/api';
import { DeleteOutlined, EditOutlined, StockOutlined, UserOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import {
  ModalForm
} from '@ant-design/pro-components';
import { FormattedMessage, useIntl } from '@umijs/max';
import { Button, message } from 'antd';
import React, { useRef, useState } from 'react';
import SearchForm from '@/components/SearchForm';
/**
 * @en-US Add node
 * @param fields
 */
const handleAdd = async (fields: API.ExamListItem) => {
  const hide = message.loading('Loading...');
  try {
    await addExam({ ...fields });
    hide();
    message.success('Added successfully');
    return true;
  } catch (error) {
    hide();
    message.error('Adding failed, please try again!');
    return false;
  }
};




export type UserEaxmListProps = {
    examName:string;
  };

const UserEaxmList: React.FC<UserEaxmListProps> = ({examName}) => {
  /**
   * @en-US Pop-up window of new window
   *  */
  const [createModalOpen, handleModalOpen] = useState<boolean>(false);
  /**
   * @en-US The pop-up window of the distribution update window
   * */
  const [updateModalOpen, handleUpdateModalOpen] = useState<boolean>(false);

  const [showDetail, setShowDetail] = useState<boolean>(false);

  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<API.ExamListItem>();

  /**
   * @en-US International configuration
   * @zh-CN 国际化配置
   * */
  const intl = useIntl();

  const columns: ProColumns<API.ExamListItem>[] = [
    {
      title: (
        <FormattedMessage
          id="pages.exam-list.column.examName.nameLabel"
        />
      ),
      dataIndex: 'employeeId',
      sorter: true,
    },
    {
      title: <FormattedMessage id="columns.employeeId.nameLabel"/>,
      dataIndex: 'username',
      sorter: true,
    },
    {
      title: <FormattedMessage id="pages.exam-list.column.startDate.nameLabel"/>,
      dataIndex: 'startDate',
      sorter: true,
      hideInForm: false
    },
    {
       title: <FormattedMessage id="pages.exam-list.column.endDate.nameLabel"/>,
      dataIndex: 'endDate',
      hideInForm: true,
      sorter: true
    },
    {
       title: <FormattedMessage id="pages.exam-list.column.department.nameLabel"/>,
      dataIndex: 'department',
      hideInForm: true,
      sorter: true
    },
    {
      title: <FormattedMessage id="pages.searchTable.option.title" defaultMessage="Operating" />,
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => [
        <Button
        key="user"
        icon={<UserOutlined />}></Button>,
        <Button
        key="stock"
        icon={<StockOutlined />}></Button>,
        <Button
          key="edit"
          icon={<EditOutlined />}
          onClick={() => {
            handleUpdateModalOpen(true);
            setCurrentRow(record);
          }}
        >
        </Button>,
        <Button key="delete" icon={<DeleteOutlined />}>
          <FormattedMessage
            id="pages.searchTable.delete"
          />
        </Button>,
      ],
    },
  ];

  return (
    <ModalForm
    title={intl.formatMessage({
        id: 'pages.exam-management.createForm.title',
        defaultMessage: 'Exam user list',
      })}
     width={'80%'}
    >
        <SearchForm<API.ExamListItem>
        rowKey='examName'
        columns={columns}
        fetchData={exam}
        showAddingPage={() => handleModalOpen(true)}
        handleRemove={handleRemove} 
        title={intl.formatMessage({
          id: 'pages.exam-list.title',
          defaultMessage: 'Exam List',
        })}      
         ></SearchForm>
      <ModalForm
        title={intl.formatMessage({
          id: 'pages.exam-management.createForm.title',
          defaultMessage: 'New user',
        })}
        width="400px"
        open={createModalOpen}
        onOpenChange={handleModalOpen}
        onFinish={async (value) => {
          const success = await handleAdd(value);
          if (success) {
            handleModalOpen(false);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
      >
      </ModalForm>
    </ModalForm>
  );
};

export default UserEaxmList;
