import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Pageone from "./assets/componentsCustomer/pageone.jsx";
import Pagetwo from "./assets/componentsCustomer/pagetwo.jsx";
import RegisterCustomer from "./assets/componentsCustomer/registercustomer.jsx";
import LoginCustomerAdmin from "./assets/componentsCustomer/logincustomer_admin.jsx";
import CustomerHomepage from "./assets/componentsCustomer/customerhomepage.jsx";
import AdminHome from "./assets/componentsAdmin/adminhome.jsx"; // ✅ Import Admin Home

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Pageone />} />
        <Route path="/pagetwo" element={<Pagetwo />} />
        <Route path="/registercustomer" element={<RegisterCustomer />} />
        <Route path="/logincustomer_admin" element={<LoginCustomerAdmin />} />
        <Route path="/customerhomepage" element={<CustomerHomepage />} />
        <Route path="/adminhome" element={<AdminHome />} /> {/* ✅ Added Admin route */}
      </Routes>
    </Router>
  );
}

export default App;
