const { VITE_API_BASE_URL, VITE_PAYMENT_KEY } = import.meta.env;
const BASE_URL = VITE_API_BASE_URL;

/* A constant variable that is exporting the api endpoints. */
export const config = {
    api: {
        registerStudent: BASE_URL + "/student/register",
        login: BASE_URL + "/student/login",
        getStudentClasses: BASE_URL + "/student/classes",
        makePayment: BASE_URL + "/payment/create",
        verifyPayment: BASE_URL + "/payment/verify",
        capturePaymentFailure: BASE_URL + "/payment/capture-failure",
        getPaymentHistory: BASE_URL + "/payments",
        addLeads: BASE_URL + "/leads/add",
        getAnnouncement: BASE_URL + "/announcement",
        sendContactForm: BASE_URL + "/contact-form",
        getFeeData: BASE_URL + "/student/fee-data",
        getStudentData: BASE_URL + "/admin/student",
        updateStudentPassword: BASE_URL + "/student/update-password",
        updateStudent: BASE_URL + "/admin/student",
        getClassBySlug: BASE_URL + "/class/slug",
        createOrder: BASE_URL + "/payment/create",
    },
    razorpay: {
        key: VITE_PAYMENT_KEY,
    },
};
