export function fillFieldsForm(form, data) {
  data.forEach(item => {
    form.querySelector(item.selector).value = item.value;
  });
}