import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import { combineReducers } from "@reduxjs/toolkit";
// slices
import mailReducer from './slices/mail';
import chatReducer from './slices/chat';
import productReducer from './slices/product';
import calendarReducer from './slices/calendar';
import kanbanReducer from './slices/kanban';
import mediaUserReducer from './slices/group.user';
import mediaRoleReducer from './slices/group.role';
import mediaCategoryReducer from './slices/group.category';
import mediaTagReducer from './slices/group.tag';
import mediaCommentReducer from './slices/group.comment';
import mediaPostReducer from './slices/group.post';
import mediaCacheReducer from './slices/group.cache';

const rootPersistConfig = {
    key: 'root',
    storage,
    keyPrefix: 'redux-',
    whitelist: [],
};

const productPersistConfig = {
    key: 'product',
    storage,
    keyPrefix: 'redux-',
    whitelist: ['sortBy', 'checkout'],
};

const rootReducer = combineReducers({
    mail: mailReducer,
    chat: chatReducer,
    calendar: calendarReducer,
    kanban: kanbanReducer,
    product: persistReducer(productPersistConfig, productReducer),
    mediaUser: persistReducer({ ...rootPersistConfig, key: "group-user" }, mediaUserReducer),
    mediaRole: persistReducer({ ...rootPersistConfig, key: "group-role" }, mediaRoleReducer),
    mediaCategory: persistReducer({ ...rootPersistConfig, key: "group-category" }, mediaCategoryReducer),
    mediaTag: persistReducer({ ...rootPersistConfig, key: "group-tag" }, mediaTagReducer),
    mediaComment: persistReducer({ ...rootPersistConfig, key: "group-comment" }, mediaCommentReducer),
    mediaPost: persistReducer({ ...rootPersistConfig, key: "group-post" }, mediaPostReducer),
    mediaCache: persistReducer({ ...rootPersistConfig, key: "group-cache" }, mediaCacheReducer),
  });
  
  export { rootPersistConfig, rootReducer };