import { Button, Table, TableColumnsType } from "antd";
import { useGetAllCoursesQuery } from "../../../redux/features/courseManagement/courseManagement";
import { TSemester } from "../../../types";
import IUModal from "../../../components/IUModal/IUModal";
import { useGetAllFacultiesQuery } from "../../../redux/features/admin/userManagement/userManagement.api";
import IUForm from "../../../components/form/IUForm";
import IUSelect from "../../../components/form/IUSelect";
type TTableData = Pick<TSemester, "endDate" | "startDate" | "status">;

const Course = () => {
  const { data: courseData, isFetching } = useGetAllCoursesQuery(undefined);
  //  Faculties
  const { data: facultiesData } = useGetAllFacultiesQuery(undefined);
  const facultiesNameOptions = facultiesData?.data?.map((item) => ({
    value: item._id,
    label: item.fullName,
  }));
  //  Semester Update
  const tableData = courseData?.data?.map(({ _id, title, code }) => ({
    key: _id,
    name: title,
    code,
  }));

  // Handle Faculty Added Functionality
  const handleSubmitAddFacultyForm = (data) => {
    console.log(data);
  };
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
        return (
          <IUModal>
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
          </IUModal>
        );
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

export default Course;
