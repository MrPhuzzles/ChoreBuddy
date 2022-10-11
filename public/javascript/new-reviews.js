async  function reviewFormHandler (event) {
    event.preventDefault()

    const comment = document.querySelector('textarea[name="review-comment"]').value.trim();

    const response = await fetch('/api/reviews',{
        method:'post',
        body: JSON.stringify ({
            comment
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