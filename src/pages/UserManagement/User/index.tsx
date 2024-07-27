import { addUser, removeUser, user, updateUser } from '@/services/user-management/api';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';

import {
  PageContainer, ProFormSelect, ProFormText, ProFormTextArea,
} from '@ant-design/pro-components';
import { FormattedMessage, useIntl } from '@umijs/max';
import { Button, message } from 'antd';
import React, { useRef, useState } from 'react';
import type { FormValueType } from './components/UpdateForm';
import UpdateForm from './components/UpdateForm';
import SearchForm, { OverriderItemProps } from '@/components/SearchForm';

/**
 * @en-US Update node
 *
 * @param fields
 */
const handleUpdate = async (fields: FormValueType) => {
  const hide = message.loading('Configuring');
  try {
    await updateUser({
      name: fields.name,
      desc: fields.desc,
      key: fields.key,
    });
    hide();

    message.success('Configuration is successful');
    return true;
  } catch (error) {
    hide();
    message.error('Configuration failed, please try again!');
    return false;
  }
};


const UserManagement: React.FC = () => {
  
  /**
   * @en-US The pop-up window of the distribution update window
   * */
  const [updateModalOpen, handleUpdateModalOpen] = useState<boolean>(false);

  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<API.UserListItem>();

  /**
   * @en-US International configuration
   * @zh-CN 国际化配置
   * */
  const intl = useIntl();

  const columns: ProColumns<API.UserListItem>[] = [
    {
      dataIndex: 'employeeId',
      sorter: true,
    },
    {
      dataIndex: 'userName',
      sorter: true,
      hideInForm: true
    },
    {
      dataIndex: 'email',
      sorter: true,
      hideInForm: true
    },
    {
      dataIndex: 'department',
      hideInForm: true,
      sorter: true,
    },
    {
      sorter: true,
      dataIndex: 'userGroups',
     },
    {
      sorter: true,
      hideInForm: true,
      dataIndex: 'registration',
      valueType: 'date',
    },
    {
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => [
        <Button
          key="edit"
          icon={<EditOutlined />}
          onClick={() => {
            handleUpdateModalOpen(true);
            setCurrentRow(record);
          }}
        >
        <FormattedMessage id="pages.searchTable.edit" defaultMessage="Edit" />
        </Button>,
        <Button key="delete" icon={<DeleteOutlined />}>
          <FormattedMessage
            id="pages.searchTable.delete"
            defaultMessage="Delete"
          />
        </Button>,
      ],
    },
  ];

  const overriderItem: OverriderItemProps<API.UserListItem>[]=[{
    name:"userGroups",
    component:<ProFormSelect
    options={[
    ]}
    label={intl.formatMessage({id:"columns.userGroups.nameLabel"})}
  />
  }]

  return (
    <PageContainer>
        <SearchForm<API.UserListItem>
        rowKey='employeeId'
        columns={columns}
        overriderItem={overriderItem}
        fetchData={user}
        remove={removeUser} 
        add={addUser}
        title={intl.formatMessage({
          id: 'pages.user-management.title',
          defaultMessage: 'User List',
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

export default UserManagement;
