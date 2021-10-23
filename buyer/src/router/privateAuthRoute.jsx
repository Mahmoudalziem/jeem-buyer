import React from 'react'
import { Route, Redirect } from 'react-router'
import {useSelector} from 'react-redux'

 const AuthRoute = ({ component: Component, ...res }) => {

    return (
        <Route {...res} strict sensitive render={
            (props) => {
                if (res.status) {
                    switch (res.role) {
                        case 'seller':
                            return (
                            <Redirect to={{
                                pathname: '/dashboard',
                                state: {
                                    from: props.location
                                }
                            }} />
                            );
                        case 'buyer':
                            return (
                            <Redirect to={{
                                pathname: '/profile',
                                state: {
                                    from: props.location
                                }
                            }} />
                            )
                        default: 
                            return false
                    }
                } else {
                    
                    return (
                        <Component {...props} />
                    )
                }
            }
        } />
    )
}

const PrivateRoute = ({ component: Component, ...res }) => {

    const pathname = res.path

        const RouteComponent = (props) => {
            return (
                (pathname !== props.url) ? (
                    <Redirect to={{
                        pathname: '/',
                        state: {
                            from: props.location
                        }
                    }} />
                ) : <Component {...props} />
            )
        }

    return (
        <Route {...res} strict sensitive render={
            (props) => {

                if (res.status) {

                    switch (res.role) {
                        case 'seller':
                            return <RouteComponent {...props} url="/dashboard"/>
                        case 'buyer':
                        return <RouteComponent {...props} url="/profile"/>
                        default:
                            return (
                                <Redirect to={{
                                    pathname: '/',
                                    state: {
                                        from: props.location
                                    }
                                }} />
                            )

                    }
                } else {

                    return (
                        <Redirect to={{
                            pathname: '/',
                            state: {
                                from: props.location
                            }
                        }} />
                    )
                }
            }
        } />
    )
}

export {AuthRoute,PrivateRoute};