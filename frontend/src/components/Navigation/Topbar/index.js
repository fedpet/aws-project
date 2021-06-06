import React, {Component} from 'react';
import { Modal } from "react-bootstrap";
import NotificationsManager from "../../../components/NotificationsManager";

class Topbar extends Component {
    state = {
        isOpen: false
    }

    openModal = () => this.setState({ isOpen: true });
    closeModal = () => this.setState({ isOpen: false });

    render() {

      const logout = () => {
          localStorage.clear();
          window.location.href = "/";
      };
      let notification;
       if(JSON.parse(localStorage.getItem('token')).role === "user") {
            notification = <NotificationsManager/>
       }

        return (
            <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">

            <a className="navbar-brand" href="/">MyWaste</a>

            {/* <!-- Topbar Navbar --> */}
            <ul className="navbar-nav ml-auto">
                {notification}
              <div className="topbar-divider d-none d-sm-block"></div>

              {/* <!-- Nav Item - User Information --> */}
              <li className="nav-item dropdown no-arrow">
                <a className="nav-link dropdown-toggle" href="#" id="userDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  <span className="mr-2 d-none d-lg-inline text-gray-600 small">{ JSON.parse(localStorage.getItem('token')).name}</span>
                  <img className="img-profile rounded-circle" src="https://source.unsplash.com/QAB-WJcbgJk/60x60" />
                </a>
                {/* <!-- Dropdown - User Information --> */}
                <div className="dropdown-menu dropdown-menu-right shadow animated--grow-in" aria-labelledby="userDropdown">
                  <a className="dropdown-item" href="#" onClick={this.openModal}>
                    <i className="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>
                    Profile
                      </a>
                  <div className="dropdown-divider"></div>
                  <a className="dropdown-item" href="#" onClick={logout} >
                    <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
                    Logout
                      </a>
                </div>
              </li>

            </ul>
              {/*User profile modal not editable (only readOnly)*/}
              <Modal show={this.state.isOpen} onHide={this.closeModal}>
              <Modal.Header closeButton>
                <Modal.Title>{ JSON.parse(localStorage.getItem('token')).email }</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                  <div className="modal-body">
                     <div className="form-group">
                       <label htmlFor="id">ID</label>
                       <input type="text" className="form-control" id="id" name="id" value={JSON.parse(localStorage.getItem('token')).id} readOnly/>
                     </div>
                    <div className="form-group">
                      <label htmlFor="username">Username</label>
                      <input type="text" className="form-control" id="username" name="email" value={JSON.parse(localStorage.getItem('token')).email} readOnly/>
                    </div>
                    <div className="form-group">
                      <label htmlFor="role">Role</label>
                      <input type="text" className="form-control" id="role" name="role" defaultValue={JSON.parse(localStorage.getItem('token')).role} readOnly/>
                    </div>
                   <div className="form-group">
                     <label htmlFor="name">Name</label>
                     <input type="text" className="form-control" id="name" name="name" defaultValue={JSON.parse(localStorage.getItem('token')).name} readOnly/>
                   </div>
                  </div>
              </Modal.Body>
        </Modal>
          </nav>

        )
    }
}

export default Topbar;