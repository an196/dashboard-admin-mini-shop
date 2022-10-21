import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { FiSettings } from 'react-icons/fi';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';
import { useStateContext } from '../context/ContextProvider';

import '../App.css';
import { Navbar, Footer, Sidebar, ThemeSettings } from '../components';
import {
    Ecommerce,
    Orders,
    Calendar,
    Employees,
    Stacked,
    Pyramid,
    Customers,
    Kanban,
    Line,
    Area,
    Bar,
    Pie,
    Financial,
    ColorPicker,
    ColorMapping,
    Editor,
    Login,
    Products,
    Category,
    Banner
} from '../pages';

import CreateEmployee from '../features/employee/CreateEmployee';
import CreateProduct from '../features/product/CreateProduct';
import UpdateProduct from '../features/product/UpdateProduct';

function Dashboard() {
    const { activeMenu, themeSettings, setThemeSettings, currentColor, currentMode } = useStateContext();

    return (
        <div className={currentMode === 'Dark' ? 'dark' : ''}>
            <div className='flex relative dark:bg-main-dark-bg'>
                <div className='fixed right-4 bottom-4' style={{ zIndex: 1000 }}>
                    <TooltipComponent
                        content='Settings'
                        position='Top'
                        style={{ background: currentColor, borderRadius: '50%' }}
                    >
                        <button
                            type='button'
                            className=' sm:text-3xl text-white p-3 hover:drop-shadow-xl hover:rotate-90 duration-700text-xl'
                            onClick={() => setThemeSettings(true)}
                        >
                            <FiSettings />
                        </button>
                    </TooltipComponent>
                </div>
                {activeMenu ? (
                    <div className='w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white'>
                        <Sidebar />
                    </div>
                ) : (
                    <div className='w-0 dark:bg-secondary-dark-bg'>
                        <Sidebar />
                    </div>
                )}
                <div
                    className={`dark:bg-main-dark-bg bg-main-bg min-h-screen w-full ${
                        activeMenu ? 'md:ml-72' : 'flex-2'
                    }`}
                >
                    <div className='fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full'>
                        <Navbar />
                    </div>

                    <div>
                        {themeSettings && <ThemeSettings />}
                        <Routes>
                            {/* Dashboard */}
                            <Route path='/dashboard' element={<Ecommerce />} />
                            <Route path='/ecommerce' element={<Ecommerce />} />

                            {/* Pages */}
                            <Route path='/orders' element={<Orders />} />
                            <Route path='/employees' element={<Employees />} />
                            <Route path='/employees/add' element={<CreateEmployee />} />
                            <Route path='/customers' element={<Customers />} />
                            <Route path='/products' element={<Products />} />
                            <Route path='/products/add' element={<CreateProduct />} />
                            <Route path='/products/update/:id' element={<UpdateProduct />} />
                            <Route path='/categories' element={<Category />} />
                            <Route path='/banner' element={<Banner />} />

                            {/* Apps */}
                            {/* <Route path='/kanban' element={<Kanban />} />
                            <Route path='/editor' element={<Editor />} />
                            <Route path='/calendar' element={<Calendar />} />
                            <Route path='/color-picker' element={<ColorPicker />} /> */}
                        </Routes>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
