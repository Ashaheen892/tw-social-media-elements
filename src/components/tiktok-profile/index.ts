import { html, LitElement } from 'lit';
import { property } from 'lit/decorators.js';

export default class TikTokProfile extends LitElement {
  @property({ type: Object })
  config?: Record<string, any>;

  createRenderRoot() {
    return this;
  }

  get username() {
    return (this.config?.tiktok_access_token || '').replace('@', '').trim();
  }

  initTikTokEmbed() {
    const blockquote = this.querySelector('.tiktok-embed');
    if (!blockquote) return;

    const existingScript = document.querySelector('script[src="https://www.tiktok.com/embed.js"]');

    if (existingScript) {
      setTimeout(() => {
        window.tiktok?.Embeds?.process?.();
      }, 300);
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://www.tiktok.com/embed.js';
    script.async = true;

    script.onload = () => {
      setTimeout(() => {
        window.tiktok?.Embeds?.process?.();
      }, 300);
    };

    blockquote.insertAdjacentElement('afterend', script);
  }

  firstUpdated() {
    this.initTikTokEmbed();
  }

  updated(changedProps: Map<string, any>) {
    if (changedProps.has('config')) {
      this.initTikTokEmbed();
    }
  }

  render() {
    const username = this.username;

    return html`
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
          min-height: clamp(500px, 70vh, 740px);
        }

        .tiktok-profile__embed iframe {
          width: 100% !important;
          height: 100% !important;
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
            ${this.config?.tiktok_title ? html`<h3 class="tiktok-profile__title">${this.config.tiktok_title}</h3>` : ''}

            ${this.config?.tiktok_subtitle ? html`<p class="tiktok-profile__subtitle">${this.config.tiktok_subtitle}</p>` : ''}
          </div>

          ${
            username
              ? html`
                <blockquote
                  class="tiktok-embed tiktok-profile__embed"
                  cite="https://www.tiktok.com/@${username}"
                  data-unique-id="${username}"
                  data-embed-from="oembed"
                  data-embed-type="creator"
                >
                  <section></section>
                </blockquote>
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
