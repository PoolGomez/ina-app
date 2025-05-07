"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Copy, Edit, Trash } from "lucide-react";
import toast from "react-hot-toast";
import { AlertModal } from "@/components/modal/alert-modal";
import { DeleteMemberAction } from "@/actions/member-action";
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from "@/components/ui/context-menu";

interface CellActionProps {
  id: string;
  isEdit: boolean;
  isDelete: boolean;
  isOwner: boolean;
  children: React.ReactNode;
}
export const CellActionMobile = ({
  id,
  isEdit,
  isDelete,
  isOwner,
  children
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
      await DeleteMemberAction(id)
      toast.success("Reunion Eliminada");
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
        onClose={() => {
          location.reload();
          setOpen(false);
        }}
        onConfirm={onDelete}
        loading={isLoading}
      />
      <ContextMenu>
        <ContextMenuTrigger>{children}</ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuItem onClick={() => onCopy(id)}>
            <Copy className="h-4 w-4 mr-2" />
            Copiar Id
          </ContextMenuItem>
          {(isOwner || isEdit) && (
              <ContextMenuItem
                onClick={() =>
                  router.push(`/main/reuniones/${id}`)
                }
              >
                <Edit className="h-4 w-4 mr-2" />
                Editar
              </ContextMenuItem>
            )}
            {(isOwner || isDelete) && (
              <ContextMenuItem onClick={() => setOpen(true)}>
                <Trash className="h-4 w-4 mr-2" />
                Borrar
              </ContextMenuItem>
            )}

        </ContextMenuContent>
      </ContextMenu>

    </>
  );
};
