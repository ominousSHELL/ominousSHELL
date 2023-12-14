FROM python:latest

RUN apt-get update && apt install -y iproute2 iputils-ping 

WORKDIR /usr/src/app
COPY requirements.txt ./
RUN pip install -r requirements.txt
COPY . .

EXPOSE 2000
CMD ["python", "manage.py", "runserver", "0.0.0.0:2000"]
