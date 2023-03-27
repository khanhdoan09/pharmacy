import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Navigate, NavLink } from 'react-router-dom';

import Famous from './Famous';
import Seller from './Seller';
import Protect from './Protect';
import Object from './Object';
import View from './View';
import Resistance from './Resistance';
import EasyBuy from './EasyBuy';
import HealthCheck from './HealthCheck';
import SearchHome from './SearchHome';
import SliderHome from '~/components/SliderHome';
import Fade from 'react-reveal/Fade';
import Commit from './Commit';
import BranchPharmacy from './BranchPharmacy';
import { useEffect } from 'react';
// import * as searchServices from '~/services/searchServices';
import * as medicineServices from '~/services/medicineServices';

function Home() {
    useEffect(() => {
        const fetchApi = async () => {
            const result = await medicineServices.getAllMedicines();
            console.log(result);
        };

        fetchApi();
    }, []);

    return (
        <div className="app overflow-hidden">
            <SliderHome />
            {/* search */}
            <SearchHome />

            {/* easy buy  */}
            <Fade bottom>
                <EasyBuy />
            </Fade>

            {/* banner ads */}
            <Fade bottom duration={1500}>
                <div className="max-w-[1200px] mx-auto my-0 2xl:px-1 xl:px-1 lg:px-2 md:px-2 sm:px-4 xs:px-4">
                    <NavLink to="">
                        <img
                            src="https://nhathuoclongchau.com.vn/frontend_v3/images/chuyen-trang-ung-thu/banner-home.png"
                            alt="banner"
                            className="rounded-lg w-full"
                        />
                    </NavLink>
                </div>
            </Fade>

            {/* famous */}

            <Fade bottom duration={1500}>
                <Famous />
            </Fade>

            {/* Resistance */}
            <Fade bottom duration={1500}>
                <Resistance />
            </Fade>

            {/* best seller */}
            <Fade bottom duration={1500}>
                <Seller />
            </Fade>

            {/* protect  */}
            <Fade bottom duration={1500}>
                <Protect />
            </Fade>

            {/* product by object  */}
            <Fade bottom duration={1500}>
                <Object />
            </Fade>

            {/* Kiểm tra sức khoẻ */}
            <Fade bottom duration={1500}>
                <HealthCheck />
            </Fade>

            {/* view  */}
            <View />

            <Commit />

            <Fade bottom duration={1500}>
                <BranchPharmacy />
            </Fade>
        </div>
    );
}

export default Home;
