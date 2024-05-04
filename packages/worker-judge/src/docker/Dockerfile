FROM openjdk:23-slim-bullseye

# Install build-essential for C++ compilation and Node.js for JavaScript execution
RUN apt-get update && \
    apt-get install -y build-essential curl && \
    curl -sL https://deb.nodesource.com/setup_14.x | bash - && \
    apt-get install -y nodejs

# Set the work directory
WORKDIR /app

# Copy the script to execute code based on a condition
COPY executor.sh /app/

# Give execution rights to the script
RUN chmod +x /app/executor.sh

# Set the entrypoint to the script
ENTRYPOINT ["/bin/bash", "/app/executor.sh"]
