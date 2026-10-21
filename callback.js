var out = document.getElementById("out");
var q = new URLSearchParams(location.search);
var code = q.get("code");
var state = q.get("state");
var errorText = q.get("error_description") || q.get("error");
var saved = null;
try { saved = sessionStorage.getItem("li_state"); } catch (e) {}

// Remove the code and state from the address bar and browser history straight away.
history.replaceState(null, "", location.pathname);

function esc(s) {
  return String(s).replace(/[&<>"']/g, function (c) {
    return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
  });
}

if (errorText) {
  out.innerHTML = '<p class="err">LinkedIn returned an error: ' + esc(errorText) + "</p>";
} else if (!code || !/^[A-Za-z0-9_-]+$/.test(code)) {
  out.innerHTML = '<p class="err">No valid login code found. Start again from the sign-in page.</p>';
} else if (!saved || state !== saved) {
  out.innerHTML = '<p class="err">The state check failed, so this login was not started from this browser. Start again from the sign-in page.</p>';
} else {
  // The token workflow lives in the separate private repo "linkedin-connector".
  var owner = location.hostname.split(".")[0];
  var runUrl = "https://github.com/" + encodeURIComponent(owner) +
    "/linkedin-connector/actions/workflows/exchange-token.yml";
  out.innerHTML =
    "<p>Login worked. On your phone, tap <b>Open in the LinkedIn Assist app</b> to finish connecting. Or copy this one-time code and paste it into the <b>Exchange token</b> workflow.</p>" +
    '<pre id="code">' + esc(code) + "</pre>" +
    '<p><a class="btn" href="linkedinassist://connect?code=' + encodeURIComponent(code) + '">Open in the LinkedIn Assist app</a></p>' +
    '<p><button id="copy">Copy code</button> <a class="btn" href="' + esc(runUrl) + '">Open the workflow</a></p>' +
    "<p><small>The code is single-use and expires in a few minutes.</small></p>";
  document.getElementById("copy").onclick = function () {
    var btn = this;
    navigator.clipboard.writeText(code).then(function () { btn.textContent = "Copied"; });
  };
  try { sessionStorage.removeItem("li_state"); } catch (e) {}
}
