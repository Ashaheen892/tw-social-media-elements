import { LitElement as c, html as l } from "lit";
import { property as m } from "lit/decorators.js";
var a = Object.defineProperty, k = (d, e, i, o) => {
  for (var t = void 0, r = d.length - 1, s; r >= 0; r--)
    (s = d[r]) && (t = s(e, i, t) || t);
  return t && a(e, i, t), t;
};
class n extends c {
  createRenderRoot() {
    return this;
  }
  get username() {
    var e;
    return (((e = this.config) == null ? void 0 : e.tiktok_access_token) || "").replace("@", "").trim();
  }
  fixIframe() {
    const e = this.querySelector(".tiktok-profile__embed iframe");
    e && (e.style.removeProperty("display"), e.style.removeProperty("visibility"), e.style.removeProperty("height"), e.style.removeProperty("width"), e.style.setProperty("width", "100%"), this.querySelectorAll(".tiktok-profile__embed *").forEach((i) => {
      i.style.overflow = "hidden";
    }));
  }
  observeIframe() {
    var i;
    const e = this.querySelector(".tiktok-profile__embed");
    e && ((i = this.observer) == null || i.disconnect(), this.observer = new MutationObserver(() => {
      this.fixIframe();
    }), this.observer.observe(e, {
      childList: !0,
      subtree: !0,
      attributes: !0,
      attributeFilter: ["style"]
    }));
  }
  initTikTokEmbed() {
    const e = () => {
      var t, r, s;
      (s = (r = (t = window.tiktok) == null ? void 0 : t.Embeds) == null ? void 0 : r.process) == null || s.call(r), setTimeout(() => {
        this.fixIframe(), this.observeIframe();
      }, 400);
    };
    if (document.querySelector('script[src="https://www.tiktok.com/embed.js"]')) {
      e();
      return;
    }
    const o = document.createElement("script");
    o.src = "https://www.tiktok.com/embed.js", o.async = !0, o.onload = e, document.body.appendChild(o);
  }
  disconnectedCallback() {
    var e;
    super.disconnectedCallback(), (e = this.observer) == null || e.disconnect();
  }
  firstUpdated() {
    this.initTikTokEmbed();
  }
  updated(e) {
    e.has("config") && this.initTikTokEmbed();
  }
  render() {
    const e = this.username;
    return l`
      <style>
        .tiktok-profile__embed {
          max-width: 780px;
          min-width: 288px;
          margin: 0 auto;
          overflow: hidden;
        }

        .tiktok-profile__embed iframe {
          width: 100%;
          border: none;
          display: block;
        }

        .tiktok-profile__embed,
        .tiktok-profile__embed * {
          scrollbar-width: none;
        }

        .tiktok-profile__embed *::-webkit-scrollbar {
          display: none;
        }

        .tiktok-profile__embed > div,
        .tiktok-profile__embed section,
        .tiktok-profile__embed iframe {
          overflow: hidden !important;
        }
      </style>

      ${e ? l`
              <blockquote
                class="tiktok-embed tiktok-profile__embed"
                cite="https://www.tiktok.com/@${e}"
                data-unique-id="${e}"
                data-embed-from="oembed"
                data-embed-type="creator"
              >
                <section></section>
              </blockquote>
            ` : ""}
    `;
  }
}
k([
  m({ type: Object })
], n.prototype, "config");
typeof n < "u" && n.registerSallaComponent("salla-tiktok-profile");
export {
  n as default
};
