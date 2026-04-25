import { LitElement as l, html as a } from "lit";
import { property as n } from "lit/decorators.js";
var m = Object.defineProperty, c = (k, t, i, r) => {
  for (var e = void 0, s = k.length - 1, o; s >= 0; s--)
    (o = k[s]) && (e = o(t, i, e) || e);
  return e && m(t, i, e), e;
};
class d extends l {
  createRenderRoot() {
    return this;
  }
  get username() {
    var t;
    return (((t = this.config) == null ? void 0 : t.tiktok_access_token) || "").replace("@", "").trim();
  }
  processTikTokEmbed() {
    var t, i, r, e, s, o, p;
    (r = (i = (t = window.tiktok) == null ? void 0 : t.Embeds) == null ? void 0 : i.process) == null || r.call(i), (s = (e = window.TTEmbed) == null ? void 0 : e.loadEmbeds) == null || s.call(e), (p = (o = window.tiktokEmbed) == null ? void 0 : o.loadEmbeds) == null || p.call(o);
  }
  loadTikTokScript() {
    if (document.querySelector('script[src="https://www.tiktok.com/embed.js"]')) {
      this.processTikTokEmbed();
      return;
    }
    const t = document.createElement("script");
    t.src = "https://www.tiktok.com/embed.js", t.async = !0, t.onload = () => {
      this.processTikTokEmbed();
    }, document.body.appendChild(t);
  }
  async firstUpdated() {
    await this.updateComplete, requestAnimationFrame(() => {
      this.loadTikTokScript();
    });
  }
  updated(t) {
    t.has("config") && requestAnimationFrame(() => {
      this.processTikTokEmbed();
    });
  }
  render() {
    var i, r;
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
          max-width: 780px;
          min-width: 288px;
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
        <div class="tiktok-profile__card">

          <div class="tiktok-profile__header">
            ${(i = this.config) != null && i.tiktok_title ? a`
                  <h3 class="tiktok-profile__title">
                    ${this.config.tiktok_title}
                  </h3>
                ` : ""}

            ${(r = this.config) != null && r.tiktok_subtitle ? a`
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
                  يرجى إدخال اسم المستخدم
                </p>
              `}

        </div>
      </section>
    `;
  }
}
c([
  n({ type: Object })
], d.prototype, "config");
typeof d < "u" && d.registerSallaComponent("salla-tiktok-profile");
export {
  d as default
};
