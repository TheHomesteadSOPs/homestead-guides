/* Homestead Guides - email signup block.
   Nothing shows until ONE of these is filled in:
     formAction : a plain HTML form POST endpoint from your email service
     signupUrl  : the email service's hosted signup page (a button links there)
*/
(function () {
  var CONFIG = {
    formAction: "",
    signupUrl: "",
    emailField: "email",
    heading: "Get the free Homestead Starter Pack",
    text: "Four printable pages: a daily chore checklist, weekly planner, seasonal task prompts, and an emergency contacts card. Free when you join our email list."
  };
  if (!CONFIG.formAction && !CONFIG.signupUrl) return;

  function build() {
    var box = document.createElement("div");
    box.className = "signup-box";
    var h = document.createElement("h3");
    h.textContent = CONFIG.heading;
    var p = document.createElement("p");
    p.textContent = CONFIG.text;
    box.appendChild(h);
    box.appendChild(p);
    if (CONFIG.formAction) {
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
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", mount);
  else mount();
})();
