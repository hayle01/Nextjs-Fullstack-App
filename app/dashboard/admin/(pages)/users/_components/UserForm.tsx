"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import axios from "axios";
import { API } from "@/util/api";
import { Pencil } from "lucide-react";

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

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
  };

  useEffect(() => {
    if (open && !isEdit) {
      setName("");
      setEmail("");
      setRole("user");
      setPassword("");
      setFormErrors({});
    }
  }, [open, isEdit]);

  const [name, setName] = useState(initialData?.name ?? "");
  const [email, setEmail] = useState(initialData?.email ?? "");
  const [role, setRole] = useState(initialData?.role ?? "user");
  const [password, setPassword] = useState("");
  const [formErrors, setFormErrors] = useState<Partial<Record<string, string>>>(
    {}
  );

  const [isChanged, setIsChanged] = useState(false);

  useEffect(() => {
    if (isEdit) {
      setIsChanged(
        name !== (initialData?.name ?? "") || role !== (initialData?.role ?? "")
      );
    }
  }, [name, role, initialData, isEdit]);

  const createMutation = useMutation({
    mutationFn: async (payload: any) =>
      axios.post(`${API}/admin/users`, payload),
    onSuccess: () => {
      router.refresh();
      setOpen(false);
      toast.success("User created successfully");
    },
    onError: () => toast.error("Failed to create user"),
  });

  const updateMutation = useMutation({
    mutationFn: async (payload: any) => {
      if (!initialData) throw new Error("No user data");
      return axios.put(`${API}/admin/users/${initialData.id}`, payload);
    },
    onSuccess: () => {
      router.refresh();
      setOpen(false);
      toast.success("User updated successfully");
    },
    onError: () => toast.error("Failed to update user"),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormErrors({});

    const errors: Record<string, string> = {};
    if (!name.trim()) errors.name = "Name is required";
    if (!email.trim()) errors.email = "Email is required";
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
    if (!isEdit && password) payload.password = password;

    if (isEdit) {
      const updatedPayload: any = {};
      if (name !== initialData?.name) updatedPayload.name = name;
      if (role !== initialData?.role) updatedPayload.role = role;

      if (Object.keys(updatedPayload).length === 0) return;

      updateMutation.mutate(updatedPayload);
    } else {
      createMutation.mutate(payload);
    }
  };

  return (
    <>
      {isEdit ? (
        <Button
          variant="outline"
          className="p-2 text-blue-600"
          onClick={() => setOpen(true)}>
          <Pencil />
        </Button>
      ) : (
        <Button onClick={() => setOpen(true)}>Add User</Button>
      )}

      <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogContent className="max-w-md rounded-xl shadow-lg p-6">
          <DialogHeader className="text-center">
            <DialogTitle className="text-2xl font-semibold">
              {isEdit ? "Update User" : "Create User"}
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col space-y-1">
              <Label>Name</Label>
              <Input
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  setFormErrors((prev) => ({ ...prev, name: undefined }));
                }}
              />
              {formErrors.name && (
                <p className="text-red-500 text-sm">{formErrors.name}</p>
              )}
            </div>

            <div className="flex flex-col space-y-2">
              <Label>Email</Label>
              <Input
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setFormErrors((prev) => ({ ...prev, email: undefined }));
                }}
                disabled={isEdit}
              />
              {formErrors.email && (
                <p className="text-red-500 text-sm">{formErrors.email}</p>
              )}
            </div>

            <div className="flex flex-col space-y-2">
              <Label>Role</Label>
              <Select
                value={role}
                onValueChange={(value) => {
                  setRole(value);
                  setFormErrors((prev) => ({ ...prev, role: undefined }));
                }}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="user">User</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                </SelectContent>
              </Select>
              {formErrors.role && (
                <p className="text-red-500 text-sm">{formErrors.role}</p>
              )}
            </div>

            {!isEdit && (
              <div className="flex flex-col space-y-2">
                <Label>Password</Label>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setFormErrors((prev) => ({ ...prev, password: undefined }));
                  }}
                />
                {formErrors.password && (
                  <p className="text-red-500 text-sm">{formErrors.password}</p>
                )}
              </div>
            )}

            <DialogFooter>
              <Button
                type="submit"
                className="w-full"
                disabled={isEdit && !isChanged}>
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
