import { Button, Card, Form, Input, message, Modal, DatePicker } from 'antd';
import React from 'react';
import useDomainService from '../service';
import { DomainObject } from '../data';
import moment from 'moment';

const FormItem = Form.Item;
const { TextArea } = Input;

interface Props {
  modalVisible: boolean;
  onCancel: () => void;
  onSubmit: () => void;
}

const CreateForm: React.FC<Props> = (props) => {
  const [form] = Form.useForm();
  const { create } = useDomainService();
  const { modalVisible, onCancel, onSubmit } = props;
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

  const preProcess = (value: DomainObject) => {
    // 需要设置申请时间为 10 位时间戳
    let d = new Date(value.apply_time);
    value.apply_time = Math.round(d.getTime() / 1000);

    // 设置默认状态为 new
    value.status = 'new';
  };

  const onFinish = async (values: { [key: string]: any }) => {
    preProcess(values as DomainObject);
    const result = await create(values as DomainObject);
    if (result.success) {
      onSubmit();
      message.success('Create success');
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
      title="Create"
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
          initialValues={{ public: '1', apply_time: moment() }}
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
            <DatePicker onChange={onChange} format={'YYYY/MM/DD'} showTime />
          </FormItem>
          <FormItem {...submitFormLayout} style={{ marginTop: 32 }}>
            <Button type="primary" htmlType="submit">
              Submit
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

export default CreateForm;
