"use client";

import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { API } from "@/util/api";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { Trash } from "lucide-react";
import { Button } from "@/components/ui/button";

const DeleteAlertDialog = ({ id, name }: { id: string; name: string | null }) => {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: async () => {
      const res = await axios.delete(`${API}/admin/users/${id}`);
      return res.data;
    },
    onSuccess: () => {
      toast.success("User deleted");
      router.refresh();
      setOpen(false);
    },
    onError: () => toast.error("Failed to delete user"),
  });

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button variant="outline" className="text-destructive p-2">
          <Trash  />
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete this user?</AlertDialogTitle>
          <AlertDialogDescription>
            You are deleting: <b>{name ?? "Unknown user"}</b>. This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>

          <AlertDialogAction
            asChild
          >
            <Button
              className="bg-red-600 hover:bg-red-700 text-white"
              onClick={() => mutation.mutate()}
              disabled={mutation.isPending}
            >
              {mutation.isPending ? "Deleting..." : "Delete"}
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteAlertDialog;
