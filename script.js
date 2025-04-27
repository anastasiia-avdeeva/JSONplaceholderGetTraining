const postsContainer = document.querySelector(".posts");
const API_URL = "https://jsonplaceholder.typicode.com/posts";
const errorMsg = "Oops, something went wrong! Please, try again later.";
const ERROR_MSG = "Oops, something went wrong! Please, try again later.";

async function renderPostsPage() {
  const posts = await fetchPosts();
  renderPosts(posts);
}

async function fetchPosts() {
  try {
    const response = await fetch(API_URL);
    const posts = await response.json();
    return posts;
  } catch (err) {
    console.error(err);
    renderErrorMsg();
  }
}

function renderErrorMsg() {
  const errorElem = createElemWithClass("p", "error_msg");
  errorElem.textContent = ERROR_MSG;
  postsContainer.append(errorElem);
}

function renderPosts(posts) {
  posts.forEach((post) => {
    const postElem = createPostElem(post);
    postsContainer.append(postElem);
  });
}

function createPostElem(post) {
  const postElem = createElemWithClass("div", "post");
  postElem.innerHTML = `<h2 class="post__title">${capitalizeFirstLetter(
    post.title
  )}</h2>
  <p class="post__body">${capitalizeFirstLetter(post.body)}</p>`;
  return postElem;
}

function createElemWithClass(tagname, classname) {
  const newElem = document.createElement(tagname);
  newElem.classList.add(classname);
  return newElem;
}

function capitalizeFirstLetter(str) {
  if (!str) return "";
  return str[0].toUpperCase() + str.slice(1);
}

document.addEventListener("DOMContentLoaded", renderPostsPage);
