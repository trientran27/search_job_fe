
const ROOTS_AUTH = '/auth';
const ROOTS_DASHBOARD = '/dashboard';

function path(root, sublink) {
    return `${root}${sublink}`;
}


export const PATH_DASHBOARD = {
    root: ROOTS_DASHBOARD,
    group: {
        users: path(ROOTS_DASHBOARD, '/group/users')
    },
    general: {
        analytics: path(ROOTS_DASHBOARD, '/analytics')
    },
    user: {
        root: path(ROOTS_DASHBOARD, '/user'),
        list: path(ROOTS_DASHBOARD, '/user/list'),
        new: path(ROOTS_DASHBOARD, '/user/new'),
        edit: (id) => path(ROOTS_DASHBOARD, `/user2/${id}/edit/info`),
        view: (id) => path(ROOTS_DASHBOARD, `/user2/${id}/view`)
    },
    cateJob: {
        root: path(ROOTS_DASHBOARD, '/cateJob'),
        list: path(ROOTS_DASHBOARD, 'cateJob/list'),
        new: path(ROOTS_DASHBOARD, '/cateJob/new'),
        edit: (id) => path(ROOTS_DASHBOARD, `/cateJob/${id}/edit`),
        view: (id) => path(ROOTS_DASHBOARD, `/cateJob/${id}/view`)
    },
}