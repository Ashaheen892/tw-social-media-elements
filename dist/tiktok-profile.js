import { LitElement as n, html as k } from "lit";
import { property as d } from "lit/decorators.js";
var l = Object.defineProperty, m = (s, t, o, i) => {
  for (var e = void 0, r = s.length - 1, p; r >= 0; r--)
    (p = s[r]) && (e = p(t, o, e) || e);
  return e && l(t, o, e), e;
};
class a extends n {
  createRenderRoot() {
    return this;
  }
  loadTikTokScript() {
    var o;
    if ((o = window.tiktok) != null && o.Embeds) {
      window.tiktok.Embeds.process();
      return;
    }
    if (document.querySelector('script[src="https://www.tiktok.com/embed.js"]')) {
      setTimeout(() => {
        var i, e;
        return (e = (i = window.tiktok) == null ? void 0 : i.Embeds) == null ? void 0 : e.process();
      }, 700);
      return;
    }
    const t = document.createElement("script");
    t.src = "https://www.tiktok.com/embed.js", t.async = !0, t.onload = () => {
      setTimeout(() => {
        var i, e;
        return (e = (i = window.tiktok) == null ? void 0 : i.Embeds) == null ? void 0 : e.process();
      }, 500);
    }, document.body.appendChild(t);
  }
  firstUpdated() {
    this.loadTikTokScript();
  }
  updated(t) {
    t.has("config") && setTimeout(() => {
      var o, i;
      (i = (o = window.tiktok) == null ? void 0 : o.Embeds) == null || i.process();
    }, 700);
  }
  get username() {
    var t;
    return (((t = this.config) == null ? void 0 : t.tiktok_username) || "").replace("@", "").trim();
  }
  render() {
    var o, i, e, r;
    const t = this.username;
    return k`
      <style>
        .tiktok-profile {
          margin: 32px 0;
        }

        .tiktok-profile__container {
          max-width: 1440px;
          margin: 0 auto;
          padding: 0 16px;
        }

        .tiktok-profile__header {
          text-align: center;
          margin-bottom: 24px;
        }

        .tiktok-profile__title {
          font-size: 20px;
          font-weight: 700;
          margin-bottom: 8px;
          color: #000;
        }

        .tiktok-profile__subtitle {
          font-size: 14px;
          color: #777;
        }

        .tiktok-profile__embed-wrapper {
          width: 75%;
          margin: 0 auto;
        }

        @media (min-width: 768px) {
          .tiktok-profile__embed-wrapper {
            width: 33.333%;
          }
        }

        .tiktok-profile__embed {
          max-width: 780px;
          min-width: 288px;
          margin: 0 auto;
        }

        .tiktok-profile__embed iframe {
          min-width: auto !important;
          min-height: inherit !important;
          max-height: inherit !important;
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
        <div class="tiktok-profile__container">

          ${(o = this.config) != null && o.tiktok_title || (i = this.config) != null && i.tiktok_subtitle ? k`
                <div class="tiktok-profile__header">
                  ${(e = this.config) != null && e.tiktok_title ? k`
                        <h3 class="tiktok-profile__title">
                          ${this.config.tiktok_title}
                        </h3>
                      ` : ""}

                  ${(r = this.config) != null && r.tiktok_subtitle ? k`
                        <p class="tiktok-profile__subtitle">
                          ${this.config.tiktok_subtitle}
                        </p>
                      ` : ""}
                </div>
              ` : ""}

          ${t ? k`
                <div class="tiktok-profile__embed-wrapper">
                  <blockquote
                    class="tiktok-embed tiktok-profile__embed"
                    cite="https://www.tiktok.com/@${t}"
                    data-unique-id="${t}"
                    data-embed-from="oembed"
                    data-embed-type="creator"
                  >
                    <section></section>
                  </blockquote>
                </div>
              ` : k`
                <p class="tiktok-profile__empty">
                  يرجى إدخال اسم المستخدم
                </p>
              `}

        </div>
      </section>
    `;
  }
}
m([
  d({ type: Object })
], a.prototype, "config");
typeof a < "u" && a.registerSallaComponent("salla-tiktok-profile");
export {
  a as default
};
