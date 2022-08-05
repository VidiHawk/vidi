const {blogAuthor: blogAuthorSQL} = require("../core/sql/controller");

const Author = {};

Author.getAuthor = async (parent, params) => {
    const data = await blogAuthorSQL.get(params.id);
    if(data.error) throw new Error(data.error);
    const authorData = data.result;
    return { ...authorData};
}

Author.submit = async (parent, form) => {
    const { name, description, avatar_url, email, youtube_url, linkedin_url, twitter_url, facebook_url} = form;
    const formResp = await blogAuthorSQL.save(name, description, avatar_url, email, youtube_url, linkedin_url, twitter_url, facebook_url);
    if(formResp.error) throw new Error(formResp.error);
    return { data : form, message:'Success' };
}

module.exports = Author;