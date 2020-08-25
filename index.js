var api = require('@atomist/api-cljs/atomist.middleware');
var fs = require('fs');

// Slack messages are an array of blocks
// they can be sent to #channels or @users.
var sendBlockMessage = async function(repo, request) {
  return await request.blockMessage(
    [{type: "section",
      text: {type: "mrkdwn",
             text: `missing license file in ${repo.owner}/${repo.repo}`}},
    ],
    "#test-channel"
  );
}

var checkRepo = async function(repo, request) {
  console.info(`check repo ${repo.owner}/${repo.repo} license file ${repo.basedir}/${request.config.licensefile} with ${JSON.stringify(request.config)} configuration`);

  // probably sufficient to just write the content of the file since this 
  // won't make the working copy dirty when the content is up to date
  if (request.config.commitenabled===true) {
    await fs.promises.writeFile( `${repo.basedir}/${request.config.licensefile}`, request.config.licensecontent, (err) => {
      console.error(`failed to write content to ${request.config.licensefile}: ${err}`);
    });
  }
  
  return true;
}

exports.handler = api.handler(
 {
    sync: async (request) => {
      await request.withRepoIterator(
        async repo => {
          return await checkRepo(repo, request);
        },
        {clone: true, with_commit: {message: request.config.commitmessage}}
      );
    },
    OnSchedule: async (request) => {
      await request.withRepoIterator(
        async repo => {
          return await checkRepo(repo, request);
        },
        {clone: true, with_commit: {message: request.config.commitmessage}}
      );
    },
    OnAnyPush: async (request) => {
      await request.withRepo(
        async repo => {
          return await checkRepo(repo, request);
        }, 
        {clone: true, with_commit: {message: request.config.commitmessage}}
      );
    }
 }
);
