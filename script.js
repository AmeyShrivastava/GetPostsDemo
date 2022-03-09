// Generates a card for each post
// This function takes in a json object,
// parses it, creates and then appends elements to DOM
// Js is also used to modify element styles - CSS

const generateCard = (json) => {
  // sets up blank elements
  let cardContainerDiv = document.createElement("div");
  cardContainerDiv.classList.add("card", "border-secondary", "my-2");
  let cardUL = document.createElement("ul");
  cardUL.classList.add("list-group", "list-group-flush");
  let json_ID = document.createElement("li");
  let json_title = document.createElement("li");
  let json_body = document.createElement("li");

  // uses template literals to generate content dynamically
  json_ID.innerHTML = `Post ID: ${json.id} User ID: ${json.userId}`;
  json_ID.classList.add("list-group-item", "text-secondary");

  json_title.innerHTML = `${json.title}`;
  json_title.classList.add(
    "list-group-item",
    "card-title",
    "display-6",
    "text-danger"
  );

  json_body.innerHTML = `${json.body}`;
  json_body.classList.add("list-group-item", "card-text", "blockquote");

  // appends the elements created above
  cardUL.appendChild(json_title);
  cardUL.appendChild(json_body);
  cardUL.appendChild(json_ID);
  cardContainerDiv.appendChild(cardUL);

  // add each post (card) to the dom
  const appendTarget = document.getElementById("appendTarget");
  appendTarget.appendChild(cardContainerDiv);
};

// Retrieves value from form input and uses template literals to
// dynamically generate url for the specified post
const getSpecificPost = async () => {
  var requestedPostID = document.getElementById("requestSpecificPost").value;
  try {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/posts/${parseInt(requestedPostID)}`
    );
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }
    const json = await response.json();
    // calls generate function for only the requested post
    generateCard(json);
  } catch (error) {
    console.error(`Could not get post: ${error}`);
  }
};

// Fetches all posts from the api
const getAllPosts = async () => {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }
    const json = await response.json();
    // loops over each element in the json and calls generate function on every item
    json.forEach((element) => {
      generateCard(element);
    });
  } catch (error) {
    console.error(`Could not get post: ${error}`);
  }
};
