import {
  Button,
  Pagination,
  Space,
  Table,
  TableColumnsType,
  TableProps,
} from "antd";
import { TQueryParams } from "../../../types/academic.semester.types";
import { useState } from "react";
import { useGetAllStudentsQuery } from "../../../redux/features/admin/userManagement/userManagement.api";
import { TStudent } from "../../../types";
import { Link } from "react-router-dom";

type TTableData = Pick<TStudent, "fullName" | "id" | "contactNo" | "email">;
const StudentData = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [params, setParams] = useState<TQueryParams[]>([]);
  const [pages, setPages] = useState(1);
  const { data: sData, isFetching } = useGetAllStudentsQuery([
    { name: "page", value: pages },
    { name: "sort", value: "id" },
    ...params,
  ]);
  const metaData = sData?.meta;
  const tableData = sData?.data?.map(
    ({ _id, id, fullName, email, contactNo }) => ({
      key: _id,
      fullName,
      id,
      email,
      contactNo,
    })
  );
  const columns: TableColumnsType<TTableData> = [
    {
      title: "Name",
      dataIndex: "fullName",
      showSorterTooltip: { target: "full-header" },
    },

    {
      title: "Role",
      dataIndex: "id",
    },
    {
      title: "Contact No",
      dataIndex: "contactNo",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Action",
      render: (item) => {
        return (
          <Space>
            <Link to={`/admin/student-data/${item?.key}`}>
              <Button>Details</Button>
            </Link>
            <Link to={`/admin/student-update/${item?.key}`}>
              <Button>Update</Button>
            </Link>
            <Button>Block</Button>
          </Space>
        );
      },
      width: "1%",
    },
  ];

  const onChange: TableProps<TTableData>["onChange"] = (
    pagination,
    filters,
    sorter,
    extra
  ) => {
    if (extra.action === "filter") {
      const paramsData: TQueryParams[] = [];
      // Name
      filters.name?.forEach((name) =>
        paramsData.push({
          name: "name",
          value: name,
        })
      );
      // Year
      filters.year?.forEach((year) =>
        paramsData.push({
          name: "year",
          value: year,
        })
      );
      setParams(paramsData);
    }
  };

  //  Handle Modal

  return (
    <>
      <Table
        loading={isFetching}
        columns={columns}
        dataSource={tableData}
        onChange={onChange}
        showSorterTooltip={{ target: "sorter-icon" }}
        pagination={false}
      />
      <Pagination
        current={pages}
        onChange={(value) => setPages(value)}
        pageSize={metaData?.limit}
        total={metaData?.total}
      />
    </>
  );
};

export default StudentData;
