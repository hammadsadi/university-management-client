import { useGetAllAdmissionSemesterQuery } from "../../../redux/features/admissionSemester/admissionSemester.Api";

const AdmissionSemester = () => {
  const { data } = useGetAllAdmissionSemesterQuery(undefined);
  console.log(data);
  return <div></div>;
};

export default AdmissionSemester;
