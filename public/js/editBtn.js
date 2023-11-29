const editBtn = document.querySelector('#newPost');

editBtn.addEventListener('submit', async e => {
    e.preventDefault();

    const title = document.querySelector('#title').value;
    const content = document.querySelector('#content').value;
    const post_id = document.querySelector('#postId').value;
   
    const res = await fetch(`/api/posts/edit/${post_id}`, {
        method: 'PUT',
        body: JSON.stringify({ title, content }),
        headers: { 'Content-Type': 'application/json' }
    })
    if (res.ok) {
        document.location.replace('/profile');
    } else {
        alert('Failed to edit post');
    }
})