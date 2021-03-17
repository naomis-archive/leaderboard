# Contributing

Please ensure all pull requests and contributions comply with the [Developer Certificate of Origin](https://developercertificate.org/).

## Setting Up Your Code

First, fork this repository to your own account. Then use `git clone <url>` to bring your forked repository down to your local machine (remember to get the URL for _your_ repository, not the original). Optionally, use `git remote add upstream <url>` to add the original repository as the upstream (this is helpful for keeping your fork up-to-date).

Before continuing, make sure your terminal is pointed at the root directory of the project. Then use `npm ci` to install all of the root-level dependencies as well as the nested project dependencies.

### Setting up the API

The server-side API logic is all located in the `/api` directory. The API handles fetching the data from each platform, parsing it into the structure the client expects, and making it available via an endpoint.

Before starting work on the API, you should set up the environment variables. Make sure your terminal is pointed at the correct directory with `cd api`, then copy the sample environment variable strucutre with `cp sample.env .env`. Configure the following values:

- `PORT`: This is the port the server will run on. By default, this is `8080`.
- `NODE_ENV`: This should be set to `development` when you are working locally. Setting this to `production` will enable the HTTPS protocol and configure the ports to use the standard 80 and 443 - these are often restricted on a local machine and might throw errors.
- `USE_LIVE_DATA`: Setting this to `true` will initiate the calls to the external APIs to fetch live data. You should leave this as `false` when developing, to load the test data, unless you are actively working on a feature related to the external calls.
- `CROWDIN_API_KEY`: You will need an API key to fetch data from Crowdin.
- `GHOST_CONTENT_API_KEY`: You will need an API key to fetch data from Ghost, our publication hosting infrastructure. Ghost offers two keys, a "content" key and an "admin" key - you only need the "content" key here for the API's operations.

When you make changes to the API, you need to build them with `npm run build`. Then you can test them with `npm run start`.

Before submitting a pull request, be sure that the linter passes with `npm run lint` and all tests pass with `npm run test`.

### Setting up the Client

The public-facing website is contained entirely within the `/client` directory. This is where you edit the views that someone would see when using this application.

Switch to your client directory with `cd client`.

Running `npm run start` will spin up a development instance of the client application in "watch" mode - you will get live reloads of your changes. Note that this does make calls to the live API - when working locally, it is best to replace the `url` value on line 6 of `/client/src/app/get-data.service.ts` with your local host API url (`http://localhost:8080/get-data` by default).

Before submitting a pull request, be sure that the linter passes with `npm run lint` and all tests pass with `npm run test`.

### Global Commands

You can run both the server and client simultaneously, from the root directory of the project, with `npm run develop`. This will use the `concurrently` package to start both services in the same terminal.

You can also lint and test the entire project at once with `npm run lint` and `npm run test` from the root directory.

### Versioning

This project uses Semantic Versioning for the root project, as well as the API and Client sub-projects.

- When your changes involve major refactors or touch a large part of the codebase, bump the major version with `npm version major`.
- When your change involves new features or additions, bump the minor version with `npm version minor`.
- When your change involves bug fixes, bump the patch version with `npm version patch`.
- When your change only touches documentation, tests, or non-user facing features, no version bump is necessary.

All changes to the codebase should bump the appropriate version of the root project. Changes that affect the API codebase should also bump the version of the API (`cd api` then the relevant command above), and changes that affect the client codebase should bump the version of the client (`cd client` then the relevant command above).

Note that these `npm` commands will create a new commit for you - your working tree MUST be clean for these to work, and you should push that commit up to your branch prior to opening a PR.

## Claiming an Issue

All of our issues are open to contributors! If you see an open issue you would like to work on, please comment on the issue so we may assign it to you.

> NOTE: Assigned issues that have not had any activity in a week will be unassigned.

If an issue is already assigned, please look for another issue to contribute to.We use labels to help categorise issues:

- `good first issue` - These issues require minimal familiarity with our codebase. Please reserve these for first-time contributors.
- `help wanted` - These issues are open to any contributors.
- `staff only` - These issues are locked to project members/collaborators. Pull requests on these issues will not be accepted from outside contributors.

## Working on your issue

Before starting work, we highly recommend ensuring that your forked version is up to date. If you set the `upstream` as mentioned in [Setting Up Your Code](#setting-up-your-code), run these commands in your terminal (with the terminal pointed at the root directory of your local files):

- `git fetch upstream` - this gets the current state of the original repo, without pulling down the changes to your local machine.
- `git reset --hard upstream/main` - this resets the state of your local files to match the current state of the original repo.
- `git push -f` - this forces the changes to your forked repo (thus making it match the original)

> NOTE: You will lose any changes you are currently working on. Do this with care.

Next, use `git checkout -b <branchname>` to create a new branch for your work. It's always a good idea to avoid committing changes directly to your `main` branch - this keeps it clean and avoids errors when updating (above).

Branch names should follow a convention of `scope/issue?/description` where:

- `scope` is the nature of the changes (eg. `feat` for a new feature, or `docs` for documentation update). This should match the scope of the related issue.
- `issue` is the _number_ for the related issue you're addressing.
- `description` is a brief description of your changes, such as `update-contribs` for updating the contributing guidelines.

Now you are free to work on your code! When you are satisfied with your changes, you can commit them with `git commit -s -m "message"`, where:

- `-s` flag signs the commit, to verify the connection with your GitHub account.
- `-m` flag sets up the commit message.
- `message` is the commit message: a brief (50 character max) message describing what the commit changes.

## Submitting a Pull Request

Once you have all of your changes made and committed, you can push them to your forked repository! Use `git push -u origin <branchname>`, where:

- `-u` tells `git` to set the upstream (see below)
- `origin` tells `git` to push to your fork
- `branchname` tells `git` to push to a branch - this MUST match the name of the branch you created locally.

> NOTE: By setting the upstream, any subsequent `push` commands can be done with `git push`, and it will be pushed to the same branch.

Now you can open the pull request! You should see a quick option to do so appear at the top of your repository on GitHub. Click the "Pull Request" button to have GitHub automatically set up the pull request.

First, change the title of the pull request to match your branch name (following the conventions above!). Then, follow the instructions in the preset Pull Request template (make sure to complete any steps listed!).

Congratulations! You've submitted your first pull request! We will review it as quickly as possible, so keep an eye out for approvals (or requested changes).

## Other Contributions

If you aren't comfortable with the codebase, or would like to contribute in other ways, we have options for that!

- Documentation Updates: You are always welcome to update our documentation (like this file!) if you see any typos or anything that can be clarified.
- Feature Requests: If you have ideas for new features or improvements, feel free to open an issue!
- Bug Reports: We rely on our users to help identify bugs - if you see something wrong, please let us know with an issue!
