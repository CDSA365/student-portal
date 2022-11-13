import { Link, useParams } from "react-router-dom";
import _, { upperCase } from "lodash";
import { useAppSelector } from "../../store/hooks";
import { useEffect, useState } from "react";
import { config } from "../../config/config";
import axios from "axios";
import { Table, Tag } from "antd";
import { PhoneOutlined, VideoCameraOutlined } from "@ant-design/icons";
import { ColumnsType } from "antd/lib/table";
import { ClassTableTypes } from "../../types/types";
import moment from "moment-timezone";

type Props = {};

const columns: ColumnsType<ClassTableTypes> = [
    {
        title: "ID",
        dataIndex: "id",
        key: "id",
    },
    {
        title: "Title",
        dataIndex: "title",
        key: "title",
        render: (text, record) => (
            <Link to={`/class/${record.slug}`}>{text}</Link>
        ),
    },
    {
        title: "Trainer",
        dataIndex: "trainer",
        key: "trainer",
    },
    {
        title: "Start",
        dataIndex: "startTime",
        key: "startTime",
        render: (time) => moment(time).tz("Asia/Kolkata").format("LLL"),
    },
    {
        title: "End",
        dataIndex: "endTime",
        key: "endTime",
        render: (time) => moment(time).tz("Asia/Kolkata").format("LLL"),
    },
    {
        title: "Mode",
        dataIndex: "mode",
        key: "mode",
    },
    {
        title: "Video Link",
        dataIndex: "videoLink",
        key: "videoLink",
    },
    {
        title: "Status",
        dataIndex: "status",
        key: "status",
        render: (status) => <Tag>{status}</Tag>,
    },
];

const ClassesPage = (props: Props) => {
    const { user } = useAppSelector((state) => state);
    const { status } = useParams();
    const [classes, setClasses] = useState<any[]>([]);
    const [dataSource, setDataSource] = useState<any[]>([]);
    const [classStatus, setClassStatus] = useState<string | undefined>(
        undefined
    );

    useEffect(() => {
        setClassStatus(
            status
                ?.split("-")
                .map((x) => upperCase(x))
                .join("-")
        );
    }, [status]);

    useEffect(() => {
        (async () => {
            const url = config.api.getStudentClasses + `/${user.id}`;
            const { data } = await axios.get(url);
            setClasses(
                data.filter((x: any) => x.progress_state === classStatus)
            );
        })();
    }, [classStatus]);

    useEffect(() => {
        console.log(classes);
        setDataSource(
            classes.map((cls) => ({
                key: cls.id,
                id: cls.id,
                title: cls.title,
                trainer: cls.trainer_name,
                videoLink: cls.video_link ? cls.video_link : "-",
                slug: cls.slug,
                status: cls.progress_state,
                startTime: cls.start_time,
                endTime: cls.end_time,
                mode:
                    cls.type === "phone" ? (
                        <PhoneOutlined className="text-sky-500" />
                    ) : (
                        <VideoCameraOutlined className="text-emerald-500" />
                    ),
            }))
        );
    }, [classes]);

    return (
        <div>
            <Table
                dataSource={dataSource}
                columns={columns}
                title={() => (
                    <h4 className="my-0 text-md text-slate-500 font-semibold uppercase">
                        {classStatus} classes
                    </h4>
                )}
            />
        </div>
    );
};

export default ClassesPage;
