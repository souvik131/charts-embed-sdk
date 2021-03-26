import ChartsEmbedSDK, { getRealmUserToken }from "@mongodb-js/charts-embed-dom";
import { Stitch, UserPasswordCredential } from 'mongodb-stitch-browser-sdk'
import "regenerator-runtime/runtime";

const client = Stitch.initializeAppClient(
  'smannportal-hajnf', // Optional: ~REPLACE~ with your Realm App ID
); 

function getUser() {
  return document.getElementById("username").value;
}

function getPass() {
  return document.getElementById("password").value;
}

function logOut() {
  document.body.classList.toggle("logged-in", false);
}

document
  .getElementById("login-page")
  .addEventListener("input", () => document.body.classList.toggle("error", false));

document
  .getElementById("loginButton")
  .addEventListener("click", () => tryLogin());

document
  .getElementById("logoutButton")
  .addEventListener("click", () => logOut());

async function tryLogin() {
  const credential = new UserPasswordCredential(getUser(), getPass())
  client.auth.loginWithCredential(credential).then(() =>
  {
    const sdk = new ChartsEmbedSDK({
      baseUrl: "https://charts.mongodb.com/charts-smann-xxkdl", // Optional: ~REPLACE~ with your Charts URL
      getUserToken: () => getRealmUserToken(client),
    });

    const chart = sdk.createChart({
      chartId: "e61c359d-11fa-4cf4-a736-cc62b1f67cc1", // Optional: ~REPLACE~ with your Chart ID
    });

    chart.render(document.getElementById("chart"));
    document.body.classList.toggle("logged-in", true);

  }).catch(err => {
    console.error("Authentication failed. If you are using the pre-built sample, please use one of the listed email addresses and use 'password' as the password.")
    document.body.classList.toggle("error", true);
  });
}
