#!/bin/bash
# run_with_env.sh

# To run a package command
# pnpm with-env --development pnpm -F scripts script (package.json script)
    # (uses only .env.development, despite script using with-env)

# pnpm with-env --development pnpm -F scripts exec tsx src/script.ts
# pnpm -F scripts with-env --development tsx src/script.ts
# pnpm -F scripts with-env --development pnpm script

# To run a root command
# pnpm with-env --development prisma studio (npx package)
# pnpm with-env --development pnpm prisma studio (npx package)
# pnpm with-env --development pnpm lint

echo "PWD is $PWD"

LOC="../../"

if [[ "$1" == --root ]]; then
    LOC=""
    # Shift the first argument off the list of arguments
    shift
fi

# Check if the first argument starts with a double dash
if [[ "$1" =~ ^-- ]]; then
    # Extract environment name by removing the double dash prefix
    ENV_NAME="${1:2}"  # Extracts substring starting from the third character
    ENV_FILE="$LOC.env.$ENV_NAME"
    # Shift the first argument off the list of arguments
    shift

    if [ "$ENV_NAME" = "production" ]; then
        echo "You are about to run a script in the PRODUCTION environment."
        read -p "Are you sure you want to proceed? (y/n): " -r
        echo    # Move to a new line
        if [[ ! $REPLY =~ ^[Yy]$ ]]; then
            echo "Operation aborted."
            exit 1
        fi
    fi
else
    # No environment prefix, use default .env
    ENV_FILE="$LOC.env"
fi

echo "Running with environment file: $ENV_FILE"
# Execute the command with the specified environment file
dotenv -e "$ENV_FILE" -- "$@"
