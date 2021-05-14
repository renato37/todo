import { routerMiddleware } from 'connected-react-router';
import {
    applyMiddleware,
    createStore,
} from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import { appMiddleware } from './middleware/app';
import {rootReducer, rootSaga, history} from './root';
import { persistStore, persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage'
//import {quizReducer} from './quiz/reducer'

const sagaMiddleware = createSagaMiddleware();

const composeEnhancers = composeWithDevTools({
    serialize: true,
});
const persistConfig = {
    key: 'seventhread-frontend-root-reducer-key1234$$23412',
    storage,
  }
  
const persistedRootReducer = persistReducer(persistConfig, rootReducer);
export const store = createStore(
    persistedRootReducer,
    {},
    composeEnhancers(applyMiddleware(
        sagaMiddleware,
        routerMiddleware(history),
        appMiddleware, 
    ))
);
export const persistor = persistStore(store);

sagaMiddleware.run(rootSaga);
