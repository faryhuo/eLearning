import { useIntl } from '@umijs/max';
import { Button, Form, Input, Modal, Select, Space } from 'antd';
import React from 'react';

export type FormValueType = {
  target?: string;
  template?: string;
  type?: string;
  time?: string;
  frequency?: string;
} & Partial<API.ExamListItem>;

export type UpdateFormProps = {
  onCancel: (flag?: boolean, formVals?: FormValueType) => void;
  onSubmit: (values: FormValueType) => Promise<void>;
  updateModalOpen: boolean;
  values: Partial<API.ExamListItem>;
};
const formItemLayout = { labelCol: { span: 8 }, wrapperCol: { span: 16 } }



const UpdateForm: React.FC<UpdateFormProps> = (props) => {
  const intl = useIntl();
  return (
    <Modal
      width={400}
      title={intl.formatMessage({
        id: 'pages.user-management.updateForm.title',
        defaultMessage: 'Edit User',
      })}
      open={props.updateModalOpen}
      onCancel={() => {
        props.onCancel();
      }}
      footer={null}

    >
      <div>
        <Form
          layout="horizontal"
          initialValues={props.values}
          {...formItemLayout}
          onFinish={props.onSubmit}
        >
          <Form.Item label={intl.formatMessage({
            id: 'pages.user-management.searchTable.userName',
            defaultMessage: 'User Name',
          })} name="userName">
            <Input></Input>
          </Form.Item>
          <Form.Item label={intl.formatMessage({
            id: 'pages.user-management.searchTable.userGroups',
            defaultMessage: 'user Groups',
          })} name="userGroups">
            <Select></Select>
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Space>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
            <Button onClick={() => props.onCancel()}>
              Cancel
            </Button>
            </Space>
          </Form.Item>
        </Form>
      </div>
    </Modal >
  )
};

export default UpdateForm;
