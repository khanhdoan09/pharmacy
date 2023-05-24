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
                    <img src="https://firebasestorage.googleapis.com/v0/b/pharmacy-969d7.appspot.com/o/slider%2Fimg1.png?alt=media&token=cdfe93df-4c31-4e3a-b8c9-f0502ea30021" alt="s1img" className="2xl:h-[550px] xl:h-[550px] lg:h-[400px] w-full object-cover outline-none" />
                </div>
                <div className="outline-none">
                    <img src="https://firebasestorage.googleapis.com/v0/b/pharmacy-969d7.appspot.com/o/slider%2Fimg2.png?alt=media&token=dd0663b9-657d-4655-b8af-202cb4b808da" alt="s2img" className="2xl:h-[550px] xl:h-[550px] lg:h-[400px] w-full object-cover outline-none" />
                </div>
                <div className="outline-none">
                    <img src="https://firebasestorage.googleapis.com/v0/b/pharmacy-969d7.appspot.com/o/slider%2Fimg3.png?alt=media&token=fcfc2b66-d553-4e3f-bce8-3cc45b660696" alt="s3img" className="2xl:h-[550px] xl:h-[550px] lg:h-[400px] w-full object-cover outline-none" />
                </div>
                <div className="outline-none">
                    <img src="https://firebasestorage.googleapis.com/v0/b/pharmacy-969d7.appspot.com/o/slider%2Fimg4.png?alt=media&token=74ed5d21-e198-49ce-8bdf-e825eddee5c7" alt="s4img" className="2xl:h-[550px] xl:h-[550px] lg:h-[400px] w-full object-cover outline-none" />
                </div>
                <div className="outline-none">
                    <img src="https://firebasestorage.googleapis.com/v0/b/pharmacy-969d7.appspot.com/o/slider%2Fimg5.png?alt=media&token=76dcf2d8-3fa3-4dc3-aeb0-87ee660089dd" alt="s5img" className="2xl:h-[550px] xl:h-[550px] lg:h-[400px] w-full object-cover ob outline-none" />
                </div>
            </Slider>
        </div>
    );
}

export default SliderHome;
