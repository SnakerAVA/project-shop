class ProductList {
    constructor(productsUrl, renderContainer, cart) {
      this.cart = cart;
      fetch(productsUrl)
        .then(result => result.json())
        .then(products => {
          this.renderProducts(renderContainer, products);
          this.addEventListeners();
        });
    }
    getProductById(id) {
      return this.products.find(el => el.id === id);
    }
    renderProducts(container, products) {
      let productListDomString = '';
      products.forEach(product => {
        productListDomString += `
            <article class="card product">
                <a href="product.html"><img src="img/${product.image}" class="card-img-top" alt="${product.title}"></a>
                <div class="card-body">
                    <h5 class="card-title">${product.title}</h5>
                    <div class="box-elements">
                        <a class="btn price">${product.price} UAH</a>
                        <button class="btn btn-primary buy" data-id="${product.id}">+ <i class="fas fa-shopping-cart"></i></button>
                    </div>
                </div>
            </article>`;
      });
      container.html(productListDomString);
    }
    addEventListeners() {
      $('#productInfoModal').on('show.bs.modal', event => {
        const button = $(event.relatedTarget); // Button that triggered the modal
        const id = String(button.data('id')); // Extract info from data-* attributes
        const product = this.getProductById(id);
        const modal = $('#productInfoModal');
        modal
          .find('.modal-body .card-img-top')
          .attr('src', 'img/' + product.image)
          .attr('alt', product.title);
        modal.find('.modal-body .card-title').text(product.title);
        modal.find('.modal-body .card-text').text(product.description);
        modal
          .find('button.buy')
          .text(`${product.price} - Buy`)
          .data('id', id);
      });
      $('.card.product button.buy, #productInfoModal button.buy').click(event => {
        const button = $(event.target);
        const id = button.data('id');
        this.cart.addProduct(id);
        window.showAlert('Товар доданий у корзину');
      });
    }
  }
