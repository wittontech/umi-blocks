import { TableFetchRequest } from './model';
import { PlusOutlined } from '@ant-design/icons';
import { FooterToolbar } from '@ant-design/pro-layout';
import ProTable, { ActionType, ProColumns, RequestData } from '@ant-design/pro-table';
import { Button, Divider, message, Popconfirm } from 'antd';
import React, { useRef, useState, MutableRefObject } from 'react';
import CreateForm from './components/CreateForm';
import UpdateForm from './components/UpdateForm';
import { DomainObject } from './data';
import useDomainService from './service';

const TableList: React.FC<{}> = () => {
  const { list } = useDomainService();
  const [createModel, handleCreateModal] = useState<boolean>(false);
  const [updateModel, handleUpdateModal] = useState<boolean>(false);

  const actionRef = useRef<ActionType>();
  const [selectedRowsState, setSelectedRows] = useState<DomainObject[]>([]);
  const [selectedObject, setSelectedObject] = useState<DomainObject>();
  const columns: ProColumns<DomainObject>[] = [
    {
      title: 'ID',
      dataIndex: 'id',
      hideInSearch: true,
    },
    {
      title: 'Name',
      sorter: true,
      dataIndex: 'name',
    },
    {
      title: 'Date',
      sorter: true,
      dataIndex: 'date',
      valueType: 'date',
      hideInSearch: true,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      width: 100,
      filtered: true,
      valueEnum: {
        approve: { text: 'approve', status: 'Processing' },
        new: { text: 'new', status: 'Default' },
        refuse: { text: 'refuse', status: 'Error' },
        close: { text: 'close', status: 'Success' },
        hold: { text: 'hold', status: 'Warning' },
      },
      filterDropdownVisible: true,
    },
    {
      title: 'Actions',
      dataIndex: 'option',
      width: 150,
      hideInSearch: true,
      valueType: 'option',
      render: (_, record) => (
        <>
          <a
            onClick={() => {
              handleUpdate(record);
            }}
          >
            Edit
          </a>
          <Divider type="vertical" />
          <Popconfirm title="Sure to delete?" onConfirm={() => handleRemove(record)}>
            <a>Delete</a>
          </Popconfirm>
        </>
      ),
    },
  ];

  const fetch: TableFetchRequest<DomainObject> = async (
    params,
    sort,
    filter,
  ): Promise<RequestData<DomainObject>> => {
    const result = await list({ ...params, sort, filter });

    let value: RequestData<DomainObject> = {
      data: result.data,
      success: true,
      total: result.pagination.total,
    };

    return new Promise<RequestData<DomainObject>>((resolve, reject) => {
      resolve(value);
    });
  };

  /**
   *  Batch delete rows
   * @param selectedRows
   */
  const batchRemove = async (selectedRows: DomainObject[]) => {
    selectedRows.map((item) => {
      useDomainService().remove(item.id);
    });

    actionRef.current?.reload();
    actionRef.current?.clearSelected();
    message.success('删除成功，即将刷新');
  };

  /**
   *  Delete row
   * @param selectedRows
   */
  const handleRemove = async (row: DomainObject) => {
    useDomainService().remove(row.id);

    actionRef.current?.reload();
    message.success('删除成功，即将刷新');
  };

  /**
   *  删除节点
   * @param selectedRows
   */
  const handleUpdate = async (row: DomainObject) => {
    handleUpdateModal(true);
    setSelectedObject(row);
  };

  /**
   *  删除节点
   * @param selectedRows
   */
  const handleSubmit = async () => {
    actionRef.current?.reload();
    actionRef.current?.clearSelected();

    setTimeout(() => {
      handleUpdateModal(false);
      handleCreateModal(false);
    }, 1000);
  };

  return (
    <>
      <ProTable<DomainObject>
        actionRef={actionRef}
        rowKey="id"
        toolBarRender={() => [
          <Button type="primary" onClick={() => handleCreateModal(true)}>
            <PlusOutlined /> Create
          </Button>,
        ]}
        pagination={{
          showSizeChanger: true,
          showQuickJumper: true,
        }}
        request={fetch}
        columns={columns}
        rowSelection={{
          onChange: (_, selectedRows) => setSelectedRows(selectedRows),
        }}
      />
      {selectedRowsState?.length > 0 && (
        <FooterToolbar
          extra={
            <div>
              Select <a style={{ fontWeight: 600 }}>{selectedRowsState.length}</a> Rows
            </div>
          }
        >
          <Button type="primary" onClick={() => batchRemove(selectedRowsState)}>
            Delete
          </Button>
        </FooterToolbar>
      )}
      <CreateForm
        onCancel={() => handleCreateModal(false)}
        modalVisible={createModel}
        onSubmit={() => handleSubmit()}
      ></CreateForm>
      <UpdateForm
        onCancel={() => handleUpdateModal(false)}
        modalVisible={updateModel}
        domainObject={selectedObject}
        onSubmit={() => handleSubmit()}
      ></UpdateForm>
    </>
  );
};

export default TableList;
