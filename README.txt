Golf3.0 is a Python backend + React front end project.
To be able to succesfullt set-up and environment for this project you need to have the following installed.


^Python 2.7.10 or newer 2.7.x distrubution  ( 'brew install python@2' )
^Node 11.10.0 or newer ('brew install node')

Together with Node, you will have 'npm' installed
Together with Python, you will have 'pip' installed 
Its also stronglt recomended to install a virtualenvironment for the python projec. (brew install virtualenv )
i.e 'pip install virtualenv'

Clone/download git repo to a project root directory. cd to the new root directory.

PYTHON SETUP:
With virtualenv, make sure to chose python 2.7 as runtime compiler...then from project root directory
'pip install -r requirements.txt'.. this will install all project dependencies
To run program in debug mode, adde env variable 'RUN_MODE' to your python environment. ( add to /bin/activate file )

Node SETUP:
Install all node dependencies from project root directory, using 'npm install'
