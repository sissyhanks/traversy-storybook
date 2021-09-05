# traversy-storybook

Node.js app with Google OAuth built by following this [Traversy Media youtube tutorial](https://www.youtube.com/watch?v=SBvmnHTQIPY).

## Notes and Resources

I initially committed my .env file and learned about [git rm](https://git-scm.com/docs/git-rm) from this [stack overflow](https://stackoverflow.com/questions/38983153/git-ignore-env-files-not-working) post.

On September 5, 2021 i was having trouble storing client sessions in the database and received this error message

```
Class constructor MongoStore cannot be invoked without 'new'
```

My first instinct was to check and see if connect-mongo was installed, and after verifying hat it was I found out from this [stack overflow](https://stackoverflow.com/questions/66654037/mongo-connect-error-with-mongo-connectsession) post that the error i was receiving was becaus of a change in the [Express integration](https://www.npmjs.com/package/connect-mongo#express-or-connect-integration) and [Connection to MongoDB](https://www.npmjs.com/package/connect-mongo#connection-to-mongodb) configuration and was ultimately reminded to read documentation.
