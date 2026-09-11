(() => {
  const form = document.querySelector('#demo-order-form');
  const quantity = document.querySelector('#quantity');
  const total = document.querySelector('#order-total');
  const orderButton = document.querySelector('#demo-order-button');
  const dialog = document.querySelector('#demo-dialog');
  const dialogSummary = document.querySelector('#dialog-summary');
  const dialogClose = document.querySelector('#dialog-close');

  if (!form || !quantity || !total || !orderButton || !dialog || !dialogSummary || !dialogClose) {
    return;
  }

  const unitPrice = 3980;
  const yen = new Intl.NumberFormat('ja-JP', {
    style: 'currency',
    currency: 'JPY',
    maximumFractionDigits: 0,
  });

  const updateTotal = () => {
    const count = Number(quantity.value) || 1;
    total.textContent = yen.format(unitPrice * count);
  };

  quantity.addEventListener('change', updateTotal);

  orderButton.addEventListener('click', () => {
    const flavor = form.querySelector('input[name="flavor"]:checked')?.value ?? '未選択';
    const count = Number(quantity.value) || 1;
    const amount = yen.format(unitPrice * count);
    dialogSummary.textContent = `${flavor} × ${count}袋 / 合計 ${amount}。`;

    if (typeof dialog.showModal === 'function') {
      dialog.showModal();
    } else {
      window.alert(`${dialogSummary.textContent}\nこのページは練習用のため、決済や注文送信は行いません。`);
    }
  });

  dialogClose.addEventListener('click', () => dialog.close());

  dialog.addEventListener('click', (event) => {
    const rect = dialog.getBoundingClientRect();
    const clickedBackdrop =
      event.clientX < rect.left ||
      event.clientX > rect.right ||
      event.clientY < rect.top ||
      event.clientY > rect.bottom;

    if (clickedBackdrop) {
      dialog.close();
    }
  });

  updateTotal();
})();
