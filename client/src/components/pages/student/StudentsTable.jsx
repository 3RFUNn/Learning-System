import { Table } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getStudentsList } from "../../../redux/actions/studentAction";
import { studentActions } from "../../../redux/reducers/student-slice";

const studentColumns = [
    {
        title: "نام",
        dataIndex: "firstName",
        key: "firstName",
    },
    {
        title: "نام خانوادگی",
        dataIndex: "lastName",
        key: "lastName",
    },
    {
        title: "معدل کل",
        dataIndex: "gpa",
        key: "gpa",
    },
    {
        title: "سطح",
        dataIndex: "level",
        key: "level",
    },
    {
        title: "شماره دانشجویی",
        dataIndex: "studentNumber",
        key: "studentNumber",
    },
    {
        title: "شماره تلفن",
        dataIndex: "mobileNumber",
        key: "mobileNumber",
    },
    {
        title: "ایمیل",
        dataIndex: "email",
        key: "email",
    },
    {
        title: "سال ورودی",
        dataIndex: "entryYear",
        key: "entryYear",
    },
    {
        title: "ترم فعلی",
        dataIndex: "entryTerm",
        key: "entryTerm",
    },
];

export const StudentsTable = () => {
    const studentsData = useSelector((state) => state.student.students);
    const pagination = useSelector((state) => state.student.paginationData);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getStudentsList({ page: pagination.page, limit: pagination.limit }));
    }, [pagination.page, pagination.limit]);

    return (
        <Table
            columns={studentColumns}
            dataSource={studentsData}
            scroll={{ x: 400 }}
            pagination={{
                pageSize: pagination.limit,
                total: pagination?.totalCount,
                showSizeChanger: true,
                style: {
                    direction: "ltr",
                    justifyContent: "start",
                },
                onChange: (page, limit) => {
                    dispatch(studentActions.setPagination({ page, limit }));
                },
            }}
        />
    );
};
