import { Button, Card, Col, Row, Statistic } from "antd";
import { ArrowRightOutlined } from "@ant-design/icons";
import { FC } from "react";
import { Link } from "react-router-dom";

type Props = {
    scheduledCount: number;
    progressCount: number;
    completedCount: number;
};

const suffix = (
    <span className="font-medium text-lg text-gray-400">Classes</span>
);

/* A React component that is a function component. It is a function that takes in props and returns a
React element. */
const StatisticsSection: FC<Props> = (props) => {
    const { scheduledCount, progressCount, completedCount } = props;
    return (
        <Row gutter={[16, { xs: 16, sm: 16 }]} className="mb-5">
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }}>
                <Card
                    headStyle={{ backgroundColor: "#e2e8f0", color: "#1f2937" }}
                    title="Scheduled"
                >
                    <Row>
                        <Col span={12}>
                            <Statistic
                                value={scheduledCount}
                                suffix={suffix}
                                valueStyle={{
                                    color: "#2698c8",
                                    fontWeight: "bold",
                                }}
                            />
                        </Col>
                        <Col
                            span={12}
                            className="flex items-center justify-end"
                        >
                            <Link to={"/scheduled-classes"}>
                                <Button
                                    type="primary"
                                    icon={<ArrowRightOutlined />}
                                >
                                    View all
                                </Button>
                            </Link>
                        </Col>
                    </Row>
                </Card>
            </Col>
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }}>
                <Card
                    headStyle={{ backgroundColor: "#e2e8f0", color: "#1f2937" }}
                    title="In Progress"
                >
                    <Row>
                        <Col span={12}>
                            <Statistic
                                value={progressCount}
                                suffix={suffix}
                                valueStyle={{
                                    color: "#2698c8",
                                    fontWeight: "bold",
                                }}
                            />
                        </Col>
                        <Col
                            span={12}
                            className="flex items-center justify-end"
                        >
                            <Link to={"/in-progress-classes"}>
                                <Button
                                    type="primary"
                                    icon={<ArrowRightOutlined />}
                                >
                                    View all
                                </Button>
                            </Link>
                        </Col>
                    </Row>
                </Card>
            </Col>
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }}>
                <Card
                    headStyle={{ backgroundColor: "#e2e8f0", color: "#1f2937" }}
                    title="Completed"
                >
                    <Row>
                        <Col span={12}>
                            <Statistic
                                value={completedCount}
                                suffix={suffix}
                                valueStyle={{
                                    color: "#2698c8",
                                    fontWeight: "bold",
                                }}
                            />
                        </Col>
                        <Col
                            span={12}
                            className="flex items-center justify-end"
                        >
                            <Link to={"/completed-classes"}>
                                <Button
                                    type="primary"
                                    icon={<ArrowRightOutlined />}
                                >
                                    View all
                                </Button>
                            </Link>
                        </Col>
                    </Row>
                </Card>
            </Col>
        </Row>
    );
};

/* Setting default values for the props. */
StatisticsSection.defaultProps = {
    scheduledCount: 0,
    progressCount: 0,
    completedCount: 0,
};

export default StatisticsSection;
