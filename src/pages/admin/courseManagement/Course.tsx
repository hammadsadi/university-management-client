/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button, Modal, Table, TableColumnsType } from "antd";
import {
  useAddFacultiesMutation,
  useGetAllCoursesQuery,
} from "../../../redux/features/courseManagement/courseManagement";
import { TSemester } from "../../../types";
import IUForm from "../../../components/form/IUForm";
import IUSelect from "../../../components/form/IUSelect";
import { useState } from "react";
import { useGetAllFacultiesQuery } from "../../../redux/features/admin/userManagement/userManagement.api";
import { TErrorTypes } from "../../../types/types";
import { toast } from "sonner";
type TTableData = Pick<TSemester, "endDate" | "startDate" | "status">;

const Course = () => {
  const { data: courseData, isFetching } = useGetAllCoursesQuery(undefined);

  //  Semester Update
  const tableData = courseData?.data?.map(({ _id, title, code }) => ({
    key: _id,
    name: title,
    code,
  }));

  const columns: TableColumnsType<TTableData> = [
    {
      title: "Name",
      dataIndex: "name",
      showSorterTooltip: { target: "full-header" },
    },

    {
      title: "Code",
      dataIndex: "code",
      showSorterTooltip: { target: "full-header" },
    },
    {
      title: "Action",
      render: (item) => {
        // setSelectCourseId(item);
        return <CourseAssinModal item={item} />;
      },
    },
  ];

  return (
    <Table
      loading={isFetching}
      columns={columns}
      dataSource={tableData}
      showSorterTooltip={{ target: "sorter-icon" }}
    />
  );
};

const CourseAssinModal = ({ item }: any) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  //  Faculties
  const { data: facultiesData } = useGetAllFacultiesQuery(undefined);
  const [addFaculties] = useAddFacultiesMutation();
  const facultiesNameOptions = facultiesData?.data?.map((item) => ({
    value: item._id,
    label: item.fullName,
  }));
  // Handle Faculty Added Functionality
  const handleSubmitAddFacultyForm = async (data: any) => {
    const toastId = toast.loading("Adding");
    const courseData = {
      courseId: item.key,
      data: data,
    };

    try {
      const res = await addFaculties(courseData);
      console.log(res);
      if (res?.error) {
        toast.error((res?.error as TErrorTypes).data.message, {
          id: toastId,
        });
      } else {
        toast.success("Faculties Assign Successful", { id: toastId });
      }
    } catch (error) {
      toast.error("Something Wron", { id: toastId });
    }
  };
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <Button type="primary" onClick={showModal}>
        Add Faculties
      </Button>
      <Modal
        title="Basic Modal"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <IUForm onsubmit={handleSubmitAddFacultyForm}>
          <IUSelect
            mode="multiple"
            name="faculties"
            label="Faculty"
            options={facultiesNameOptions}
          />
          <Button type="primary" htmlType="submit">
            Add
          </Button>
        </IUForm>
      </Modal>
    </>
  );
};
export default Course;
