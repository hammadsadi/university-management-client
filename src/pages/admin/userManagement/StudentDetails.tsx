import { useParams } from "react-router-dom";

const StudentDetails = () => {
  const { studentId } = useParams();
  return (
    <div>
      <h2>This is {studentId} Student Details Page</h2>
    </div>
  );
};

export default StudentDetails;
