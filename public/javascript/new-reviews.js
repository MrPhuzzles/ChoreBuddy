async  function reviewFormHandler (event) {
    event.preventDefault()
    const user_id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
      ];
    const comment = document.querySelector('textarea[name="review-comment"]').value.trim();

    const response = await fetch('/api/reviews',{
        method:'post',
        body: JSON.stringify ({
            comment,
            user_id
        }),
        headers: {'Content-Type': 'application/json'}
    })

    if(response.ok) {
        document.location.reload();
    } else {
        alert(response.statusText);
    }
}

document.querySelector('.new-reviews-form').addEventListener('submit', reviewFormHandler);