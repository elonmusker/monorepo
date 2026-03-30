import React, { useMemo, useState } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  flexRender,
  type ColumnDef,
  type SortingState,
} from '@tanstack/react-table';
import type { UserRow, UserInsert } from '@repo/db';
import { Badge } from '@repo/ui';
import {
  useUsersQuery,
  useCreateUser,
  useUpdateUser,
  useDeleteUser,
} from '../hooks/useUsers';
import { UserFormDialog } from '../components/UserFormDialog';
import { DeleteUserDialog } from '../components/DeleteUserDialog';

export default function UsersCrud() {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState('');

  const [formOpen, setFormOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<UserRow | null>(null);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deletingUser, setDeletingUser] = useState<UserRow | null>(null);

  const { data: users = [], isLoading, error } = useUsersQuery();
  const createMutation = useCreateUser();
  const updateMutation = useUpdateUser();
  const deleteMutation = useDeleteUser();

  const columns = useMemo<ColumnDef<UserRow>[]>(
    () => [
      {
        accessorKey: 'name',
        header: '姓名',
        cell: ({ row }) => (
          <div className="flex items-center gap-2">
            {row.original.avatar_url ? (
              <img
                src={row.original.avatar_url}
                alt=""
                className="h-7 w-7 rounded-full"
              />
            ) : (
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-100 text-xs font-medium text-blue-700">
                {(row.original.name ?? row.original.email)?.[0]?.toUpperCase()}
              </span>
            )}
            <span className="font-medium text-gray-900">
              {row.original.name ?? '-'}
            </span>
          </div>
        ),
      },
      {
        accessorKey: 'email',
        header: '邮箱',
      },
      {
        accessorKey: 'role',
        header: '角色',
        cell: ({ getValue }) => {
          const role = getValue<string>();
          return (
            <Badge variant={role === 'admin' ? 'info' : 'default'}>
              {role === 'admin' ? '管理员' : '普通用户'}
            </Badge>
          );
        },
      },
      {
        accessorKey: 'created_at',
        header: '创建时间',
        cell: ({ getValue }) => {
          const date = getValue<string>();
          return date ? new Date(date).toLocaleDateString('zh-CN') : '-';
        },
      },
      {
        id: 'actions',
        header: '操作',
        enableSorting: false,
        cell: ({ row }) => (
          <div className="flex gap-2">
            <button
              onClick={() => handleEdit(row.original)}
              className="rounded px-2 py-1 text-sm text-blue-600 hover:bg-blue-50"
            >
              编辑
            </button>
            <button
              onClick={() => handleDeleteClick(row.original)}
              className="rounded px-2 py-1 text-sm text-red-600 hover:bg-red-50"
            >
              删除
            </button>
          </div>
        ),
      },
    ],
    []
  );

  const table = useReactTable({
    data: users,
    columns,
    state: { sorting, globalFilter },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: { pageSize: 10 },
    },
  });

  const handleCreate = () => {
    setEditingUser(null);
    setFormOpen(true);
  };

  const handleEdit = (user: UserRow) => {
    setEditingUser(user);
    setFormOpen(true);
  };

  const handleDeleteClick = (user: UserRow) => {
    setDeletingUser(user);
    setDeleteOpen(true);
  };

  const handleFormSubmit = (data: UserInsert & { id?: string }) => {
    if (data.id) {
      updateMutation.mutate(
        { id: data.id, name: data.name, email: data.email, role: data.role },
        { onSuccess: () => setFormOpen(false) }
      );
    } else {
      createMutation.mutate(
        { name: data.name, email: data.email, role: data.role },
        { onSuccess: () => setFormOpen(false) }
      );
    }
  };

  const handleDeleteConfirm = () => {
    if (!deletingUser) return;
    deleteMutation.mutate(deletingUser.id, {
      onSuccess: () => setDeleteOpen(false),
    });
  };

  if (error) {
    return (
      <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
        加载失败: {(error as Error).message}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">
          用户管理{' '}
          <span className="text-base font-normal text-gray-400">
            TanStack + Radix UI
          </span>
        </h2>
        <button
          onClick={handleCreate}
          className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
        >
          + 新增用户
        </button>
      </div>

      {/* Search */}
      <div>
        <input
          type="text"
          value={globalFilter}
          onChange={(e) => setGlobalFilter(e.target.value)}
          placeholder="搜索用户..."
          className="w-full max-w-xs rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
        <table className="w-full text-sm">
          <thead className="border-b border-gray-200 bg-gray-50">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                    onClick={header.column.getToggleSortingHandler()}
                    style={{
                      cursor: header.column.getCanSort()
                        ? 'pointer'
                        : 'default',
                    }}
                  >
                    <span className="flex items-center gap-1">
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      {header.column.getIsSorted() === 'asc' && ' ↑'}
                      {header.column.getIsSorted() === 'desc' && ' ↓'}
                    </span>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="divide-y divide-gray-100">
            {isLoading ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-4 py-12 text-center text-gray-400"
                >
                  加载中...
                </td>
              </tr>
            ) : table.getRowModel().rows.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-4 py-12 text-center text-gray-400"
                >
                  暂无数据
                </td>
              </tr>
            ) : (
              table.getRowModel().rows.map((row) => (
                <tr
                  key={row.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="px-4 py-3 text-gray-700">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>

        {/* Pagination */}
        {!isLoading && users.length > 0 && (
          <div className="flex items-center justify-between border-t border-gray-200 bg-gray-50 px-4 py-3">
            <span className="text-sm text-gray-500">
              共 {table.getFilteredRowModel().rows.length} 条记录
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
                className="rounded border border-gray-300 px-3 py-1 text-sm disabled:opacity-40 hover:bg-gray-100"
              >
                上一页
              </button>
              <span className="text-sm text-gray-600">
                第 {table.getState().pagination.pageIndex + 1} /{' '}
                {table.getPageCount()} 页
              </span>
              <button
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
                className="rounded border border-gray-300 px-3 py-1 text-sm disabled:opacity-40 hover:bg-gray-100"
              >
                下一页
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Dialogs */}
      <UserFormDialog
        open={formOpen}
        onOpenChange={setFormOpen}
        user={editingUser}
        loading={createMutation.isPending || updateMutation.isPending}
        onSubmit={handleFormSubmit}
      />

      <DeleteUserDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        user={deletingUser}
        loading={deleteMutation.isPending}
        onConfirm={handleDeleteConfirm}
      />
    </div>
  );
}
