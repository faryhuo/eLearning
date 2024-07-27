import {  examSubject, updateExamSubject,removeExamSubject,addExamSubject } from '@/services/exam-subject/api';
import { DeleteOutlined, DownloadOutlined, EditOutlined, HddOutlined, ReloadOutlined, StockOutlined, UserOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import {
  PageContainer
} from '@ant-design/pro-components';
import { FormattedMessage, useIntl } from '@umijs/max';
import { Button, message } from 'antd';
import React, { useRef, useState } from 'react';
import UpdateForm from './components/UpdateForm';
import SearchForm from '@/components/SearchForm';
import AddingForm from './components/AddingForm';

const EaxmSubjectList: React.FC = () => {
  /**
   * @en-US Pop-up window of new window
   *  */
  /**
   * @en-US The pop-up window of the distribution update window
   * */
  const [updateModalOpen, handleUpdateModalOpen] = useState<boolean>(false);


  const actionRef = useRef<ActionType>();

  const [currentRow, setCurrentRow] = useState<API.ExamSubjectListItem>();
  const [createModalOpen, handleModalOpen] = useState<boolean>(false);


  /**
   * @en-US International configuration
   * */
  const intl = useIntl();

  const handleUpdate = async (fields: any) => {
     const hide = message.loading('Updating...');
     try {
       await updateExamSubject(fields);
       hide();
   
       message.success('Configuration is successful');
       return true;
     } catch (error) {
       hide();
       message.error('Configuration failed, please try again!');
       return false;
     }
   };
  const columns: ProColumns<API.ExamSubjectListItem>[] = [
    {
      dataIndex: 'subject',
      sorter: true,
    },
    {
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => [
        <Button
        key="refresh"
        icon={<ReloadOutlined />}>
          <FormattedMessage id="pages.searchTable.refresh" />
        </Button>,
        <Button
        key="download"
        icon={<DownloadOutlined />}>
          <FormattedMessage id="pages.searchTable.download" />
        </Button>,
        <Button
          key="setting"
          icon={<HddOutlined />}
          onClick={() => {
            handleUpdateModalOpen(true);
          }}

        >          <FormattedMessage id="pages.searchTable.setting" />

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
         <SearchForm<API.ExamSubjectListItem>
        rowKey='examName'
        columns={columns}
        fetchData={examSubject}
        remove={removeExamSubject} 
        title={intl.formatMessage({
          id: 'pages.exam-subject.title',
        })}      
         onAdd={()=>{
          handleModalOpen(true);
         }}
         ></SearchForm>
          <AddingForm
          onSubmit={async (value) => {
            const success = await handleUpdate(value);
            if (success) {
              handleUpdateModalOpen(false);
              setCurrentRow(undefined);
              if (actionRef.current) {
                actionRef.current.reload();
              }
            }
          } }
          createModalOpen={createModalOpen}        
          onCancel={() => {
            handleModalOpen(false);
          }}
          values={currentRow || {}}
          ></AddingForm>
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

export default EaxmSubjectList;
