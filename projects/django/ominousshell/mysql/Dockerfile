# Use the official MySQL image as the base image
FROM mysql

# Set the environment variables for MySQL
ENV MYSQL_ROOT_PASSWORD=anonymous
ENV MYSQL_DATABASE=ominousshell

# Copy the SQL dump file to the /docker-entrypoint-initdb.d/ directory
COPY ominousshell.sql /docker-entrypoint-initdb.d/

# Optionally, you can expose the MySQL port if needed
EXPOSE 3306

