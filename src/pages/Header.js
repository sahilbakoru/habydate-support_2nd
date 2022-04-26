import React, { useState } from 'react';
import 'firebase/auth';
import 'firebase/firestore';
import "../App.css";
import '../index.css';
import { Link } from 'react-router-dom';
import {
  MDBNavbar,
  MDBContainer,
  MDBIcon,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBNavbarToggler,
  MDBNavbarBrand,
  MDBCollapse
} from 'mdb-react-ui-kit';
import { useHistory } from 'react-router-dom';
import logo from "../img/logo-light-mode.png";
import { AiOutlineLogout } from "react-icons/ai";
import GoogleTranslate from '../components/googleTranslater';


function Header({ isSignedIn, signOut, user }) {
  const history = useHistory();
  const [showNavColor, setShowNavColor] = useState(false);
  const { list } = user;
  const handleSingOut = () => {
    signOut();
    history.push("/")
  }
  return (
    <>
      {isSignedIn ? (

        <MDBNavbar expand='lg' light style={{ backgroundColor: '#fff' }}>
          <MDBContainer fluid>
            <MDBNavbarBrand href='https://www.habydate.com'>

              <img
                src={logo}
                height='30'
                width='60'
                alt=''
                loading='lazy'
              />

            </MDBNavbarBrand>
            <MDBNavbarToggler
              type='button'
              data-target='#navbarColor02'
              aria-controls='navbarColor02'
              aria-expanded='false'
              aria-label='Toggle navigation'
              onClick={() => setShowNavColor(!showNavColor)}
            >
              <MDBIcon icon='bars' fas />
            </MDBNavbarToggler>
            <MDBCollapse show={showNavColor} navbar >
              <MDBNavbarNav className='me-auto mb-2 mb-lg-0 main-nav'>
                <MDBNavbarItem className='active'>
                  <Link to="/">
                    <MDBNavbarLink aria-current='page' className="main-nav-link">
                     All Users
                    </MDBNavbarLink>
                    {/* <MDBBtn color="primary">My Profile</MDBBtn> */}
                  </Link>
                  {/* <MDBNavbarLink aria-current='page' href='#'>
                    Home
                  </MDBNavbarLink> */}
                </MDBNavbarItem>
                {/* <MDBNavbarItem>
                    <Link to="/">
                        <MDBNavbarLink href='#'>Notifications</MDBNavbarLink>
                    </Link>    
                </MDBNavbarItem> */}
                {list.active === '1'
                  ?
                  <MDBNavbarItem>
                    <Link to="/matches">
                      {/* <MDBNavbarLink className="main-nav-link">Matches</MDBNavbarLink> */}
                      {/* <MDBBtn color="success">Matches</MDBBtn> */}
                    </Link>
                    {/* <MDBNavbarLink href='#'>Pricing</MDBNavbarLink> */}
                  </MDBNavbarItem>
                  : null}
                {list.active === '1'
                  ?
                  <MDBNavbarItem>
                    <Link to="/chats">
                      {/* <MDBNavbarLink className="main-nav-link">Chats</MDBNavbarLink> */}
                      {/* <MDBBtn color="success">Matches</MDBBtn> */}
                    </Link>
                    {/* <MDBNavbarLink href='#'>Pricing</MDBNavbarLink> */}
                  </MDBNavbarItem>
                  : null}
                {list.active === '1'
                  ?
                  <MDBNavbarItem>
                    <Link to="/membership">
                      {/* <MDBNavbarLink className="main-nav-link">Membership</MDBNavbarLink> */}
                      {/* <MDBBtn color="success">Matches</MDBBtn> */}
                    </Link>
                    {/* <MDBNavbarLink href='#'>Pricing</MDBNavbarLink> */}
                  </MDBNavbarItem>
                  : null}


                <MDBNavbarItem>
                  {/* <MDBBtn color="danger" className="all-button bt" onClick={signOut}>Sign Out</MDBBtn> */}
                  <AiOutlineLogout className="icon-btn" onClick={handleSingOut} />
                  <GoogleTranslate />
                </MDBNavbarItem>
              </MDBNavbarNav>
            </MDBCollapse>
          </MDBContainer>
        </MDBNavbar>
      ) :
        (
          <MDBNavbar expand='lg' light style={{ backgroundColor: '#fff' }}>
            <MDBContainer fluid>

              <MDBNavbarBrand href='https://www.habydate.com'>
                <img
                  src={logo}
                  height='30'
                  width='60'
                  alt=''
                  loading='lazy'
                />
              </MDBNavbarBrand>
              <GoogleTranslate />
            </MDBContainer>
          </MDBNavbar>
        )
      }
    </>

    //     <nav className="navbar navbar-expand-lg navbar-light bg-light">
    //                 <div className="container">
    //                     <a className="navbar-brand me-2" href="https://mdbgo.com/">
    //                     <img
    //                         src="https://mdbootstrap.com/img/logo/mdb-transaprent-noshadows.png"
    //                         height="16"
    //                         alt=""
    //                         loading="lazy"
    //                         style={{marginTop: "-1px"}}
    //                     />
    //                     </a>


    //             {isSignedIn ? (


    //         <div>
    //                     <button
    //                     className="navbar-toggler"
    //                     type="button"
    //                     data-mdb-toggle="collapse"
    //                     data-mdb-target="#navbarButtonsExample"
    //                     aria-controls="navbarButtonsExample"
    //                     aria-expanded="false"
    //                     aria-label="Toggle navigation"
    //                     >
    //                     <i className="fas fa-bars"></i>
    //                     </button>

    //                     <div className="collapse navbar-collapse" id="navbarButtonsExample">
    //                     <ul className="navbar-nav me-auto mb-2 mb-lg-0">
    //                         <li className="nav-item">
    //                         <a className="nav-link" href="#">Dashboard</a>
    //                         </li>
    //                     </ul>

    //                     <div className="d-flex align-items-center">
    //                         <Link to="/" >
    //                         <button type="button" className="btn btn-link px-3 me-2">
    //                             My Profile
    //                         </button>
    //                         </Link>
    //                         <button type="button" className="btn btn-primary me-3"  onClick={signOut}>
    //                             Sign Out
    //                         </button>
    //                         <a
    //                         className="btn btn-dark px-3"
    //                         href="https://github.com/mdbootstrap/mdb-ui-kit"
    //                         role="button"
    //                         ><i className="fab fa-github"></i
    //                         ></a>
    //                     </div>
    //                     </div>
    //             </div>      

    //    ) : null} 



    //         </div>
    //         </nav>


  );
}

export default Header;