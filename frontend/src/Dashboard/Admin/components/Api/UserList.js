import React, { Component } from 'react';
import { useState, useEffect } from "react";
import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import paginationFactory from 'react-bootstrap-table2-paginator';
import cellEditFactory from 'react-bootstrap-table2-editor';
import { Modal, Button } from "react-bootstrap";


class UserList extends Component {
  state = {
        users: [],
        columns: [{
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
    }

    openModal = () => this.setState({ isOpen: true });
    closeModal = () => this.setState({ isOpen: false });


    componentDidMount() {
        var obj = {
            headers: {
                'Authorization': localStorage.getItem('token')
            }
        }
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

                 </Modal.Body>
                 <Modal.Footer>
                   <Button variant="secondary" onClick={this.closeModal}>
                     Close
                   </Button>
                   <Button variant="primary" onClick={this.closeModal}>
                     Save Changes
                   </Button>
                 </Modal.Footer>
               </Modal>
          </div>
        </div>
      );
  }
}

export default UserList

