# `@atomist/github-check-repo-contents-skill`

<!---atomist-skill-readme:start--->

# What it's useful for

On a schedule, validate the contents of the Repo.

# Before you get started

Connect and configure these integrations:

1. **GitHub**
2. **Slack** (optional)

The **GitHub** integration must be configured in order to use this skill.

When the optional Slack integration is enabled, users can interact with this skill directly from Slack.

# How to configure

1. **Optionally create a cron schedule**

    Re-apply this configuration periodically to ensure it stays in sync.

    ![screenshot3](docs/images/screenshot3.png)

## How to use Git Repo Config

-   **Using a Cron schedule**

    This skill can iterate over all of your Repos on a Schedule.

-   **Run a sync from Slack**

    Interactively kick off the Skill to synchronize your Repositories.

    ```
    @atomist sync across repos
    ```

<!---atomist-skill-readme:end--->

---

Created by [Atomist][atomist].
Need Help? [Join our Slack workspace][slack].

[atomist]: https://atomist.com/ "Atomist - How Teams Deliver Software"
[slack]: https://join.atomist.com/ "Atomist Community Slack"
