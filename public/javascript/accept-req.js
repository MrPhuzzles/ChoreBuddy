async function acceptRequest(event) {
event.preventDefault();
    const post_id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
      ];
    
      const request_taken = 1

      const response = await fetch(`/api/post/${post_id}`, {
      method: 'put',
      body: JSON.stringify( {
        request_taken
      }),
      headers: { 'Content-Type': 'application/json' }
    });
  
    if (response.ok) {
      document.location.reload();
    } else {
      alert(response.statusText);
    }
  }
  
  document.querySelector('.accept-form').addEventListener('submit', acceptRequest);