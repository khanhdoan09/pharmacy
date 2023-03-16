import Header from '~/layouts/components/Header';
import Footer from '~/layouts/components/Footer';
import Navigation from '~/layouts/components/Navigation';
import { useEffect } from 'react';

function DefaultLayout({ children }) {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    return (
        <div className="wrapper">
            <div className="header">
                <div className="h-[84px] bg-[#016cc9]">
                    <Header />
                </div>

                <div className="navigation">
                    <Navigation />
                </div>
            </div>
            <div className="mb-auto h-full ">{children}</div>
            <div className="mt-10 h-full ">
                <Footer />
            </div>
        </div>
    );
}

export default DefaultLayout;
