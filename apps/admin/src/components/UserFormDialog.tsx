import React, { useEffect, useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import * as Label from '@radix-ui/react-label';
import * as Select from '@radix-ui/react-select';
import type { UserRow, UserInsert } from '@repo/db';

interface UserFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user?: UserRow | null;
  loading?: boolean;
  onSubmit: (data: UserInsert & { id?: string }) => void;
}

export function UserFormDialog({
  open,
  onOpenChange,
  user,
  loading,
  onSubmit,
}: UserFormDialogProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<'admin' | 'user'>('user');

  const isEdit = !!user;

  useEffect(() => {
    if (user) {
      setName(user.name ?? '');
      setEmail(user.email);
      setRole(user.role);
    } else {
      setName('');
      setEmail('');
      setRole('user');
    }
  }, [user, open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isEdit && user) {
      onSubmit({ id: user.id, name, email, role });
    } else {
      onSubmit({ name, email, role });
    }
  };

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/40 data-[state=open]:animate-in data-[state=open]:fade-in" />
        <Dialog.Content className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md rounded-lg bg-white p-6 shadow-xl focus:outline-none data-[state=open]:animate-in data-[state=open]:fade-in data-[state=open]:zoom-in-95">
          <Dialog.Title className="text-lg font-semibold text-gray-900">
            {isEdit ? '编辑用户' : '新增用户'}
          </Dialog.Title>
          <Dialog.Description className="mt-1 text-sm text-gray-500">
            {isEdit ? '修改用户信息' : '填写用户信息以创建新用户'}
          </Dialog.Description>

          <form onSubmit={handleSubmit} className="mt-4 space-y-4">
            <div className="space-y-1.5">
              <Label.Root
                htmlFor="name"
                className="text-sm font-medium text-gray-700"
              >
                姓名
              </Label.Root>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="请输入姓名"
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                required
              />
            </div>

            <div className="space-y-1.5">
              <Label.Root
                htmlFor="email"
                className="text-sm font-medium text-gray-700"
              >
                邮箱
              </Label.Root>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="请输入邮箱"
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                required
              />
            </div>

            <div className="space-y-1.5">
              <Label.Root className="text-sm font-medium text-gray-700">
                角色
              </Label.Root>
              <Select.Root value={role} onValueChange={(v) => setRole(v as 'admin' | 'user')}>
                <Select.Trigger className="inline-flex w-full items-center justify-between rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500">
                  <Select.Value />
                  <Select.Icon className="ml-2 text-gray-400">
                    <ChevronDownIcon />
                  </Select.Icon>
                </Select.Trigger>
                <Select.Portal>
                  <Select.Content className="overflow-hidden rounded-md border border-gray-200 bg-white shadow-lg">
                    <Select.Viewport className="p-1">
                      <Select.Item
                        value="user"
                        className="relative flex cursor-pointer items-center rounded px-8 py-2 text-sm text-gray-700 outline-none hover:bg-blue-50 data-[highlighted]:bg-blue-50"
                      >
                        <Select.ItemText>普通用户</Select.ItemText>
                        <Select.ItemIndicator className="absolute left-2">
                          <CheckIcon />
                        </Select.ItemIndicator>
                      </Select.Item>
                      <Select.Item
                        value="admin"
                        className="relative flex cursor-pointer items-center rounded px-8 py-2 text-sm text-gray-700 outline-none hover:bg-blue-50 data-[highlighted]:bg-blue-50"
                      >
                        <Select.ItemText>管理员</Select.ItemText>
                        <Select.ItemIndicator className="absolute left-2">
                          <CheckIcon />
                        </Select.ItemIndicator>
                      </Select.Item>
                    </Select.Viewport>
                  </Select.Content>
                </Select.Portal>
              </Select.Root>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <Dialog.Close asChild>
                <button
                  type="button"
                  className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  取消
                </button>
              </Dialog.Close>
              <button
                type="submit"
                disabled={loading}
                className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
              >
                {loading ? '保存中...' : isEdit ? '保存' : '创建'}
              </button>
            </div>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

function ChevronDownIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
      <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
      <path d="M2.5 6L5 8.5L9.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
