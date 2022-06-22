import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { ContextProvider } from './context/ContextProvider';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { store } from './app/store';
import { Provider } from 'react-redux';

ReactDOM.render(
    <ContextProvider>
        <Provider store={store}>
            <BrowserRouter>
                <Routes>
                    <Route path='/*' element={<App />} />
                </Routes>
            </BrowserRouter>
        </Provider>
    </ContextProvider>,
    document.getElementById('root'),
);
