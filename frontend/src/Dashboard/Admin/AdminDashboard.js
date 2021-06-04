import React, { Component } from 'react';

//Navigation
import Sidebar from './components/Navigation/Sidebar';
import Topbar from './components/Navigation/Topbar';
import PageHeading from './components/PageHeading';
import Users from './components/Api/UserList';
import Statistics from './components/Api/Statistics';

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

          {/* <!-- Sidebar --> */}
          { /* <Sidebar /> */}
          {/* <!-- End of Sidebar --> */}

          {/* <!-- Content Wrapper --> */}
          <div id="content-wrapper" className="d-flex flex-column">

            {/* <!-- Main Content --> */}
            <div id="content">

              {/* <!-- Topbar --> */}
              <Topbar />
              {/* <!-- End of Topbar --> */}

              {/* <!-- Begin Page Content --> */}
              <div className="container-fluid">

                <PageHeading title="Statistics" />

                {/* <!-- Start statistics --> */}
                   <Statistics/>
                {/* <!-- End statistics --> */}

                {/* <!-- Page Heading --> */}
                <PageHeading title="Users" />

                {/* <!-- Start User List --> */}
                    <Users/><br/><br/>
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