import { zodResolver } from "@hookform/resolvers/zod";
import FormInput from "../../../components/form/FormInput";
import IUForm from "../../../components/form/IUForm";
import { studentDataSchema } from "../../../schemas/student.manage.schema";
import { Button, Col, Divider, Form, Input, Row } from "antd";
import { Controller, FieldValues, SubmitHandler } from "react-hook-form";
import IUSelect from "../../../components/form/IUSelect";
import IUDatePicker from "../../../components/form/IUDatePicker";
import { useGetAllAdmissionSemesterQuery } from "../../../redux/features/admin/academic.management.api";
import { useGetAllAcademicDepartmentQuery } from "../../../redux/features/admin/academicDepartment/academicDepartment.api";
import { useAddStudentMutation } from "../../../redux/features/admin/userManagement/userManagement.api";

const studentDummyData = {
  name: {
    firstName: "I am ",
    middleName: "Student",
    lastName: "Number 1",
  },
  gender: "male",
  //   dateOfBirth: "1990-01-01",
  bloogGroup: "A+",

  email: "student3@gmail.com",
  contactNo: "1235678",
  emergencyContactNo: "987-654-3210",
  presentAddress: "123 Main St, Cityville",
  permanentAddress: "456 Oak St, Townsville",

  guardian: {
    fatherName: "James Doe",
    fatherOccupation: "Engineer",
    fatherContactNo: "111-222-3333",
    motherName: "Mary Doe",
    motherOccupation: "Teacher",
    motherContactNo: "444-555-6666",
  },

  localGuardian: {
    name: "Alice Johnson",
    occupation: "Doctor",
    contactNo: "777-888-9999",
    address: "789 Pine St, Villageton",
  },

  admissionSemester: "65bb60ebf71fdd1add63b1c0",
  academicDepartment: "65b4acae3dc8d4f3ad83e416",
};

const userGender = ["male", "female", "other"];
const userBloodGroup = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

const UpdateStudent = () => {
  const { data: admissionSemesterData, isLoading: sIsloading } =
    useGetAllAdmissionSemesterQuery(undefined);
  const { data: academicDData, isLoading: dIsloading } =
    useGetAllAcademicDepartmentQuery(undefined);
  const [addStudent, { data, error }] = useAddStudentMutation();
  console.log(data, error);
  // Admission Semester Name Options
  const admissionSemesterNameOptions = admissionSemesterData?.data?.map(
    (item) => ({
      value: item._id,
      label: `${item.name} ${item.year}`,
    })
  );
  // Academic Department Name Options
  const academicDepartmentNameOptions = academicDData?.data?.map((item) => ({
    value: item._id,
    label: item.name,
  }));
  // Gender Options
  const genderOptions = userGender.map((item) => ({
    value: item,
    label: item,
  }));
  // Blood Options
  const bloodOptions = userBloodGroup.map((item) => ({
    value: item,
    label: item,
  }));
  const onsubmit: SubmitHandler<FieldValues> = async (data) => {
    // const studentData = {
    //   password: "student12345",
    //   student: data,
    // };
    console.log(data);
    // const formData = new FormData();
    // formData.append("data", JSON.stringify(studentData));
    // formData.append("file", data.image);
    // await addStudent(formData);
  };
  return (
    <Row>
      <Col span={24}>
        <IUForm onsubmit={onsubmit} defaultValues={studentDummyData}>
          <Divider>Personal Info</Divider>
          <Row gutter={8}>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <FormInput
                type="text"
                name="name.firstName"
                label="First Name"
                placeHolder="Inter Your First Name Here"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <FormInput
                type="text"
                name="name.middleName"
                label="Middle Name"
                placeHolder="Inter Your Middle Name Here"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <FormInput
                type="text"
                name="name.lastName"
                label="Last Name"
                placeHolder="Inter Your Last Name Here"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <IUSelect label="Gender" name="gender" options={genderOptions} />
            </Col>

            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <IUDatePicker name="dateOfBirth" label="Date Of Birth" />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <IUSelect
                label="Blood Group"
                name="bloogGroup"
                options={bloodOptions}
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <Controller
                name="image"
                render={({ field: { onChange, value, ...field } }) => (
                  <Form.Item label="Profile Picture">
                    <Input
                      value={value?.fileName}
                      {...field}
                      type="file"
                      size="large"
                      onChange={(e) => onChange(e?.target?.files?.[0])}
                    />
                  </Form.Item>
                )}
              />
            </Col>
          </Row>
          <Divider>Contact Info</Divider>
          <Row gutter={8}>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <FormInput
                type="text"
                name="email"
                label="Your Email"
                placeHolder="Inter Your Email Here"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <FormInput
                type="text"
                name="contactNo"
                label="Your Mobile No"
                placeHolder="Inter Your Mobile No Here"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <FormInput
                type="text"
                name="emergencyContactNo"
                label="Emergency Contact No"
                placeHolder="Inter Your Emergency Contact No"
              />
            </Col>

            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <FormInput
                type="text"
                name="presentAddress"
                label="Present Address"
                placeHolder="Inter Your Present Address Here"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <FormInput
                type="text"
                name="permanentAddress"
                label="Permanent Address"
                placeHolder="Inter Your Permanent Address Here"
              />
            </Col>
          </Row>
          <Divider>Guardian Info</Divider>
          <Row gutter={8}>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <FormInput
                type="text"
                name="guardian.fatherName"
                label="Father Name"
                placeHolder="Inter Your Father Name Here"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <FormInput
                type="text"
                name="guardian.fatherOccupation"
                label="Father Occupation"
                placeHolder="Inter Your Father Occupation Here"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <FormInput
                type="text"
                name="guardian.fatherContactNo"
                label="Father ContactNo"
                placeHolder="Inter Your Father ContactNo Here"
              />
            </Col>

            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <FormInput
                type="text"
                name="guardian.motherName"
                label="Mother Name"
                placeHolder="Inter Your Mother Name Here"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <FormInput
                type="text"
                name="guardian.motherOccupation"
                label="Mother Occupation"
                placeHolder="Inter Your Mother Occupation Here"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <FormInput
                type="text"
                name="guardian.motherContactNo"
                label="Mother Contact No"
                placeHolder="Inter Your Mother Contact No Here"
              />
            </Col>
          </Row>{" "}
          <Divider>Local Guardian Info</Divider>
          <Row gutter={8}>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <FormInput
                type="text"
                name="localGuardian.name"
                label="Local Guardian Name"
                placeHolder="Inter Your Local Guardian Name Here"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <FormInput
                type="text"
                name="localGuardian.occupation"
                label="Local Guardian Occupation"
                placeHolder="Inter Your Local Guardian Occupation Here"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <FormInput
                type="text"
                name="localGuardian.contactNo"
                label="Local Guardian Contact No"
                placeHolder="Inter Your Local Guardian Contact No Here"
              />
            </Col>

            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <FormInput
                type="text"
                name="localGuardian.address"
                label="Local Guardian Address"
                placeHolder="Inter Your Local Guardian Address Here"
              />
            </Col>
          </Row>
          <Divider>Academic Info</Divider>
          <Row gutter={8}>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <IUSelect
                label="Admission Semester"
                name="admissionSemester"
                disabled={sIsloading}
                options={admissionSemesterNameOptions}
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <IUSelect
                label="Academic Department"
                name="academicDepartment"
                disabled={dIsloading}
                options={academicDepartmentNameOptions}
              />
            </Col>
          </Row>
          <Button htmlType="submit" type="primary">
            Create
          </Button>
        </IUForm>
      </Col>
    </Row>
  );
};

export default UpdateStudent;
