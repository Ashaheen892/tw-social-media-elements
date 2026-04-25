import { html, LitElement } from 'lit';
import { property } from 'lit/decorators.js';

export default class TikTokProfile extends LitElement {
  @property({ type: Object })
  config?: Record<string, any>;

  createRenderRoot() {
    return this;
  }

  loadTikTokScript() {
    if (window.tiktok?.Embeds) {
      window.tiktok.Embeds.process();
      return;
    }

    if (document.querySelector('script[src="https://www.tiktok.com/embed.js"]')) {
      setTimeout(() => window.tiktok?.Embeds?.process(), 700);
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://www.tiktok.com/embed.js';
    script.async = true;

    script.onload = () => {
      setTimeout(() => window.tiktok?.Embeds?.process(), 500);
    };

    document.body.appendChild(script);
  }

  firstUpdated() {
    this.loadTikTokScript();
  }

  updated(changedProps: Map<string, any>) {
    if (changedProps.has('config')) {
      setTimeout(() => {
        window.tiktok?.Embeds?.process();
      }, 700);
    }
  }

  get username() {
    return (this.config?.tiktok_username || '').replace('@', '').trim();
  }

  render() {
    const username = this.username;

    return html`
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

          ${
            this.config?.tiktok_title || this.config?.tiktok_subtitle
              ? html`
                <div class="tiktok-profile__header">
                  ${
                    this.config?.tiktok_title
                      ? html`
                        <h3 class="tiktok-profile__title">
                          ${this.config.tiktok_title}
                        </h3>
                      `
                      : ''
                  }

                  ${
                    this.config?.tiktok_subtitle
                      ? html`
                        <p class="tiktok-profile__subtitle">
                          ${this.config.tiktok_subtitle}
                        </p>
                      `
                      : ''
                  }
                </div>
              `
              : ''
          }

          ${
            username
              ? html`
                <div class="tiktok-profile__embed-wrapper">
                  <blockquote
                    class="tiktok-embed tiktok-profile__embed"
                    cite="https://www.tiktok.com/@${username}"
                    data-unique-id="${username}"
                    data-embed-from="oembed"
                    data-embed-type="creator"
                  >
                    <section></section>
                  </blockquote>
                </div>
              `
              : html`
                <p class="tiktok-profile__empty">
                  يرجى إدخال اسم المستخدم
                </p>
              `
          }

        </div>
      </section>
    `;
  }
}
