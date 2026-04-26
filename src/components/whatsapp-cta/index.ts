import { html, LitElement } from 'lit';
import { property } from 'lit/decorators.js';
import { t } from '../../utils/i18n';

export default class WhatsAppCTA extends LitElement {
  @property({ type: Object })
  config?: Record<string, any>;

  createRenderRoot() {
    return this;
  }

  get whatsappUrl() {
    const number = (this.config?.whatsapp_number || '').replace(/\D/g, '');

    if (!number) return '#';

    return `https://wa.me/${number}`;
  }

  render() {
    const bgColor = this.config?.whatsapp_bg_color || '#25D366';
    const textColor = this.config?.whatsapp_text_color || '#FFFFFF';
    const buttonColor = this.config?.whatsapp_button_color || '#FFFFFF';
    const buttonTextColor = this.config?.whatsapp_button_text_color || '#25D366';

    return html`
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
            background:${bgColor};
            color:${textColor};
          "
        >
          ${
            this.config?.whatsapp_title
              ? html`
                  <h2 class="whatsapp-cta__title">
                    ${this.config.whatsapp_title}
                  </h2>
                `
              : ''
          }

          ${
            this.config?.whatsapp_text
              ? html`
                  <p class="whatsapp-cta__text">
                    ${this.config.whatsapp_text}
                  </p>
                `
              : ''
          }

          <a
            href="${this.whatsappUrl}"
            target="_blank"
            rel="noopener noreferrer"
            class="whatsapp-cta__button"
            style="
              background:${buttonColor};
              color:${buttonTextColor};
            "
          >
            ${this.config?.whatsapp_button_text || t('contactNow')}
          </a>
        </div>
      </section>
    `;
  }
}
