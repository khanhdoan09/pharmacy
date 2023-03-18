import HeaderSearch from '~/layouts/components/HeaderSearch';
import Navigation from '~/layouts/components/Navigation';
import Footer from '~/layouts/components/Footer';

function HeaderSearchLayout({ children }) {
    return (
        <div className="wrapper">
            <div className="header">
                <div className="h-[84px] bg-[#016cc9]">
                    <HeaderSearch />
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

export default HeaderSearchLayout;
