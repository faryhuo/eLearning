import {  exam, updateExam,removeExam,addExam } from '@/services/exam/api';
import { DeleteOutlined, EditOutlined, StockOutlined, UserOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import {
  PageContainer
} from '@ant-design/pro-components';
import { FormattedMessage, useIntl } from '@umijs/max';
import { Button, message } from 'antd';
import React, { useRef, useState } from 'react';
import UpdateForm from './components/UpdateForm';
import SearchForm from '@/components/SearchForm';

const EaxmList: React.FC = () => {
  /**
   * @en-US Pop-up window of new window
   *  */
  /**
   * @en-US The pop-up window of the distribution update window
   * */
  const [updateModalOpen, handleUpdateModalOpen] = useState<boolean>(false);


  const actionRef = useRef<ActionType>();

  const [currentRow, setCurrentRow] = useState<API.ExamListItem>();


  /**
   * @en-US International configuration
   * */
  const intl = useIntl();

  const handleUpdate = async (fields: any) => {
     const hide = message.loading('Updating...');
     try {
       await updateExam(fields);
       hide();
   
       message.success('Configuration is successful');
       return true;
     } catch (error) {
       hide();
       message.error('Configuration failed, please try again!');
       return false;
     }
   };
  const columns: ProColumns<API.ExamListItem>[] = [
    {
      dataIndex: 'examName',
      sorter: true,
    },
    {
      dataIndex: 'examSubject',
      sorter: true,
    },
    {
      dataIndex: 'userCount',
      sorter: true,
      hideInForm: false
    },
    {
      dataIndex: 'status',
      hideInForm: true,
      sorter: true
    },
    {
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
    <PageContainer>
         <SearchForm<API.ExamListItem>
        rowKey='examName'
        columns={columns}
        fetchData={exam}
        remove={removeExam} 
        add={addExam}
        title={intl.formatMessage({
          id: 'pages.exam-list.title',
        })}      
         ></SearchForm>

        <UpdateForm
        onSubmit={async (value) => {
          const success = await handleUpdate(value);
          if (success) {
            handleUpdateModalOpen(false);
            setCurrentRow(undefined);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
        onCancel={() => {
          handleUpdateModalOpen(false);
        }}
        updateModalOpen={updateModalOpen}
        values={currentRow || {}}
      />

    </PageContainer>
  );
};

export default EaxmList;
