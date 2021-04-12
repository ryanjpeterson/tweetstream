exports.parseTweet = (tweet) => {
  const res = {
    createdAt: tweet.created_at,
    id: tweet.id,
    idStr: tweet.id_str,
    text: tweet.text,
    user: {
      id: tweet.user.id,
      idStr: tweet.user.id_str,
      name: tweet.user.name,
      screenName: tweet.user.screen_name,
      location: tweet.user.location,
      description: tweet.user.description,
      profileImageUrl: tweet.user.profile_image_url,
    },
  };

  return res;
};
