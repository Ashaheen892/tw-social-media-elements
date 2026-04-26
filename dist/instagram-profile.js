import { LitElement as l, html as i } from "lit";
import { property as p } from "lit/decorators.js";
import { t as d } from "./i18n-CYKsEwim.js";
var c = Object.defineProperty, g = (a, t, e, s) => {
  for (var r = void 0, n = a.length - 1, m; n >= 0; n--)
    (m = a[n]) && (r = m(t, e, r) || r);
  return r && c(t, e, r), r;
};
class o extends l {
  createRenderRoot() {
    return this;
  }
  loadInstagramScript() {
    if (window.instgrm) {
      window.instgrm.Embeds.process();
      return;
    }
    if (document.querySelector('script[src="https://www.instagram.com/embed.js"]')) {
      setTimeout(() => {
        var e;
        (e = window.instgrm) == null || e.Embeds.process();
      }, 500);
      return;
    }
    const t = document.createElement("script");
    t.src = "https://www.instagram.com/embed.js", t.async = !0, t.onload = () => {
      var e;
      (e = window.instgrm) == null || e.Embeds.process();
    }, document.body.appendChild(t);
  }
  firstUpdated() {
    this.loadInstagramScript();
  }
  updated() {
    setTimeout(() => {
      var t;
      (t = window.instgrm) == null || t.Embeds.process();
    }, 300);
  }
  get username() {
    var t;
    return (((t = this.config) == null ? void 0 : t.access_token) || "").replace("@", "").trim();
  }
  render() {
    var e, s;
    const t = this.username;
    return i`
      <style>
        .instagram-profile {
          max-width: 990px;
          margin: 0 auto;
          padding: 20px 16px;
        }

        .instagram-profile__card {
          overflow: hidden;
          width: 100%;
        }

        .instagram-profile__header {
          margin-bottom: 20px;
          text-align: center;
        }

        .instagram-profile__title {
          font-size: 18px;
          font-weight: bold;
          margin-bottom: 8px;
          color: #000;
        }

        .instagram-profile__subtitle {
          font-size: 14px;
          color: #777;
        }

        .instagram-profile__embed {
          margin: 0 auto;
          width: 100%;
        }

        .instagram-profile__empty {
          text-align: center;
          color: #777;
        }

        /* ================= DARK MODE ================= */

        [data-theme="dark"] .instagram-profile__title {
          color: #fff;
        }

        [data-theme="dark"] .instagram-profile__subtitle,
        [data-theme="dark"] .instagram-profile__empty {
          color: #aaa;
        }
      </style>

      <section class="instagram-profile">
        <div class="instagram-profile__card">

          <div class="instagram-profile__header">
            ${(e = this.config) != null && e.instagram_title ? i`
                  <h3 class="instagram-profile__title">
                    ${this.config.instagram_title}
                  </h3>
                ` : ""}

            ${(s = this.config) != null && s.instagram_subtitle ? i`
                  <p class="instagram-profile__subtitle">
                    ${this.config.instagram_subtitle}
                  </p>
                ` : ""}
          </div>

          ${t ? i`
                <blockquote
                  class="instagram-media instagram-profile__embed"
                  data-instgrm-permalink="https://www.instagram.com/${t}"
                  data-instgrm-version="14"
                ></blockquote>
              ` : i`
                <p class="instagram-profile__empty">
                  ${d("enterUsername")}
                </p>
              `}
        </div>
      </section>
    `;
  }
}
g([
  p({ type: Object })
], o.prototype, "config");
typeof o < "u" && o.registerSallaComponent("salla-instagram-profile");
export {
  o as default
};
