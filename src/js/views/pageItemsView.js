import { elements } from './base';

const renderPageItem = (page, active = false) => `<li class="page-item${active ? ' active' : ''}" data-gotopage="${page}"><a class="page-link">${page}</a></li>`;

export const renderPageItems = (pages, activePageIndex) => {
  let arr = [];
  for (let i = 1; i <= pages; i++) {
    arr.push(i);
  }
  const markup = `
    <nav>
      <ul class="pagination">
        ${arr.map(el => {
          if (activePageIndex == el) return renderPageItem(el, true)
          return renderPageItem(el)
        }).join('')}
      </ul>
    </nav>
  `;

  document.querySelector('.col-md-9').insertAdjacentHTML('beforeend', markup);
}
