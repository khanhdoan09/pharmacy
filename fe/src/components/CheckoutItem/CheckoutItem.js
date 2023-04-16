import { convertNumberToPrice } from '~/utils/currency';
function CheckoutItem({ avatar, medicine, quantity, unit }) {
    return (
        <div className="flex items-center p-3">
            <div className="flex items-center rounded-lg border p-1">
                <img width={50} src={avatar}></img>
            </div>
            <div className="ml-5 flex w-4/5 flex-wrap items-center justify-between">
                <h6>{medicine?.name}</h6>
                <div className="flex justify-between pt-2 max-sm:w-full">
                    <span className="mr-5 font-semibold">{convertNumberToPrice(quantity * unit?.price)}đ</span>
                    <span>
                        x{quantity} {unit?.name}
                    </span>
                </div>
            </div>
        </div>
    );
}

export default CheckoutItem;
