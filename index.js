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

  if (fs.existsSync( `${repo.basedir}/${request.config.licensefile}` )) {
    return true
  } else {
    console.warn(`no ${request.config.licensefile} in ${repo.owner}/${repo.repo}`);
    return false
  }
}

exports.handler = api.handler(
 {
    sync: async (request) => {
      await request.withRepoIterator(
        async repo => {
          return await checkRepo(repo, request);
        },
        {clone: true}
      );
    },
    OnSchedule: async (request) => {
      await request.withRepoIterator(
        async repo => {
          return await checkRepo(repo, request);
        },
        {clone: true}
      );
    },
    OnAnyPush: async (request) => {
      await request.withRepo(
        async repo => {
          return await checkRepo(repo, request);
        }, 
        {clone: true}
      );
    }
 }
);
