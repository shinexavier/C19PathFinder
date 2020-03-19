# Location cross checking with the help of GeoPandas

## Creating virtual environments
Ensure python3 and pip are installed.
- `sudo apt-get install python3-venv`
- `python3 -m venv --system-site-packages ./venv`
- `source ./venv/bin/activate`
- `python -m pip install -U pip`
- `sudo apt-get update && sudo apt-get install -y libspatialindex-dev`
- `python -m pip install -r requirements.txt`

**All pip install should be from / recorded in requirements.txt**
## Development
- Activating environment  
  `source ./venv/bin/activate`
- Formatting the source files  
  `autopep8 --in-place --aggressive <filename>`
- Linting the source files  
  `pylint <filename>`