import { LitElement as k, html as a } from "lit";
import { property as d } from "lit/decorators.js";
import { t as c } from "./i18n-CYKsEwim.js";
var p = Object.defineProperty, f = (l, t, e, o) => {
  for (var i = void 0, r = l.length - 1, s; r >= 0; r--)
    (s = l[r]) && (i = s(t, e, i) || i);
  return i && p(t, e, i), i;
};
class n extends k {
  createRenderRoot() {
    return this;
  }
  get username() {
    var t;
    return (((t = this.config) == null ? void 0 : t.tiktok_access_token) || "").replace("@", "").trim();
  }
  fixIframe() {
    const t = this.querySelector(".tiktok-profile__embed iframe");
    t && (t.style.removeProperty("display"), t.style.removeProperty("visibility"), t.style.setProperty("width", "100%"), t.style.setProperty("height", "100%"));
  }
  observeIframe() {
    var e;
    const t = this.querySelector(".tiktok-profile__embed iframe");
    t && ((e = this.observer) == null || e.disconnect(), this.observer = new MutationObserver(() => {
      this.fixIframe();
    }), this.observer.observe(t, {
      attributes: !0,
      attributeFilter: ["style"]
    }));
  }
  initTikTokEmbed() {
    const t = () => {
      var i, r, s;
      (s = (r = (i = window.tiktok) == null ? void 0 : i.Embeds) == null ? void 0 : r.process) == null || s.call(r), setTimeout(() => {
        this.fixIframe(), this.observeIframe();
      }, 500);
    };
    if (document.querySelector('script[src="https://www.tiktok.com/embed.js"]')) {
      t();
      return;
    }
    const o = document.createElement("script");
    o.src = "https://www.tiktok.com/embed.js", o.async = !0, o.onload = t, document.body.appendChild(o);
  }
  disconnectedCallback() {
    var t;
    super.disconnectedCallback(), (t = this.observer) == null || t.disconnect();
  }
  firstUpdated() {
    this.initTikTokEmbed();
  }
  updated(t) {
    t.has("config") && this.initTikTokEmbed();
  }
  render() {
    var e, o;
    const t = this.username;
    return a`
      <style>
        .tiktok-profile {
          max-width: 990px;
          margin: 0 auto;
          padding: 20px 16px;
        }

        .tiktok-profile__card {
          overflow: hidden;
          width: 100%;
        }

        .tiktok-profile__header {
          margin-bottom: 20px;
          text-align: center;
        }

        .tiktok-profile__title {
          font-size: 18px;
          font-weight: bold;
          margin-bottom: 8px;
          color: #000;
        }

        .tiktok-profile__subtitle {
          font-size: 14px;
          color: #777;
        }

        .tiktok-profile__embed {
          margin: 0 auto;
          width: 100%;
          max-width:878px;
          height: 494px;

          
          // aspect-ratio: 1 / 1;
          overflow: hidden;
        }

        .tiktok-profile__embed iframe {
          width: 100%;
          height: 100%;
          border: none;
          display: block;
        }
      .tiktok-profile__empty {
          text-align: center;
          color: #777;
        }

        [data-theme="dark"] .tiktok-profile__title {
          color: #fff;
        }

        [data-theme="dark"] .tiktok-profile__subtitle,
        [data-theme="dark"] .tiktok-profile__empty {
          color: #aaa;
        }
      </style>

      <section class="tiktok-profile">
        <div class="tiktok-profile__card">

          <div class="tiktok-profile__header">
            ${(e = this.config) != null && e.tiktok_title ? a`
                    <h3 class="tiktok-profile__title">
                      ${this.config.tiktok_title}
                    </h3>
                  ` : ""}

            ${(o = this.config) != null && o.tiktok_subtitle ? a`
                    <p class="tiktok-profile__subtitle">
                      ${this.config.tiktok_subtitle}
                    </p>
                  ` : ""}
          </div>

          ${t ? a`
                  <blockquote
                    class="tiktok-embed tiktok-profile__embed"
                    cite="https://www.tiktok.com/@${t}"
                    data-unique-id="${t}"
                    data-embed-from="oembed"
                    data-embed-type="creator"
                  >
                    <section></section>
                  </blockquote>
                ` : a`
                  <p class="tiktok-profile__empty">
                    ${c("enterUsername")}
                  </p>
                `}

        </div>
      </section>
    `;
  }
}
f([
  d({ type: Object })
], n.prototype, "config");
typeof n < "u" && n.registerSallaComponent("salla-tiktok-profile");
export {
  n as default
};
