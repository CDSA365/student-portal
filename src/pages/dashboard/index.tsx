import { Layout, Menu } from "antd";
import { ItemType } from "antd/lib/menu/hooks/useItems";
import { DashboardContent, StyledHeader } from "../../component/styled";
import {
    HomeOutlined,
    HourglassOutlined,
    PlayCircleOutlined,
    FileDoneOutlined,
    LogoutOutlined,
    UserOutlined,
    CreditCardOutlined,
    NotificationOutlined,
} from "@ant-design/icons";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth-context";

const { Content, Footer, Sider } = Layout;

type Props = {};

const Dashboard = (props: Props) => {
    const navigate = useNavigate();
    const location = useLocation();
    const auth = useAuth();

    const items: ItemType[] = [
        {
            label: (
                <span className="text-slate-500 text-xs font-semibold uppercase">
                    Dashboard
                </span>
            ),
            key: "dashboard",
            type: "group",
            children: [
                { label: "Home", key: "home", icon: <HomeOutlined /> },
                {
                    label: "Announcements",
                    key: "announcements",
                    icon: <NotificationOutlined />,
                },
            ],
        },
        {
            label: (
                <span className="text-slate-500 text-xs font-semibold uppercase">
                    Classes
                </span>
            ),
            key: "classes",
            type: "group",
            children: [
                {
                    label: "Scheduled Classes",
                    key: "classes/scheduled",
                    icon: <HourglassOutlined />,
                },
                {
                    label: "In-Progress Classes",
                    key: "classes/in-progress",
                    icon: <PlayCircleOutlined />,
                },
                {
                    label: "Completed Classes",
                    key: "classes/completed",
                    icon: <FileDoneOutlined />,
                },
            ],
        },
        {
            label: (
                <span className="text-slate-500 text-xs font-semibold uppercase">
                    Settings
                </span>
            ),
            key: "settings",
            type: "group",
            children: [
                { label: "Profile", key: "profile", icon: <UserOutlined /> },
                {
                    label: "Payments",
                    key: "payments",
                    icon: <CreditCardOutlined />,
                },
            ],
        },
        {
            label: (
                <span className="text-slate-500 text-xs font-semibold uppercase">
                    Account
                </span>
            ),
            key: "account",
            type: "group",
            children: [
                {
                    label: "Logout",
                    key: "",
                    icon: <LogoutOutlined />,
                    danger: true,
                    onClick: () => auth.logout(),
                },
            ],
        },
    ];

    return auth.isLoggedIn() ? (
        <Layout hasSider>
            <Sider
                breakpoint="lg"
                collapsedWidth="0"
                width={220}
                style={{
                    overflow: "auto",
                    height: "100vh",
                    position: "fixed",
                    left: 0,
                    top: 0,
                    bottom: 0,
                }}
            >
                <div className="logo h-16 flex items-center px-2 bg-emerald-500">
                    <h1 className="my-0 font-bold text-white">CDSA365</h1>
                </div>
                <Menu
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={["0"]}
                    items={items}
                    inlineCollapsed={false}
                    onClick={({ key }) =>
                        navigate(key === "home" ? "/" : `/${key}`)
                    }
                />
            </Sider>
            <Layout style={{ marginLeft: 220, minHeight: "100vh" }}>
                <StyledHeader style={{ padding: 0 }} />
                <Content style={{ margin: "24px 16px 0" }}>
                    <DashboardContent>
                        <Outlet />
                    </DashboardContent>
                </Content>
                <Footer style={{ textAlign: "center" }}>
                    Ant Design ©2018 Created by Ant UED
                </Footer>
            </Layout>
        </Layout>
    ) : (
        <Navigate to={"/login"} state={{ from: location, test: "test" }} />
    );
};

export default Dashboard;
