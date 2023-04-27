import { useEffect, useState } from 'react';
import { useFormik, Field, Formik, Form } from 'formik';
import CheckoutItem from '~/components/CheckoutItem/CheckoutItem';
import address from '~/data/data';
import { useSelector, useDispatch } from 'react-redux';
import { convertNumberToPrice } from '~/utils/currency';
import PaymentMethodItem from '~/components/PaymentMethodItem/PaymentMethodItem';
import { addAddress } from '~/redux/addressSlice';
import { useNavigate } from 'react-router-dom';

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
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart.medicines);
    const [showModal, setShowModal] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState(undefined);
    const navigate = useNavigate();

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
            dispatch(
                addAddress({
                    name: values?.name,
                    phoneNumber: values?.phoneNumber,
                    detailAddress: values?.detailAddress,
                    message: values?.message,
                    city: JSON.parse(values?.city)?.name,
                    district: JSON.parse(values?.district)?.name,
                    ward: JSON.parse(values?.ward)?.name,
                }),
            );
            navigate('/payment');
        },
    });
    const [totalPrice, setTotalPrice] = useState(0);
    const [totalPriceWithoutDiscount, setTotalPriceWithoutDiscount] = useState(0);
    const [totalPriceByVoucher, setTotalPriceByVoucher] = useState(0);

    useEffect(() => {
        let totalPrice = 0;
        let tmpTotalPriceByVoucher = 0;
        let tmpTotalPriceWithoutDiscount = 0;
        console.log(cart);
        cart?.medicines?.forEach((e) => {
            totalPrice = e?.quantity * (e?.unit?.price - (e?.unit?.price * e?.medicine?.discount) / 100) + totalPrice;
            tmpTotalPriceWithoutDiscount += e?.unit?.price * e?.quantity;
        });
        cart?.listVoucher?.forEach((e) => {
            tmpTotalPriceByVoucher += e?.discount;
        });
        setTotalPrice(totalPrice);
        setTotalPriceWithoutDiscount(tmpTotalPriceWithoutDiscount);
        setTotalPriceByVoucher((tmpTotalPriceWithoutDiscount * tmpTotalPriceByVoucher) / 100);
    }, []);

    return (
        <div className="bg-[rgb(237,240,243)] py-5">
            <div className="w-full justify-between sm:mx-14 sm:flex">
                <p className="my-3 text-[1.1rem] font-[500] leading-[2rem] text-[#020b27]">Chọn địa chỉ giao hàng</p>
            </div>
            <Formik className="w-full" initialValues={formik.initialValues} onSubmit={formik.handleSubmit}>
                <Form className="justify-between sm:mx-14 sm:flex">
                    <div className="">
                        <div className="rounded-xl bg-white px-3 py-5">
                            <div className="flex items-center">
                                <span>
                                    <img width={25} src="https://nhathuoclongchau.com.vn/estore-images/user.png"></img>
                                </span>
                                <span className="ml-3 text-sm font-[500] leading-[2rem] text-[#020b27]">
                                    Thông tin người nhận
                                </span>
                            </div>
                            <div className="mt-5 flex flex-wrap justify-between">
                                <div className="max-sm:w-full sm:w-[49%]">
                                    <input
                                        className={`h-12 w-full rounded-xl border p-3 text-slate-400 outline-0 ${
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
                                        <span className="mt-2 flex items-center text-sm text-red-600">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth={1.5}
                                                stroke="currentColor"
                                                className="h-6 w-6"
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
                                <div className="max-sm:w-full sm:w-[49%]">
                                    <input
                                        className={`h-12 w-full rounded-xl border p-3 text-slate-400 outline-0 max-sm:mt-3 ${
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
                                        <span className="mt-2 flex items-center text-sm text-red-600">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth={1.5}
                                                stroke="currentColor"
                                                className="h-6 w-6"
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
                            <div className="my-5 flex w-full items-center border-t pt-3">
                                <span>
                                    <img width={25} src="https://nhathuoclongchau.com.vn/estore-images/pin.png"></img>
                                </span>
                                <span className="ml-3 text-sm font-[500] leading-[2rem] text-[#020b27]">
                                    Địa chỉ nhận hàng
                                </span>
                            </div>
                            <div className="mb-1">
                                {formik.touched.city &&
                                (formik.errors.city || formik.errors.district || formik.errors.ward) ? (
                                    <span className="mt-2 flex items-center text-sm text-red-600">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth={1.5}
                                            stroke="currentColor"
                                            className="h-6 w-6"
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
                                    className={`rounded-xl border p-3 text-slate-400 outline-0 max-sm:w-full sm:w-[49%] ${
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
                                    className={`rounded-xl border p-3 text-slate-400 outline-0 max-sm:mt-5 max-sm:w-full sm:w-[49%] ${
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
                                    className={`w-full rounded-xl border p-3 text-slate-400 outline-0 ${
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
                                    className={`w-full rounded-xl border p-3 text-slate-400 outline-0 ${
                                        formik.touched.name && formik.errors.name ? `border-red-600 bg-rose-50` : null
                                    }`}
                                    placeholder="Nhập địa chỉ cụ thể"
                                    name="detailAddress"
                                    type="text"
                                    onChange={formik.handleChange}
                                    value={formik.values.detailAddress}
                                ></input>
                                {formik.touched.detailAddress && formik.errors.detailAddress ? (
                                    <span className="mt-2 flex items-center text-sm text-red-600">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth={1.5}
                                            stroke="currentColor"
                                            className="h-6 w-6"
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
                        <p className="my-3 text-[1.1rem] font-[500] leading-[2rem] text-[#020b27]">
                            Danh sách sản phẩm (3)
                        </p>
                        <div className="my-3 mt-2 block rounded-lg border bg-white py-5 px-3">
                            <div className="flex justify-between bg-[rgb(255,243,225)] p-1 text-[13px]">
                                <div>
                                    <span className="flex items-center">
                                        <span className="mx-2">
                                            <i className="fa-solid fa-tag"></i>
                                        </span>
                                        <span className="font-medium">Khuyến mại</span>
                                    </span>
                                </div>
                            </div>
                            <div className="mx-2">
                                {cart?.listVoucher?.map((e, i) => {
                                    return (
                                        <div className={i === 0 ? null : 'border-t'} key={i}>
                                            <div className="flex items-center py-2">
                                                <span className="rounded border p-1">
                                                    <img
                                                        src="https://s3-sgn09.fptcloud.com/lc-public/web-lc/default/promotion_used.webp"
                                                        width="30"
                                                        height="30"
                                                        className="transparent"
                                                    />
                                                </span>
                                                <span className="mx-2 text-[14px]">{e?.name}</span>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                        <div className="rounded-xl bg-white px-3 py-5">
                            {cart?.medicines.map((e, i) => {
                                return (
                                    <div key={i} className={i === 0 ? null : 'border-t'}>
                                        <CheckoutItem
                                            avatar={e?.avatar}
                                            medicine={e?.medicine}
                                            quantity={e?.quantity}
                                            unit={e?.unit}
                                        ></CheckoutItem>
                                    </div>
                                );
                            })}
                        </div>
                        <p className="my-3 text-[1.1rem] font-[500] leading-[2rem] text-[#020b27]">
                            Chọn hình thức thanh toán
                        </p>
                        <div className="rounded-xl bg-white px-3 py-1">
                            <div
                                className="flex cursor-pointer items-center p-3"
                                onClick={() =>
                                    paymentMethod === 'vnpay' ? setPaymentMethod(undefined) : setPaymentMethod('vnpay')
                                }
                            >
                                <div
                                    className={`flex h-5 w-5 items-center rounded-full ${
                                        paymentMethod === 'vnpay' ? 'bg-blue-700' : 'border border-stone-500'
                                    }`}
                                >
                                    <i
                                        className={`fa-solid fa-check ml-[3px] text-sm text-white ${
                                            paymentMethod === 'vnpay' ? 'block' : 'hidden'
                                        }`}
                                    ></i>
                                </div>
                                <PaymentMethodItem
                                    urlImg={'https://s3-sgn09.fptcloud.com/lc-public/app-lc/payment/vnpay.png'}
                                    name={'Thanh toán bằng thẻ ATM nội địa (Qua VNPay)'}
                                ></PaymentMethodItem>
                            </div>
                            <div
                                className="flex cursor-pointer items-center border-t p-3"
                                onClick={() =>
                                    paymentMethod === 'moca' ? setPaymentMethod(undefined) : setPaymentMethod('moca')
                                }
                            >
                                <div
                                    className={`flex h-5 w-5 items-center rounded-full ${
                                        paymentMethod === 'moca' ? 'bg-blue-700' : 'border border-stone-500'
                                    }`}
                                >
                                    <i
                                        className={`fa-solid fa-check ml-[3px] text-sm text-white ${
                                            paymentMethod === 'moca' ? 'block' : 'hidden'
                                        }`}
                                    ></i>
                                </div>
                                <PaymentMethodItem
                                    urlImg={'https://s3-sgn09.fptcloud.com/lc-public/app-lc/payment/card.png'}
                                    name={'Thanh toán bằng thẻ quốc tế Visa, Master, JCB'}
                                ></PaymentMethodItem>
                            </div>
                            <div
                                className="flex cursor-pointer items-center border-t p-3"
                                onClick={() =>
                                    paymentMethod === 'paypal'
                                        ? setPaymentMethod(undefined)
                                        : setPaymentMethod('paypal')
                                }
                            >
                                <div
                                    className={`flex h-5 w-5 items-center rounded-full ${
                                        paymentMethod === 'paypal' ? 'bg-blue-700' : 'border border-stone-500'
                                    }`}
                                >
                                    <i
                                        className={`fa-solid fa-check ml-[3px] text-sm text-white ${
                                            paymentMethod === 'paypal' ? 'block' : 'hidden'
                                        }`}
                                    ></i>
                                </div>
                                <PaymentMethodItem
                                    urlImg={
                                        'https://static.vecteezy.com/system/resources/thumbnails/009/469/637/small/paypal-payment-icon-editorial-logo-free-vector.jpg'
                                    }
                                    name={'Thanh toán bằng paypal'}
                                ></PaymentMethodItem>
                            </div>
                            <div
                                className="flex cursor-pointer items-center border-t p-3"
                                onClick={() =>
                                    paymentMethod === 'zalopay'
                                        ? setPaymentMethod(undefined)
                                        : setPaymentMethod('zalopay')
                                }
                            >
                                <div
                                    className={`flex h-5 w-5 items-center rounded-full ${
                                        paymentMethod === 'zalopay' ? 'bg-blue-700' : 'border border-stone-500'
                                    }`}
                                >
                                    <i
                                        className={`fa-solid fa-check ml-[3px] text-sm text-white ${
                                            paymentMethod === 'zalopay' ? 'block' : 'hidden'
                                        }`}
                                    ></i>
                                </div>
                                <PaymentMethodItem
                                    urlImg={'https://s3-sgn09.fptcloud.com/lc-public/app-lc/payment/zalopay.png'}
                                    name={'Thanh toán bằng ví ZaloPay'}
                                ></PaymentMethodItem>
                            </div>
                        </div>
                    </div>
                    <div className="sticky top-0 mx-2 flex h-fit">
                        <div className="left-0 bottom-0 z-10 h-fit border-2 bg-white py-4 px-3 max-sm:fixed max-sm:w-screen max-sm:rounded-t-3xl sm:w-96 sm:rounded-3xl">
                            <div className={`${showModal ? 'block' : 'hidden'} sm:block`}>
                                <div className="my-2 flex justify-between">
                                    <h5 className="text-slate-600 max-sm:text-sm sm:text-[15px]">Tổng tiền</h5>
                                    <h5 className="max-sm:text-sm sm:text-[15px]">
                                        {convertNumberToPrice(totalPriceWithoutDiscount)}đ
                                    </h5>
                                </div>
                                <div className="my-2 flex justify-between">
                                    <h5 className="text-slate-600 max-sm:text-sm sm:text-[15px]">Giảm giá trực tiếp</h5>
                                    <h5 className="max-sm:text-sm sm:text-[15px]">
                                        {convertNumberToPrice(totalPriceWithoutDiscount - totalPrice)}đ
                                    </h5>
                                </div>
                                <div className="my-2 flex justify-between">
                                    <h5 className="text-slate-600 max-sm:text-sm sm:text-[15px]">
                                        Giảm giá điểm thưởng
                                    </h5>
                                    <h5 className="max-sm:text-sm sm:text-[15px]">
                                        {convertNumberToPrice(totalPriceByVoucher)}đ
                                    </h5>
                                </div>
                                <div className="my-2 flex justify-between">
                                    <h5 className="text-slate-600 max-sm:text-sm sm:text-[15px]">Tiết kiệm được</h5>
                                    <h5 className="max-sm:text-sm sm:text-[15px]">
                                        {convertNumberToPrice(totalPrice - totalPriceByVoucher)}đ
                                    </h5>
                                </div>
                                <div className="mt-3 flex justify-between border-t py-2">
                                    <h5 className="text-slate-600 max-sm:text-sm sm:text-[15px]">Phí vận chuyển</h5>
                                    <h5 className="text-green-600 max-sm:text-sm sm:text-[15px]	">Miễn phí</h5>
                                </div>
                                <div className="max-sm:block sm:hidden">
                                    <textarea
                                        placeholder="Ghi chú cho dược sỹ (ví dụ: hãy gọi trước khi giao nhé!)"
                                        className="h-20 w-full rounded-xl border p-3 text-sm text-slate-400 outline-0"
                                        name="message"
                                        type="text"
                                        onChange={formik.handleChange}
                                        value={formik.values.message}
                                    ></textarea>
                                </div>
                            </div>
                            <div className="items-center justify-between max-sm:flex sm:border-t">
                                <div className="mt-2 flex justify-between py-3 max-sm:flex-col">
                                    <h4 className="text-ms font-semibold">Thành tiền</h4>
                                    <h4
                                        className="flex items-center text-base font-bold text-blue-700 "
                                        onClick={() => setShowModal(!showModal)}
                                    >
                                        {convertNumberToPrice(totalPrice - totalPriceByVoucher)}đ
                                        <span
                                            className={`ml-2 duration-300 sm:hidden ${
                                                showModal ? 'rotate-180' : 'rotate-0'
                                            }`}
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth={2}
                                                stroke="black"
                                                className="h-5 w-5"
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
                                <div className="max-sm:hidden sm:block">
                                    <textarea
                                        placeholder="Ghi chú cho dược sỹ (ví dụ: hãy gọi trước khi giao nhé!)"
                                        className="h-20 w-full rounded-xl border p-3 text-sm text-slate-400 outline-0"
                                        name="message"
                                        type="text"
                                        onChange={formik.handleChange}
                                        value={formik.values.message}
                                    ></textarea>
                                </div>
                                <button
                                    type="submit"
                                    className="mt-3 h-fit w-full cursor-pointer rounded-3xl bg-sky-600 text-center text-sm text-white max-sm:w-5/12 max-sm:py-4 sm:py-2 "
                                >
                                    Đặt hàng (2)
                                </button>
                            </div>
                            <div className="mt-5 text-center max-sm:hidden">
                                <h6 className="text-xs text-slate-400">Nếu tiến hành đặt hàng, bạn đồng ý</h6>
                                <h6 className="text-xs	font-semibold text-slate-600 underline decoration-solid">
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
