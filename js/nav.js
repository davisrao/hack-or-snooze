"use strict";

/******************************************************************************
 * Handling navbar clicks and updating navbar
 */

/** Show main list of all stories when click site name */

function navAllStories(evt) {
  console.debug("navAllStories", evt);
  hidePageComponents();
  putStoriesOnPage();
}

$body.on("click", "#nav-all", navAllStories);

/** Show login/signup on click on "login" */

function navLoginClick(evt) {
  console.debug("navLoginClick", evt);
  hidePageComponents();
  $loginForm.show();
  $signupForm.show();
}

$navLogin.on("click", navLoginClick);

/** When a user first logins in, update the navbar to reflect that. */

function updateNavOnLogin() {
  console.debug("updateNavOnLogin");
  $(".main-nav-links").show();
  $navLogin.hide();
  $navLogOut.show();
  $navUserProfile.text(`${currentUser.username}`).show();
}

/**
 * when user clicks to submit new story
 */
function navSubmitNewStoryClick() {
  hidePageComponents();
  $newStoryForm.show();
}
$navSubmit.on("click", navSubmitNewStoryClick);

function navFavoritesStoryList(e) {
  $allStoriesList.empty();


  for (let favorite of currentUser.favorites) {
    
    if (! (favorite instanceof Story)) {
      let favoriteHtml = $(`#${favorite}`).html();
      console.log(favoriteHtml);
      $favoritesList.append(favoriteHtml);
    }
  }
  hidePageComponents();
  $favoritesList.show();

  // }

  // $favoritesList.show();
  // for (let favorite of $allStoriesList.children()) {
  //   let favoriteLi = $(favorite).hasClass("favorite");
  //   const keepFavorite = $(favorite);

  //   if (favoriteLi) {
  //     keepFavorite.show();
  //   } else {
  //     keepFavorite.remove();
  //   }
}

$navFavorites.on("click", navFavoritesStoryList);
