# todo-list

add .env file to backend for example

/todo-list/backend/.env
-----------
SECRET_KEY = 'django-insecure-&(=ci06ue^j)dsg06^)dm#i8b)tcvqh!&k&l=83(0e_=y9ua@g'
DEBUG=True
PGNAME=postgres
PGUSER=postgres
PGPASSWORD=postgres
PGHOST=db
PGPORT=5432
-----------

and add .env to main dir of project

/todo-list/.env
-----------
PGNAME=postgres
PGUSER=postgres
PGPASSWORD=postgres
-----------
docker-compose up --build
