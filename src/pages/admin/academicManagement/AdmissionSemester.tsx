import { Table, TableColumnsType, TableProps } from "antd";
import { useGetAllAdmissionSemesterQuery } from "../../../redux/features/admin/academic.management.api";
import { TAcademicSemester } from "../../../types/academic.semester.types";
import { useState } from "react";

type TTableData = Pick<
  TAcademicSemester,
  "_id" | "name" | "year" | "startMonth" | "endMonth"
>;
const AdmissionSemester = () => {
  const [params, setParams] = useState([]);
  const { data: semesterData } = useGetAllAdmissionSemesterQuery(params);
  const tableData = semesterData?.data?.map(
    ({ _id, name, year, startMonth, endMonth }) => ({
      key: _id,
      name,
      year,
      startMonth,
      endMonth,
    })
  );
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
    {
      title: "Year",
      dataIndex: "year",
      defaultSortOrder: "descend",
      filters: [
        {
          text: "2025",
          value: "2025",
        },
        {
          text: "2026",
          value: "2026",
        },
        {
          text: "2027",
          value: "2027",
        },
      ],
    },
    {
      title: "Start Month",
      dataIndex: "startMonth",
    },
    {
      title: "End Month",
      dataIndex: "endMonth",
    },
  ];

  const onChange: TableProps<TTableData>["onChange"] = (
    pagination,
    filters,
    sorter,
    extra
  ) => {
    if (extra.action === "filter") {
      const paramsData = [];
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
    <Table<TTableData>
      columns={columns}
      dataSource={tableData}
      onChange={onChange}
      showSorterTooltip={{ target: "sorter-icon" }}
    />
  );
};

export default AdmissionSemester;
