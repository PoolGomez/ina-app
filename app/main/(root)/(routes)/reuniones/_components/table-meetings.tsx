"use client";
import { useIsMobile } from "@/hooks/use-mobile";
import { CellActionMobile } from "./cell-action-mobile";
import { useState } from "react";
import { Meeting } from "@/types-db";
import { ArrowDownAZ, ArrowDownUp, ArrowDownZA } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { CellAction } from "./cell-action";
import { format, parseISO } from 'date-fns';
import { es } from 'date-fns/locale';
import { getCongregationName } from "@/lib/data";

interface TableMeetingsProp {
    data: Meeting[]
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

const TableMeetings = ({data}:TableMeetingsProp) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [sortField, setSortField] = useState<keyof Meeting | null>(null);
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
    const isMobile = useIsMobile();

      const handleSort = (field: keyof Meeting) => {
            if (sortField === field) {
              setSortOrder(sortOrder === "asc" ? "desc" : "asc");
            } else {
              setSortField(field);
              setSortOrder("asc");
            }
        };

  const sortedMeetings= [...data].sort((a, b) => {
          if (!sortField) return 0;
          const valueA = a[sortField as keyof Meeting]
            .toString()
            .toLowerCase();
          const valueB = b[sortField as keyof Meeting]
            .toString()
            .toLowerCase();
          return sortOrder === "asc"
            ? valueA.localeCompare(valueB)
            : valueB.localeCompare(valueA);
  });
  const formatDate = (fechaCadena: string) => {
    const fechaIso = parseISO( fechaCadena )
    const fechaFormat = format(fechaIso, "dd 'de' MMMM 'de' yyyy",{locale:es})
    return fechaFormat;
  }


  const filteredMeetings = sortedMeetings.filter((meeting) =>
    Object.values(meeting).some((value) =>{
      switch (typeof value){
        case "boolean":
          return value == true
            ? "disponible".includes(searchTerm.toLowerCase())
            : "desactivado".includes(searchTerm.toLowerCase())
        case "string":
          if(value === meeting.fecha){
            return formatDate(value).toString().toLowerCase().includes(searchTerm.toLowerCase())
          }
          if (value === meeting.congregacion) {
            return getCongregationName(value).toLowerCase().includes(searchTerm.toLowerCase());
          }
          return value.toString().toLowerCase().includes(searchTerm.toLowerCase())
      }
      
    }
      // typeof value === "boolean"
      //   ? value === true
      //     ? "disponible".includes(searchTerm.toLowerCase())
      //     : "desactivado".includes(searchTerm.toLowerCase())
      //   : value?.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );
  const getSortIcon = (field: keyof Meeting) => {
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
          {filteredMeetings.map((meeting) => (
            <CellActionMobile
              key={meeting.id}
              id={meeting.id}
              isOwner={true}
              isEdit={true}
              isDelete={true}
            >
              <div
                key={meeting.id}
                className="flex items-center justify-between p-4 border rounded-lg shadow-md"
              >
                {/* Parte izquierda*/}
                <div className="flex flex-col">
                  <span className="text-lg font-semibold">
                    {highlightText( formatDate(meeting.fecha), searchTerm)}
                  </span>
                  <span className="text-sm text-gray-500">
                    {highlightText(getCongregationName(meeting.congregacion), searchTerm)}
                  </span>
                </div>
                {/* Parte derecha*/}
                <div className="flex flex-col items-end">
                  <span className="text-lg font-bold">
                    {meeting.estado ? (
                            <Badge>{highlightText("Disponible", searchTerm)}</Badge>
                            ) : (
                            <Badge variant="destructive">
                                {highlightText("Desactivado", searchTerm)}
                            </Badge>
                            )}
                  </span>

                  {/* <span className="text-sm text-gray-500">
                    {highlightText(member.grupo, searchTerm)}
                  </span> */}
                </div>
              </div>
            </CellActionMobile>
          ))}
        </div>
      ) : (
        <div className="overflow-x-auto bg-white-foreground shadow-md rounded-lg">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-accent border-b">
                <th
                  className="items-center justify-start p-3 text-black-foreground cursor-pointer"
                  onClick={() => handleSort("fecha")}
                >
                  Fecha {getSortIcon("fecha")}
                </th>
                <th
                  className="items-center justify-start p-3 text-black-foreground cursor-pointer"
                  onClick={() => handleSort("congregacion")}
                >
                  Congregación {getSortIcon("congregacion")}
                </th>
                <th
                  className=" items-center justify-start p-3 text-black-foreground cursor-pointer"
                  onClick={() => handleSort("estado")}
                >
                  Estado {getSortIcon("estado")}
                </th>
                
                <th className="p-3 text-black-foreground text-right md:table-cell">
                  {/* {(isEdit || isDelete || isOwner) && "Acciones"} */}
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredMeetings.map((meeting) => (
                <tr key={meeting.id} className="border-b hover:bg-accent">
                  <td className="p-3 text-black-foreground">
                    {highlightText( formatDate(meeting.fecha), searchTerm)}
                  </td>
                  <td className="p-3 text-black-foreground">
                    {highlightText( getCongregationName(meeting.congregacion) , searchTerm)}
                  </td>
                  <td className="p-3 text-black-foreground">
                    {meeting.estado ? (
                                <Badge>{highlightText("Disponible", searchTerm)}</Badge>
                                ) : (
                                <Badge variant="destructive">
                                    {highlightText("Desactivado", searchTerm)}
                                </Badge>
                                )}
                  </td>
                  <td className="p-0 text-black-foreground text-right px-4">
                    <CellAction
                      id={meeting.id}
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
  );
};

export default TableMeetings;
