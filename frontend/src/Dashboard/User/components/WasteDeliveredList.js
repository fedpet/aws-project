import React, { Component } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import paginationFactory from 'react-bootstrap-table2-paginator';
import { Redirect } from 'react-router-dom';
import 'react-confirm-alert/src/react-confirm-alert.css';
import Toast from 'react-bootstrap/Toast';
import moment from 'moment';

class WasteDeliveredList extends Component {
    state = {
        wastes: [],
         columns: [{
                dataField: 'date',
                text: 'Date',
                sort: true,
                formatter: this.dataFormatter
            },{
                 dataField: 'type',
                 text: 'Type',
                 sort: true,
                 filter: textFilter()
             },
            {
                dataField: 'quantity',
                text: 'Quantity',
                sort: true
            },
            {
                dataField: 'cost',
                text: 'Total Cost',
                sort: true,
                formatter: this.totalCostColumn.bind(this)
            }],
            deliveryModalIsOpen: false,
            showToggle: false,
            toggleMessage: [],
            waste: [],
            paperCost: 0.5,
            glassCost: 0.8,
            plasticCost: 1,
    }

    openDeliveryModal = () => this.setState({ deliveryModalIsOpen: true });
    closeDeliveryModal = () => this.setState({ deliveryModalIsOpen: false });
    openToggle = () => this.setState({showToggle: true});
    closeToggle = () => this.setState({showToggle: false});

    componentDidMount() {
        this.getWasteDeliveredList();
    }

    dataFormatter(cell,row) {
        return (
            moment(cell).format('DD/MM/YYYY')
        )
    }

    totalCostColumn(cell,row) {
         if (row.type === "plastic") {
            return "€ " + (row.quantity * this.state.plasticCost).toFixed(2);
         } else if (row.type === "paper") {
            return "€ " + (row.quantity * this.state.paperCost).toFixed(2);
         } else {
            return "€ " + (row.quantity * this.state.glassCost).toFixed(2);
         }
    }

    handleChange = e => {
      e.persist();
      this.setState(prevState => ({
        waste: { ...prevState.waste,  [e.target.name]: e.target.value }
      }))
    }

    getWasteDeliveredList() {
        fetch("/api/waste?account="+JSON.parse(localStorage.getItem('token')).id)
        .then(response => response.json())
        .then(json => {
            this.setState({wastes: json})
        })
    }

    handleDeliveryWaste() {
        fetch("/api/waste/", {
            method: 'POST',
            withCredentials: true,
            credentials: 'include',
            headers: {
                'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('token')).token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                account: JSON.parse(localStorage.getItem('token')).id,
                type: this.state.waste.type,
                quantity: this.state.waste.quantity
             })
        }).then((response) =>  {
            if(response.ok) {
                 this.setState({toggleMessage: {"message": "Waste delivered correctly" }});
                this.getWasteDeliveredList();
                <Redirect to="/" />;
                this.closeDeliveryModal();
                this.openToggle();
            } else {
                this.setState({toggleMessage: {"message": "Some problem occurred, cannot make waste delivery, please retry" }});
                <Redirect to="/" />;
                this.openToggle();
            }
        }).catch((error) => {
            this.setState({toggleMessage: {"message": "Some problem occurred, please check before retry" }});
            <Redirect to="/" />;
            this.openToggle();
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
               text: 'All', value: this.state.wastes.length
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
            <div className="card shadow mb-4">
              <div className="card-body">
                    <BootstrapTable
                     striped
                     hover
                     keyField='_id'
                     wrapperClasses="table-responsive"
                     bordered={false}
                     data={ this.state.wastes }
                     columns={ this.state.columns }
                     filter={ filterFactory() }
                     pagination={ paginationFactory(pagination) }
                     />
                </div>

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
        )

    }
}

export default WasteDeliveredList