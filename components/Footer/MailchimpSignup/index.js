import React from "react";

const MailchimpSignup = () => {
  const [value, setValue] = React.useState();
  return (
    <div id="mc_embed_signup">
      <form
        action="https://bigkittymag.us7.list-manage.com/subscribe/post?u=0d16be60c7a4a73adad62a580&amp;id=0f97de82a5"
        method="post"
        id="mc-embedded-subscribe-form"
        name="mc-embedded-subscribe-form"
        className="validate"
        target="_blank"
        noValidate
      >
        <div id="mc_embed_signup_scroll">
          <input
            type="email"
            name="EMAIL"
            className="email"
            id="mce-EMAIL"
            placeholder="email address"
            required
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
            }}
          />
          <div
            style={{ position: "absolute", left: "-5000px" }}
            aria-hidden="true"
          >
            <input
              type="text"
              name="b_0d16be60c7a4a73adad62a580_0f97de82a5"
              tabIndex="-1"
            />
          </div>
          <div className="clear">
            <input
              type="submit"
              value="Subscribe"
              name="subscribe"
              id="mc-embedded-subscribe"
              className="button"
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default MailchimpSignup;
