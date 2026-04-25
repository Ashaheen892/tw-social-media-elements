import { html, LitElement } from 'lit';
import { property } from 'lit/decorators.js';

export default class InstagramProfile extends LitElement {
  @property({ type: Object })
  config?: Record<string, any>;

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
        window.instgrm?.Embeds.process();
      }, 500);
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://www.instagram.com/embed.js';
    script.async = true;

    script.onload = () => {
      window.instgrm?.Embeds.process();
    };

    document.body.appendChild(script);
  }

  firstUpdated() {
    this.loadInstagramScript();
  }

  updated() {
    setTimeout(() => {
      window.instgrm?.Embeds.process();
    }, 300);
  }

  get username() {
    return (this.config?.access_token || '').replace('@', '').trim();
  }

  render() {
    const username = this.username;

    return html`
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
            ${
              this.config?.instagram_title
                ? html`
                  <h3 class="instagram-profile__title">
                    ${this.config.instagram_title}
                  </h3>
                `
                : ''
            }

            ${
              this.config?.instagram_subtitle
                ? html`
                  <p class="instagram-profile__subtitle">
                    ${this.config.instagram_subtitle}
                  </p>
                `
                : ''
            }
          </div>

          ${
            username
              ? html`
                <blockquote
                  class="instagram-media instagram-profile__embed"
                  data-instgrm-permalink="https://www.instagram.com/${username}"
                  data-instgrm-version="14"
                ></blockquote>
              `
              : html`
                <p class="instagram-profile__empty">
                  يرجى إدخال اسم المستخدم
                </p>
              `
          }
        </div>
      </section>
    `;
  }
}
