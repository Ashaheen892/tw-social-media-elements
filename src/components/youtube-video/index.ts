import { html, LitElement } from 'lit';
import { property } from 'lit/decorators.js';

export default class YoutubeVideo extends LitElement {
  @property({ type: Object })
  config?: Record<string, any>;

  createRenderRoot() {
    return this;
  }

  get videoUrl() {
    return (this.config?.youtube_video_url || '').trim();
  }

  get embedUrl() {
    const url = this.videoUrl;

    if (!url) return '';

    // دعم روابط youtu.be
    if (url.includes('youtu.be/')) {
      const id = url.split('youtu.be/')[1]?.split('?')[0];
      return `https://www.youtube.com/embed/${id}?rel=0`;
    }

    // دعم watch?v=
    if (url.includes('watch?v=')) {
      const id = url.split('watch?v=')[1]?.split('&')[0];
      return `https://www.youtube.com/embed/${id}?rel=0`;
    }

    // دعم embed مباشر
    if (url.includes('/embed/')) {
      return url;
    }

    return '';
  }

  render() {
    const embedUrl = this.embedUrl;

    return html`
      <style>
        .youtube-video {
          max-width: 990px;
          margin: 0 auto;
          padding: 20px 16px;
        }

        .youtube-video__card {
          width: 100%;
          overflow: hidden;
        }

        .youtube-video__header {
          margin-bottom: 20px;
          text-align: center;
        }

        .youtube-video__title {
          font-size: 18px;
          font-weight: bold;
          margin-bottom: 8px;
          color: #000;
        }

        .youtube-video__subtitle {
          font-size: 14px;
          color: #777;
        }

        .youtube-video__frame {
          position: relative;
          width: 100%;
          padding-bottom: 56.25%;
          overflow: hidden;
          border-radius: 16px;
        }

        .youtube-video__frame iframe {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          border: 0;
        }

        .youtube-video__empty {
          text-align: center;
          color: #777;
        }

        [data-theme='dark'] .youtube-video__title {
          color: #fff;
        }

        [data-theme='dark'] .youtube-video__subtitle,
        [data-theme='dark'] .youtube-video__empty {
          color: #aaa;
        }
      </style>

      <section class="youtube-video">
        <div class="youtube-video__card">

          <div class="youtube-video__header">
            ${
              this.config?.youtube_title
                ? html`
                    <h3 class="youtube-video__title">
                      ${this.config.youtube_title}
                    </h3>
                  `
                : ''
            }

            ${
              this.config?.youtube_subtitle
                ? html`
                    <p class="youtube-video__subtitle">
                      ${this.config.youtube_subtitle}
                    </p>
                  `
                : ''
            }
          </div>

          ${
            embedUrl
              ? html`
                  <div class="youtube-video__frame">
                    <iframe
                      src="${embedUrl}"
                      allowfullscreen
                      loading="lazy"
                      referrerpolicy="strict-origin"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    ></iframe>
                  </div>
                `
              : html`
                  <p class="youtube-video__empty">
                    يرجى إدخال رابط فيديو يوتيوب صحيح
                  </p>
                `
          }

        </div>
      </section>
    `;
  }
}
