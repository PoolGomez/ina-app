import { Member } from "@/types-db";
import { GetMembersAction } from "@/actions/member-action";
import MemberClient from "./_components/client";

const MembersPage = async () => {
  const members = (await GetMembersAction()) as Member[];

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-5 p-4 pt-4">
        <MemberClient data={members} />
      </div>
    </div>
  );
};

export default MembersPage;
