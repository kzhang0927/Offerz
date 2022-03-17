import React from "react"
import Signup from "./Signup"
import { Container, Navbar, Nav, Card } from "react-bootstrap"
import { AuthProvider } from "../contexts/AuthContext"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import ProfileManager from "./ProfileManager"
import Login from "./Login"
import PrivateRoute from "./PrivateRoute"
import ForgotPassword from "./ForgotPassword"
import UpdateProfile from "./UpdateProfile"
import Dashboard from "./Dashboard"
import Offer from "./Offer"
import CreateOffer from "./CreateOffer"
import CreatedSuccess from "./CreatedSuccess"

//Before deploying, ensure links are routed properly and get HTTPS

function App() {
  return (
    <Container 
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh", maxWidth: "100%", backgroundColor: "#F9F9F9"}}
    >
      <div className="w-100 pt-5">
        <Router>
          <AuthProvider>
            <Switch>
                <Route path="/offer/:offerID" component={OfferContainer} />
                <Route component={DefaultContainer}/>
            </Switch>
          </AuthProvider>
        </Router>
      </div>
    </Container>
  )
}

//Different container because the generated offer shouldn't have navbar
const OfferContainer = () => (
  <Container>
    <Route path="/offer/:offerID" component={Offer} />
  </Container>
)

const DefaultContainer = () => (
  <Container>
      <Navbar fixed="top" bg="dark" variant="dark">
        <Container className="ob-5">
          <Navbar.Brand href="https://offerz.webflow.io/" >Offerz</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/ProfileManager">Profile Manager </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    <Container>
      <PrivateRoute exact path="/" component={Dashboard} /> 
      <PrivateRoute path="/update-profile" component={UpdateProfile} />
      <PrivateRoute exact path="/ProfileManager" component={ProfileManager}/>
      <PrivateRoute exact path="/CreateOffer" component={CreateOffer}/>
      <PrivateRoute exact path="/CreateOffer/CreatedSuccess/:offerID" component={CreatedSuccess}/>    
      <Route path="/signup" component={Signup} />
      <Route path="/login" component={Login} />
      <Route path="/forgot-password" component={ForgotPassword} />
    </Container>
  </Container>
)

export default App
