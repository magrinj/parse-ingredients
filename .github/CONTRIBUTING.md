# Contributing to @magrinj/parse-ingredients

Thanks for your interest in contributing!

## Prerequisites

- [Bun](https://bun.sh/) (package manager)
- [Node.js](https://nodejs.org/) >= 18

## Setup

```bash
# Install dependencies
bun install

# Build
bun run build

# Run tests
bun run test
```

## Development Workflow

1. Fork and clone the repository
2. Create a branch: `git checkout -b my-feature`
3. Make your changes in `src/`
4. Run checks: `bun run lint && bun run typecheck && bun run test`
5. Commit with a clear message following [Conventional Commits](https://www.conventionalcommits.org/)
6. Push and open a Pull Request

## Adding a New Locale

1. Create `src/locale/{code}.ts` following the pattern in `src/locale/en.ts`
2. Add the entry to `tsdown.config.ts`
3. Add tests for the new locale
4. Update the README and docs

## Pull Request Guidelines

- Keep PRs focused on a single change
- Include a clear description of what and why
- Ensure lint, typecheck, and tests pass before submitting
- Add tests if applicable

## Code Style

This project uses ESLint 9 with TypeScript and Prettier. Run `bun run lint` to check for issues.
