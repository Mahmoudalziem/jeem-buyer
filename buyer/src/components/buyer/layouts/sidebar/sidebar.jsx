import React from 'react'
import {Link,withRouter} from 'react-router-dom'
import { useTranslation,Trans } from "react-i18next";

/// icons

import AppsIcon from '@material-ui/icons/Apps';
import PermPhoneMsgIcon from '@material-ui/icons/PermPhoneMsg';
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';
import FavoriteIcon from '@material-ui/icons/Favorite';
import SettingsIcon from '@material-ui/icons/Settings';
import LockOpenIcon from '@material-ui/icons/LockOpen';

const Sidebar = (props) => {

    const {t} = useTranslation();

    const  isPathActive = (path) => {

        return props.location.pathname === path ? true : false;
      }

    return(
        <div className="profile-menu">
            <Link to="/profile/orders" className={isPathActive('/profile/orders') || isPathActive('/profile') ? 'active' : ''}>
            <AppsIcon />
            <p>{t('ORDERS')}</p>
            </Link>
            <Link to="/profile/message" className={isPathActive('/profile/message') ? 'active' : ''}>
            <PermPhoneMsgIcon />
            <p>{t('MESSAGES')}</p>
            </Link>
            <Link to="/profile/meeting" className={isPathActive('/profile/meeting') ? 'active' : ''}>
            <MeetingRoomIcon />
            <p>{t('MEETING')}</p>
            </Link>
            <Link to="/profile/negotiate" className={isPathActive('/profile/negotiate') ? 'active' : ''}>
            <MeetingRoomIcon />
            <p><Trans>Negotiate</Trans></p>
            </Link>
            <Link to="/profile/wishlist" className={isPathActive('/profile/wishlist') ? 'active' : ''}>
            <FavoriteIcon />
            <p>{t('WISHLIST')}</p>
            </Link>
            <Link to="/profile/settings" className={isPathActive('/profile/settings') ? 'active' : ''}>
            <SettingsIcon />
            <p><Trans>Change Settings</Trans></p>
            </Link>
            <Link to="/profile/password" className={isPathActive('/profile/password') ? 'active' : ''}>
            <LockOpenIcon />
            <p><Trans>CHANGE_PASSWORD</Trans></p>
            </Link>
        </div>
    )
}

export default withRouter(Sidebar);