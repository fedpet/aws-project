import React, { Component } from 'react';
import { useState, useEffect } from "react";
import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import paginationFactory from 'react-bootstrap-table2-paginator';
import cellEditFactory from 'react-bootstrap-table2-editor';
import { Modal, Button } from "react-bootstrap";
import { Redirect } from 'react-router-dom';

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
        modalInfo: [],
        user:[]
    }

    openModal = () => this.setState({ isOpen: true });
    closeModal = () => this.setState({ isOpen: false });


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
        });
    }


     handleUserSaveChange(id) {
        {/*console.warn(JSON.stringify(this.state.user))*/}
        fetch("/api/account/" +this.state.modalInfo.id, {
            method: 'PATCH',
            withCredentials: true,
            credentials: 'include',
            headers: {
                'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('token')).token ,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state.user)
        }).then(response => response.json())
        .then(json =>  {
            this.getUserList();
            <Redirect to="/admin" />;
            this.closeModal();
        }).catch((error) => {
            console.log(error)
          });
    }

    handleChange = e => {
      e.persist();

      this.setState(prevState => ({
        user: { ...prevState.user,  [e.target.name]: e.target.value }
      }))
    }

    handleDelete() {
        fetch("/api/account/" +this.state.modalInfo.id, {
            method: 'DELETE',
            withCredentials: true,
            credentials: 'include',
            headers: {
                'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('token')).token ,
            }
        }).then(response =>  {
            this.getUserList();
            <Redirect to="/admin" />;
            this.closeModal();
        }).catch((error) => {
            console.log(error)
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
                       <button onClick={this.handleUserSaveChange.bind(this)} className="btn btn-success">Save Changes</button>
                       <button onClick={this.handleDelete.bind(this)} className="btn btn-danger">Delete</button>
                     </div>
                 </Modal.Body>
               </Modal>
          </div>
        </div>
      );
  }
}

export default UserList

