import React from 'react';
import * as AlertDialog from '@radix-ui/react-alert-dialog';
import type { UserRow } from '@repo/db';

interface DeleteUserDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user: UserRow | null;
  loading?: boolean;
  onConfirm: () => void;
}

export function DeleteUserDialog({
  open,
  onOpenChange,
  user,
  loading,
  onConfirm,
}: DeleteUserDialogProps) {
  return (
    <AlertDialog.Root open={open} onOpenChange={onOpenChange}>
      <AlertDialog.Portal>
        <AlertDialog.Overlay className="fixed inset-0 bg-black/40 data-[state=open]:animate-in data-[state=open]:fade-in" />
        <AlertDialog.Content className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-sm rounded-lg bg-white p-6 shadow-xl focus:outline-none">
          <AlertDialog.Title className="text-lg font-semibold text-gray-900">
            确认删除
          </AlertDialog.Title>
          <AlertDialog.Description className="mt-2 text-sm text-gray-500">
            确定要删除用户{' '}
            <span className="font-medium text-gray-700">
              {user?.name ?? user?.email}
            </span>{' '}
            吗？此操作不可撤销。
          </AlertDialog.Description>

          <div className="mt-6 flex justify-end gap-3">
            <AlertDialog.Cancel asChild>
              <button className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
                取消
              </button>
            </AlertDialog.Cancel>
            <AlertDialog.Action asChild>
              <button
                onClick={onConfirm}
                disabled={loading}
                className="rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 disabled:opacity-50"
              >
                {loading ? '删除中...' : '删除'}
              </button>
            </AlertDialog.Action>
          </div>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
}
