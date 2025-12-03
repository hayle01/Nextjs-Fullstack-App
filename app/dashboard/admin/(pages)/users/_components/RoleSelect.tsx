'use client'
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { API } from "@/util/api";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { ROLES, type UserRoles } from "@/util/roles";

export default function RoleSelect({
  id,
  currentRole,
}: {
  id: string;
  currentRole: UserRoles | null;
}) {
  const router = useRouter();

  const updateRoleMutation = useMutation({
    mutationFn: async (role: UserRoles) =>
      axios.patch(`${API}/admin/users/${id}/role`, { role }),
    onSuccess: () => {
      toast.success("Role updated");
      router.refresh();
    },
    onError: () => toast.error("Failed to update role"),
  });

  const handleChange = (role: UserRoles) => updateRoleMutation.mutate(role);

  return (
    <Select defaultValue={currentRole ?? "user"} onValueChange={handleChange}>
      <SelectTrigger className="w-[120px]">
        <SelectValue placeholder="Role" />
      </SelectTrigger>
      <SelectContent>
        {ROLES.map((role) => (
          <SelectItem key={role} value={role}>
            {role.charAt(0).toUpperCase() + role.slice(1)}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
