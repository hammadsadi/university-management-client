import { Button, Dropdown, Table, TableColumnsType, Tag } from "antd";
import { useGetAllRegisterSemesterQuery } from "../../../redux/features/courseManagement/courseManagement";
import moment from "moment";
import { TSemester } from "../../../types";
type TTableData = Pick<TSemester, "endDate" | "startDate" | "status">;

const items = [
  {
    key: "UPCOMING",
    label: "UPCOMING",
  },
  {
    key: "ONGOING",
    label: "ONGOING",
  },
  {
    key: "ENDED",
    label: "ENDED",
  },
];
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

  //  Status Update Functionality
  const handleUpdateStatus = (data) => {
    console.log(data);
  };
  const menuProps = {
    items,
    onClick: handleUpdateStatus,
  };
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
      render: (item) => {
        let color;
        if (item === "UPCOMING") {
          color = "blue";
        }
        if (item === "ONGOING") {
          color = "green";
        }
        if (item === "ENDED") {
          color = "red";
        }
        return <Tag color={color}>{item}</Tag>;
      },
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
          <Dropdown menu={menuProps}>
            <Button>Update</Button>
          </Dropdown>
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
