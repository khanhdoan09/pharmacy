import Slider from 'react-slick';
import s1 from '~/assets/img/slider/s1.png';
import s2 from '~/assets/img/slider/s2.png';
import s3 from '~/assets/img/slider/s3.png';
import s4 from '~/assets/img/slider/s4.png';
import s5 from '~/assets/img/slider/s5.png';
import s6 from '~/assets/img/slider/s6.png';

function SliderHome() {
    const settings = {
        dots: true,
        infinite: true,
        autoplay: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };
    return (
        // cs:hidden xs:hidden sm:hidden md:block lg:block xl:block 2xl:block
        <div className=" ">
            <Slider {...settings}>
                <div className="outline-none">
                    <img src={s1} alt="s1img" className="2xl:h-[475px] xl:h-[475px] lg:h-[400px] w-full object-cover outline-none" />
                </div>
                <div className="outline-none">
                    <img src={s2} alt="s2img" className="2xl:h-[475px] xl:h-[475px] lg:h-[400px] w-full object-cover outline-none" />
                </div>
                <div className="outline-none">
                    <img src={s3} alt="s3img" className="2xl:h-[475px] xl:h-[475px] lg:h-[400px] w-full object-cover outline-none" />
                </div>
                <div className="outline-none">
                    <img src={s4} alt="s4img" className="2xl:h-[475px] xl:h-[475px] lg:h-[400px] w-full object-cover outline-none" />
                </div>
                <div className="outline-none">
                    <img src={s5} alt="s5img" className="2xl:h-[475px] xl:h-[475px] lg:h-[400px] w-full object-cover outline-none" />
                </div>
                <div className="outline-none">
                    <img src={s6} alt="s6img" className="2xl:h-[475px] xl:h-[475px] lg:h-[400px] w-full object-cover outline-none" />
                </div>
            </Slider>
        </div>
    );
}

export default SliderHome;
