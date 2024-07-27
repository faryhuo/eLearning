import { userGroups, updateUserGroups , removeUserGroups, addUserGroups} from '@/services/user-management/api';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import {
  ModalForm,
  PageContainer,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-components';
import { FormattedMessage, useIntl } from '@umijs/max';
import { Button,message } from 'antd';
import React, { useRef, useState } from 'react';
import type { FormValueType } from './components/UpdateForm';
import UpdateForm from './components/UpdateForm';
import SearchForm from '@/components/SearchForm';


/**
 * @en-US Update node
 *
 * @param fields
 */
const handleUpdate = async (fields: FormValueType) => {
  const hide = message.loading('Configuring');
  try {
    await updateUserGroups({

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

/**
 *  Delete node
 *
 * @param selectedRows
 */
const handleRemove = async (selectedRows: API.UserGroupsItem[]) => {
  const hide = message.loading('正在删除');
  if (!selectedRows) return true;
  try {
    hide();
    message.success('Deleted successfully and will refresh soon');
    return true;
  } catch (error) {
    hide();
    message.error('Delete failed, please try again');
    return false;
  }
};

const UserGroupManagement: React.FC = () => {
  /**
   * @en-US The pop-up window of the distribution update window
   * */
  const [updateModalOpen, handleUpdateModalOpen] = useState<boolean>(false);

  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<API.UserGroupsItem>();

  /**
   * @en-US International configuration
   * */
  const intl = useIntl();

  const columns: ProColumns<API.UserGroupsItem>[] = [
    {
      dataIndex: 'id',
      sorter: true,
    },
    {
      dataIndex: 'userGroupName',
      sorter: true,
    },
    {
      dataIndex: 'bindingModel',
      sorter: true,
      hideInForm: false
    },
    {
      dataIndex: 'description',
      hideInForm: true,
      sorter: true
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

  return (
    <PageContainer>
        <SearchForm<API.UserGroupsItem>
        rowKey='id'
        columns={columns}
        enableSearch={false}
        fetchData={userGroups}
        remove={removeUserGroups} 
        title={intl.formatMessage({
          id: 'pages.user-management.title',
          defaultMessage: 'User List',
        })}       ></SearchForm>
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

export default UserGroupManagement;
