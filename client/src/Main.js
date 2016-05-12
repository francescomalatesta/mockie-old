'use strict';

import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'

import ItemsReducer from './Reducers/Items'
import Generator from './Components/Presentational/Generator'

let store = createStore(ItemsReducer);

render(
    <Provider store={store}>
        <Generator />
    </Provider>,
    document.getElementById('application')
);
