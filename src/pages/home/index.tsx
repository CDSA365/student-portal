import { Card, Col, List, Row } from "antd";
import axios from "axios";
import moment from "moment-timezone";
import { FC, useEffect, useState } from "react";
import StatisticsSection from "../../component/statistics";
import { config } from "../../config/config";
import { useAppSelector } from "../../store/hooks";
import * as _ from "lodash";
import { Link } from "react-router-dom";
import { LinkOutlined } from "@ant-design/icons";
type Props = {};

const ClassList = ({ classes }: { classes: any[] }) => {
    const [listData, setListData] = useState<any[]>([]);

    useEffect(() => {
        setListData(
            classes
                .map((el: any) => ({
                    title: el.title,
                    description: moment(el.start_time)
                        .tz("Asia/Kolkata")
                        .format("LLLL"),
                    content: el.description,
                    slug: el.slug,
                }))
                .splice(0, 7)
        );
    }, [classes]);

    return (
        <Card bodyStyle={{ padding: 0 }} className="h-full">
            <List
                itemLayout="horizontal"
                dataSource={listData}
                renderItem={(item) => (
                    <Link to={`/class/${item.slug}`}>
                        <List.Item className="hover:bg-sky-50 group px-[24px] py-[12px]">
                            <List.Item.Meta
                                title={
                                    <span className="group-hover:text-sky-700 font-semibold">
                                        {_.truncate(item.title, { length: 40 })}
                                    </span>
                                }
                                description={
                                    <span className="text-stone-400">
                                        {item.description}
                                    </span>
                                }
                            />
                            {_.truncate(item.content, { length: 80 })}
                        </List.Item>
                    </Link>
                )}
            />
        </Card>
    );
};

/**
 * HomePage is a function that takes in a Props object and returns a div with a StatisticsSection
 * component inside of it.
 * @param props - Props
 * @returns A function that returns a component
 */
const HomePage: FC<Props> = (props) => {
    const { user } = useAppSelector((state) => state);
    const [classes, setClasses] = useState<any[]>([]);
    const [classInProgress, setClassInProgress] = useState<any[]>([]);
    const [scheduledClass, setScheduledClass] = useState<any[]>([]);
    const [completedClasses, setCompletedClasses] = useState<any[]>([]);

    useEffect(() => {
        (async () => {
            const url = config.api.getStudentClasses + `/${user.id}`;
            const { data } = await axios.get(url);
            setClasses(data);
        })();
    }, [props]);

    useEffect(() => {
        setScheduledClass(
            classes.filter((x) => x.progress_state === "SCHEDULED")
        );
        setClassInProgress(
            classes.filter((x) => x.progress_state === "IN-PROGRESS")
        );
        setCompletedClasses(
            classes.filter((x) => x.progress_state === "COMPLETED")
        );
    }, [classes]);

    return (
        <>
            <StatisticsSection
                scheduledCount={scheduledClass.length}
                progressCount={classInProgress.length}
                completedCount={completedClasses.length}
            />
            <Row gutter={16}>
                <Col span={8}>
                    <ClassList classes={scheduledClass} />
                </Col>
                <Col span={8}>
                    <ClassList classes={classInProgress} />
                </Col>
                <Col span={8}>
                    <ClassList classes={completedClasses} />
                </Col>
            </Row>
        </>
    );
};

export default HomePage;
