## Developing

If you cloned the repository locally run `corepack enable` to setup the correct version of the package manager. After running `corepack enable` you can use `pnpm` to install dependencies and run scripts.

First, install the dependencies and build the css-files:

```bash
pnpm run install
pnpm run prepare
```

Then, run the development server:

```bash
pnpm run dev

# or start the server and open the app in a new browser tab
pnpm run dev -- --open
# exposed on port 5173
```

For every change you make in the scss-files, you have to run `pnpm run prepare` again.

## Building

To create a production version of your app:

```bash
pnpm run build
```

You can preview the production build on port 4173 with `pnpm run preview`.

For production we containerize the app using Docker. To build the Docker image run the following command:

```bash
pnpm run docker:build
```

To run the Docker image run the following command:

```bash
pnpm run docker:run
```

To stop the Docker image run the following command:

```bash
pnpm run docker:stop
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
