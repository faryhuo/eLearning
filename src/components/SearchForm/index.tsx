import { PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import {
  FooterToolbar,
  ModalForm,
  ProFormDatePicker,
  ProFormText,
  ProTable,
} from '@ant-design/pro-components';
import { FormattedMessage, useIntl } from '@umijs/max';
import { Button, ConfigProvider, Form, message } from 'antd';
import React, { useRef, useState } from 'react';
import './index.css';

export type OverriderItemProps<T> = {
  name:keyof T;
  component:React.JSX.Element;
}

export type SearchFormProps<T> = {
  remove?: (record: T[]) => Promise<any>;
  add?: (record: T) =>  Promise<any>;
  onAdd?:()=>void;
  addingForm?:React.JSX.Element;
  addingFormTitle?: string;
  overriderItem?:OverriderItemProps<T>[];
  columns: ProColumns<T>[];
  rowKey: keyof T;
  fetchData: any;
  title: string;
  enableSearch?: boolean;
};


const SearchForm = <T extends Record<string, any>,>({remove,add,onAdd,columns, addingForm,addingFormTitle ,overriderItem,rowKey, fetchData, enableSearch = true, title }: SearchFormProps<T>) => {

  const actionRef = useRef<ActionType>();
  const [selectedRowsState, setSelectedRows] = useState<T[]>([]);
  /**
   * @en-US Pop-up window of new window
   *  */
  const [createModalOpen, handleModalOpen] = useState<boolean>(false);
  /**
   * @en-US The pop-up window of the distribution update window
   * */

  /**
   * @en-US International configuration
   * */
  const intl = useIntl();

  columns.map((column)=>{
   if(!column.title){
      column.title=intl.formatMessage({id: `columns.${column.dataIndex}.nameLabel`});
      return column;
    }
  });
 
 const handleAdd = async (fields: any) => {
  if(!add){
    return true;
  } 
   const hide = message.loading('Adding...');
   try {
     await add({ ...fields });
     hide();
     message.success('Added successfully');
     return true;
   } catch (error) {
     hide();
     message.error('Adding failed, please try again!');
     return false;
   }
 };

 const renderAddingForm = (columns:ProColumns[])=>{
   const formItems: React.JSX.Element[]=[]; 
   columns.map((column,index)=>{
    if(column.hideInForm){
      return;
    }
    const overiderIndex=overriderItem?overriderItem.findIndex((item)=>item.name===column.dataIndex):-1;
    if(overriderItem && overiderIndex!==-1){
      formItems.push(<Form.Item>
        {overriderItem[overiderIndex].component}
      </Form.Item>);
      return;
    }
    if(column.valueType==="date"){
      formItems.push(<ProFormDatePicker key={index} name={column.dataIndex} label={column.title as any} />);
    }else if(column.valueType==="option"){
      return;
    }else{
      formItems.push(<ProFormText key={index} name={column.dataIndex} label={column.title as any} />);
    }
   });
   return formItems;
 }
 
 /**
  *  Delete node
  *
  * @param selectedRows
  */
 const handleRemove = async (selectedRows: T[]) => {
  if(!remove){
    return true;
  }
   const hide = message.loading('Removing...');
   if (!selectedRows) return true;
   try {
     await remove(selectedRows);
     hide();
     message.success('Deleted successfully and will refresh soon');
     return true;
   } catch (error) {
     hide();
     message.error('Delete failed, please try again');
     return false;
   }
 };
 

  const params = enableSearch ? {} : {
    search: false as any
  }


  return (
    <div>
      <ConfigProvider
        theme={{
          components: {
            Table: {
              headerBg: '#40a9ff',
              headerColor: "#ffffff",
              headerSortHoverBg: "#1890ff",
              headerSortActiveBg: "#1890ff"
            },
          },
        }}
      >
        <ProTable<T, API.PageParams>
          bordered
          className="custom-table"
          headerTitle={title}
          actionRef={actionRef}
          rowKey={rowKey}
          {...params}
          toolBarRender={() => [
            <Button
              type="primary"
              key="primary"
              onClick={() => {
                if(onAdd){
                  onAdd();
                }else{
                  handleModalOpen(true);
                }
              }}
            >
              <PlusOutlined /> <FormattedMessage id="pages.searchTable.new" defaultMessage="New" />
            </Button>,
          ]}
          request={fetchData}
          columns={columns}
          rowSelection={{
            onChange: (_, selectedRows) => {
              setSelectedRows(selectedRows);
            },
          }}
        />
      {add && <ModalForm
        title={addingFormTitle}
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
        {addingForm?addingForm:renderAddingForm(columns)}
      </ModalForm>}

        {selectedRowsState?.length > 0 && (
          <FooterToolbar
            extra={
              <div>
                <FormattedMessage id="pages.searchTable.chosen" defaultMessage="Chosen" />{' '}
                <a style={{ fontWeight: 600 }}>{selectedRowsState.length}</a>{' '}
                <FormattedMessage id="pages.searchTable.item" defaultMessage="item" />

              </div>
            }
          >
            <Button
              onClick={async () => {
                await handleRemove(selectedRowsState);
                setSelectedRows([]);
                actionRef.current?.reloadAndRest?.();
              }}
            >
              <FormattedMessage
                id="pages.searchTable.batchDeletion"
                defaultMessage="Batch deletion"
              />
            </Button>
          </FooterToolbar>
        )}

      </ConfigProvider>
    </div>
  );
};

export default SearchForm;
