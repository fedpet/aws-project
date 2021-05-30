import React, { Component } from 'react';
import { useState, useEffect } from "react";
import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import paginationFactory from 'react-bootstrap-table2-paginator';

class UserList extends Component {
  state = {
        users: [],
        columns: [{
                dataField: 'email',
                text: 'Email',
                sort: true,
                filter: textFilter()
            },
            {
                dataField: 'role',
                text: 'Role',
                sort: true
            }
        ]
    }
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

      return (
        <div style={{ marginTop: 50 }}>
            <BootstrapTable
             striped
             hover
             keyField='email'
             data={ this.state.users }
             columns={ this.state.columns }
             filter={ filterFactory() }
             pagination={ paginationFactory(pagination) }/>
        </div>
      );
  }
}

export default UserList

