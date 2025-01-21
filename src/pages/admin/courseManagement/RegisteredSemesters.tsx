import { Button, Table, TableColumnsType } from "antd";
import { useGetAllAdmissionSemesterQuery } from "../../../redux/features/admin/academic.management.api";
import { TAcademicSemester } from "../../../types/academic.semester.types";
import { useGetAllRegisterSemesterQuery } from "../../../redux/features/courseManagement/courseManagement";

type TTableData = Pick<
  TAcademicSemester,
  "name" | "year" | "startMonth" | "endMonth"
>;
const RegisteredSemesters = () => {
  const { data: semesterData, isFetching } =
    useGetAllRegisterSemesterQuery(undefined);
  const tableData = semesterData?.data?.map(
    ({ _id, academicSemester, status, startDate, endDate }) => ({
      key: _id,
      name: `${academicSemester.name} ${academicSemester.year}`,
      status,
      startDate,
      endDate,
    })
  );
  const columns: TableColumnsType<TTableData> = [
    {
      title: "Name",
      dataIndex: "name",
      showSorterTooltip: { target: "full-header" },
    },
    {
      title: "Status",
      dataIndex: "status",
      defaultSortOrder: "descend",
    },
    {
      title: "Start Date",
      dataIndex: "startDate",
    },
    {
      title: "End Date",
      dataIndex: "endDate",
    },
    {
      title: "Action",
      render: () => {
        return (
          <div>
            <Button>Update</Button>
          </div>
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

export default RegisteredSemesters;
