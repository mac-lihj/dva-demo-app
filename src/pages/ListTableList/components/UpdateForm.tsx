import React, { useState } from 'react';
import { Form, Button, Input, Modal, Select } from 'antd';

import { TableListItem } from '../data.d';

export interface FormValueType extends Partial<TableListItem> {
  name?: string;
  age?: string;
  school?: string;
  address?: string;
}

export interface UpdateFormProps {
  onCancel: (flag?: boolean, formVals?: FormValueType) => void;
  onSubmit: (values: FormValueType) => void;
  updateModalVisible: boolean;
  values: Partial<TableListItem>;
}
const FormItem = Form.Item;
const { Option } = Select;

export interface UpdateFormState {
  formVals: FormValueType;
}

const formLayout = {
  labelCol: { span: 7 },
  wrapperCol: { span: 13 },
};

const UpdateForm: React.FC<UpdateFormProps> = props => {
  const [formVals, setFormVals] = useState<FormValueType>({
    name: props.values.name,
    age: props.values.age,
    key: props.values.key,
    school: props.values.school,
    address: props.values.address,
    status:
      typeof props.values.status === 'number' ? props.values.status + '' : props.values.status,
  });

  const [form] = Form.useForm();

  const {
    onSubmit: handleUpdate,
    onCancel: handleUpdateModalVisible,
    updateModalVisible,
    values,
  } = props;

  const handleNext = async () => {
    const fieldsValue = await form.validateFields();
    handleUpdate({ ...formVals, ...fieldsValue });
  };

  const renderContent = () => {
    return (
      <>
        <FormItem name="name" label="名字" rules={[{ required: true, message: '请输入名字！' }]}>
          <Input placeholder="请输入" />
        </FormItem>
        <FormItem name="age" label="年龄" rules={[{ required: true, message: '请输入年龄！' }]}>
          <Input placeholder="请输入" />
        </FormItem>
        <FormItem
          name="address"
          label="居住地址"
          rules={[{ required: true, message: '请输入居住地址！' }]}
        >
          <Input placeholder="请输入" />
        </FormItem>
        <FormItem name="school" label="学校" rules={[{ required: true, message: '请输入学校！' }]}>
          <Input placeholder="请输入" />
        </FormItem>
        <FormItem
          name="status"
          label="学历"
          rules={[{ required: true, message: '请选择你的学历！' }]}
        >
          <Select>
            <Option value="0">高中</Option>
            <Option value="1">本科</Option>
            <Option value="2">硕士</Option>
            <Option value="3">博士</Option>
          </Select>
        </FormItem>
      </>
    );
  };

  const renderFooter = () => {
    return (
      <>
        <Button onClick={() => handleUpdateModalVisible(false, values)}>取消</Button>
        <Button type="primary" onClick={() => handleNext()}>
          保存
        </Button>
      </>
    );
  };

  return (
    <Modal
      width={640}
      bodyStyle={{ padding: '32px 40px 48px' }}
      destroyOnClose
      title="修改信息"
      visible={updateModalVisible}
      footer={renderFooter()}
      onCancel={() => handleUpdateModalVisible(false, values)}
      afterClose={() => handleUpdateModalVisible()}
    >
      <Form
        {...formLayout}
        form={form}
        initialValues={{
          name: formVals.name,
          age: formVals.age,
          address: formVals.address,
          school: formVals.school,
          status: formVals.status,
        }}
      >
        {renderContent()}
      </Form>
    </Modal>
  );
};

export default UpdateForm;
