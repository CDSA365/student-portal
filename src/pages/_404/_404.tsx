import { Button, Empty } from "antd";
import React, { FC } from "react";
import { Link } from "react-router-dom";
import { CenteredContentDiv } from "../../component/styled";

type Props = {};

const NotFoundPage: FC<Props> = (props) => {
    return (
        <CenteredContentDiv>
            <Empty
                image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
                imageStyle={{
                    height: 160,
                }}
                description={
                    <>
                        <h3>
                            The page you are looking for is not found on this
                            server
                        </h3>
                        <p>Please try navigating other pages</p>
                    </>
                }
            >
                <Link to={"/"}>
                    <Button type="primary">Go to dashboard</Button>
                </Link>
            </Empty>
        </CenteredContentDiv>
    );
};

export default NotFoundPage;
