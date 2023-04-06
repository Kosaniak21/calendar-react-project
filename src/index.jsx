import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';

const reactapp = document.createElement('div');
document.body.appendChild(reactapp);

ReactDOM.render(<App />, reactapp);

// Область повина вставляти всі дані по місцю нажаття мишки:
// 1. передати дані до календаря з hour (подивитись чи можна зробити через контекст якщо ні то через колбек)
// подумати чи переробити все на контекст
// 2. якщо клік був зроблений на event.target === button то передати одні дані,якщо на дів то інші
