import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import queryString from "query-string";
import { loadStripe } from "@stripe/stripe-js";
const { STRIPE_PUBLISH_KEY ='pk_test_fjrkGyrczD1jEcSTNwkwQOKo'} =process.env
console.log("ENV_KEYS=====>",STRIPE_PUBLISH_KEY);
const stripePromise = loadStripe(STRIPE_PUBLISH_KEY);

// Showing null, because we will show the result in the app and not on the web
function Success() {
  return null;
}

// Showing null, because we will show the result in the app and not on the web
function Failure() {
  return null;
}

// Showing null, because we will show the result in the app and not on the web
function PaymentInit() {
  return null;
}

function Init() {
  return (
    <div className="App">
      <p>Payment Site</p>
    </div>
  );
}

async function initStripe() {
  const parsed = queryString.parse(window.location.search);
  const sessionId = parsed.session;

  const stripe = await stripePromise;
  await stripe.redirectToCheckout({
    sessionId
  });
}

function Payment() {
  initStripe();
  return null;
}

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Init />
        </Route>
        <Route path="/payment">
          <Payment />
        </Route>
        <Route path="/payment-init">
          <PaymentInit />
        </Route>
        <Route path="/payment-failure">
          <Failure />
        </Route>
        <Route path="/payment-success">
          <Success />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
