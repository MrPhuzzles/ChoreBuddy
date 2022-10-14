async function newFormHandler(event) {
    event.preventDefault();
  
    const title = document.querySelector('input[name="post-title"]').value;
    const content = document.querySelector('textarea[name="post-content"]').value;
    const address = document.querySelector('input[name="post-address"]').value;
    const city = document.querySelector('input[name="post-city"]').value;
    const province = document.querySelector('.form-select').value;
    const postal = document.querySelector('input[name="post-postal"]').value;
  
    const response = await fetch('/api/post', {
      method: 'post',
      body: JSON.stringify({
        title,
        content,
        address,
        city,
        province,
        postal
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
  
    if (response.ok) {
      document.location.reload();
    } else {
      alert(response.statusText);
    }
  }
  
  document.querySelector('.new-post-form').addEventListener('submit', newFormHandler);