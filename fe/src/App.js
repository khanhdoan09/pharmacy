import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { publicRoutes } from './routes';
import { Fragment, useEffect } from 'react';
import { DefaultLayout } from '~/layouts';
import LoadToTop from './components/LoadToTop';

function App() {
    useEffect(() => {
        window.history.scrollRestoration = 'manual';
    }, []);
    return (
        <Router>
            <LoadToTop>
                <div className="App">
                    <Routes>
                        {publicRoutes.map((route, index) => {
                            const Page = route.component;
                            let Layout = DefaultLayout;

                            if (route.layout) {
                                Layout = route.layout;
                            } else if (route.layout === null) {
                                Layout = Fragment;
                            }
                            return (
                                <Route
                                    key={index}
                                    path={route.path}
                                    element={
                                        <Layout>
                                            <Page />
                                        </Layout>
                                    }
                                />
                            );
                        })}
                    </Routes>
                </div>
            </LoadToTop>
        </Router>
    );
}

export default App;
