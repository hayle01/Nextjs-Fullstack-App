'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Dialog, DialogContent, DialogHeader,
  DialogTitle, DialogFooter
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import {
  Select, SelectContent, SelectItem,
  SelectTrigger, SelectValue
} from '@/components/ui/select';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import axios from 'axios';
import { API } from '@/util/api';
import { Pencil } from 'lucide-react';

interface UserFormProps {
  initialData?: {
    id: string;
    name?: string;
    email?: string;
    role?: string;
  };
}

export const UserForm: React.FC<UserFormProps> = ({ initialData }) => {
  const isEdit = !!initialData;
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const [role, setRole] = useState(initialData?.role ?? "user");

  const createMutation = useMutation({
    mutationFn: async (payload: any) => axios.post(`${API}/admin/users`, payload),
    onSuccess: () => {
      router.refresh();
      setOpen(false);
      toast.success('User created successfully');
    },
    onError: () => toast.error('Failed to create user'),
  });

  const updateMutation = useMutation({
    mutationFn: async (payload: any) => {
      if (!initialData) throw new Error("No user data");
      return axios.put(`${API}/admin/users/${initialData.id}`, payload);
    },
    onSuccess: () => {
      router.refresh();
      setOpen(false);
      toast.success('User updated successfully');
    },
    onError: () => toast.error('Failed to update user'),
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormErrors({});

    const formData = new FormData(event.currentTarget);
    const name = formData.get('name')?.toString().trim() || '';
    const email = formData.get('email')?.toString().trim() || '';
    const password = formData.get('password')?.toString() || '';

    const errors: Record<string, string> = {};
    if (!name) errors.name = "Name is required";
    if (!email) errors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email)) errors.email = "Email is invalid";
    if (!role) errors.role = "Role is required";
    if (!isEdit && !password) errors.password = "Password is required";
    if (password && password.length < 6)
      errors.password = "Password must be at least 6 characters";

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    const payload: any = { name, email, role };
    if (password) payload.password = password;

    if (isEdit) updateMutation.mutate(payload);
    else createMutation.mutate(payload);
  };

  return (
    <>
      {isEdit ? (
        <Button
          variant="outline"
          className="p-2 text-blue-600"
          onClick={() => setOpen(true)}
        >
          <Pencil />
        </Button>
      ) : (
        <Button onClick={() => setOpen(true)}>Add User</Button>
      )}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{isEdit ? "Update User" : "Add User"}</DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label>Name</Label>
              <Input name="name" defaultValue={initialData?.name} />
              {formErrors.name && <p className="text-red-500 text-sm">{formErrors.name}</p>}
            </div>

            <div>
              <Label>Email</Label>
              <Input name="email" defaultValue={initialData?.email} disabled={isEdit === true} />
              {formErrors.email && <p className="text-red-500 text-sm">{formErrors.email}</p>}
            </div>

            <div>
              <Label>Role</Label>
              <Select value={role} onValueChange={setRole}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="user">User</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                </SelectContent>
              </Select>
              {formErrors.role && <p className="text-red-500 text-sm">{formErrors.role}</p>}
            </div>

            {!isEdit && (
              <div>
                <Label>Password</Label>
                <Input name="password" type="password" />
                {formErrors.password && (
                  <p className="text-red-500 text-sm">{formErrors.password}</p>
                )}
              </div>
            )}

            <DialogFooter>
              <Button type="submit">
                {isEdit
                  ? updateMutation.isPending
                    ? "Updating..."
                    : "Update"
                  : createMutation.isPending
                    ? "Creating..."
                    : "Create"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};
