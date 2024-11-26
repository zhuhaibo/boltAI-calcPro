import React, { useRef } from 'react';
import { ProTable } from '@ant-design/pro-components';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { Button, Modal, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import type { Calculation } from '../types/calculator';

export default function List() {
  const actionRef = useRef<ActionType>();

  const deleteRecord = (id: string) => {
    const history = JSON.parse(localStorage.getItem('calculatorHistory') || '[]');
    const newHistory = history.filter((item: Calculation) => item.id !== id);
    localStorage.setItem('calculatorHistory', JSON.stringify(newHistory));
    message.success('Deleted successfully');
    actionRef.current?.reload();
  };

  const columns: ProColumns<Calculation>[] = [
    {
      title: 'Expression',
      dataIndex: 'expression',
      copyable: true,
      ellipsis: true,
    },
    {
      title: 'Result',
      dataIndex: 'result',
      copyable: true,
    },
    {
      title: 'Timestamp',
      dataIndex: 'timestamp',
      valueType: 'dateTime',
      sorter: true,
    },
    {
      title: 'Actions',
      valueType: 'option',
      render: (_, record) => [
        <Button
          key="delete"
          type="link"
          danger
          onClick={() => {
            Modal.confirm({
              title: 'Delete Confirmation',
              content: 'Are you sure you want to delete this record?',
              onOk: () => deleteRecord(record.id),
            });
          }}
        >
          Delete
        </Button>,
      ],
    },
  ];

  return (
    <div className="p-6">
      <ProTable<Calculation>
        columns={columns}
        actionRef={actionRef}
        cardBordered
        request={async (params = {}, sort) => {
          const history: Calculation[] = JSON.parse(
            localStorage.getItem('calculatorHistory') || '[]'
          );

          let dataSource = [...history];

          // Handle sorting
          if (sort && Object.keys(sort).length > 0) {
            const sortKey = Object.keys(sort)[0];
            const sortOrder = sort[sortKey];
            dataSource.sort((a: any, b: any) => {
              return sortOrder === 'ascend'
                ? a[sortKey] - b[sortKey]
                : b[sortKey] - a[sortKey];
            });
          }

          return {
            data: dataSource,
            success: true,
            total: dataSource.length,
          };
        }}
        rowKey="id"
        search={false}
        dateFormatter="string"
        headerTitle="Calculation History"
        toolBarRender={() => [
          <Button
            key="button"
            icon={<PlusOutlined />}
            onClick={() => window.location.href = '/calculator'}
            type="primary"
          >
            New Calculation
          </Button>,
        ]}
      />
    </div>
  );
}