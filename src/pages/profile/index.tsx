import {
    Alert,
    Avatar,
    Button,
    Card,
    Col,
    Descriptions,
    Input,
    Row,
    Tag,
} from "antd";
import axios from "axios";
import { ChangeEvent, useEffect, useState } from "react";
import { config } from "../../config/config";
import { useAppSelector } from "../../store/hooks";
import {
    UserOutlined,
    MailFilled,
    PhoneFilled,
    CheckCircleOutlined,
    ExclamationCircleOutlined,
    LoadingOutlined,
} from "@ant-design/icons";
import { useAuth } from "../../context/auth-context";
import moment from "moment";

type Props = {};
type AlertProps = {
    show: boolean;
    type: "info" | "error" | "warning" | "success" | undefined;
    message: string;
};

const FormLabel = ({ message, className }: any) => {
    return (
        <p className={`font-semibold text-gray-400 ${className}`}>{message}</p>
    );
};

const ProfileDetail = ({ user, fetchUser }: any) => {
    const [fromDirty, setFromDirty] = useState(false);
    const [errorFields, setErrorFields] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);
    const [alert, setAlert] = useState<AlertProps>({
        show: false,
        type: undefined,
        message: "",
    });
    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        address_one: "",
        address_two: "",
        city: "",
        state: "",
        district: "",
        pincode: "",
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFromDirty(true);
        const { name, value } = e.target;
        setFormData((state) => ({ ...state, [name]: value }));
    };

    const validateSubmit = (): boolean => {
        const errors: string[] = [];
        Object.entries(formData).map(([key, value]) => {
            if (value.length < 1) {
                errors.push(key);
            } else {
                errors.slice(errors.indexOf(key), 1);
            }
        });
        setErrorFields(errors);
        return errors.length === 0;
    };

    const handleSubmit = (id: number) => {
        if (validateSubmit()) {
            setLoading(true);
            setAlert({
                show: false,
                type: undefined,
                message: "",
            });
            const url = config.api.updateStudent + `/${id}`;
            axios
                .put(url, formData)
                .then(() => fetchUser())
                .catch((err) => console.log(err))
                .finally(() => {
                    setLoading(false);
                    setFromDirty(false);
                });
        } else {
            setAlert({
                show: true,
                type: "error",
                message: "Please fill all the fields",
            });
        }
    };

    useEffect(() => {
        if (user) {
            setFormData({
                first_name: user["first_name"] ?? "",
                last_name: user["last_name"] ?? "",
                address_one: user["address_one"] ?? "",
                address_two: user["address_two"] ?? "",
                city: user["city"] ?? "",
                state: user["state"] ?? "",
                district: user["district"] ?? "",
                pincode: user["pincode"] ?? "",
            });
        }
    }, [user]);

    return (
        <Col span={24}>
            <Card title="Profile">
                <Row className="mb-4" gutter={12}>
                    <Col span={12}>
                        <FormLabel message="First Name" />
                        <Input
                            size="large"
                            placeholder="Update your first name"
                            value={formData["first_name"] || ""}
                            name="first_name"
                            onChange={handleChange}
                            status={
                                errorFields.includes("first_name")
                                    ? "error"
                                    : ""
                            }
                        />
                    </Col>
                    <Col span={12}>
                        <FormLabel message="Last Name" />
                        <Input
                            size="large"
                            placeholder="Update your last name"
                            value={formData["last_name"] || ""}
                            name="last_name"
                            onChange={handleChange}
                            status={
                                errorFields.includes("last_name") ? "error" : ""
                            }
                        />
                    </Col>
                </Row>
                <Row className="mb-4" gutter={12}>
                    <Col span={12}>
                        <FormLabel message="Address Line One" />
                        <Input
                            size="large"
                            placeholder="Update your address line one"
                            value={formData["address_one"] || ""}
                            name="address_one"
                            onChange={handleChange}
                            status={
                                errorFields.includes("address_one")
                                    ? "error"
                                    : ""
                            }
                        />
                    </Col>
                    <Col span={12}>
                        <FormLabel message="Address Line Two" />
                        <Input
                            size="large"
                            placeholder="Update your address line two"
                            value={formData["address_two"] || ""}
                            name="address_two"
                            onChange={handleChange}
                            status={
                                errorFields.includes("address_two")
                                    ? "error"
                                    : ""
                            }
                        />
                    </Col>
                </Row>
                <Row className="mb-4" gutter={12}>
                    <Col span={12}>
                        <FormLabel message="City" />
                        <Input
                            size="large"
                            placeholder="Update your address line one"
                            value={formData["city"] || ""}
                            name="city"
                            onChange={handleChange}
                            status={errorFields.includes("city") ? "error" : ""}
                        />
                    </Col>
                    <Col span={12}>
                        <FormLabel message="District" />
                        <Input
                            size="large"
                            placeholder="Update your address line two"
                            value={formData["district"] || ""}
                            name="district"
                            onChange={handleChange}
                            status={
                                errorFields.includes("district") ? "error" : ""
                            }
                        />
                    </Col>
                </Row>
                <Row className="mb-4" gutter={12}>
                    <Col span={12}>
                        <FormLabel message="State" />
                        <Input
                            size="large"
                            placeholder="Update your address line two"
                            value={formData["state"] || ""}
                            name="state"
                            onChange={handleChange}
                            status={
                                errorFields.includes("state") ? "error" : ""
                            }
                        />
                    </Col>
                    <Col span={12}>
                        <FormLabel message="Pincode" />
                        <Input
                            size="large"
                            placeholder="Update your address line one"
                            value={formData["pincode"] || ""}
                            name="pincode"
                            onChange={handleChange}
                            status={
                                errorFields.includes("pincode") ? "error" : ""
                            }
                        />
                    </Col>
                </Row>
                <Row gutter={12}>
                    <Col span={24}>
                        {alert["show"] && (
                            <Alert
                                type={alert["type"]}
                                message={alert["message"]}
                                showIcon
                            />
                        )}
                    </Col>
                    <Col span={24}>
                        <Button
                            size="large"
                            type="primary"
                            className="mt-4"
                            onClick={() => handleSubmit(user.id)}
                            icon={loading && <LoadingOutlined />}
                            disabled={!fromDirty}
                        >
                            {loading ? "Updating profile..." : "Update Profile"}
                        </Button>
                    </Col>
                </Row>
            </Card>
        </Col>
    );
};

const PasswordChangeSection = ({ user }: any) => {
    const initialState = {
        current_password: "",
        new_password: "",
        confirm_password: "",
    };
    const [counter, setCounter] = useState(5);
    const [startCounter, setStartCounter] = useState(false);
    const [info, setInfo] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [passwordData, setPasswordData] = useState(initialState);
    const auth = useAuth();

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setPasswordData((state) => ({ ...state, [name]: value }));
    };

    const validateFormData = (): [boolean, string | null] => {
        if (
            !passwordData["current_password"] ||
            !passwordData["new_password"] ||
            !passwordData["confirm_password"]
        ) {
            return [false, "Please fill all the fields"];
        } else if (
            passwordData["new_password"] !== passwordData["confirm_password"]
        ) {
            return [false, "New passwords did not match"];
        } else if (
            passwordData["new_password"].length < 8 ||
            passwordData["confirm_password"].length < 8
        ) {
            return [false, "Password should have minimum 8 characters"];
        } else {
            return [true, null];
        }
    };

    const updatePassword = (id: number) => {
        const url = config.api.updateStudentPassword + `/${id}`;
        axios
            .post(url, passwordData)
            .then(() => {
                const message = `Password Updated. Please login again in ${counter} sec.`;
                setInfo(message);
                setStartCounter(!startCounter);
            })
            .catch((err) => setError(err.response.data.message))
            .finally(() => setPasswordData(initialState));
    };

    const handleSubmit = (id: number) => {
        const [valid, error] = validateFormData();
        if (valid) {
            setError(null);
            updatePassword(id);
        } else {
            setInfo(null);
            setError(error);
        }
    };

    useEffect(() => {
        if (startCounter) {
            if (counter > 0) {
                setTimeout(() => {
                    setCounter((count) => count - 1);
                    setInfo(
                        `Password Updated. Please login again in ${
                            counter - 1
                        } sec.`
                    );
                }, 1000);
            } else {
                auth.logout();
            }
        }
    }, [counter, startCounter]);

    return (
        <Col span={24}>
            <Card title="Manage Password">
                <div className="mb-4">
                    <FormLabel message="Current Password" />
                    <Input
                        size="large"
                        type="password"
                        name="current_password"
                        placeholder="Current Password"
                        value={passwordData["current_password"] || ""}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-4">
                    <FormLabel message="New Password" />
                    <Input
                        size="large"
                        type="password"
                        name="new_password"
                        placeholder="New Password"
                        value={passwordData["new_password"] || ""}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-4">
                    <FormLabel message="Re-enter New Password" />
                    <Input
                        size="large"
                        type="password"
                        name="confirm_password"
                        placeholder="Confirm Password"
                        value={passwordData["confirm_password"] || ""}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    {error && (
                        <div className="mt-4">
                            <Alert type="error" message={error} showIcon />
                        </div>
                    )}
                    {info && (
                        <div className="mt-4">
                            <Alert type="success" message={info} showIcon />
                        </div>
                    )}
                    <Button
                        size="large"
                        type="primary"
                        className="mt-4"
                        block
                        onClick={() => handleSubmit(user.id)}
                    >
                        Update Password
                    </Button>
                </div>
            </Card>
        </Col>
    );
};

const PaymentDetails = ({ user }: any) => {
    return (
        <Col span={24} style={{ height: "100%" }}>
            <Card
                title="Payment Details"
                style={{ height: "100%" }}
                bodyStyle={{ padding: 0 }}
            >
                <Descriptions column={1} size="default" bordered>
                    <Descriptions.Item
                        label={<FormLabel className="mb-0" message="Fee" />}
                    >
                        &#8377;{user?.fee}
                    </Descriptions.Item>
                    <Descriptions.Item
                        label={
                            <FormLabel
                                className="mb-0"
                                message="Payment Period"
                            />
                        }
                    >
                        Every {user?.gap} {user?.period}
                    </Descriptions.Item>
                    <Descriptions.Item
                        label={
                            <FormLabel
                                className="mb-0"
                                message="Last Payment"
                            />
                        }
                    >
                        {moment(user.order_created_at).format("LL")}
                    </Descriptions.Item>
                    <Descriptions.Item
                        label={
                            <FormLabel
                                className="mb-0"
                                message="Next Payment"
                            />
                        }
                    >
                        {moment(user.next_due).format("LL")}
                    </Descriptions.Item>
                    <Descriptions.Item
                        label={
                            <FormLabel
                                className="mb-0"
                                message="Last Payment Status"
                            />
                        }
                    >
                        {user.payment_status === "paid" ? (
                            <Tag color="success" icon={<CheckCircleOutlined />}>
                                {user.payment_status}
                            </Tag>
                        ) : (
                            <Tag
                                color="error"
                                icon={<ExclamationCircleOutlined />}
                            >
                                {user.payment_status}
                            </Tag>
                        )}
                    </Descriptions.Item>
                    <Descriptions.Item
                        label={
                            <FormLabel
                                className="mb-0"
                                message="Last Receipt ID"
                            />
                        }
                    >
                        {user.receipt_id}
                    </Descriptions.Item>
                    {moment().isAfter(user.next_due) && (
                        <Descriptions.Item
                            label={
                                <FormLabel
                                    className="mb-0"
                                    message="Payment Overdue"
                                />
                            }
                        >
                            {Math.abs(
                                moment(user.next_due).diff(
                                    moment().format(),
                                    "days",
                                    false
                                )
                            )}{" "}
                            Day(s)
                        </Descriptions.Item>
                    )}
                </Descriptions>
            </Card>
        </Col>
    );
};

const ProfilePage = (props: Props) => {
    const [user, setUser] = useState<any>({});
    const currentUser = useAppSelector((state) => state.user);

    const fetchUserData = async () => {
        const url = config.api.getStudentData + `/${currentUser.id}`;
        const { data } = await axios.get(url);
        setUser(data);
    };

    useEffect(() => {
        fetchUserData();
    }, [currentUser]);

    return (
        <div className="flex flex-col gap-8">
            <div className="flex gap-4">
                <Avatar shape="square" size={128} icon={<UserOutlined />} />
                <div className="flex flex-col gap-1">
                    <h1 className="font-bold text-xl mb-0">
                        {user.first_name} {user.last_name}
                    </h1>
                    <p className="mb-0 text-lg flex gap-3 items-center">
                        <MailFilled className="text-gray-400" />
                        {user.email}
                    </p>
                    <p className="mb-0 text-lg flex gap-3 items-center">
                        <PhoneFilled className="text-gray-400" />
                        {user.phone}
                    </p>
                    <p className="mb-0 text-lg flex gap-3 items-center">
                        {user.status ? (
                            <Tag color="#10b981" icon={<CheckCircleOutlined />}>
                                Account Active
                            </Tag>
                        ) : (
                            <Tag
                                color="#f87171"
                                icon={<ExclamationCircleOutlined />}
                            >
                                Account Inactive
                            </Tag>
                        )}
                    </p>
                </div>
            </div>
            <Row gutter={12}>
                <ProfileDetail user={user} fetchUser={fetchUserData} />
            </Row>
            <Row gutter={12}>
                <Col span={12}>
                    <PasswordChangeSection user={user} />
                </Col>
                <Col span={12}>
                    <PaymentDetails user={user} />
                </Col>
            </Row>
        </div>
    );
};

export default ProfilePage;
