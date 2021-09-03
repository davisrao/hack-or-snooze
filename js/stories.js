"use strict";

// This is the global list of the stories, an instance of StoryList

let storyList;

/** Get and show stories when site first loads. */

async function getAndShowStoriesOnStart() {
  storyList = await StoryList.getStories();
  $storiesLoadingMsg.remove();

  putStoriesOnPage();
}

/**
 * A render method to render HTML for an individual Story instance
 * - story: an instance of Story
 *
 * Returns the markup for the story.
 */

function generateStoryMarkup(story) {
  console.debug("generateStoryMarkup", story);

  //1. Line 30: add two font awesome star images
  //2. Create a function that toggles favorites when stars are clicked on
  //3. Add an event listener to the stars when clicked on
  //4. Update css class of hidden between both font awesome stars
  const hostName = story.getHostName();
  return $(`
      <li id="${story.storyId}">
        <i class="far fa-star"></i>
        <i class="fas fa-star hidden"></i>
        <a href="${story.url}" target="a_blank" class="story-link">
          ${story.title}
        </a>
        <small class="story-hostname">(${hostName})</small>
        <small class="story-author">by ${story.author}</small>
        <small class="story-user">posted by ${story.username}</small>
      </li>
    `);
}

/**
 * takes in inputs from submit form on website, generates markup, and displays story
 */

async function generateNewUserInputStory(e) {
  e.preventDefault();
  const author = $("#new-story-author").val();
  const title = $("#new-story-title").val();
  const url = $("#new-story-url").val();

  const newUserInputs = { author, title, url };

  const storyFromUserInputs = await storyList.addStory(
    currentUser,
    newUserInputs
  );

  putStoriesOnPage();
  location.reload();
  return storyFromUserInputs;
}

$newStoryForm.on("submit", generateNewUserInputStory);

/** Gets list of stories from server, generates their HTML, and puts on page. */

function putStoriesOnPage() {
  console.debug("putStoriesOnPage");

  $allStoriesList.empty();

  // loop through all of our stories and generate HTML for them
  for (let story of storyList.stories) {
    const $story = generateStoryMarkup(story);
    $allStoriesList.append($story);
  }

  $allStoriesList.show();
}

function toggleStar(e) {
  console.log("target success", e.target);
  const $currentStar = $(e.target).eq(0);
  const $solidStar = $(".fas").eq(0);
  $currentStar.toggleClass("hidden");
  $solidStar.toggleClass("hidden");

  // $currentStar.toggleClass("hidden");
  // $solidStar.show();
  // console.log($currentStar.closest("i"), "closest icon");
  // console.log("current star", $currentStar.closest(".far"));
  // console.log("solid star", $currentStar.closest(".fas"));

  // if ($currentStar.hasClass("far")) {
  //   $currentStar.hide();
  //   $currentStar.closest(".fas").show();
  //   // $currentStar.show();
  // }

  // console.log($starFind, "found star");
  // if (e.target.classList.value === "far fa-star") {
  //   // e.target.closest(".fas").show();
  //   e.target.hide();
  // }

  // console.log(e.target.closest(".hidden"));
}

$allStoriesList.on("click", ".fa-star", toggleStar);
