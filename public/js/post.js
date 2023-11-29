const newPost = document.querySelector('#newPost');

newPost.addEventListener('submit', async e => {
    e.preventDefault();

    const title = document.querySelector('#title').value;
    const content = document.querySelector('#content').value;

    const res = await fetch('/api/posts', {
        method: 'POST',
        body: JSON.stringify({ title, content }),
        headers: { 'Content-Type': 'application/json' }
    })
    if (res.ok) {
        document.location.reload();
    } else {
        alert('Failed to create post');
    }
});

document.querySelector('#post-container').addEventListener('click', async e => {
    e.preventDefault();

    if (e.target.hasAttribute('data-id')) {
        const id = e.target.dataset.id
        const res = await fetch(`/api/posts/${id}`, {
            method: 'DELETE',
        })
        if (res.ok) {
            document.location.reload();
        } else {
            alert('Failed to delete post');
        }
    }


})