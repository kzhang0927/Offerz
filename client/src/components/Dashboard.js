import React, { useEffect, useState } from 'react'
import { Spinner } from "react-bootstrap"
import { Link } from "react-router-dom"
import MUIDataTable from "mui-datatables";
import axios from 'axios'
import { useAuth } from "../contexts/AuthContext"


export default function Dashboard() {
  const columns = ["Name", "Job Title", "Create Date", "Details", "Offer Link"]
  let offerData = []
  let transformedData = []
 
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState();
  const [currentUser, setCurrentUser] = useState(useAuth().currentUser.email)

  useEffect(() => {
    axios
    .get(`http://localhost:8000/api/createdoffers/${currentUser}`)

    .then((response) => {
      offerData = response.data.data[0].map((o) => {
        return {
          "Name": o.name,
          "Job Title": o.title,
          "Create Date": o.create_date,
          "Details": o.details,
          "Offer Link": `http://localhost:3000/Offer/${o.id}`
        }
      })
      transformedData = offerData.map(e => Object.values(e))
      setData(transformedData)
      setLoading(false);
    })
  }, []);

  const options = {
    filterType: 'checkbox',
    tableBodyMaxHeight: '60vh',
    downloadOptions:{filename: 'CreatedOffers.csv'}};
  
  if (isLoading) {
      return (
      <card style = {{ position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>
        <Spinner animation="border" variant="primary" />    
      </card>)
  }

  return (
   //We'll eventually want to add themes 
    <card>
      <Link to="/CreateOffer" className="btn btn-primary mt-3 mb-3">
            Create Offer
      </Link>
      <card>
          <MUIDataTable 
            title={"All Offers"}
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

