import { Table, TableColumnsType, TableProps } from "antd";
import { useGetAllAcademicFacultyQuery } from "../../../redux/features/admin/academicFaculty/academicFaculty.api";
import { TAcademicFaculty } from "../../../types/academicFaculty.type";

type TTableData = Pick<TAcademicFaculty, "name">;
const AcademicFaculty = () => {
  const { data: facultyData, isFetching } =
    useGetAllAcademicFacultyQuery(undefined);
  const tableData = facultyData?.data?.map((name, _id) => ({
    key: _id,
    name: name.name,
  }));
  const columns: TableColumnsType<TTableData> = [
    {
      title: "Name",
      dataIndex: "name",
      showSorterTooltip: { target: "full-header" },
      filters: [
        {
          text: "Autumn",
          value: "Autumn",
        },
        {
          text: "Summer",
          value: "Summer",
        },
        {
          text: "Fall",
          value: "Fall",
        },
      ],
    },
  ];
  const onChange: TableProps<TTableData>["onChange"] = (
    pagination,
    filters,
    sorter,
    extra
  ) => {};
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

export default AcademicFaculty;
