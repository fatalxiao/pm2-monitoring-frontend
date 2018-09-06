import pathToRegexp from 'path-to-regexp';
import {configureRoutes} from 'src/config.routes';

let routes = configureRoutes();

function match(pathName, routeList = routes) {

    if (!pathName || !routeList || routeList.length < 1) {
        return;
    }

    for (let route of routeList) {
        if (route.path && pathToRegexp(route.path, [], {}).test(pathName)) {
            return route;
        } else if (route.routes && route.routes.length > 0) {

            const result = match(pathName, route.routes);

            if (!result) {
                continue;
            }

            return result;

        }
    }

    return;

}

function isMatched(pathName) {
    return !!match(pathName);
}

export default {
    isMatched
};