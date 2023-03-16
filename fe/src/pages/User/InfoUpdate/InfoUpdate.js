import { Formik, Form, useFormik } from 'formik';
import * as Yup from 'yup';
import { useState } from 'react';
import useBodyScrollLock from '~/hooks/useBodyScrollLock';

function InfoUpdate() {
    const [showModal, setShowModal] = useState(false);
    const [lock, toggle] = useBodyScrollLock();

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            phone: '',
            birthday: '',
        },
        validationSchema: Yup.object({
            name: Yup.string().required('Thông tin bắt buộc').min(4, 'Tên quá ngắn').max(16, 'Tên quá dài'),
            email: Yup.string().email('Email không hợp lệ').required('Thông tin bắt buộc'),
            phone: Yup.string().required('Thông tin bắt buộc'),
            birthday: Yup.string().required('Thông tin bắt buộc'),
        }),
        onSubmit: (values) => {
            console.log(values);
        },
    });
    return (
        <div className="-mt-10 flex flex-col items-center justify-center ">
            <div className="flex h-[120px] w-[120px] justify-center rounded-full bg-[#b6c0ce]">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="h-w-20 w-20 text-[#fff] "
                >
                    <path
                        fillRule="evenodd"
                        d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
                        clipRule="evenodd"
                    />
                </svg>
            </div>
            <p className="mt-3 text-xl font-bold text-[#072d94]">Danh</p>
            <p className="mt-1 text-base text-[#334155]">032xxxxx79</p>
            <button
                className="mt-1 flex items-center rounded-xl border border-[#d8e0e8] bg-transparent px-4 py-1 leading-6 text-[#52637a] hover:bg-[#718198] hover:text-[#fff]"
                onClick={() => {
                    toggle();
                    setShowModal(!showModal);
                }}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="mr-1 h-6 w-6"
                >
                    <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32l8.4-8.4z" />
                    <path d="M5.25 5.25a3 3 0 00-3 3v10.5a3 3 0 003 3h10.5a3 3 0 003-3V13.5a.75.75 0 00-1.5 0v5.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5V8.25a1.5 1.5 0 011.5-1.5h5.25a.75.75 0 000-1.5H5.25z" />
                </svg>
                <span>Chỉnh sửa</span>
            </button>

            {showModal ? (
                <Formik initialValues={formik.initialValues} onSubmit={formik.handleSubmit}>
                    <Form className="modal-update-info fixed left-0 top-0 h-full w-full animate-fadeBottomMobile">
                        <div
                            className="overlay fixed inset-0 h-screen w-screen bg-[#020202] opacity-25"
                            onClick={() => {
                                toggle();
                                setShowModal(!showModal);
                            }}
                        ></div>

                        <div className="absolute top-1/2 left-1/2 w-9/12 max-w-xl flex-auto -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-[#fff] p-6">
                            <div className="mb-2 flex flex-col">
                                <h3 className="text-xl font-bold">Chỉnh sửa thông tin</h3>
                            </div>
                            <div className="mb-2 flex flex-col">
                                <label htmlFor="name" className="text-base">
                                    Họ và tên
                                </label>
                                <input
                                    name="name"
                                    id="name"
                                    type="text"
                                    className={
                                        formik.touched.name && formik.errors.name
                                            ? 'mb-1 h-10 rounded-md border border-[#ff4742] px-4 py-1 outline-0'
                                            : 'mb-1 h-10 rounded-md border border-[#bebebe] px-4 py-1 outline-0'
                                    }
                                    onChange={formik.handleChange}
                                    value={formik.values.name}
                                    placeholder="ví dụ: lê minh chánh"
                                />
                                {formik.touched.name && formik.errors.name ? (
                                    <span className="flex items-center text-sm font-bold text-[#ff4742]">
                                        {formik.errors.name}
                                    </span>
                                ) : null}
                            </div>
                            <div className="mb-1 flex flex-col">
                                <label htmlFor="email" className="text-base">
                                    Địa chỉ email
                                </label>
                                <input
                                    name="email"
                                    id="email"
                                    type="text"
                                    className={
                                        formik.touched.email && formik.errors.email
                                            ? 'mb-1 h-10 rounded-md border border-[#ff4742] px-4 py-1 outline-0'
                                            : 'mb-1 h-10 rounded-md border border-[#bebebe] px-4 py-1 outline-0'
                                    }
                                    onChange={formik.handleChange}
                                    value={formik.values.email}
                                    placeholder="ví dụ: abc@gmail.com"
                                />
                                {formik.touched.email && formik.errors.email ? (
                                    <span className="flex items-center text-sm font-bold text-[#ff4742]">
                                        {formik.errors.email}
                                    </span>
                                ) : null}
                            </div>
                            <div className="mb-1 flex flex-col">
                                <label htmlFor="phone" className="text-base">
                                    Số điện thoại
                                </label>
                                <input
                                    name="phone"
                                    id="phone"
                                    type="text"
                                    className={
                                        formik.touched.phone && formik.errors.phone
                                            ? 'mb-1 h-10 rounded-md border border-[#ff4742] px-4 py-1 outline-0'
                                            : 'mb-1 h-10 rounded-md border border-[#bebebe] px-4 py-1 outline-0'
                                    }
                                    onChange={formik.handleChange}
                                    value={formik.values.phone}
                                />
                                {formik.touched.phone && formik.errors.phone ? (
                                    <span className="flex items-center text-sm font-bold text-[#ff4742]">
                                        {formik.errors.phone}
                                    </span>
                                ) : null}
                            </div>
                            <div className="mb-1 flex flex-col">
                                <label htmlFor="date" className="text-base">
                                    Ngày sinh
                                </label>
                                <input
                                    name="birthday"
                                    id="birthday"
                                    type="date"
                                    className={
                                        formik.touched.birthday && formik.errors.birthday
                                            ? 'mb-1 h-10 rounded-md border border-[#ff4742] px-4 py-1 outline-0'
                                            : 'mb-1 h-10 rounded-md border border-[#bebebe] px-4 py-1 outline-0'
                                    }
                                    onChange={formik.handleChange}
                                    value={formik.values.birthday}
                                />
                                {formik.touched.birthday && formik.errors.birthday ? (
                                    <span className="flex items-center text-sm font-bold text-[#ff4742]">
                                        {formik.errors.birthday}
                                    </span>
                                ) : null}
                            </div>
                            <button
                                type="submit"
                                className="mx-auto mt-8 flex rounded-xl bg-[#016cc9] px-12 py-2 font-bold uppercase text-[#fff]"
                                onClick={() => {
                                    setTimeout(() => {
                                        toggle();
                                        setShowModal(!showModal);
                                    }, 1000);
                                }}
                            >
                                Cập nhật
                            </button>
                        </div>
                    </Form>
                </Formik>
            ) : null}
        </div>
    );
}

export default InfoUpdate;
