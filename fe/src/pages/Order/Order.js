import { useEffect, useState } from 'react';
import { useFormik, Field, Formik, Form } from 'formik';
import OrderItem from './OrderItem';
import address from '~/data/data';

const validate = (values) => {
    const errors = {};

    if (!values.name) {
        errors.name = 'Thông tin bắt buộc';
    }
    if (!values.phoneNumber) {
        errors.phoneNumber = 'Thông tin bắt buộc';
    } else if (values.phoneNumber.match(/[0][0-9]*/)?.[0]?.length !== 10) {
        errors.phoneNumber = 'Số điện thoại không hợp lệ';
    }
    if (!values.city) {
        errors.city = 'Vui lòng chọn thành phố/tỉnh';
    }
    if (!values.city) {
        errors.city = 'Vui lòng chọn Thành Phố/Tỉnh';
    }
    if (!values.district) {
        errors.district = 'Vui lòng chọn Quận/Huyện';
    }
    if (!values.ward) {
        errors.ward = 'Vui lòng chọn Phường/Xã';
    }
    if (!values.detailAddress) {
        errors.detailAddress = 'Thông tin bắt buộc';
    }
    return errors;
};

function Order() {
    const [showModal, setShowModal] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState(undefined);
    const formik = useFormik({
        initialValues: {
            name: '',
            phoneNumber: '',
            city: '',
            district: '',
            ward: '',
            detailAddress: '',
            message: '',
        },
        validate,
        onSubmit: (values) => {
            console.log(JSON.stringify(values, null, 2));
        },
    });

    useEffect(() => {}, []);

    return (
        <div className="bg-[rgb(237,240,243)] py-5">
            <div className="w-full sm:mx-14 sm:flex justify-between">
                <p className="my-3 font-[500] text-[#020b27] leading-[2rem] text-[1.1rem]">Chọn địa chỉ giao hàng</p>
            </div>
            <Formik className="w-full" initialValues={formik.initialValues} onSubmit={formik.handleSubmit}>
                <Form className="sm:mx-14 sm:flex justify-between">
                    <div className="">
                        <div className="rounded-xl px-3 py-5 bg-white">
                            <div className="flex items-center">
                                <span>
                                    <img width={25} src="https://nhathuoclongchau.com.vn/estore-images/user.png"></img>
                                </span>
                                <span className="ml-3 text-sm font-[500] text-[#020b27] leading-[2rem]">
                                    Thông tin người nhận
                                </span>
                            </div>
                            <div className="flex flex-wrap justify-between mt-5">
                                <div className="sm:w-[49%] max-sm:w-full">
                                    <input
                                        className={`border outline-0 text-slate-400 p-3 rounded-xl w-full h-12 ${
                                            formik.touched.name && formik.errors.name
                                                ? `border-red-600 bg-rose-50`
                                                : null
                                        }`}
                                        name="name"
                                        type="text"
                                        onChange={formik.handleChange}
                                        value={formik.values.name}
                                        placeholder="Họ và tên"
                                    ></input>
                                    {formik.touched.name && formik.errors.name ? (
                                        <span className="flex items-center mt-2 text-red-600 text-sm">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth={1.5}
                                                stroke="currentColor"
                                                className="w-6 h-6"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
                                                />
                                            </svg>
                                            <span>{formik.errors.name}</span>
                                        </span>
                                    ) : null}
                                </div>
                                <div className="sm:w-[49%] max-sm:w-full">
                                    <input
                                        className={`border outline-0 text-slate-400 p-3 rounded-xl w-full h-12 max-sm:mt-3 ${
                                            formik.touched.phoneNumber && formik.errors.phoneNumber
                                                ? `border-red-600 bg-rose-50`
                                                : null
                                        }`}
                                        placeholder="Số điện thoại"
                                        name="phoneNumber"
                                        type="text"
                                        onChange={formik.handleChange}
                                        value={formik.values.phoneNumber}
                                    ></input>
                                    {formik.touched.phoneNumber && formik.errors.phoneNumber ? (
                                        <span className="flex items-center mt-2 text-red-600 text-sm">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth={1.5}
                                                stroke="currentColor"
                                                className="w-6 h-6"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
                                                />
                                            </svg>
                                            <span>{formik.errors.phoneNumber}</span>
                                        </span>
                                    ) : null}
                                </div>
                            </div>
                            <div className="flex items-center my-5 border-t w-full pt-3">
                                <span>
                                    <img width={25} src="https://nhathuoclongchau.com.vn/estore-images/pin.png"></img>
                                </span>
                                <span className="ml-3 text-sm font-[500] text-[#020b27] leading-[2rem]">
                                    Địa chỉ nhận hàng
                                </span>
                            </div>
                            <div className="mb-1">
                                {formik.touched.city &&
                                (formik.errors.city || formik.errors.district || formik.errors.ward) ? (
                                    <span className="flex items-center mt-2 text-red-600 text-sm">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth={1.5}
                                            stroke="currentColor"
                                            className="w-6 h-6"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
                                            />
                                        </svg>
                                        <span>
                                            {formik.errors.city
                                                ? formik.errors.city
                                                : formik.errors.district
                                                ? formik.errors.district
                                                : formik.errors.ward}
                                        </span>
                                    </span>
                                ) : null}
                            </div>
                            <div className="flex flex-wrap justify-between">
                                <Field
                                    onChange={formik.handleChange}
                                    value={formik.values.city}
                                    as="select"
                                    name="city"
                                    className={`border outline-0 text-slate-400 p-3 rounded-xl sm:w-[49%] max-sm:w-full ${
                                        formik.touched.city && formik.errors.city ? `border-red-600 bg-rose-50` : null
                                    }`}
                                >
                                    <option value="" disabled>
                                        Chọn Thành Phố/Tỉnh
                                    </option>
                                    {address.map((e, i) => {
                                        return (
                                            <option key={i} value={JSON.stringify(e)}>
                                                {e.name}
                                            </option>
                                        );
                                    })}
                                </Field>
                                <Field
                                    onChange={formik.handleChange}
                                    value={formik.values.district}
                                    as="select"
                                    name="district"
                                    className={`border outline-0 text-slate-400 p-3 rounded-xl sm:w-[49%] max-sm:w-full max-sm:mt-5 ${
                                        formik.touched.district && formik.errors.district
                                            ? `border-red-600 bg-rose-50`
                                            : null
                                    }`}
                                >
                                    <option value="" disabled>
                                        Chọn Quận/Huyện
                                    </option>
                                    {formik.values.city ? (
                                        JSON.parse(formik.values.city)?.districts?.map((e, i) => (
                                            <option key={i} value={JSON.stringify(e)}>
                                                {e.name}
                                            </option>
                                        ))
                                    ) : (
                                        <option></option>
                                    )}
                                </Field>
                            </div>
                            <div className="mt-5">
                                <Field
                                    onChange={formik.handleChange}
                                    value={formik.values.ward}
                                    as="select"
                                    name="ward"
                                    className={`border outline-0 text-slate-400 p-3 rounded-xl w-full ${
                                        formik.touched.ward && formik.errors.ward ? `border-red-600 bg-rose-50` : null
                                    }`}
                                >
                                    <option disabled value="">
                                        Chọn Phường/Xã
                                    </option>
                                    {formik.values.district ? (
                                        JSON.parse(formik.values.district)?.wards?.map((e, i) => (
                                            <option key={i} value={JSON.stringify(e)}>
                                                {e.name}
                                            </option>
                                        ))
                                    ) : (
                                        <option></option>
                                    )}
                                </Field>
                            </div>
                            <div className="mt-5">
                                <input
                                    className={`border outline-0 text-slate-400 p-3 rounded-xl w-full ${
                                        formik.touched.name && formik.errors.name ? `border-red-600 bg-rose-50` : null
                                    }`}
                                    placeholder="Nhập địa chỉ cụ thể"
                                    name="detailAddress"
                                    type="text"
                                    onChange={formik.handleChange}
                                    value={formik.values.detailAddress}
                                ></input>
                                {formik.touched.detailAddress && formik.errors.detailAddress ? (
                                    <span className="flex items-center mt-2 text-red-600 text-sm">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth={1.5}
                                            stroke="currentColor"
                                            className="w-6 h-6"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
                                            />
                                        </svg>
                                        <span>{formik.errors.detailAddress}</span>
                                    </span>
                                ) : null}
                            </div>
                        </div>
                        <p className="my-3 font-[500] text-[#020b27] leading-[2rem] text-[1.1rem]">
                            Danh sách sản phẩm (3)
                        </p>
                        <div className="rounded-xl px-3 py-5 bg-white">
                            {Array.from({ length: 3 }, (e, i) => {
                                return (
                                    <div key={i} className={i === 0 ? null : 'border-t'}>
                                        <OrderItem></OrderItem>
                                    </div>
                                );
                            })}
                        </div>
                        <p className="my-3 font-[500] text-[#020b27] leading-[2rem] text-[1.1rem]">
                            Chọn hình thức thanh toán
                        </p>
                        <div className="rounded-xl px-3 py-5 bg-white">
                            <div
                                className="flex items-center p-3 cursor-pointer"
                                onClick={() =>
                                    paymentMethod === 'vnpay' ? setPaymentMethod(undefined) : setPaymentMethod('vnpay')
                                }
                            >
                                <div
                                    className={`flex items-center rounded-full w-5 h-5 ${
                                        paymentMethod === 'vnpay' ? 'bg-blue-700' : 'border-stone-500 border'
                                    }`}
                                >
                                    <i
                                        className={`fa-solid fa-check text-white text-sm ml-[3px] ${
                                            paymentMethod === 'vnpay' ? 'block' : 'hidden'
                                        }`}
                                    ></i>
                                </div>
                                <div className="mx-3">
                                    <img
                                        width={35}
                                        src="https://s3-sgn09.fptcloud.com/lc-public/app-lc/payment/vnpay.png"
                                    ></img>
                                </div>
                                <p htmlFor="vnpay" className="text-sm">
                                    Thanh toán bằng thẻ ATM nội địa (Qua VNPay)
                                </p>
                            </div>
                            <div
                                className="flex items-center p-3 cursor-pointer border-t"
                                onClick={() =>
                                    paymentMethod === 'paypal'
                                        ? setPaymentMethod(undefined)
                                        : setPaymentMethod('paypal')
                                }
                            >
                                <div
                                    className={`flex items-center rounded-full w-5 h-5 ${
                                        paymentMethod === 'paypal' ? 'bg-blue-700' : 'border-stone-500 border'
                                    }`}
                                >
                                    <i
                                        className={`fa-solid fa-check text-white text-sm ml-[3px] ${
                                            paymentMethod === 'paypal' ? 'block' : 'hidden'
                                        }`}
                                    ></i>
                                </div>
                                <div className="mx-3">
                                    <img
                                        width={35}
                                        src="https://s3-sgn09.fptcloud.com/lc-public/app-lc/payment/card.png"
                                    ></img>
                                </div>
                                <p className="text-sm">Thanh toán bằng thẻ quốc tế Visa, Master, JCB</p>
                            </div>
                            <div
                                className="flex items-center p-3 cursor-pointer border-t"
                                onClick={() =>
                                    paymentMethod === 'moca' ? setPaymentMethod(undefined) : setPaymentMethod('moca')
                                }
                            >
                                <div
                                    className={`flex items-center rounded-full w-5 h-5 ${
                                        paymentMethod === 'moca' ? 'bg-blue-700' : 'border-stone-500 border'
                                    }`}
                                >
                                    <i
                                        className={`fa-solid fa-check text-white text-sm ml-[3px] ${
                                            paymentMethod === 'moca' ? 'block' : 'hidden'
                                        }`}
                                    ></i>
                                </div>
                                <div className="mx-3">
                                    <img
                                        width={35}
                                        src="https://s3-sgn09.fptcloud.com/lc-public/app-lc/payment/moca.png"
                                    ></img>
                                </div>
                                <p className="text-sm">Thanh toán bằng ví Moca</p>
                            </div>
                            <div
                                className="flex items-center p-3 cursor-pointer border-t"
                                onClick={() =>
                                    paymentMethod === 'zalopay'
                                        ? setPaymentMethod(undefined)
                                        : setPaymentMethod('zalopay')
                                }
                            >
                                <div
                                    className={`flex items-center rounded-full w-5 h-5 ${
                                        paymentMethod === 'zalopay' ? 'bg-blue-700' : 'border-stone-500 border'
                                    }`}
                                >
                                    <i
                                        className={`fa-solid fa-check text-white text-sm ml-[3px] ${
                                            paymentMethod === 'zalopay' ? 'block' : 'hidden'
                                        }`}
                                    ></i>
                                </div>
                                <div className="mx-3">
                                    <img
                                        width={35}
                                        src="https://s3-sgn09.fptcloud.com/lc-public/app-lc/payment/zalopay.png"
                                    ></img>
                                </div>
                                <p className="text-sm">Thanh toán bằng ví ZaloPay</p>
                            </div>
                        </div>
                    </div>
                    <div className="sticky h-fit top-0 flex mx-2">
                        <div className="z-10 bg-white border-2 h-fit py-4 px-3 sm:rounded-3xl max-sm:rounded-t-3xl max-sm:w-screen sm:w-96 max-sm:fixed left-0 bottom-0">
                            <div className={`${showModal ? 'block' : 'hidden'} sm:block`}>
                                <div className="flex justify-between my-2">
                                    <h5 className="sm:text-[15px] max-sm:text-sm text-slate-600">Tổng tiền</h5>
                                    <h5 className="sm:text-[15px] max-sm:text-sm">824.400đ</h5>
                                </div>
                                <div className="flex justify-between my-2">
                                    <h5 className="sm:text-[15px] max-sm:text-sm text-slate-600">Giảm giá trực tiếp</h5>
                                    <h5 className="sm:text-[15px] max-sm:text-sm">0đ</h5>
                                </div>
                                <div className="flex justify-between my-2">
                                    <h5 className="sm:text-[15px] max-sm:text-sm text-slate-600">
                                        Giảm giá điểm thưởng
                                    </h5>
                                    <h5 className="sm:text-[15px] max-sm:text-sm">824.400đ</h5>
                                </div>
                                <div className="flex justify-between my-2">
                                    <h5 className="sm:text-[15px] max-sm:text-sm text-slate-600">Tiết kiệm được</h5>
                                    <h5 className="sm:text-[15px] max-sm:text-sm">0đ</h5>
                                </div>
                                <div className="flex justify-between border-t py-2 mt-3">
                                    <h5 className="sm:text-[15px] max-sm:text-sm text-slate-600">Phí vận chuyển</h5>
                                    <h5 className="sm:text-[15px] max-sm:text-sm text-green-600	">Miễn phí</h5>
                                </div>
                                <div className="sm:hidden max-sm:block">
                                    <textarea
                                        placeholder="Ghi chú cho dược sỹ (ví dụ: hãy gọi trước khi giao nhé!)"
                                        className="h-20 border outline-0 text-slate-400 text-sm p-3 rounded-xl w-full"
                                        name="message"
                                        type="text"
                                        onChange={formik.handleChange}
                                        value={formik.values.message}
                                    ></textarea>
                                </div>
                            </div>
                            <div className="justify-between items-center max-sm:flex sm:border-t">
                                <div className="flex max-sm:flex-col justify-between mt-2 py-3">
                                    <h4 className="text-ms font-semibold">Thành tiền</h4>
                                    <h4
                                        className="text-base text-blue-700 font-bold flex items-center "
                                        onClick={() => setShowModal(!showModal)}
                                    >
                                        818.000đ
                                        <span
                                            className={`sm:hidden ml-2 duration-300 ${
                                                showModal ? 'rotate-180' : 'rotate-0'
                                            }`}
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth={2}
                                                stroke="black"
                                                className="w-5 h-5"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M4.5 15.75l7.5-7.5 7.5 7.5"
                                                />
                                            </svg>
                                        </span>
                                    </h4>
                                </div>
                                <div className="sm:block max-sm:hidden">
                                    <textarea
                                        placeholder="Ghi chú cho dược sỹ (ví dụ: hãy gọi trước khi giao nhé!)"
                                        className="h-20 border outline-0 text-slate-400 text-sm p-3 rounded-xl w-full"
                                    ></textarea>
                                </div>
                                <button
                                    type="submit"
                                    className="w-full max-sm:w-5/12 max-sm:py-4 sm:py-2 rounded-3xl mt-3 h-fit text-center bg-sky-600 text-white text-sm cursor-pointer "
                                >
                                    Đặt hàng (2)
                                </button>
                            </div>
                            <div className="text-center mt-5 max-sm:hidden">
                                <h6 className="text-xs text-slate-400">Nếu tiến hành đặt hàng, bạn đồng ý</h6>
                                <h6 className="decoration-solid	text-xs font-semibold underline text-slate-600">
                                    Điều khoản của nhà thuốc
                                </h6>
                            </div>
                        </div>
                    </div>
                </Form>
            </Formik>
        </div>
    );
}

export default Order;
