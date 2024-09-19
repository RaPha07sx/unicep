document.getElementById("comment-form").addEventListener("submit", function(event) {
    event.preventDefault(); 

    
    const name = document.getElementById("name").value;
    const comment = document.getElementById("comment").value;

    
    const commentElement = document.createElement("div");
    commentElement.classList.add("comment");
    commentElement.innerHTML = `<strong>${name}:</strong> <p>${comment}</p>`;

    
    document.getElementById("comment-list").appendChild(commentElement);

    
    document.getElementById("comment-form").reset();

    const form = document.getElementById('comment-form');

form.addEventListener('submit', async function(event) {
    event.preventDefault();

    const formData = new FormData(form);
    const response = await fetch('/add_comment', {
        method: 'POST',
        body: formData
    });

    const result = await response.json();
    alert(result.message);

    // Atualiza a lista de comentários ou recarrega a página para ver o novo comentário
});

async function loadComments() {
    const response = await fetch('/get_comments');
    const comments = await response.json();

    const commentList = document.getElementById('comment-list');
    commentList.innerHTML = '<h4>Comentários dos Usuários:</h4>'; // Reset list

    comments.forEach(comment => {
        const commentItem = document.createElement('div');
        commentItem.innerHTML = `<p><strong>${comment[0]}</strong> (${comment[2]}): ${comment[1]}</p>`;
        commentList.appendChild(commentItem);
    });
}

loadComments(); // Load comments on page load


});
