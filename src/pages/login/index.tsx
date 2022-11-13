import { Alert, Button, Divider, Form, Input } from "antd";
import logo from "../../assets/cdsa-logo.png";
import { LoginOutlined, EditOutlined } from "@ant-design/icons";
import axios from "axios";
import { config } from "../../config/config";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth-context";
import { useAppSelector } from "../../store/hooks";

type Props = {};

/**
 * It's a function that returns a section element with a form that has an email and password input
 * field and a submit button
 * @param {Props} props - Props
 * @returns A React component
 */
const LoginPage = (props: Props) => {
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const auth = useAuth();

    const onFinish = (value: any) => {
        axios
            .post(config.api.login, value)
            .then(({ data }) => {
                form.resetFields();
                auth.login(data);
                if (error) setError(null);
            })
            .catch((err) => setError(err.response.data.message));
    };

    useEffect(() => {
        if (auth.isLoggedIn()) navigate("/");
    }, [auth]);

    return (
        <section className="h-[100vh] bg-yellow-50 w-full flex justify-center items-center">
            <div className="w-1/4 flex flex-col items-center gap-8">
                <img src={logo} alt="logo" width="236px" height="236px" />
                <Form
                    form={form}
                    name="loginForm"
                    wrapperCol={{ span: 24 }}
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    autoComplete="off"
                    size="large"
                    className="w-full"
                >
                    <Form.Item
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: "Please input your Email!",
                            },
                        ]}
                    >
                        <Input type="email" placeholder="Email" />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: "Please input your password!",
                            },
                        ]}
                    >
                        <Input.Password placeholder="Password" />
                    </Form.Item>

                    <Form.Item wrapperCol={{ span: 24 }}>
                        {error && (
                            <Alert
                                message={error}
                                type="error"
                                className="w-full mb-4"
                            />
                        )}
                        <Button
                            type="primary"
                            htmlType="submit"
                            className="w-full uppercase"
                            icon={<LoginOutlined />}
                        >
                            Login
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </section>
    );
};

export default LoginPage;
