import { LitElement as w, html as n } from "lit";
import { property as f } from "lit/decorators.js";
var d = Object.defineProperty, g = (s, a, p, r) => {
  for (var t = void 0, e = s.length - 1, o; e >= 0; e--)
    (o = s[e]) && (t = o(a, p, t) || t);
  return t && d(a, p, t), t;
};
class i extends w {
  createRenderRoot() {
    return this;
  }
  get whatsappUrl() {
    var p;
    const a = (((p = this.config) == null ? void 0 : p.whatsapp_number) || "").replace(/\D/g, "");
    return a ? `https://wa.me/${a}` : "#";
  }
  render() {
    var e, o, h, c, l, _, x;
    const a = ((e = this.config) == null ? void 0 : e.whatsapp_bg_color) || "#25D366", p = ((o = this.config) == null ? void 0 : o.whatsapp_text_color) || "#FFFFFF", r = ((h = this.config) == null ? void 0 : h.whatsapp_button_color) || "#FFFFFF", t = ((c = this.config) == null ? void 0 : c.whatsapp_button_text_color) || "#25D366";
    return n`
      <style>
        .whatsapp-cta {
          margin: 32px auto;
          max-width: 1200px;
          padding: 0 16px;
        }

        .whatsapp-cta__box {
          border-radius: 20px;
          padding: 32px 24px;
          text-align: center;
          overflow: hidden;
          position: relative;
        }

        .whatsapp-cta__title {
          font-size: 28px;
          font-weight: 700;
          margin-bottom: 12px;
          line-height: 1.4;
        }

        .whatsapp-cta__text {
          font-size: 15px;
          line-height: 1.8;
          max-width: 700px;
          margin: 0 auto 24px;
          opacity: 0.95;
        }

        .whatsapp-cta__button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          min-width: 180px;
          padding: 14px 28px;
          border-radius: 999px;
          text-decoration: none;
          font-weight: 700;
          font-size: 15px;
          transition: 0.3s ease;
        }

        .whatsapp-cta__button:hover {
          transform: translateY(-2px);
          opacity: 0.92;
        }

        @media (max-width: 768px) {
          .whatsapp-cta__box {
            padding: 24px 18px;
          }

          .whatsapp-cta__title {
            font-size: 22px;
          }

          .whatsapp-cta__text {
            font-size: 14px;
          }

          .whatsapp-cta__button {
            width: 100%;
          }
        }
      </style>

      <section class="whatsapp-cta">
        <div
          class="whatsapp-cta__box"
          style="
            background:${a};
            color:${p};
          "
        >
          ${(l = this.config) != null && l.whatsapp_title ? n`
                  <h2 class="whatsapp-cta__title">
                    ${this.config.whatsapp_title}
                  </h2>
                ` : ""}

          ${(_ = this.config) != null && _.whatsapp_text ? n`
                  <p class="whatsapp-cta__text">
                    ${this.config.whatsapp_text}
                  </p>
                ` : ""}

          <a
            href="${this.whatsappUrl}"
            target="_blank"
            rel="noopener noreferrer"
            class="whatsapp-cta__button"
            style="
              background:${r};
              color:${t};
            "
          >
            ${((x = this.config) == null ? void 0 : x.whatsapp_button_text) || "تواصل الآن"}
          </a>
        </div>
      </section>
    `;
  }
}
g([
  f({ type: Object })
], i.prototype, "config");
typeof i < "u" && i.registerSallaComponent("salla-whatsapp-cta");
export {
  i as default
};
