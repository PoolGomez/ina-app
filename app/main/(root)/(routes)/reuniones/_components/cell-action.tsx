"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Copy, Edit, MoreVertical, Trash } from "lucide-react";
import toast from "react-hot-toast";
import { AlertModal } from "@/components/modal/alert-modal";
import { DeleteMeetingAction } from "@/actions/meeting-action";

interface CellActionProps {
  id: string;
  isEdit: boolean;
  isDelete: boolean;
  isOwner: boolean;
}
export const CellAction = ({
  id,
  isEdit,
  isDelete,
  isOwner,
}: CellActionProps) => {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const onCopy = (id: string) => {
    navigator.clipboard.writeText(id);
    toast.success("ID de reunion copiado en el portapapeles");
  };

  const onDelete = async () => {
    try {
      setIsLoading(true);
      await DeleteMeetingAction(id);
      toast.success("Reunion Eliminado");
      setIsLoading(false);
      setOpen(false);
      location.reload();
      router.push("/main/reuniones");

    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Algo salió mal");
      }

      setIsLoading(false);
      setOpen(false);

      setTimeout(() => {
            location.reload();
            router.push("/main/reuniones");
      }, 2000); // 2000 ms = 2 segundos (ajusta este valor si cambias la duración del toast)

    }
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={isLoading}
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="h-8 w-8 " variant={"ghost"}>
            <span className="sr-only">Open</span>
            <MoreVertical className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Acciones</DropdownMenuLabel>

          <DropdownMenuItem onClick={() => onCopy(id)}>
            <Copy className="h-4 w-4 mr-2" />
            Copiar Id
          </DropdownMenuItem>
          {(isOwner || isEdit) && (
            <DropdownMenuItem
              onClick={() =>
                router.push(`/main/reuniones/${id}`)
              }
            >
              <Edit className="h-4 w-4 mr-2" />
              Editar
            </DropdownMenuItem>
          )}
          {(isOwner || isDelete) && (
            <DropdownMenuItem onClick={() => setOpen(true)}>
              <Trash className="h-4 w-4 mr-2" />
              Borrar
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
