const apiUrl = 'http://localhost:3000/posts';

async function getPosts() {
  const res = await fetch(apiUrl);
  const posts = await res.json();
  displayPosts(posts);
}
// Displays the users post
function displayPosts(posts) {
  const container = document.getElementById('posts-container');
  container.innerHTML = '';
  posts.reverse().forEach(post => {
    const postDiv = document.createElement('div');
    postDiv.className = 'post';
    postDiv.innerHTML = `
      <h3>${post.title}</h3>
      <p>${post.content}</p>
      <button onclick="deletePost(${post.id})">Delete</button>
      <button onclick="editPost(${post.id}, \`${post.title}\`, \`${post.content}\`)">Edit</button>
    `;
    container.appendChild(postDiv);
  });
}
// Create a post
async function createPost(title, content) {
  await fetch(apiUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, content })
  });
  getPosts();
}
// Delete a post 
async function deletePost(id) {
  await fetch(`${apiUrl}/${id}`, {
    method: 'DELETE'
  });
  getPosts();
}
// Edit a post
function editPost(id, oldTitle, oldContent) {
  const title = prompt("Edit title:", oldTitle);
  const content = prompt("Edit content:", oldContent);

  if (title && content) {
    fetch(`${apiUrl}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, content })
    }).then(() => getPosts());
  }
}
// Submit your post 
document.getElementById('post-form').addEventListener('submit', e => {
  e.preventDefault();
  const title = e.target.title.value;
  const content = e.target.content.value;
  createPost(title, content);
  e.target.reset();
});

getPosts();