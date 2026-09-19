/* ==========================================================================
   Hillside Neighborhood Cafe & Pub — site scripts
   Vanilla JS, no dependencies, no build step.
   ========================================================================== */

(function () {
  "use strict";

  /* ----------------------------------------------------------------------
     1. Mobile navigation
     ---------------------------------------------------------------------- */
  var nav = document.querySelector(".nav");
  var toggle = document.querySelector(".nav__toggle");
  if (nav && toggle) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }

  /* ----------------------------------------------------------------------
     2. Hours — shared source of truth
        Kitchen closes earlier than the bar. Edit here and both the "open now"
        badge and the hours table on the contact page update.
        Times are 24h decimals; 25 means 1:00 AM the next day.
     ---------------------------------------------------------------------- */
  var HOURS = [
    { day: "Sunday",    kitchen: "9:00 AM to 10:00 PM", bar: "9:00 AM to 12:00 AM", open: 9,  close: 24 },
    { day: "Monday",    kitchen: "12:00 PM to 10:00 PM", bar: "12:00 PM to 12:00 AM", open: 12, close: 24 },
    { day: "Tuesday",   kitchen: "12:00 PM to 10:00 PM", bar: "12:00 PM to 12:00 AM", open: 12, close: 24 },
    { day: "Wednesday", kitchen: "12:00 PM to 10:00 PM", bar: "12:00 PM to 12:00 AM", open: 12, close: 24 },
    { day: "Thursday",  kitchen: "12:00 PM to 10:00 PM", bar: "12:00 PM to 12:00 AM", open: 12, close: 24 },
    { day: "Friday",    kitchen: "12:00 PM to 10:00 PM", bar: "12:00 PM to 1:00 AM",  open: 12, close: 25 },
    { day: "Saturday",  kitchen: "12:00 PM to 10:00 PM", bar: "12:00 PM to 1:00 AM",  open: 12, close: 25 }
  ];

  function nowDecimal(d) { return d.getHours() + d.getMinutes() / 60; }

  function isOpenNow() {
    var d = new Date();
    var t = nowDecimal(d);
    var today = HOURS[d.getDay()];
    if (t >= today.open && t < today.close) return true;
    // Spillover from yesterday's late close (e.g. Fri closing at 1 AM Sat).
    var yesterday = HOURS[(d.getDay() + 6) % 7];
    return yesterday.close > 24 && t < yesterday.close - 24;
  }

  var badge = document.querySelector("[data-open-badge]");
  if (badge) {
    var open = isOpenNow();
    badge.querySelector("[data-open-text]").textContent = open ? "Open now" : "Currently closed";
    if (!open) {
      var dot = badge.querySelector(".dot");
      if (dot) { dot.style.background = "#9AA3AE"; dot.style.boxShadow = "0 0 0 3px rgba(154,163,174,.2)"; }
    }
  }

  var hoursBody = document.querySelector("[data-hours-table]");
  if (hoursBody) {
    var todayIdx = new Date().getDay();
    hoursBody.innerHTML = HOURS.map(function (h, i) {
      return '<tr class="' + (i === todayIdx ? "is-today" : "") + '">' +
             "<th>" + h.day + (i === todayIdx ? ", today" : "") + "</th>" +
             "<td>" + h.kitchen + "</td>" +
             "<td>" + h.bar + "</td>" +
             "</tr>";
    }).join("");
  }

  /* ----------------------------------------------------------------------
     3. Menu rendering (menu.html) — reads assets/js/menu-data.js
     ---------------------------------------------------------------------- */
  var menuRoot = document.querySelector("[data-menu-root]");
  if (menuRoot && typeof HILLSIDE_MENU !== "undefined") {
    var esc = function (s) {
      return String(s).replace(/[&<>"']/g, function (c) {
        return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
      });
    };

    menuRoot.innerHTML = HILLSIDE_MENU.map(function (group) {
      var items = group.items.map(function (item) {
        return '<div class="menu-item">' +
          '<div class="menu-item__body">' +
            '<p class="menu-item__name">' + esc(item.name) +
              (item.tag ? '<span class="menu-item__tag">' + esc(item.tag) + "</span>" : "") +
            "</p>" +
            (item.desc ? '<p class="menu-item__desc">' + esc(item.desc) + "</p>" : "") +
          "</div>" +
          '<span class="menu-item__dots" aria-hidden="true"></span>' +
          '<span class="menu-item__price">' + (item.price ? "$" + esc(item.price) : "MKT") + "</span>" +
        "</div>";
      }).join("");

      return '<section class="menu-group" id="' + esc(group.id) + '" data-group="' + esc(group.id) + '">' +
        '<div class="menu-group__head"><h2>' + esc(group.name) + "</h2></div>" +
        (group.note ? '<p class="menu-group__note">' + esc(group.note) + "</p>" : "") +
        items +
      "</section>";
    }).join("");

    // Build the filter chips from the same data.
    var filters = document.querySelector("[data-menu-filters]");
    if (filters) {
      filters.innerHTML =
        '<button class="chip is-active" data-filter="all" type="button">All</button>' +
        HILLSIDE_MENU.map(function (g) {
          return '<button class="chip" data-filter="' + esc(g.id) + '" type="button">' + esc(g.name) + "</button>";
        }).join("");

      filters.addEventListener("click", function (e) {
        var chip = e.target.closest(".chip");
        if (!chip) return;
        var filter = chip.getAttribute("data-filter");

        filters.querySelectorAll(".chip").forEach(function (c) { c.classList.remove("is-active"); });
        chip.classList.add("is-active");

        menuRoot.querySelectorAll("[data-group]").forEach(function (g) {
          g.style.display = (filter === "all" || g.getAttribute("data-group") === filter) ? "" : "none";
        });
        if (filter !== "all") window.scrollTo({ top: menuRoot.offsetTop - 160, behavior: "smooth" });
      });
    }
  }

  /* ----------------------------------------------------------------------
     4. Catering form (contact.html)
        Submits to Formspree via fetch so the visitor never leaves the page.
        Set your endpoint in the form's action attribute in contact.html.
     ---------------------------------------------------------------------- */
  var form = document.querySelector("[data-ajax-form]");
  if (form) {
    var status = form.querySelector(".form-status");
    var submitBtn = form.querySelector('[type="submit"]');

    form.addEventListener("submit", function (e) {
      e.preventDefault();

      // Honeypot: real people leave this blank.
      if (form.querySelector('[name="_gotcha"]') && form.querySelector('[name="_gotcha"]').value) return;

      var action = form.getAttribute("action") || "";
      if (action.indexOf("YOUR_FORM_ID") !== -1 || !action) {
        status.className = "form-status is-err";
        status.textContent = "This form isn't connected yet. Add your Formspree endpoint to the form's action attribute in contact.html.";
        return;
      }

      var original = submitBtn.textContent;
      submitBtn.textContent = "Sending…";
      submitBtn.disabled = true;
      status.className = "form-status";

      fetch(action, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" }
      })
        .then(function (res) {
          if (res.ok) {
            form.reset();
            status.className = "form-status is-ok";
            status.textContent = "Thanks, your inquiry is in. We'll get back to you within one business day. For anything urgent, call (203) 751-9285.";
          } else {
            throw new Error("Bad response");
          }
        })
        .catch(function () {
          status.className = "form-status is-err";
          status.textContent = "Something went wrong sending that. Please call us at (203) 751-9285, or message us on Facebook.";
        })
        .then(function () {
          submitBtn.textContent = original;
          submitBtn.disabled = false;
        });
    });
  }


  /* ----------------------------------------------------------------------
     6. Facebook feed (neighborhood.html)
        Reads assets/data/facebook-posts.json, which the GitHub Action in
        .github/workflows/facebook-feed.yml refreshes every 6 hours.
        If the file isn't there yet, the embedded Facebook timeline below it
        stays visible instead. Nothing breaks either way.
     ---------------------------------------------------------------------- */
  var feed = document.querySelector("[data-fb-feed]");
  if (feed) {
    var fallback = document.querySelector("[data-fb-fallback]");
    var esc2 = function (v) {
      return String(v).replace(/[&<>"']/g, function (c) {
        return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
      });
    };
    var when = function (iso) {
      var d = new Date(iso);
      if (isNaN(d)) return "";
      var days = Math.floor((Date.now() - d) / 86400000);
      if (days === 0) return "Today";
      if (days === 1) return "Yesterday";
      if (days < 7) return days + " days ago";
      return d.toLocaleDateString(undefined, { month: "short", day: "numeric" });
    };

    fetch("assets/data/facebook-posts.json", { cache: "no-cache" })
      .then(function (r) { if (!r.ok) throw new Error("no feed"); return r.json(); })
      .then(function (data) {
        var posts = (data && data.posts) || [];
        if (!posts.length) throw new Error("empty feed");

        feed.innerHTML = posts.map(function (p) {
          var text = (p.message || "").trim();
          if (text.length > 260) text = text.slice(0, 257).trim() + "\u2026";
          return '<a class="fbpost" href="' + esc2(p.url || "#") + '" target="_blank" rel="noopener">' +
            (p.image ? '<span class="fbpost__img"><img src="' + esc2(p.image) + '" alt="" loading="lazy"></span>' : "") +
            '<span class="fbpost__body">' +
              '<span class="fbpost__date">' + esc2(when(p.created)) + "</span>" +
              (text ? "<p>" + esc2(text) + "</p>" : "") +
            "</span>" +
          "</a>";
        }).join("");

        feed.hidden = false;
        if (fallback) fallback.hidden = true;
      })
      .catch(function () {
        // No JSON yet - leave the embedded timeline showing.
        feed.hidden = true;
        if (fallback) fallback.hidden = false;
      });
  }

  /* ----------------------------------------------------------------------
     5. Footer year
     ---------------------------------------------------------------------- */
  document.querySelectorAll("[data-year]").forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });
})();
