import { html, LitElement } from 'lit';
import { property } from 'lit/decorators.js';

export default class TikTokProfile extends LitElement {
  @property({ type: Object })
  config?: Record<string, any>;

  private observer?: MutationObserver;

  createRenderRoot() {
    return this;
  }

  get username() {
    return (this.config?.tiktok_access_token || '').replace('@', '').trim();
  }

  fixIframe() {
    const iframe = this.querySelector('.tiktok-profile__embed iframe') as HTMLIFrameElement | null;

    if (!iframe) return;

    iframe.style.removeProperty('display');
    iframe.style.removeProperty('visibility');

    iframe.style.setProperty('width', '100%');
    iframe.style.setProperty('height', '100%');
  }

  observeIframe() {
    const iframe = this.querySelector('.tiktok-profile__embed iframe');

    if (!iframe) return;

    this.observer?.disconnect();

    this.observer = new MutationObserver(() => {
      this.fixIframe();
    });

    this.observer.observe(iframe, {
      attributes: true,
      attributeFilter: ['style'],
    });
  }

  initTikTokEmbed() {
    const process = () => {
      window.tiktok?.Embeds?.process?.();

      setTimeout(() => {
        this.fixIframe();
        this.observeIframe();
      }, 500);
    };

    const existingScript = document.querySelector('script[src="https://www.tiktok.com/embed.js"]');

    if (existingScript) {
      process();
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://www.tiktok.com/embed.js';
    script.async = true;
    script.onload = process;

    document.body.appendChild(script);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.observer?.disconnect();
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
          max-width: 540px;
          aspect-ratio: 9 / 16;
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
