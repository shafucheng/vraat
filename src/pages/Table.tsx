import { PlusOutlined } from '@ant-design/icons'
import { PageContainer } from '@ant-design/pro-layout'
import ProTable, { ActionType, ProColumns } from '@ant-design/pro-table'
import { Button, Popconfirm, Space, Typography } from 'antd'
import { useMemo, useRef } from 'react'

const Table = () => {
  const tableActionRef = useRef<ActionType>()

  const columns = useMemo<ProColumns[]>(
    () => [
      {
        dataIndex: 'index',
        valueType: 'indexBorder',
        width: 34,
      },
      {
        title: '字段1',
        dataIndex: 'field_1',
      },
      {
        title: '字段2',
        dataIndex: 'field_2',
      },
      {
        title: '字段3',
        dataIndex: 'field_3',
      },
      {
        title: '字段4',
        dataIndex: 'field_4',
      },
      {
        title: '字段5',
        dataIndex: 'field_5',
      },
      {
        title: '操作',
        key: 'option',
        valueType: 'option',
        render: () => (
          <Space>
            <Typography.Link
              onClick={async () => {
                try {
                  tableActionRef.current?.reload()
                } catch (err) {
                  // pass
                }
              }}
            >
              编辑
            </Typography.Link>
            <Popconfirm
              title="您确定要删除吗？"
              onConfirm={async () => {
                try {
                  tableActionRef.current?.reload()
                } catch (err) {
                  // pass
                }
              }}
            >
              <Typography.Link>删除</Typography.Link>
            </Popconfirm>
          </Space>
        ),
      },
    ],
    [tableActionRef],
  )

  return (
    <PageContainer>
      <ProTable
        actionRef={tableActionRef}
        request={async ({ current, pageSize }) => {
          if (!current || !pageSize) {
            return {
              success: false,
            }
          }
          await new Promise((resolve) => {
            setTimeout(resolve, 1000)
          })
          return {
            data: Array.from({ length: pageSize }).map((_, index) => {
              const i = (current - 1) * pageSize + index + 1
              return {
                id: i,
                field_1: `A_${i}`,
                field_2: `B_${i}`,
                field_3: `C_${i}`,
                field_4: `D_${i}`,
                field_5: `E_${i}`,
              }
            }),
            total: 1001,
            success: true,
          }
        }}
        columns={columns}
        columnEmptyText={false}
        rowKey="id"
        rowSelection={{
          alwaysShowAlert: true,
        }}
        toolbar={{
          title: '标题',
          subTitle: '副标题',
          tooltip: '标题提示',
          actions: [
            <Button key="new" type="primary" icon={<PlusOutlined />}>
              新增
            </Button>,
          ],
        }}
        options={false}
        pagination={{
          size: 'default',
          defaultPageSize: 10,
        }}
      />
    </PageContainer>
  )
}

export default Table