import ac from 'components/AsyncComponent';

export function configureRoutes(store) {

    return [{
        component: ac(() => import('containers/AppRoot'), store),
        routes: [{
            path: '/app',
            component: ac(() => import('containers/app/App'), store),
            routes: [{
                path: '/app/process/:id',
                component: ac(() => import('containers/app/modules/process/Process'), store)
            }]
        }]
    }];

}

export const DEFAULT_ROUTE = '/app/dashboard';