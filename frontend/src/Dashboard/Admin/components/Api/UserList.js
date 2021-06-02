import React, { Component } from 'react';
import { useState, useEffect } from "react";
import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import paginationFactory from 'react-bootstrap-table2-paginator';
import cellEditFactory from 'react-bootstrap-table2-editor';
import { Modal, Button } from "react-bootstrap";
import { Redirect } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import Toast from 'react-bootstrap/Toast';
import ToastHeader from 'react-bootstrap/ToastHeader';
import ToastBody from 'react-bootstrap/ToastBody';

class UserList extends Component {
  state = {
        users: [],
        columns: [{
                  dataField: 'id',
                  text: 'ID',
                  sort: true,
                  filter: textFilter()
              },{
                dataField: 'email',
                text: 'Email',
                sort: true,
                filter: textFilter()
            },{
                 dataField: 'name',
                 text: 'Name',
                 sort: true,
                 filter: textFilter()
             },
            {
                dataField: 'role',
                text: 'Role',
                sort: true,
                filter: textFilter()
            }
        ],
        isOpen: false,
        newUserModalIsOpen: false,
        modalInfo: [],
        user:[],
        showToggle: false,
        toggleMessage: []
    }

    openModal = () => this.setState({ isOpen: true });
    closeModal = () => this.setState({ isOpen: false });
    openNewUserModal = () => this.setState({ newUserModalIsOpen: true });
    closeNewUserModal = () => this.setState({ newUserModalIsOpen: false });
    openToggle = () => this.setState({showToggle: true});
    closeToggle = () => this.setState({showToggle: false});

    componentDidMount() {
        this.getUserList();
    }

    getUserList() {
        fetch("/api/account", {
            method: 'GET',
            withCredentials: true,
            credentials: 'include',
            headers: {
                'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('token')).token ,
            }
        })
        .then(response => response.json())
        .then(json => {
            this.setState({users: json})
        }).catch((error) => {
          alert("some error: " + error);
       });;
    }


     handleUserSaveChange() {
        fetch("/api/account/" +this.state.modalInfo.id, {
            method: 'PATCH',
            withCredentials: true,
            credentials: 'include',
            headers: {
                'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('token')).token ,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state.user)
        }).then((response) =>  {
            if(response.ok) {
                this.setState({toggleMessage: {"message": "User " + this.state.modalInfo.email + " updated correctly" }});
                this.getUserList();
                <Redirect to="/admin" />;
                this.openToggle();
            } else {
                this.setState({toggleMessage: {"message": "Some problem occurred, user " + this.state.modalInfo.email + " not updated, please check before retry" }});
                <Redirect to="/admin" />;
                this.openToggle();
            }
        }).catch((error) => {
            this.setState({toggleMessage: {"message": "Some problem occurred, please check before retry" }});
            <Redirect to="/admin" />;
            this.openToggle();
         });
    }

    handleChange = e => {
      e.persist();

      this.setState(prevState => ({
        user: { ...prevState.user,  [e.target.name]: e.target.value }
      }))
    }

    handleDelete() {
        if(this.state.modalInfo.id === JSON.parse(localStorage.getItem('token')).id) {
            this.setState({toggleMessage: {"message": "Bad action, user " + this.state.modalInfo.email + " is currently logged and it's an admin" }});
            <Redirect to="/admin" />;
            this.openToggle();
            return;
        }
        fetch("/api/account/" +this.state.modalInfo.id, {
            method: 'DELETE',
            withCredentials: true,
            credentials: 'include',
            headers: {
                'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('token')).token ,
            }
        }).then((response) =>  {
            if(response.ok) {
                this.setState({toggleMessage: {"message": "User " + this.state.modalInfo.email + " delete correctly" }});
                this.getUserList();
                <Redirect to="/admin" />;
                 this.openToggle();
            } else {
                this.setState({toggleMessage: {"message": "Some problem occurred, cannot delete user " + this.state.modalInfo.email +", please check before retry" }});
                <Redirect to="/admin" />;
                this.openToggle();
            }
        }).catch((error) => {
            this.setState({toggleMessage: {"message": "Some problem occurred, please check before retry" }});
            <Redirect to="/admin" />;
            this.openToggle();
        });
    }

    handleAddUser() {
        if(this.state.user.length < 4) {
            alert("All fields are required!")
            return;
        }
        fetch("/api/account/", {
            method: 'POST',
            withCredentials: true,
            credentials: 'include',
            headers: {
                'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('token')).token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state.user)
        }).then((response) =>  {
            if(response.ok) {
                 this.setState({toggleMessage: {"message": "Add user " + this.state.user.email + " correctly" }});
                this.getUserList();
                <Redirect to="/admin" />;
                this.closeNewUserModal();
                this.openToggle();
            } else {
                this.setState({toggleMessage: {"message": "Some problem occurred, cannot add user " + this.state.user.email +", please check before retry" }});
                <Redirect to="/admin" />;
                this.openToggle();
            }
        }).catch((error) => {
            this.setState({toggleMessage: {"message": "Some problem occurred, please check before retry" }});
            <Redirect to="/admin" />;
            this.openToggle();
        });
    }

    saveChange = () => {
        this.closeModal();
        confirmAlert({
            title: 'Confirm to save change',
            message: 'Are you sure to do this?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {this.handleUserSaveChange()}
                },
                {
                    label: 'No',
                    onClick: () => {this.closeModal()}
                }
            ]
        });
    }

    deleteUser = () => {
       this.closeModal();
       confirmAlert({
           title: 'Confirm to delete user',
           message: 'Are you sure to do this?',
           buttons: [
               {
                   label: 'Yes',
                   onClick: () => {this.handleDelete()}
               },
               {
                   label: 'No',
                   onClick: () => {this.closeModal()}
               }
           ]
       });
    }

    addUser = () => {
      this.closeNewUserModal();
      confirmAlert({
          title: 'Confirm to add user',
          message: 'Are you sure to do this?',
          buttons: [
              {
                  label: 'Yes',
                  onClick: () => {this.handleAddUser()}
              },
              {
                  label: 'No',
                  onClick: () => {this.closeModal()}
              }
          ]
      });
    }

  render() {
      const pagination = {
         page: 1,
         sizePerPageList: [ {
           text: '5', value: 5
         }, {
           text: '10', value: 10
         }, {
           text: 'All', value: this.state.users.length
         } ],
         sizePerPage: 5,
         pageStartIndex: 1,
         paginationSize: 3,
         prePage: 'Prev',
         nextPage: 'Next',
         firstPage: 'First',
         lastPage: 'Last',
      };

    const rowEvents = {
        onClick: (e, row) => {
           this.setState({ isOpen: true });
           this.setState({ modalInfo: row });
        }
    }

      return (
        <div className="card shadow mb-4">
          <div className="card-header">
                <button onClick={this.openNewUserModal} className="btn btn-primary">Add user</button>
           </div>
          <div className="card-body">
                <BootstrapTable
                 striped
                 hover
                 keyField='email'
                 wrapperClasses="table-responsive"
                 bordered={false}
                 data={ this.state.users }
                 columns={ this.state.columns }
                 filter={ filterFactory() }
                 pagination={ paginationFactory(pagination) }
                 rowEvents={rowEvents}
                 />

               <Modal show={this.state.isOpen} onHide={this.closeModal}>
                 <Modal.Header closeButton>
                   <Modal.Title>{ this.state.modalInfo.name }</Modal.Title>
                 </Modal.Header>
                 <Modal.Body>
                     <div className="modal-body">
                        <div className="form-group">
                          <label htmlFor="id">ID</label>
                          <input type="text" className="form-control" id="id" name="id" value={this.state.modalInfo.id} readOnly/>
                        </div>
                       <div className="form-group">
                         <label htmlFor="username">Username</label>
                         <input type="text" className="form-control" id="username" name="email" defaultValue={this.state.modalInfo.email} onChange={this.handleChange} placeholder={this.state.modalInfo.email}/>
                       </div>
                       <div className="form-group">
                         <label htmlFor="role">Role</label>
                         <input type="text" className="form-control" id="role" name="role" defaultValue={this.state.modalInfo.role} onChange={this.handleChange} placeholder={this.state.modalInfo.role}/>
                       </div>
                      <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input type="text" className="form-control" id="name" name="name" defaultValue={this.state.modalInfo.name} onChange={this.handleChange} placeholder={this.state.modalInfo.name}/>
                      </div>
                       <div className="form-group">
                         <label htmlFor="password1">Password</label>
                         <input type="password" className="form-control" name="password" id="password1" onChange={this.handleChange}  placeholder="Password"/>
                       </div>
                     </div>
                     <div className="modal-footer border-top-0 d-flex justify-content-center">
                       <button onClick={this.saveChange} className="btn btn-success">Save Changes</button>
                       <button onClick={this.deleteUser} className="btn btn-danger">Delete</button>
                     </div>
                 </Modal.Body>
               </Modal>

              {/*Add new user modal*/}
              <Modal show={this.state.newUserModalIsOpen} onHide={this.closeNewUserModal}>
                <Modal.Header closeButton>
                  <Modal.Title>Add user</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="modal-body">
                      <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input type="text" className="form-control" id="username" name="email" onChange={this.handleChange} placeholder="username" required />
                      </div>
                      <div className="form-group">
                        <label htmlFor="userRole">Role</label>
                        <select className="form-control" name="role" onChange={this.handleChange} id="userRole">
                          <option>user</option>
                          <option>admin</option>
                        </select>
                      </div>
                     <div className="form-group">
                       <label htmlFor="name">Name</label>
                       <input type="text" className="form-control" id="name" name="name" onChange={this.handleChange} placeholder="name" required />
                     </div>
                      <div className="form-group">
                        <label htmlFor="password1">Password</label>
                        <input type="password" className="form-control" name="password" id="password1" onChange={this.handleChange} placeholder="Password" required />
                      </div>
                    </div>
                    <div className="modal-footer border-top-0 d-flex justify-content-center">
                      <button type="submit" onClick={this.addUser} className="btn btn-success">Add</button>
                    </div>
                </Modal.Body>
              </Modal>

              {/*Toogle for message*/}
              <div
                aria-live="polite"
                aria-atomic="true"
                style={{
                  position: 'relative',
                  minHeight: '100px',
                }}
              >
              <Toast
              style={{
                position: 'absolute',
                top: 0,
                right: 0,
              }}
                show={this.state.showToggle} onClose={this.closeToggle} delay={5000} autohide>
                <Toast.Header>
                  <img
                    src="holder.js/20x20?text=%20"
                    className="rounded mr-2"
                    alt=""
                  />
                  <strong className="mr-auto">Last operation info</strong>
                </Toast.Header>
                <Toast.Body>{this.state.toggleMessage.message}</Toast.Body>
              </Toast>
              </div>
          </div>
        </div>
      );
  }
}

export default UserList

