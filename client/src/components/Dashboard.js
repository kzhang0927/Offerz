import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Table } from "react-bootstrap"
import { Link } from "react-router-dom"
import MUIDataTable from "mui-datatables";

export default function Dashboard() {
  const columns = ["Name", "Company", "City", "State"];

  const data = [
   ["Joe James", "Test Corp", "Yonkers", "NY"],
   ["John Walsh", "Test Corp", "Hartford", "CT"],
   ["Bob Herm", "Test Corp", "Tampa", "FL"],
   ["James Houston", "Test Corp", "Dallas", "TX"],
   ["James Houston", "Test Corp", "Dallas", "TX"],
   ["James Houston", "Test Corp", "Dallas", "TX"],
   ["James Houston", "Test Corp", "Dallas", "TX"],
   ["James Houston", "Test Corp", "Dallas", "TX"],
   ["James Houston", "Test Corp", "Dallas", "TX"],
   ["James Houston", "Test Corp", "Dallas", "TX"],
   ["James Houston", "Test Corp", "Dallas", "TX"],
   ["James Houston", "Test Corp", "Dallas", "TX"],
   ["James Houston", "Test Corp", "Dallas", "TX"],
   ["James Houston", "Test Corp", "Dallas", "TX"],
   ["James Houston", "Test Corp", "Dallas", "TX"],
   ["James Houston", "Test Corp", "Dallas", "TX"],
   ["James Houston", "Test Corp", "Dallas", "TX"],
   ["James Houston", "Test Corp", "Dallas", "TX"],
   ["James Houston", "Test Corp", "Dallas", "TX"],
   ["James Houston", "Test Corp", "Dallas", "TX"],
  ];
  
  const options = {
    filterType: 'checkbox',
    tableBodyMaxHeight: '60vh',
  };

  return (
      <card>
        <Link to="/CreateOffer" className="btn btn-primary mt-3 mb-3">
              Create Offer
        </Link>
        <card>
            <MUIDataTable
              title={"Employee List"}
              data={data}
              columns={columns}
              options={options}
            />
        </card>
      </card>
  )
}

// export default function ProfileManager() {
//   return (
//       <card>
//         <Link to="/CreateOffer" className="btn btn-primary">
//               Create Offer
//         </Link>
//         <Table striped bordered hover className="mt-3">
//           <thead>
//             <tr>
//               <th>#</th>
//               <th>First Name</th>
//               <th>Last Name</th>
//               <th>Username</th>
//             </tr>
//           </thead>
//           <tbody>
//             <tr>
//               <td>1</td>
//               <td>Mark</td>
//               <td>Otto</td>
//               <td>@mdo</td>
//             </tr>
//             <tr>
//               <td>2</td>
//               <td>Jacob</td>
//               <td>Thornton</td>
//               <td>@fat</td>
//             </tr>
//             <tr>
//               <td>3</td>
//               <td colSpan={2}>Larry the Bird</td>
//               <td>@twitter</td>
//             </tr>
//             <tr>
//               <td>3</td>
//               <td colSpan={2}>Larry the Bird</td>
//               <td>@twitter</td>
//             </tr>
//             <tr>
//               <td>3</td>
//               <td colSpan={2}>Larry the Bird</td>
//               <td>@twitter</td>
//             </tr>
//             <tr>
//               <td>3</td>
//               <td colSpan={2}>Larry the Bird</td>
//               <td>@twitter</td>
//             </tr>
//             <tr>
//               <td>3</td>
//               <td colSpan={2}>Larry the Bird</td>
//               <td>@twitter</td>
//             </tr>
//             <tr>
//               <td>3</td>
//               <td colSpan={2}>Larry the Bird</td>
//               <td>@twitter</td>
//             </tr>
//             <tr>
//               <td>3</td>
//               <td colSpan={2}>Larry the Bird</td>
//               <td>@twitter</td>
//             </tr>
//             <tr>
//               <td>3</td>
//               <td colSpan={2}>Larry the Bird</td>
//               <td>@twitter</td>
//             </tr>
//           </tbody>
//         </Table>
//       </card>
//   )
// }

