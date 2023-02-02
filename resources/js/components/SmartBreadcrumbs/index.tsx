import React, { useEffect, useLayoutEffect, useState } from "react";
import { matchPath, useLocation, useNavigate } from "react-router-dom";
import { BREADCRUMBS, PATHS } from "Routes/index";
import routes from "Routes/index";
import { Link } from "react-router-dom";
import { Text, Breadcrumbs } from "@mantine/core";

function useMatchedRoute() {
    const { pathname } = useLocation();

    let routeObj: Array<any> = routes(true);
    if(!routeObj) return null;
    if(!routeObj[0]) return null;
    if(!routeObj[0].children) return null;

    const allRoutes = routeObj[0].children;

    for (const route of allRoutes) {
        if (matchPath({ path: route.path }, pathname)) {
            return route;
        }
    }
    return null;
}

export default function SmartBreadcrumbs() {
    const { guest, authed } = PATHS;
    const [ breadCrumbs, setBreadCrumbs ] = useState<any>([]);
    const navigate = useNavigate();
    const location = useLocation();
    const matchedRoute = useMatchedRoute();

    useLayoutEffect(() => {
        console.log(matchedRoute);
        
        if(matchedRoute && matchedRoute.path !== '*' && matchedRoute.path !== '/') {

            // find the key that matches the route
            const routeKey = Object.keys(authed).find(key => authed[key] === matchedRoute.path);
            if(!routeKey) {
                setBreadCrumbs([]);
                return;
            }
            // find the breadcrumb that matches the route
            const matchedBreadCrumbs = BREADCRUMBS.authed[routeKey];
            if(!matchedBreadCrumbs) {
                setBreadCrumbs([]);
                return;
            }

            const crumbs = matchedBreadCrumbs.map((item: any, index: any) => (
                item.href ? <Link to={item.href} style={{color: 'grey'}} key={index}>{item.icon ? item.icon : item.title}</Link> : <Text key={index}>{item.title}</Text>
            ));
            setBreadCrumbs(crumbs);
        }
        else {
            setBreadCrumbs([]);
        }
    }, [location]);

    return (
        breadCrumbs.length ? <Breadcrumbs className="breadcrumb-container">{breadCrumbs}</Breadcrumbs> : <></>
    );
};