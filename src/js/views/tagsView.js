import { elements } from './base';

const renderTag = tag => `<a href="javascript:void(0)" class="tag-pill tag-default" data-selectTag="${tag}">${tag}</a>`;

export const renderTags = tags => {
  const markup = `
    <div class="col-md-3">
      <div class="sidebar">
        <p>Popular Tags</p>
        <div class="tag-list">
          ${tags.map(el => renderTag(el)).join('')}
        </div>
      </div>
    </div>
  `;

  document.querySelector('.col-md-9').insertAdjacentHTML("afterend", markup);
}
