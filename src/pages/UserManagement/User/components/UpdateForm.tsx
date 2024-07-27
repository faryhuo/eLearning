import { useIntl } from '@umijs/max';
import { Button, Form, Input, Modal, Select, Space } from 'antd';
import React from 'react';

export type FormValueType = {
  target?: string;
  template?: string;
  type?: string;
  time?: string;
  frequency?: string;
} & Partial<API.RuleListItem>;

export type UpdateFormProps = {
  onCancel: (flag?: boolean, formVals?: FormValueType) => void;
  onSubmit: (values: FormValueType) => Promise<void>;
  updateModalOpen: boolean;
  values: Partial<API.UserListItem>;
};
const formItemLayout = { labelCol: { span: 8 }, wrapperCol: { span: 16 } }



const UpdateForm: React.FC<UpdateFormProps> = (props) => {
  const intl = useIntl();
  return (
    <Modal
      width={400}
      title={intl.formatMessage({
        id: 'pages.user-management.updateForm.title'
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
            id: 'pages.user-management.column.userName.nameLabel'
          })} name="userName">
            <Input></Input>
          </Form.Item>
          <Form.Item label={intl.formatMessage({
            id: 'pages.user-management.column.userGroups.nameLabel'
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
