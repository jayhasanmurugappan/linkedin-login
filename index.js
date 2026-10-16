// __LINKEDIN_CLIENT_ID__ is replaced by .github/workflows/pages.yml at deploy time.
var CLIENT_ID = "__LINKEDIN_CLIENT_ID__";
var REDIRECT_URI = location.origin + location.pathname.replace(/[^/]*$/, "") + "callback.html";

// Unguessable one-time state value, checked again on the callback page (CSRF protection).
var bytes = crypto.getRandomValues(new Uint8Array(24));
var state = Array.prototype.map.call(bytes, function (b) {
  return ("0" + b.toString(16)).slice(-2);
}).join("");
try { sessionStorage.setItem("li_state", state); } catch (e) {}

var params = new URLSearchParams({
  response_type: "code",
  client_id: CLIENT_ID,
  redirect_uri: REDIRECT_URI,
  state: state,
  scope: "openid profile email w_member_social"
});
document.getElementById("login").href =
  "https://www.linkedin.com/oauth/v2/authorization?" + params.toString();
