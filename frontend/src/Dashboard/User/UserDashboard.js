import React, { Component } from 'react';

//Navigation
import Sidebar from '../Admin/components/Navigation/Sidebar';
import Topbar from '../Admin/components/Navigation/Topbar';
import PageHeading from '../Admin/components/PageHeading';
import WasteDeliveredList from './components/WasteDeliveredList';
import CostCalculator from './components/CostCalculator';
//Redux
import { Provider } from 'react-redux';
import { Store } from '../../redux/store';

class Dashboard extends Component {

  render() {
    return (
    <Provider store={Store}>
      <div>
        {/* <!-- Page Wrapper --> */}
        <div id="wrapper">

          {/* <!-- Content Wrapper --> */}
          <div id="content-wrapper" className="d-flex flex-column">

            {/* <!-- Main Content --> */}
            <div id="content">

              {/* <!-- Topbar --> */}
              <Topbar />
              {/* <!-- End of Topbar --> */}

              {/* <!-- Begin Page Content --> */}
              <div className="container-fluid">

                {/* Start cost calculator*/}
                    <CostCalculator />
                {/* End cost calculator*/}
                <PageHeading title="Statistics" />

                {/* <!-- Start statistics --> */}

                {/* <!-- End statistics --> */}

                {/* <!-- Page Heading --> */}
                <PageHeading title="List of waste delivered" />
                    <WasteDeliveredList />
                {/* <!-- Start User List --> */}

                {/* <!-- End User List --> */}
              </div>
              {/* <!-- /.container-fluid --> */}

            </div>
            {/* <!-- End of Main Content --> */}

            {/* <!-- Footer --> */}
            <footer className="sticky-footer bg-white">
              <div className="container my-auto">
                <div className="copyright text-center my-auto">
                  <span>Copyright &copy; aws-project 2021</span>
                </div>
              </div>
            </footer>
            {/* <!-- End of Footer --> */}

          </div>
          {/* <!-- End of Content Wrapper --> */}

        </div>
        {/* <!-- End of Page Wrapper --> */}

        {/* <!-- Scroll to Top Button--> */}
        <a className="scroll-to-top rounded" href="#page-top">
          <i className="fas fa-angle-up"></i>
        </a></div>
       </Provider>
    )
  }
}

export default Dashboard;