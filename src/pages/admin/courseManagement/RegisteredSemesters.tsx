import { Button, Table, TableColumnsType } from "antd";
import { useGetAllRegisterSemesterQuery } from "../../../redux/features/courseManagement/courseManagement";
import moment from "moment";
import { TSemester } from "../../../types";
type TTableData = Pick<TSemester, "endDate" | "startDate" | "status">;
const RegisteredSemesters = () => {
  const { data: semesterData, isFetching } =
    useGetAllRegisterSemesterQuery(undefined);
  const tableData = semesterData?.data?.map(
    ({ _id, academicSemester, status, startDate, endDate }) => ({
      key: _id,
      name: `${academicSemester.name} ${academicSemester.year}`,
      status,
      startDate: moment(new Date(startDate)).format("MMMM"),
      endDate: moment(new Date(endDate)).format("MMMM"),
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
