/* Homestead Guides - email signup block.
   Modes (first one filled in wins):
     mlAccount + mlForm : MailerLite embedded form (current)
     formAction         : a plain HTML form POST endpoint
     signupUrl          : hosted signup page (a button links there)
*/
(function () {
  var CONFIG = {
    mlAccount: "2672943",
    mlForm: "2c9hBw",
    formAction: "",
    signupUrl: "",
    emailField: "email",
    heading: "Get the free Homestead Starter Pack",
    text: "Five printable pages: a daily chore checklist, weekly planner, seasonal task prompts, and a shut-offs and emergency contacts card. Free when you join our email list."
  };
  var useML = CONFIG.mlAccount && CONFIG.mlForm;
  if (!useML && !CONFIG.formAction && !CONFIG.signupUrl) return;

  function loadML() {
    if (window.ml) return;
    (function (w, d, e, u, f, l, n) {
      w[f] = w[f] || function () { (w[f].q = w[f].q || []).push(arguments); };
      l = d.createElement(e); l.async = 1; l.src = u;
      n = d.getElementsByTagName(e)[0]; n.parentNode.insertBefore(l, n);
    })(window, document, "script", "https://assets.mailerlite.com/js/universal.js", "ml");
    window.ml("account", CONFIG.mlAccount);
  }

  function build() {
    var box = document.createElement("div");
    box.className = "signup-box";
    var h = document.createElement("h3");
    h.textContent = CONFIG.heading;
    var p = document.createElement("p");
    p.textContent = CONFIG.text;
    box.appendChild(h);
    box.appendChild(p);
    if (useML) {
      var d = document.createElement("div");
      d.className = "ml-embedded";
      d.setAttribute("data-form", CONFIG.mlForm);
      box.appendChild(d);
    } else if (CONFIG.formAction) {
      var f = document.createElement("form");
      f.method = "post";
      f.action = CONFIG.formAction;
      var i = document.createElement("input");
      i.type = "email";
      i.name = CONFIG.emailField;
      i.required = true;
      i.placeholder = "Your email address";
      i.setAttribute("aria-label", "Email address");
      var b = document.createElement("button");
      b.type = "submit";
      b.className = "btn";
      b.textContent = "Send me the free pack";
      f.appendChild(i);
      f.appendChild(b);
      box.appendChild(f);
    } else {
      var a = document.createElement("a");
      a.className = "btn";
      a.href = CONFIG.signupUrl;
      a.textContent = "Get the free pack";
      box.appendChild(a);
    }
    var s = document.createElement("p");
    s.className = "signup-fine";
    s.innerHTML = 'We only email about new guides and printables. Unsubscribe any time. <a href="/homestead-guides/privacy.html">Privacy</a>';
    box.appendChild(s);
    return box;
  }

  function mount() {
    var slot = document.getElementById("signup-slot");
    if (slot) slot.appendChild(build());
    var inline = document.getElementById("signup-inline");
    if (inline) inline.appendChild(build());
    if (useML && (slot || inline)) loadML();
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", mount);
  else mount();
})();
