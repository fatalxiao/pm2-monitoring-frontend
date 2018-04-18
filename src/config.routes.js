import ac from 'components/AsyncComponent';

export function configureRoutes(store) {

    return [{
        component: ac(() => import('containers/AppRoot'), store),
        routes: [{
            path: '/process/:id',
            component: ac(() => import('containers/process/Process'), store)
        }]
    }];

}

export const DEFAULT_ROUTE = '/';