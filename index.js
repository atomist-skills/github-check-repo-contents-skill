var api = require('@atomist/api-cljs/atomist.middleware');

var handleRepo = async function(repo, config) {
  console.info(`repo ${repo.owner}/${repo.repo} will use ${config} on cloned repo at ${repo.basedir}`);
  // TODO run your check here
  return true;
}

exports.handler = api.handler(
 {
    sync: async (request) => {
      console.info(`target config: ${request.config}`);
      await request.withRepoIterator(async repo => {
        return await handleRepo(repo, request.config);
      },
      {
        clone: true,
      });
    },
    OnSchedule: async (request) => {
      await request.withRepoIterator(async repo => {
        return await handleRepo(repo, request.config);
      },
      {
        clone: true,
      });
    },
    OnNewRepo: async (request) => {
      await request.withRepo(async repo => {
        return await handleRepo(repo, request.config);
      });
    }
 }
);

