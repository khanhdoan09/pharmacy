import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { publicRoutes } from './routes';
import { Fragment, useEffect } from 'react';
import { DefaultLayout } from '~/layouts';
import LoadToTop from './components/LoadToTop';
import * as categoryService from '~/services/categoryService';
import * as fieldService from '~/services/fieldService';
import { useDispatch } from 'react-redux';
import { fieldList } from './redux/fieldSlice';
import { categoryList } from './redux/categorySlice';
function App() {
    useEffect(() => {
        window.history.scrollRestoration = 'manual';
    }, []);
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchApi = async () => {
            const resultAllField = await fieldService.getAllField();
            const getCategories = await categoryService.getCategories();
            console.log(getCategories?.data);
            dispatch(fieldList(resultAllField));
            dispatch(categoryList(getCategories));
        };
        fetchApi();
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
