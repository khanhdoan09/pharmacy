import { useNavigate } from 'react-router-dom';

function CartEmpty() {
    const navigate = useNavigate();
    return (
        <div className="flex w-full flex-col items-center border">
            <img width={250} src="https://nhathuoclongchau.com.vn/estore-images/empty-cart.png" alt="" />
            <h3 className="font-bold">Chưa có sản phẩm nào trong giỏ hàng</h3>
            <h3 className="my-5">Cùng mua sắm hàng ngàn sản phẩm tại nhà thuốc FPT Long Châu nhé!</h3>
            <button
                onClick={() => {
                    navigate('/');
                }}
                className="border-radius cursor-pointer rounded-full bg-blue-600 px-12 py-2 text-white"
            >
                Mua Hàng
            </button>
        </div>
    );
}

export default CartEmpty;
