exports.parseTweet = (tweet) => {
  const res = {
    createdAt: tweet.created_at,
    text: tweet.text,
    url: tweet.quoted_status_permalink.expanded,
    user: {
      name: tweet.user.name,
      screenName: tweet.user.screen_name,
      profileImageUrl: tweet.user.profile_image_url,
    },
  };

  return res;
};
