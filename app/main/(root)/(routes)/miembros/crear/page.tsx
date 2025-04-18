import { CreateMemberForm } from "./_components/create-member-form";

const RegistroPage = () => {
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-5 p-4 md:p-8 pt-4 md:pt-6">
        <CreateMemberForm />
      </div>
    </div>
  );
};

export default RegistroPage;
