const add = document.querySelector('#comment-btn');
const addComment = document.querySelector('#addComment');

addComment.addEventListener('submit', async e => {
    e.preventDefault();

    const content = document.querySelector('#commentInput').value;
    const post_id = document.querySelector('#postId').value;

    const res = await fetch('/api/comments', {
        method: 'POST',
        body: JSON.stringify({ content, post_id }),
        headers: { 'Content-Type': 'application/json' }
    })
    if (res.ok) {
        document.location.reload();
    } else {
        alert('Failed to create comment');
    }
});