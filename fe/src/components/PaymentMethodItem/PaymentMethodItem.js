function PaymentMethodItem({ urlImg, name }) {
    return (
        <div className="flex items-center">
            <div className="mx-3">
                <img width={38} src={urlImg}></img>
            </div>
            <p htmlFor="vnpay" className="text-md">
                {name}
            </p>
        </div>
    );
}

export default PaymentMethodItem;
