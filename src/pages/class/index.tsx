import { Card, Col, Descriptions, Row } from "antd";
import axios from "axios";
import moment from "moment";
import { FC, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { config } from "../../config/config";
import * as _ from "lodash";

type Props = {};

const ViewClass: FC<Props> = (props) => {
    const { slug } = useParams();
    const [classData, setClassData] = useState<any>({});
    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            const url = config.api.getClassBySlug + `/${slug}`;
            axios
                .get(url)
                .then(({ data }) => setClassData(data))
                .catch(() => navigate("/page-not-found"));
        })();
    }, [slug]);

    return (
        <Row>
            <Col span={24}>
                <Card
                    title="Class Details"
                    bodyStyle={{ padding: 0 }}
                    headStyle={{
                        color: "#52525b",
                        fontWeight: 700,
                    }}
                >
                    <Descriptions
                        column={2}
                        layout="vertical"
                        bordered
                        labelStyle={{
                            fontWeight: "bold",
                            color: "#4b5563",
                        }}
                    >
                        <Descriptions.Item label="Title">
                            {classData.title}
                        </Descriptions.Item>
                        <Descriptions.Item label="Class Type">
                            {_.capitalize(classData.type)}
                        </Descriptions.Item>
                        <Descriptions.Item label="Start Time">
                            {moment(classData.start_time).format("LL - LT")}
                        </Descriptions.Item>
                        <Descriptions.Item label="End Time">
                            {moment(classData.end_time).format("LL - LT")}
                        </Descriptions.Item>
                        <Descriptions.Item label="Trainer">
                            {classData.trainer_name}
                        </Descriptions.Item>
                        <Descriptions.Item label="Status">
                            {_.capitalize(classData.progress_state)}
                        </Descriptions.Item>
                        <Descriptions.Item label="Description" span={3}>
                            {classData.description}
                        </Descriptions.Item>
                        {classData["video_link"] && (
                            <Descriptions.Item label="Meeting link" span={3}>
                                <a href={classData.video_link} target="_blank">
                                    {classData.video_link}
                                </a>
                            </Descriptions.Item>
                        )}
                    </Descriptions>
                </Card>
            </Col>
        </Row>
    );
};

export default ViewClass;
