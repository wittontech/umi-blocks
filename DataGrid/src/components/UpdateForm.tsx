import { Button, Card, DatePicker, Form, Input, message, Modal, Select } from 'antd';
import React, { useEffect } from 'react';
import { DomainObject } from '../data';
import useDomainService from '../service';
import moment from 'moment';

const FormItem = Form.Item;
const { TextArea } = Input;

interface Props {
  modalVisible: boolean;
  domainObject?: DomainObject;
  onCancel: () => void;
  onSubmit: () => void;
}

const UpdateForm: React.FC<Props> = (props) => {
  const [form] = Form.useForm();
  const { Option } = Select;
  const { update, detail } = useDomainService();
  const { modalVisible, onCancel, onSubmit, domainObject } = props;
  const formItemLayout = {
    labelCol: {
      xs: { span: 6 },
      sm: { span: 6 },
    },
  };

  const submitFormLayout = {
    wrapperCol: {
      xs: { span: 24, offset: 0 },
      sm: { span: 16, offset: 8 },
    },
  };

  const dateFormat = 'YYYY-MM-DD';

  useEffect(() => {
    form.resetFields();
  }, [domainObject]);

  const onFinish = async (values: { [key: string]: any }) => {
    let payload = values as DomainObject;
    payload.id = domainObject?.id ?? -1;
    const result = await update(payload);
    if (result.success) {
      onSubmit();
      message.success('Update success');
    } else {
      message.error(result.message);
    }
  };

  const onReset = (errorInfo: any) => {
    form.resetFields();
  };

  const onChange = (param: any) => {};

  const onValuesChange = (values: { [key: string]: any }) => {
    console.log('Change:', values);
  };

  return (
    <Modal
      destroyOnClose
      title="Update"
      visible={modalVisible}
      onCancel={() => onCancel()}
      footer={null}
    >
      <Card bordered={false}>
        <Form
          hideRequiredMark
          style={{ marginTop: 8 }}
          form={form}
          name="basic"
          initialValues={{
            ...domainObject,
            date: moment.unix((domainObject?.date ?? 0) / 1000),
          }}
          onFinish={onFinish}
          onValuesChange={onValuesChange}
        >
          <FormItem
            {...formItemLayout}
            label="Name"
            name="name"
            rules={[
              {
                required: true,
                message: 'Name is required',
              },
            ]}
          >
            <Input placeholder="Name" />
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="Date"
            name="date"
            rules={[
              {
                required: true,
                message: 'Date is required',
              },
            ]}
          >
            <DatePicker onChange={onChange} showTime format={dateFormat} />
          </FormItem>
          <FormItem {...formItemLayout} label="Status" name="status">
            <Select placeholder="Select a option and change input text above" allowClear>
              <Option value="approve">approve</Option>
              <Option value="new">new</Option>
              <Option value="hold">hold</Option>
              <Option value="refuse">refuse</Option>
              <Option value="close">close</Option>
            </Select>
          </FormItem>
          <FormItem {...submitFormLayout} style={{ marginTop: 25 }}>
            <Button type="primary" htmlType="submit">
              Save
            </Button>
            <Button style={{ marginLeft: 8 }} onClick={onReset}>
              Reset
            </Button>
          </FormItem>
        </Form>
      </Card>
    </Modal>
  );
};

export default UpdateForm;
