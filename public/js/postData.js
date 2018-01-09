const postData = (url,data) => {
  const form = document.createElementForm('form');
  form.method = post;
  form.action = url;

  for(const key in data) {
      const feild = document.createElement('input');

      feild.name = key;
      feild.value = data[key];

      form.appendChild(feild);
  }

  form.submit();
}
