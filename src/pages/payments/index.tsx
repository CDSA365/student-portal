import { Button, Tag } from "antd";
import Table, { ColumnsType } from "antd/lib/table";
import axios from "axios";
import moment from "moment";
import { FC, useEffect, useState } from "react";
import { config } from "../../config/config";
import { useAppSelector } from "../../store/hooks";

/* This is a way to add a global variable to the window object. */
declare global {
    interface Window {
        Razorpay: any;
    }
}

type Props = {};

const columns: ColumnsType<any> = [
    {
        title: "Receipt#",
        key: "receipt",
        dataIndex: "receipt",
    },
    {
        title: "Amount",
        key: "paid",
        dataIndex: "paid",
    },
    {
        title: "Paid on",
        key: "paidOn",
        dataIndex: "paidOn",
    },
    {
        title: "Next due",
        key: "nextDue",
        dataIndex: "nextDue",
    },
    {
        title: "Status",
        key: "status",
        dataIndex: "status",
        render: (status: string) => <Tag color={status === "paid" ? "green" : "red"}>{status.toUpperCase()}</Tag>,
    },
];

const PaymentsPage: FC = (props: Props) => {
    const { user } = useAppSelector((state) => state);
    const [userData, setUserData] = useState<any>({});
    const [paymentHistory, setPaymentHistory] = useState<any[]>([]);
    const [dataSource, setDataSource] = useState<any[]>([]);
    const [paymentError, setPaymentError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [dataLoading, setDataLoading] = useState(true);

    const createOrder = async (amount: number) => {
        try {
            if (!amount) throw new Error("Amount cannot be 0");
            const url = config.api.createOrder;
            const { data } = await axios.post(url, { amount });
            return data;
        } catch (error) {
            throw new Error("Error creating order");
        }
    };

    const makePayment = () => {
        setLoading(true);
        createOrder(userData.fee)
            .then(({ amount, id }) => {
                var rzp1 = new window.Razorpay({
                    key: config.razorpay.key,
                    amount: amount,
                    name: "Carpe Diem Skills Academy",
                    description: "Online payment",
                    image: "https://www.cdsa365.com/images/cdsa-logo.png?imwidth=256",
                    order_id: id,
                    handler: async function (response: any) {
                        try {
                            setDataLoading(true);
                            const payload = {
                                ...response,
                                student_id: user.id,
                                paid: amount,
                                status: "paid",
                                error_code: null,
                                notes: "Online payment",
                            };
                            await axios.post(config.api.verifyPayment, payload);
                            fetchPaymentHistory();
                        } catch (error) {
                            throw new Error("Error verifying payment");
                        } finally {
                            setLoading(false);
                        }
                    },
                    prefill: {
                        name: `${userData.first_name} ${userData.last_name}`,
                        email: userData.email,
                        contact: userData.phone,
                    },
                    notes: {
                        address: "Carpe Diem Skills Academy",
                    },
                    theme: {
                        color: "#3399cc",
                    },
                });
                setTimeout(() => {
                    rzp1.open();
                }, 2000);
            })
            .catch((err) => {
                setPaymentError(err.message);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const fetchPaymentHistory = () => {
        const url = config.api.getPaymentHistory + `/${user.id}`;
        axios
            .get(url)
            .then((res) => setPaymentHistory(res.data))
            .catch((err) => console.log(err))
            .finally(() => setDataLoading(false));
    };

    const fetchUserData = () => {
        const url = config.api.getStudentData + `/${user.id}`;
        axios.get(url).then((res) => {
            console.log("USER DATA", res.data);
            setUserData(res.data);
        });
    };

    useEffect(() => {
        fetchPaymentHistory();
        fetchUserData();
    }, []);

    useEffect(() => {
        setDataSource(
            paymentHistory.map((payment) => ({
                key: payment.id,
                id: payment.id,
                receipt: payment.receipt_id,
                paid: payment.paid / 100,
                paidOn: moment(payment.created_at).utc().format("LLL"),
                nextDue: moment(payment.next_due).utc().format("LLL"),
                status: payment.status,
            }))
        );
    }, [paymentHistory]);

    return (
        <div>
            <Table
                columns={columns}
                dataSource={dataSource}
                loading={dataLoading}
                pagination={{
                    pageSize: 25,
                }}
                title={() => {
                    return (
                        <div className="flex justify-between items-center">
                            <h4 className="my-0 text-md text-slate-500 font-semibold uppercase">Payment History</h4>
                            <Button type="primary" onClick={makePayment} disabled={loading}>
                                {loading ? "Please wait..." : "Make payment"}
                            </Button>
                        </div>
                    );
                }}
            />
        </div>
    );
};

export default PaymentsPage;
