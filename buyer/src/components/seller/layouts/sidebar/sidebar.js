import React, { Component } from 'react';
import { Link,withRouter } from 'react-router-dom';
import { Collapse } from 'react-bootstrap'
import { Trans } from 'react-i18next';
import {connect} from 'react-redux'

/// Images

import logo from '../../../../assets/images/logo/logo.svg'

class Sidebar extends Component {
  state = {};

  toggleMenuState(menuState) {
    if (this.state[menuState]) {
      this.setState({ [menuState]: false });
    } else if (Object.keys(this.state).length === 0) {
      this.setState({ [menuState]: true });
    } else {
      Object.keys(this.state).forEach(i => {
        this.setState({ [i]: false });
      });
      this.setState({ [menuState]: true });
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      this.onRouteChanged();
    }
  }

  onRouteChanged() {
    document.querySelector('#sidebar').classList.remove('active');
    Object.keys(this.state).forEach(i => {
      this.setState({ [i]: false });
    });

    const dropdownPaths = [
      { path: '/seller', state: 'appsMenuOpen' },
      { path: '/dashboard/product', state: 'productMenuOpen' },
      { path: '/dashboard/subseller', state: 'subsellerMenuOpen' },
      { path: '/dashboard/carousel', state: 'carouselMenuOpen' },
      { path: '/dashboard/meeting', state: 'meetingMenuOpen' },
      { path: '/dashboard/message', state: 'messageMenuOpen' },
      { path: '/dashboard/negotiate', state: 'negotiateMenuOpen' },
      { path: '/dashboard/order', state: 'orderMenuOpen' },
      { path: '/dashboard/invoice', state: 'invoiceMenuOpen' },
      { path: '/dashboard/voucher', state: 'voucherMenuOpen' },
      { path: '/dashboard/chat', state: 'chatMenuOpen' },
      { path: '/dashboard/tag', state: 'tagMenuOpen' },
      { path: '/dashboard/post', state: 'postMenuOpen' },
    ];

    dropdownPaths.forEach((obj => {

      if (this.allowActiveMenu(obj.path)) {

        this.setState({ [obj.state]: true })
      }
    }));

  }
  
  render() {
    return (
      <nav className="sidebar sidebar-offcanvas" id="sidebar">
        <div className="text-center sidebar-brand-wrapper d-flex align-items-center">
          <div className="sidebar-brand brand-logo">
            <a href="/"><img src={logo} alt="logo" /></a>
          </div>
          <div className="sidebar-brand brand-logo-mini pt-3">
            <a href="/"><img src={logo} alt="logo" /></a>
          </div>
        </div>
        <ul className="nav">


          <li className="nav-item nav-profile not-navigation-link">
            <div className="d-flex justify-content-center align-items-start nav-profile-body">
              <div className="profile-image">
                <img src={this.props.image} alt="profile" />
              </div>
              <div className="text-left">
                <p className="profile-name">{this.props.name}</p>
                <small className="designation text-muted text-small">Seller</small>
                <span className="status-indicator online"></span>
              </div>
            </div>
          </li>

          <li className={this.isPathActive('/dashboard') ? 'nav-item active' : 'nav-item'}>
            <Link className="nav-link" to="/dashboard">
              <i className="mdi mdi-television menu-icon"></i>
              <span className="menu-title"><Trans>Dashboard</Trans></span>
            </Link>
          </li>

          <li className={this.allowActiveMenu('/dashboard/product') ? 'nav-item active' : 'nav-item'}>
            <div className={this.state.productMenuOpen ? 'nav-link menu-expanded' : 'nav-link'} onClick={() => this.toggleMenuState('productMenuOpen')} data-toggle="collapse">
              <i className="mdi mdi-home menu-icon"></i>
              <span className="menu-title"><Trans>Products</Trans></span>
              <i className="menu-arrow"></i>
            </div>
            <Collapse in={this.state.productMenuOpen}>
              <ul className="nav flex-column sub-menu">
                <li className="nav-item"> <Link className={this.isPathActive('/dashboard/product') ? 'nav-link active' : 'nav-link'} to="/dashboard/product"><Trans>Products</Trans></Link></li>
                <li className="nav-item"> <Link className={this.isPathActive('/dashboard/product/create') ? 'nav-link active' : 'nav-link'} to="/dashboard/product/create"><Trans>Create Product</Trans></Link></li>
              </ul>
            </Collapse>
          </li>

          <li className={this.allowActiveMenu('/dashboard/subseller') ? 'nav-item active' : 'nav-item'}>
            <div className={this.state.subsellerMenuOpen ? 'nav-link menu-expanded' : 'nav-link'} onClick={() => this.toggleMenuState('subsellerMenuOpen')} data-toggle="collapse">
              <i className="mdi mdi-account-multiple-outline menu-icon"></i>
              <span className="menu-title"><Trans>Subsellers</Trans></span>
              <i className="menu-arrow"></i>
            </div>
            <Collapse in={this.state.subsellerMenuOpen}>
              <ul className="nav flex-column sub-menu">
                <li className="nav-item"> <Link className={this.isPathActive('/dashboard/subseller') ? 'nav-link active' : 'nav-link'} to="/dashboard/subseller"><Trans>Subsellers</Trans></Link></li>
                <li className="nav-item"> <Link className={this.isPathActive('/dashboard/subseller/create') ? 'nav-link active' : 'nav-link'} to="/dashboard/subseller/create"><Trans>Create Subseller</Trans></Link></li>
              </ul>
            </Collapse>
          </li>

          <li className={this.allowActiveMenu('/dashboard/carousel') ? 'nav-item active' : 'nav-item'}>
            <div className={this.state.carouselMenuOpen ? 'nav-link menu-expanded' : 'nav-link'} onClick={() => this.toggleMenuState('carouselMenuOpen')} data-toggle="collapse">
              <i className="mdi mdi-table-large menu-icon"></i>
              <span className="menu-title"><Trans>Carousel</Trans></span>
              <i className="menu-arrow"></i>
            </div>
            <Collapse in={this.state.carouselMenuOpen}>
              <ul className="nav flex-column sub-menu">
                <li className="nav-item"> <Link className={this.isPathActive('/dashboard/carousel') ? 'nav-link active' : 'nav-link'} to="/dashboard/carousel"><Trans>Carousel</Trans></Link></li>
                <li className="nav-item"> <Link className={this.isPathActive('/dashboard/carousel/create') ? 'nav-link active' : 'nav-link'} to="/dashboard/carousel/create"><Trans>Create Carousel</Trans></Link></li>
              </ul>
            </Collapse>
          </li>

          <li className={this.allowActiveMenu('/dashboard/invoice') ? 'nav-item active' : 'nav-item'}>
            <div className={this.state.invoiceMenuOpen ? 'nav-link menu-expanded' : 'nav-link'} onClick={() => this.toggleMenuState('invoiceMenuOpen')} data-toggle="collapse">
              <i className="mdi mdi-assistant menu-icon"></i>
              <span className="menu-title"><Trans>Invoice</Trans></span>
              <i className="menu-arrow"></i>
            </div>
            <Collapse in={this.state.invoiceMenuOpen}>
              <ul className="nav flex-column sub-menu">
                <li className="nav-item"> <Link className={this.isPathActive('/dashboard/invoice') ? 'nav-link active' : 'nav-link'} to="/dashboard/invoice"><Trans>Invoice</Trans></Link></li>
                <li className="nav-item"> <Link className={this.isPathActive('/dashboard/invoice/create') ? 'nav-link active' : 'nav-link'} to="/dashboard/invoice/create"><Trans>Create Invoice</Trans></Link></li>
                <li className="nav-item"> <Link className={this.isPathActive('/dashboard/invoice/print') ? 'nav-link active' : 'nav-link'} to="/dashboard/invoice/print"><Trans>Print Invoice</Trans></Link></li>
              </ul> 
            </Collapse>
          </li>

          <li className={this.allowActiveMenu('/dashboard/voucher') ? 'nav-item active' : 'nav-item'}>
            <div className={this.state.voucherMenuOpen ? 'nav-link menu-expanded' : 'nav-link'} onClick={() => this.toggleMenuState('voucherMenuOpen')} data-toggle="collapse">
              <i className="mdi mdi-assistant menu-icon"></i>
              <span className="menu-title"><Trans>VOUCHER</Trans></span>
              <i className="menu-arrow"></i>
            </div>
            <Collapse in={this.state.voucherMenuOpen}>
              <ul className="nav flex-column sub-menu">
                <li className="nav-item"> <Link className={this.isPathActive('/dashboard/voucher') ? 'nav-link active' : 'nav-link'} to="/dashboard/voucher"><Trans>VOUCHER</Trans></Link></li>
                <li className="nav-item"> <Link className={this.isPathActive('/dashboard/voucher/create') ? 'nav-link active' : 'nav-link'} to="/dashboard/voucher/create"><Trans>Create Voucher</Trans></Link></li>
              </ul>
            </Collapse>
          </li>




          <li className={this.allowActiveMenu('/dashboard/tag') ? 'nav-item active' : 'nav-item'}>
            <div className={this.state.tagMenuOpen ? 'nav-link menu-expanded' : 'nav-link'} onClick={() => this.toggleMenuState('tagMenuOpen')} data-toggle="collapse">
              <i className="mdi mdi-access-point menu-icon"></i>
              <span className="menu-title"><Trans>Tags</Trans></span>
              <i className="menu-arrow"></i>
            </div>
            <Collapse in={this.state.tagMenuOpen}>
              <ul className="nav flex-column sub-menu">
                <li className="nav-item"> <Link className={this.isPathActive('/dashboard/tag') ? 'nav-link active' : 'nav-link'} to="/dashboard/tag"><Trans>Tags</Trans></Link></li>
                <li className="nav-item"> <Link className={this.isPathActive('/dashboard/tag/create') ? 'nav-link active' : 'nav-link'} to="/dashboard/tag/create"><Trans>Create Tag</Trans></Link></li>
              </ul>
            </Collapse>
          </li>

          <li className={this.allowActiveMenu('/dashboard/post') ? 'nav-item active' : 'nav-item'}>
            <div className={this.state.postMenuOpen ? 'nav-link menu-expanded' : 'nav-link'} onClick={() => this.toggleMenuState('postMenuOpen')} data-toggle="collapse">
              <i className="mdi mdi-note-plus menu-icon"></i>
              <span className="menu-title"><Trans>Posts</Trans></span>
              <i className="menu-arrow"></i>
            </div>
            <Collapse in={this.state.postMenuOpen}>
              <ul className="nav flex-column sub-menu">
                <li className="nav-item"> <Link className={this.isPathActive('/dashboard/post') ? 'nav-link active' : 'nav-link'} to="/dashboard/post"><Trans>Posts</Trans></Link></li>
                <li className="nav-item"> <Link className={this.isPathActive('/dashboard/post/create') ? 'nav-link active' : 'nav-link'} to="/dashboard/post/create"><Trans>Create Post</Trans></Link></li>
              </ul>
            </Collapse>
          </li>


          <li className={this.allowActiveMenu('/dashboard/message') ? 'nav-item active' : 'nav-item'}>
            <Link className={this.state.messageMenuOpen ? 'nav-link menu-expanded' : 'nav-link'} to="/dashboard/message">
            <i className="mdi mdi-message-text-outline menu-icon"></i>
              <span className="menu-title">
              <Trans>Messages</Trans>
              </span>
            </Link>
          </li> 

          <li className={this.allowActiveMenu('/dashboard/meeting') ? 'nav-item active' : 'nav-item'}>
            <Link className={this.state.meetingMenuOpen ? 'nav-link menu-expanded' : 'nav-link'} to="/dashboard/meeting">
              <i className="mdi mdi-video menu-icon"></i>
              <span className="menu-title">
              <Trans>Meetings</Trans>
              </span>
            </Link>
          </li>                                                                                                                                                                                                                   

          
          <li className={this.allowActiveMenu('/dashboard/negotiate') ? 'nav-item active' : 'nav-item'}>
            <Link className={this.state.negotiatePagesMenuOpen ? 'nav-link menu-expanded' : 'nav-link'} to="/dashboard/negotiate">
            <i className="mdi mdi-lock-outline menu-icon"></i>
              <span className="menu-title">
              <Trans>Negotiate</Trans>
              </span>
            </Link>
          </li>

          <li className={this.allowActiveMenu('/dashboard/order') ? 'nav-item active' : 'nav-item'}>
            <Link className={this.state.orderPagesMenuOpen ? 'nav-link menu-expanded' : 'nav-link'} to="/dashboard/order">
            <i className="mdi mdi-information-outline menu-icon"></i>
              <span className="menu-title">
              <Trans>Orders</Trans>
              </span>
            </Link>
          </li>


          <li className={this.allowActiveMenu('/dashboard/sales') ? 'nav-item active' : 'nav-item'}>
            <Link className={this.state.salesPagesMenuOpen ? 'nav-link menu-expanded' : 'nav-link'} to="/dashboard/sales">
            <i className="mdi mdi-currency-usd menu-icon"></i>
              <span className="menu-title">
              <Trans>SALES</Trans>
              </span>
            </Link>
          </li>

      
          {/* <li className={this.allowActiveMenu('/dashboard/chat') ? 'nav-item active' : 'nav-item'}>
            <Link className={this.state.chatPagesMenuOpen ? 'nav-link menu-expanded' : 'nav-link'} to="/dashboard/chat">
            <i className="mdi mdi mdi-wechat menu-icon"></i>
              <span className="menu-title">
                <Trans>Chatting</Trans>
              </span>
            </Link>
          </li> */}

        </ul>
      </nav>
    );
  }

  allowActiveMenu(path){

    return this.props.location.pathname.startsWith(path);
  }

  isPathActive(path) {

    return this.props.location.pathname === path ? true : false;
  }

  componentDidMount() {
    this.onRouteChanged();
    // add className 'hover-open' to sidebar navitem while hover in sidebar-icon-only menu
    const body = document.querySelector('body');
    document.querySelectorAll('.sidebar .nav-item').forEach((el) => {

      el.addEventListener('mouseover', function () {
        if (body.classList.contains('sidebar-icon-only')) {
          el.classList.add('hover-open');
        }
      });
      el.addEventListener('mouseout', function () {
        if (body.classList.contains('sidebar-icon-only')) {
          el.classList.remove('hover-open');
        }
      });
    });
  }

}

const mapStateToProps = state => state.seller;

export default withRouter(connect(mapStateToProps)(Sidebar));