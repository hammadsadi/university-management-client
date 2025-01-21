import { Button, Dropdown, Table, TableColumnsType, Tag } from "antd";
import {
  useGetAllRegisterSemesterQuery,
  useUpdateRegisterSemesterMutation,
} from "../../../redux/features/courseManagement/courseManagement";
import moment from "moment";
import { TSemester } from "../../../types";
import { useState } from "react";
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
  const [semesterId, setSemesterId] = useState("");
  console.log(semesterId);
  const { data: semesterData, isFetching } =
    useGetAllRegisterSemesterQuery(undefined);
  //  Semester Update
  const [updateSemesterR] = useUpdateRegisterSemesterMutation();
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
  const handleUpdateStatus = async (data: any) => {
    const statusData = {
      id: semesterId,
      data: {
        status: data?.key,
      },
    };
    await updateSemesterR(statusData);
    console.log("Updated Data ID", statusData);
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
      render: (item) => {
        return (
          <Dropdown menu={menuProps} trigger={["click"]}>
            <Button onClick={() => setSemesterId(item?.key)}>Update</Button>
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
