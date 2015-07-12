# Exit on the first encountered error
set -e

# Run Flake8 tests
virtualenv/bin/flake8 main.py
# Run Python tests
virtualenv/bin/nosetests .
