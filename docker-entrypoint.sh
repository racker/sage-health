#!/bin/bash

set -e

# Add sage-health as command if needed
if [ "${1:0:1}" = '-' ]; then
	set -- sage-health "$@"
fi

# Run as user "nobody" if the command is "sage-health"
if [ "$1" = 'sage-health' ]; then
	set -- gosu nobody "$@"
fi

exec "$@"
