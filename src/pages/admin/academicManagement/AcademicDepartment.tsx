import { Table, TableColumnsType, TableProps } from "antd";
import { useGetAllAcademicDepartmentQuery } from "../../../redux/features/admin/academicDepartment/academicDepartment.api";
import { TAcademicDepartment } from "../../../types/academicDepartment.type";

type TTableData = Pick<TAcademicDepartment, "name">;

const AcademicDepartment = () => {
  const { data: academicDepartmentData } =
    useGetAllAcademicDepartmentQuery(undefined);
  // console.log(academicDepartmentData?.data[0].academicFaculty.name);
  const tableData = academicDepartmentData?.data?.map((name, _id) => ({
    key: _id,
    name: name.name,
  }));

  const columns: TableColumnsType<TTableData> = [
    {
      title: "Department Name",
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
    {
      title: "Faculty Name",
      dataIndex: "facultyName",
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
      // loading={isFetching}
      columns={columns}
      dataSource={tableData}
      onChange={onChange}
      showSorterTooltip={{ target: "sorter-icon" }}
    />
  );
};

export default AcademicDepartment;
