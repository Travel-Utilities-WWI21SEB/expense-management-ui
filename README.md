## Developing

If you cloned the repository locally ensure that you have setup the correct node version specified in the engines-field of our `package.json`. Depending on your OS you can achieve this by using some sort of node version manager.

Once ensured, run `corepack enable` to setup the correct version of the package manager. After running `corepack enable` you can use `pnpm` to install dependencies and run scripts.

1. Install the dependencies

```bash
pnpm install
```

2. Run the development server

```bash
pnpm run dev
# exposed on port 5173
```

## Building

To create a production version of your app you can run the following command:

```bash
pnpm build
```

You can preview the production build on port 4173 with `pnpm preview`.

For production we containerize the app using Docker, please ensure that you have Docker Desktop installed and running on your machine. To build the Docker image run the following command:

```bash
pnpm docker:build
```

To run the Docker image run the following command:

```bash
pnpm docker:run
```

To stop the Docker image run the following command:

```bash
pnpm docker:stop
```

## Contributing

To contribute to this template, clone this repository locally and commit your code on a separate branch. Try using conventional commits. When you're ready to make a commit, run the following command to check if your changes meet the standards:

```bash
pnpm prep-commit
```

If the checks pass, stage the files you want to commit and run the following command:

```bash
git commit -m "Your commit message"
```

If you're satisfied with your changes and are ready to merge them, run the following command to ensure your changes pass in our CI-Pipeline:

```bash
pnpm prep-pr
```

If the checks pass open a pull request on the `main` branch. Once the pull request is approved and merged, your changes will be automatically deployed to production.
