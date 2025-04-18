"use client"
import { Member } from "@/types-db"
import { CellAction } from "./cell-action"
import { useIsMobile } from "@/hooks/use-mobile";
import { CellActionMobile } from "./cell-action-mobile";
import { useState } from "react";
import { ArrowDownAZ, ArrowDownUp, ArrowDownZA } from "lucide-react";

interface TableMembersProp {
    data: Member[]
}

const highlightText = (text: string, searchTerm: string): React.ReactNode => {
    if (!searchTerm) return text;
    const regex = new RegExp(`(${searchTerm})`, "gi");
    return text.split(regex).map((part, index) =>
      part.toLowerCase() === searchTerm.toLowerCase() ? (
        <span key={index} className="bg-yellow-500">
          {part}
        </span>
      ) : (
        part
      )
    );
};

const TableMembers = ({data}:TableMembersProp) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [sortField, setSortField] = useState<keyof Member | null>(null);
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
    const isMobile = useIsMobile();

    const handleSort = (field: keyof Member) => {
        if (sortField === field) {
          setSortOrder(sortOrder === "asc" ? "desc" : "asc");
        } else {
          setSortField(field);
          setSortOrder("asc");
        }
    };

    const sortedMembers= [...data].sort((a, b) => {
        if (!sortField) return 0;
        const valueA = a[sortField as keyof Member]
          .toString()
          .toLowerCase();
        const valueB = b[sortField as keyof Member]
          .toString()
          .toLowerCase();
        return sortOrder === "asc"
          ? valueA.localeCompare(valueB)
          : valueB.localeCompare(valueA);
    });

    const filteredMembers = sortedMembers.filter((member) =>
        Object.values(member).some((value) =>
          typeof value === "boolean"
            ? value === true
              ? "disponible".includes(searchTerm.toLowerCase())
              : "desactivado".includes(searchTerm.toLowerCase())
            : value?.toString().toLowerCase().includes(searchTerm.toLowerCase())
        )
      );

      const getSortIcon = (field: keyof Member) => {
        if (sortField !== field)
          return <ArrowDownUp className="inline ml-2 h-5 w-5" />;
        return sortOrder === "asc" ? (
          <ArrowDownAZ className="inline ml-2 h-5 w-5" />
        ) : (
          <ArrowDownZA className="inline ml-2 h-5 w-5" />
        );
      };

    return (
        <div className="w-full mx-auto p-0">
            <div className="mb-4">
                <input 
                    type="text"
                    placeholder="Buscar..."
                    className="w-full p-2 border rounded-md"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            {isMobile ? (
                <div className="flex flex-col space-y-2">
                    {filteredMembers.map((member) => (
                    <CellActionMobile
                        key={member.id}
                        id={member.id}
                        isOwner={true}
                        isEdit={true}
                        isDelete={true}
                    >
                        <div
                        key={member.id}
                        className="flex items-center justify-between p-4 border rounded-lg shadow-md"
                        >
                        {/* Parte izquierda*/}
                        <div className="flex flex-col">
                            <span className="text-lg font-semibold">
                            {highlightText(member.apellidos, searchTerm)}
                            </span>
                            <span className="text-sm text-gray-500">
                            {highlightText(member.nombres, searchTerm)}
                            </span>
                        </div>
                        {/* Parte derecha*/}
                        <div className="flex flex-col items-end">
                            <span className="text-lg font-bold">
                            {highlightText(member.celular, searchTerm)}
                            </span>
                            
                            <span className="text-sm text-gray-500">
                            {highlightText(member.grupo, searchTerm)}
                            </span>
                        </div>
                        </div>
                    </CellActionMobile>
                    ))}
                </div>
            ):(
<div className="overflow-x-auto bg-white-foreground shadow-md rounded-lg">
                <table className="w-full text-left border-collapse">
                    <thead>
                    <tr className="bg-accent border-b">
                        <th
                        className="items-center justify-start p-3 text-black-foreground cursor-pointer"
                          onClick={() => handleSort("apellidos")}
                        >
                        Apellidos {getSortIcon("apellidos")}
                        </th>
                        <th
                        className="items-center justify-start p-3 text-black-foreground cursor-pointer"
                          onClick={() => handleSort("nombres")}
                        >
                        Nombres {getSortIcon("nombres")}
                        </th>
                        <th
                        className=" items-center justify-start p-3 text-black-foreground cursor-pointer"
                          onClick={() => handleSort("celular")}
                        >
                        Celular {getSortIcon("celular")}
                        </th>
                        <th
                        className=" items-center justify-start p-3 text-black-foreground cursor-pointer"
                          onClick={() => handleSort("actividad_ina")}
                        >
                        Grupo {getSortIcon("actividad_ina")}
                        </th>
                        <th className="p-3 text-black-foreground text-right md:table-cell">
                        {/* {(isEdit || isDelete || isOwner) && "Acciones"} */}
                        Acciones
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {filteredMembers.map((member) => (
                        <tr key={member.id} className="border-b hover:bg-accent">
                        <td className="p-3 text-black-foreground">
                            {highlightText(member.apellidos, searchTerm)}
                        </td>
                        <td className="p-3 text-black-foreground">
                            {highlightText(member.nombres, searchTerm)}
                        </td>
                        <td className="p-3 text-black-foreground">
                            {highlightText(member.celular,searchTerm)}
                        </td>
                        <td className="p-3 text-black-foreground">
                            {/* {product.isAvailable ? (
                            <Badge>{highlightText("Disponible", searchTerm)}</Badge>
                            ) : (
                            <Badge variant="destructive">
                                {highlightText("Desactivado", searchTerm)}
                            </Badge>
                            )} */}
                             {highlightText(member.grupo,searchTerm)}
                        </td>
                        <td className="p-0 text-black-foreground text-right px-4">
                            <CellAction
                            id={member.id}
                            isOwner={true}
                            isEdit={true}
                            isDelete={true}
                            />
                        </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
            )}

            


        </div>
    )
}

export default TableMembers