import { NavLink } from 'react-router-dom';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';

import Fade from 'react-reveal/Fade';
import SliderHome from '~/components/SliderHome';
import BranchPharmacy from './BranchPharmacy';
import Commit from './Commit';
import EasyBuy from './EasyBuy';
import Famous from './Famous';
import HealthCheck from './HealthCheck';
import Object from './Object';
import Protect from './Protect';
import Resistance from './Resistance';
import SearchHome from './SearchHome';
import Seller from './Seller';
import View from './View';
import { useEffect } from 'react';
import * as medicineService from '~/services/medicineService';
import { useDispatch } from 'react-redux';
import { setMedicines } from '~/redux/medicineSlice';

function Home() {
    const dispatch = useDispatch()
    useEffect(() => {
        const fetchApi = async () => {
            const medicines = await medicineService.getMedicines();
            dispatch(setMedicines(medicines))
        };
        fetchApi()
    }, [dispatch]);

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
                <div className="mx-auto my-0 max-w-[1200px] xs:px-4 sm:px-4 md:px-2 lg:px-2 xl:px-1 2xl:px-1">
                    <NavLink to="">
                        <img
                            src="https://cdn.nhathuoclongchau.com.vn/unsafe/1459x148/https://cms-prod.s3-sgn09.fptcloud.com/Section_PC_1176x120_B_1_0885c8cd23.png"
                            alt="banner"
                            className="w-full rounded-lg"
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
