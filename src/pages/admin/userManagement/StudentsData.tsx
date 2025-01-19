import { Button, Space, Table, TableColumnsType, TableProps } from "antd";
import { TQueryParams } from "../../../types/academic.semester.types";
import { useState } from "react";
import { useGetAllStudentsQuery } from "../../../redux/features/admin/userManagement/userManagement.api";
import { TStudent } from "../../../types";

type TTableData = Pick<TStudent, "name" | "id">;
const StudentData = () => {
  const [params, setParams] = useState<TQueryParams[] | undefined>(undefined);
  const { data: sData, isFetching } = useGetAllStudentsQuery(params);
  const tableData = sData?.data?.map(({ _id, id, fullName }) => ({
    key: _id,
    fullName,
    id,
  }));
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
      title: "Action",
      render: () => {
        return (
          <Space>
            <Button>Details</Button>
            <Button>Update</Button>
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
  return (
    <Table
      loading={isFetching}
      columns={columns}
      dataSource={tableData}
      onChange={onChange}
      showSorterTooltip={{ target: "sorter-icon" }}
    />
  );
};

export default StudentData;
